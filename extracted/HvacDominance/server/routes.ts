import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { emailService } from "./services/emailService";
import { calculateQuote } from "./services/quoteCalculator";
import { z } from "zod";
import Stripe from "stripe";
import { 
  insertEmergencyRequestSchema,
  insertQuoteRequestSchema,
  insertContactSubmissionSchema
} from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Missing STRIPE_SECRET_KEY environment variable");
}

const stripe = process.env.STRIPE_SECRET_KEY ? 
  new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-08-16" as any }) : 
  null;

export async function registerRoutes(app: Express): Promise<Server> {
  // Emergency Service Request endpoint
  app.post("/api/emergency", async (req, res) => {
    try {
      const validatedData = insertEmergencyRequestSchema.parse(req.body);
      const emergencyRequest = await storage.createEmergencyRequest(validatedData);
      
      // Send notification email to company about emergency request
      await emailService.sendEmergencyAlert({
        name: validatedData.name,
        phone: validatedData.phone,
        location: validatedData.location,
        issue: validatedData.issue
      });
      
      res.status(201).json({
        message: "Emergency request received. A technician will contact you shortly.",
        id: emergencyRequest.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        console.error("Emergency request error:", error);
        res.status(500).json({ message: "Failed to process emergency request" });
      }
    }
  });

  // Quote Calculator endpoint
  app.post("/api/quote", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      
      // Calculate estimated price based on form inputs
      const estimatedPrice = calculateQuote(
        validatedData.service_type,
        validatedData.home_size,
        validatedData.system_efficiency,
        validatedData.property_type
      );
      
      // Store quote request with calculated price
      const quoteRequest = await storage.createQuoteRequest({
        ...validatedData,
        estimated_price: estimatedPrice.price
      });
      
      // Send notification to company about quote request
      await emailService.sendQuoteRequestAlert({
        customerName: validatedData.customer_name,
        customerPhone: validatedData.customer_phone,
        serviceType: validatedData.service_type,
        estimatedPrice: estimatedPrice.price
      });
      
      res.status(201).json({
        price: estimatedPrice.price,
        details: estimatedPrice.details,
        id: quoteRequest.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        console.error("Quote calculation error:", error);
        res.status(500).json({ message: "Failed to calculate quote" });
      }
    }
  });

  // Contact Form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const contactSubmission = await storage.createContactSubmission(validatedData);
      
      // Send notification about contact form submission
      await emailService.sendContactFormAlert({
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email,
        service: validatedData.service,
        message: validatedData.message,
        isEmergency: validatedData.is_emergency ?? false
      });
      
      res.status(201).json({ 
        message: "Contact form submitted successfully", 
        id: contactSubmission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // Booking payment endpoint
  app.post("/api/create-booking-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured properly" });
    }

    try {
      const { amount } = req.body;

      // Create a payment intent for service booking
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "cad",
        metadata: {
          type: "service_booking"
        }
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret
      });
    } catch (err: any) {
      console.error("Stripe booking payment intent error:", err);
      res.status(500).json({ 
        error: { message: err.message || "Failed to create booking payment intent" } 
      });
    }
  });

  // Booking endpoint
  app.post("/api/booking", async (req, res) => {
    try {
      // In a production environment, we would store the booking in a database
      // For now, we'll just simulate success and send notifications
      
      // Extract booking data from request
      const {
        name,
        phone,
        email,
        address,
        city,
        serviceType,
        appointmentDate,
        appointmentTime,
        description
      } = req.body;
      
      // Send notification emails
      await emailService.sendCustomerConfirmation(
        email, 
        name,
        'booking'
      );
      
      // Log the booking
      console.log('New booking:', {
        name,
        phone,
        email,
        address,
        city,
        serviceType,
        appointmentDate,
        appointmentTime,
        description
      });
      
      res.status(201).json({ 
        message: "Booking confirmed successfully" 
      });
    } catch (error) {
      console.error("Booking error:", error);
      res.status(500).json({ message: "Failed to process booking" });
    }
  });

  // Purchase payment intent endpoint (for system installations)
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured properly" });
    }

    try {
      const { amount, serviceType, bookingDetails, paymentOption = 'full' } = req.body;

      // Define payment method types based on the payment option
      const paymentMethodTypes = ['card'];
      
      // Add Afterpay/Clearpay support if requested
      if (paymentOption === 'afterpay') {
        paymentMethodTypes.push('afterpay_clearpay');
      }
      
      // Configure payment intent options
      const paymentIntentOptions: Stripe.PaymentIntentCreateParams = {
        amount: Math.round(amount * 100), // Convert to cents
        currency: "cad",
        payment_method_types: paymentMethodTypes,
        // Store metadata about the service booking
        metadata: {
          serviceType,
          paymentOption,
          customerName: bookingDetails?.name || '',
          customerEmail: bookingDetails?.email || '',
          customerPhone: bookingDetails?.phone || '',
          customerAddress: bookingDetails?.address || '',
          customerCity: bookingDetails?.city || '',
          customerPostalCode: bookingDetails?.postalCode || '',
          preferredDate: bookingDetails?.preferredDate || '',
          specialInstructions: bookingDetails?.specialInstructions || '',
        },
      };

      // Create a payment intent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create(paymentIntentOptions);

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err: any) {
      console.error("Stripe payment intent error:", err);
      res.status(500).json({ 
        error: { message: err.message || "Failed to create payment intent" } 
      });
    }
  });
  
  // Referral Program endpoint
  app.post("/api/referral", async (req, res) => {
    try {
      // In a production environment, we would store the referral in a database
      // For now, we'll just simulate success and log the data
      
      const { 
        yourName, 
        yourEmail, 
        yourPhone, 
        friendName, 
        friendEmail, 
        friendPhone, 
        message 
      } = req.body;
      
      // Log the referral data
      console.log('New referral:', {
        referrer: {
          name: yourName,
          email: yourEmail,
          phone: yourPhone
        },
        friend: {
          name: friendName,
          email: friendEmail,
          phone: friendPhone
        },
        message
      });
      
      // In a real implementation, we would:
      // 1. Store the referral in the database
      // 2. Send an email to the referred friend
      // 3. Send a confirmation to the referrer
      // 4. Track when the referred friend becomes a customer to issue the voucher
      
      // For now, simulate sending an email to the friend
      // This would use a real email service in production
      setTimeout(() => {
        console.log(`Email sent to ${friendEmail} about referral from ${yourName}`);
      }, 1000);
      
      res.status(201).json({ 
        message: "Referral submitted successfully", 
        voucher: {
          code: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
          value: "$100",
          // In production, this would be linked to the referrer and only valid after friend becomes customer
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
        }
      });
    } catch (error) {
      console.error("Referral error:", error);
      res.status(500).json({ message: "Failed to process referral" });
    }
  });

  // Webhook for Stripe payment events
  app.post("/api/payment-webhook", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured properly" });
    }
    
    const payload = req.body;
    
    try {
      // In production, this would verify the webhook signature
      // const sig = req.headers['stripe-signature'];
      // const event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
      
      // For testing, we'll just use the payload directly
      const event = payload;
      
      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          
          // Get the metadata from the payment intent
          const { 
            serviceType, 
            customerName, 
            customerEmail, 
            customerPhone,
            customerAddress,
            customerCity,
            customerPostalCode,
            preferredDate,
            specialInstructions
          } = paymentIntent.metadata;
          
          // Find the package details based on serviceType
          let packageName = '';
          let packagePrice = '';
          
          if (serviceType.includes('furnace-standard')) {
            packageName = 'Standard Furnace Installation';
            packagePrice = '$6,499';
          } else if (serviceType.includes('furnace-premium')) {
            packageName = 'Premium Furnace Installation';
            packagePrice = '$6,999';
          } else if (serviceType.includes('ac-standard')) {
            packageName = 'Standard AC Installation';
            packagePrice = '$6,999';
          } else if (serviceType.includes('ac-premium')) {
            packageName = 'Premium AC Installation';
            packagePrice = '$7,499';
          } else if (serviceType.includes('combo')) {
            packageName = 'Furnace & AC Combo Installation';
            packagePrice = '$12,999';
          }
          
          // Send notification email about the purchase
          await emailService.sendPurchaseAlert({
            packageName,
            packagePrice,
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            customerCity,
            customerPostalCode,
            preferredDate,
            specialInstructions
          });
          
          console.log(`Payment successful! Amount: ${paymentIntent.amount / 100} ${paymentIntent.currency}`);
          break;
          
        case 'payment_intent.payment_failed':
          const failedPaymentIntent = event.data.object;
          console.log(`Payment failed: ${failedPaymentIntent.last_payment_error?.message}`);
          break;
          
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      
      res.status(200).json({ received: true });
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
