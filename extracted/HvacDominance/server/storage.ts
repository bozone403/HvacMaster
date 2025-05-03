import { 
  users, type User, type InsertUser, 
  type InsertEmergencyRequest, type EmergencyRequest,
  type InsertQuoteRequest, type QuoteRequest,
  type InsertContactSubmission, type ContactSubmission,
  type Customer, type InsertCustomer
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Customer methods
  getCustomer(id: number): Promise<Customer | undefined>;
  getCustomerByPhone(phone: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  
  // Emergency requests
  createEmergencyRequest(request: InsertEmergencyRequest): Promise<EmergencyRequest>;
  getEmergencyRequest(id: number): Promise<EmergencyRequest | undefined>;
  getAllEmergencyRequests(): Promise<EmergencyRequest[]>;
  updateEmergencyRequestStatus(id: number, status: string): Promise<EmergencyRequest>;
  
  // Quote requests
  createQuoteRequest(request: Omit<InsertQuoteRequest, 'estimated_price'> & { estimated_price: string }): Promise<QuoteRequest>;
  getQuoteRequest(id: number): Promise<QuoteRequest | undefined>;
  getAllQuoteRequests(): Promise<QuoteRequest[]>;
  updateQuoteRequestStatus(id: number, status: string): Promise<QuoteRequest>;
  
  // Contact form submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmissionStatus(id: number, status: string): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private customers: Map<number, Customer>;
  private emergencyRequests: Map<number, EmergencyRequest>;
  private quoteRequests: Map<number, QuoteRequest>;
  private contactSubmissions: Map<number, ContactSubmission>;
  
  private userId: number;
  private customerId: number;
  private emergencyRequestId: number;
  private quoteRequestId: number;
  private contactSubmissionId: number;

  constructor() {
    this.users = new Map();
    this.customers = new Map();
    this.emergencyRequests = new Map();
    this.quoteRequests = new Map();
    this.contactSubmissions = new Map();
    
    this.userId = 1;
    this.customerId = 1;
    this.emergencyRequestId = 1;
    this.quoteRequestId = 1;
    this.contactSubmissionId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Customer methods
  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }
  
  async getCustomerByPhone(phone: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(
      (customer) => customer.phone === phone,
    );
  }
  
  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.customerId++;
    const created_at = new Date();
    const customer: Customer = { ...insertCustomer, id, created_at };
    this.customers.set(id, customer);
    return customer;
  }
  
  // Emergency request methods
  async createEmergencyRequest(request: InsertEmergencyRequest): Promise<EmergencyRequest> {
    const id = this.emergencyRequestId++;
    const created_at = new Date();
    const status = "pending";
    
    const emergencyRequest: EmergencyRequest = { 
      ...request, 
      id, 
      status, 
      created_at 
    };
    
    this.emergencyRequests.set(id, emergencyRequest);
    return emergencyRequest;
  }
  
  async getEmergencyRequest(id: number): Promise<EmergencyRequest | undefined> {
    return this.emergencyRequests.get(id);
  }
  
  async getAllEmergencyRequests(): Promise<EmergencyRequest[]> {
    return Array.from(this.emergencyRequests.values()).sort((a, b) => 
      b.created_at.getTime() - a.created_at.getTime()
    );
  }
  
  async updateEmergencyRequestStatus(id: number, status: string): Promise<EmergencyRequest> {
    const request = await this.getEmergencyRequest(id);
    if (!request) {
      throw new Error(`Emergency request with ID ${id} not found`);
    }
    
    const updatedRequest = { ...request, status };
    this.emergencyRequests.set(id, updatedRequest);
    return updatedRequest;
  }
  
  // Quote request methods
  async createQuoteRequest(request: Omit<InsertQuoteRequest, 'estimated_price'> & { estimated_price: string }): Promise<QuoteRequest> {
    const id = this.quoteRequestId++;
    const created_at = new Date();
    const status = "new";
    
    const quoteRequest: QuoteRequest = { 
      ...request, 
      id, 
      status, 
      created_at 
    };
    
    this.quoteRequests.set(id, quoteRequest);
    return quoteRequest;
  }
  
  async getQuoteRequest(id: number): Promise<QuoteRequest | undefined> {
    return this.quoteRequests.get(id);
  }
  
  async getAllQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values()).sort((a, b) => 
      b.created_at.getTime() - a.created_at.getTime()
    );
  }
  
  async updateQuoteRequestStatus(id: number, status: string): Promise<QuoteRequest> {
    const request = await this.getQuoteRequest(id);
    if (!request) {
      throw new Error(`Quote request with ID ${id} not found`);
    }
    
    const updatedRequest = { ...request, status };
    this.quoteRequests.set(id, updatedRequest);
    return updatedRequest;
  }
  
  // Contact form methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactSubmissionId++;
    const created_at = new Date();
    const status = "new";
    
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      status, 
      created_at 
    };
    
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
  
  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => 
      b.created_at.getTime() - a.created_at.getTime()
    );
  }
  
  async updateContactSubmissionStatus(id: number, status: string): Promise<ContactSubmission> {
    const submission = await this.getContactSubmission(id);
    if (!submission) {
      throw new Error(`Contact submission with ID ${id} not found`);
    }
    
    const updatedSubmission = { ...submission, status };
    this.contactSubmissions.set(id, updatedSubmission);
    return updatedSubmission;
  }
}

export const storage = new MemStorage();
