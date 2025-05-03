import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertEmergencyRequestSchema,
  insertQuoteRequestSchema,
  insertBookingSchema,
  insertExitIntentClaimSchema,
} from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Emergency Request API
  app.post("/api/emergency-requests", async (req, res) => {
    try {
      const validatedData = insertEmergencyRequestSchema.parse(req.body);
      const result = await storage.createEmergencyRequest(validatedData);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      console.error("Error creating emergency request:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: error.errors 
        });
      }
      res.status(500).json({ success: false, message: "Failed to submit emergency request" });
    }
  });

  // Quote Request API
  app.post("/api/quote-requests", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        serviceType: req.body.serviceType,
        message: req.body.message
      });
      
      const result = await storage.createQuoteRequest(validatedData);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      console.error("Error creating quote request:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: error.errors 
        });
      }
      res.status(500).json({ success: false, message: "Failed to submit quote request" });
    }
  });

  // Booking API
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const result = await storage.createBooking(validatedData);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      console.error("Error creating booking:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: error.errors 
        });
      }
      res.status(500).json({ success: false, message: "Failed to create booking" });
    }
  });

  // Exit Intent API
  app.post("/api/exit-intent", async (req, res) => {
    try {
      const validatedData = insertExitIntentClaimSchema.parse(req.body);
      const result = await storage.createExitIntentClaim(validatedData);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      console.error("Error creating exit intent claim:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: error.errors 
        });
      }
      res.status(500).json({ success: false, message: "Failed to submit exit intent claim" });
    }
  });

  // Get Emergency Requests (protected route in real implementation)
  app.get("/api/emergency-requests", async (req, res) => {
    try {
      const requests = await storage.getAllEmergencyRequests();
      res.status(200).json({ success: true, data: requests });
    } catch (error) {
      console.error("Error fetching emergency requests:", error);
      res.status(500).json({ success: false, message: "Failed to fetch emergency requests" });
    }
  });

  // Get Quote Requests (protected route in real implementation)
  app.get("/api/quote-requests", async (req, res) => {
    try {
      const requests = await storage.getAllQuoteRequests();
      res.status(200).json({ success: true, data: requests });
    } catch (error) {
      console.error("Error fetching quote requests:", error);
      res.status(500).json({ success: false, message: "Failed to fetch quote requests" });
    }
  });

  // Get Bookings (protected route in real implementation)
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.status(200).json({ success: true, data: bookings });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
  });

  // Set an emergency request as processed (protected route in real implementation)
  app.patch("/api/emergency-requests/:id/process", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
      }
      
      const result = await storage.markEmergencyRequestAsProcessed(id);
      if (!result) {
        return res.status(404).json({ success: false, message: "Emergency request not found" });
      }
      
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Error marking emergency request as processed:", error);
      res.status(500).json({ success: false, message: "Failed to update emergency request" });
    }
  });

  // Set a quote request as processed (protected route in real implementation)
  app.patch("/api/quote-requests/:id/process", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
      }
      
      const result = await storage.markQuoteRequestAsProcessed(id);
      if (!result) {
        return res.status(404).json({ success: false, message: "Quote request not found" });
      }
      
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Error marking quote request as processed:", error);
      res.status(500).json({ success: false, message: "Failed to update quote request" });
    }
  });

  // Confirm a booking (protected route in real implementation)
  app.patch("/api/bookings/:id/confirm", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
      }
      
      const result = await storage.confirmBooking(id);
      if (!result) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }
      
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Error confirming booking:", error);
      res.status(500).json({ success: false, message: "Failed to confirm booking" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
