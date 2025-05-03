import { 
  users, 
  type User, 
  type InsertUser,
  emergencyRequests,
  type EmergencyRequest,
  type InsertEmergencyRequest,
  quoteRequests,
  type QuoteRequest,
  type InsertQuoteRequest,
  bookings,
  type Booking,
  type InsertBooking,
  exitIntentClaims,
  type ExitIntentClaim,
  type InsertExitIntentClaim
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Emergency request operations
  createEmergencyRequest(request: InsertEmergencyRequest): Promise<EmergencyRequest>;
  getEmergencyRequest(id: number): Promise<EmergencyRequest | undefined>;
  getAllEmergencyRequests(): Promise<EmergencyRequest[]>;
  markEmergencyRequestAsProcessed(id: number): Promise<EmergencyRequest | undefined>;
  
  // Quote request operations
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequest(id: number): Promise<QuoteRequest | undefined>;
  getAllQuoteRequests(): Promise<QuoteRequest[]>;
  markQuoteRequestAsProcessed(id: number): Promise<QuoteRequest | undefined>;
  
  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: number): Promise<Booking | undefined>;
  getAllBookings(): Promise<Booking[]>;
  confirmBooking(id: number): Promise<Booking | undefined>;
  
  // Exit intent claim operations
  createExitIntentClaim(claim: InsertExitIntentClaim): Promise<ExitIntentClaim>;
  getExitIntentClaim(id: number): Promise<ExitIntentClaim | undefined>;
  getAllExitIntentClaims(): Promise<ExitIntentClaim[]>;
  markExitIntentClaimAsProcessed(id: number): Promise<ExitIntentClaim | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private emergencyRequests: Map<number, EmergencyRequest>;
  private quoteRequests: Map<number, QuoteRequest>;
  private bookings: Map<number, Booking>;
  private exitIntentClaims: Map<number, ExitIntentClaim>;
  private currentUserId: number;
  private currentEmergencyRequestId: number;
  private currentQuoteRequestId: number;
  private currentBookingId: number;
  private currentExitIntentClaimId: number;

  constructor() {
    this.users = new Map();
    this.emergencyRequests = new Map();
    this.quoteRequests = new Map();
    this.bookings = new Map();
    this.exitIntentClaims = new Map();
    this.currentUserId = 1;
    this.currentEmergencyRequestId = 1;
    this.currentQuoteRequestId = 1;
    this.currentBookingId = 1;
    this.currentExitIntentClaimId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Emergency request operations
  async createEmergencyRequest(insertRequest: InsertEmergencyRequest): Promise<EmergencyRequest> {
    const id = this.currentEmergencyRequestId++;
    const now = new Date();
    const request: EmergencyRequest = { 
      ...insertRequest, 
      id, 
      processed: false,
      createdAt: now 
    };
    this.emergencyRequests.set(id, request);
    return request;
  }

  async getEmergencyRequest(id: number): Promise<EmergencyRequest | undefined> {
    return this.emergencyRequests.get(id);
  }

  async getAllEmergencyRequests(): Promise<EmergencyRequest[]> {
    return Array.from(this.emergencyRequests.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async markEmergencyRequestAsProcessed(id: number): Promise<EmergencyRequest | undefined> {
    const request = this.emergencyRequests.get(id);
    if (!request) return undefined;
    
    const updatedRequest: EmergencyRequest = { ...request, processed: true };
    this.emergencyRequests.set(id, updatedRequest);
    return updatedRequest;
  }

  // Quote request operations
  async createQuoteRequest(insertRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.currentQuoteRequestId++;
    const now = new Date();
    const request: QuoteRequest = { 
      ...insertRequest, 
      id, 
      processed: false,
      createdAt: now 
    };
    this.quoteRequests.set(id, request);
    return request;
  }

  async getQuoteRequest(id: number): Promise<QuoteRequest | undefined> {
    return this.quoteRequests.get(id);
  }

  async getAllQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async markQuoteRequestAsProcessed(id: number): Promise<QuoteRequest | undefined> {
    const request = this.quoteRequests.get(id);
    if (!request) return undefined;
    
    const updatedRequest: QuoteRequest = { ...request, processed: true };
    this.quoteRequests.set(id, updatedRequest);
    return updatedRequest;
  }

  // Booking operations
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const now = new Date();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      confirmed: false,
      createdAt: now 
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async confirmBooking(id: number): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking: Booking = { ...booking, confirmed: true };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Exit intent claim operations
  async createExitIntentClaim(insertClaim: InsertExitIntentClaim): Promise<ExitIntentClaim> {
    const id = this.currentExitIntentClaimId++;
    const now = new Date();
    const claim: ExitIntentClaim = { 
      ...insertClaim, 
      id, 
      processed: false,
      createdAt: now 
    };
    this.exitIntentClaims.set(id, claim);
    return claim;
  }

  async getExitIntentClaim(id: number): Promise<ExitIntentClaim | undefined> {
    return this.exitIntentClaims.get(id);
  }

  async getAllExitIntentClaims(): Promise<ExitIntentClaim[]> {
    return Array.from(this.exitIntentClaims.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async markExitIntentClaimAsProcessed(id: number): Promise<ExitIntentClaim | undefined> {
    const claim = this.exitIntentClaims.get(id);
    if (!claim) return undefined;
    
    const updatedClaim: ExitIntentClaim = { ...claim, processed: true };
    this.exitIntentClaims.set(id, updatedClaim);
    return updatedClaim;
  }
}

// Export an instance of the storage
export const storage = new MemStorage();
