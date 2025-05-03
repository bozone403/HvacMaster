import { pgTable, text, serial, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Customer model for storing contact information
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  location: text("location"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Emergency request model
export const emergencyRequests = pgTable("emergency_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  issue: text("issue").notNull(),
  status: text("status").notNull().default("pending"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Quote request model
export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  service_type: text("service_type").notNull(),
  home_size: text("home_size").notNull(),
  system_efficiency: text("system_efficiency").notNull(),
  property_type: text("property_type").notNull(),
  additional_details: text("additional_details"),
  customer_name: text("customer_name").notNull(),
  customer_phone: text("customer_phone").notNull(),
  estimated_price: text("estimated_price"),
  status: text("status").notNull().default("new"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  is_emergency: boolean("is_emergency").default(false),
  status: text("status").notNull().default("new"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertCustomerSchema = createInsertSchema(customers).omit({ 
  id: true,
  created_at: true
});

export const insertEmergencyRequestSchema = createInsertSchema(emergencyRequests).omit({ 
  id: true,
  status: true,
  created_at: true
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({ 
  id: true,
  estimated_price: true,
  status: true,
  created_at: true
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({ 
  id: true,
  status: true,
  created_at: true
});

// Types
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type Customer = typeof customers.$inferSelect;

export type InsertEmergencyRequest = z.infer<typeof insertEmergencyRequestSchema>;
export type EmergencyRequest = typeof emergencyRequests.$inferSelect;

export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Add the User as well (keeping the original so existing code works)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
