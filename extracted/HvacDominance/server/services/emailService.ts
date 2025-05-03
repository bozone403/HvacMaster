/**
 * Email service for sending notifications for HVAC business
 * In a production environment, this would connect to a real email service
 * like SendGrid, Mailgun, AWS SES, etc.
 */

interface EmergencyAlertData {
  name: string;
  phone: string;
  location: string;
  issue: string;
}

interface QuoteRequestAlertData {
  customerName: string;
  customerPhone: string;
  serviceType: string;
  estimatedPrice: string;
}

interface ContactFormAlertData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  isEmergency: boolean;
}

interface PurchaseAlertData {
  packageName: string;
  packagePrice: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  preferredDate: string;
  specialInstructions?: string;
}

class EmailService {
  /**
   * Sends an emergency alert to the company about a new emergency request
   */
  async sendEmergencyAlert(data: EmergencyAlertData): Promise<void> {
    // In production, this would use a real email service
    console.log('📧 EMERGENCY ALERT EMAIL SENT:');
    console.log(`Customer Name: ${data.name}`);
    console.log(`Phone: ${data.phone}`);
    console.log(`Location: ${data.location}`);
    console.log(`Issue: ${data.issue}`);
    console.log('This email would be sent to the emergency response team');
    
    // If SMS service was available:
    // await smsService.sendEmergencyText(`EMERGENCY REQUEST: ${data.name} at ${data.location}. Call: ${data.phone}`);
    
    return Promise.resolve();
  }
  
  /**
   * Sends an alert about a new quote request
   */
  async sendQuoteRequestAlert(data: QuoteRequestAlertData): Promise<void> {
    // In production, this would use a real email service
    console.log('📧 QUOTE REQUEST EMAIL SENT:');
    console.log(`Customer: ${data.customerName}`);
    console.log(`Phone: ${data.customerPhone}`);
    console.log(`Service: ${data.serviceType}`);
    console.log(`Estimated Price: ${data.estimatedPrice}`);
    console.log('This email would be sent to the sales team');
    
    return Promise.resolve();
  }
  
  /**
   * Sends an alert about a new contact form submission
   */
  async sendContactFormAlert(data: ContactFormAlertData): Promise<void> {
    // In production, this would use a real email service
    console.log('📧 CONTACT FORM SUBMISSION EMAIL SENT:');
    console.log(`Name: ${data.name}`);
    console.log(`Phone: ${data.phone}`);
    console.log(`Email: ${data.email}`);
    console.log(`Service: ${data.service}`);
    console.log(`Message: ${data.message}`);
    console.log(`Is Emergency: ${data.isEmergency ? 'YES' : 'No'}`);
    
    if (data.isEmergency) {
      console.log('This email would be marked as HIGH PRIORITY and sent to the emergency team');
    } else {
      console.log('This email would be sent to the customer service team');
    }
    
    return Promise.resolve();
  }
  
  /**
   * Sends a confirmation email to the customer
   */
  async sendCustomerConfirmation(email: string, name: string, type: 'emergency' | 'quote' | 'contact' | 'purchase' | 'booking'): Promise<void> {
    // In production, this would use a real email service
    console.log(`📧 CUSTOMER CONFIRMATION EMAIL SENT TO: ${email}`);
    console.log(`Customer Name: ${name}`);
    console.log(`Type: ${type.toUpperCase()}`);
    
    return Promise.resolve();
  }

  /**
   * Sends notification about a new direct purchase
   */
  async sendPurchaseAlert(data: PurchaseAlertData): Promise<void> {
    // In production, this would use a real email service
    console.log('📧 NEW PURCHASE ALERT EMAIL SENT:');
    console.log(`Package: ${data.packageName}`);
    console.log(`Price: ${data.packagePrice}`);
    console.log(`Customer: ${data.customerName}`);
    console.log(`Email: ${data.customerEmail}`);
    console.log(`Phone: ${data.customerPhone}`);
    console.log(`Address: ${data.customerAddress}, ${data.customerCity}, ${data.customerPostalCode}`);
    
    if (data.preferredDate) {
      console.log(`Preferred Installation Date: ${data.preferredDate}`);
    }
    
    if (data.specialInstructions) {
      console.log(`Special Instructions: ${data.specialInstructions}`);
    }
    
    console.log('This email would be sent to the installation team');
    
    // Also send confirmation to customer
    await this.sendCustomerConfirmation(
      data.customerEmail,
      data.customerName,
      'purchase'
    );
    
    return Promise.resolve();
  }
}

export const emailService = new EmailService();
