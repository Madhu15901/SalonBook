import { type Appointment, type InsertAppointment, type ContactInquiry, type InsertContactInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Appointments
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  getAppointmentById(id: string): Promise<Appointment | undefined>;
  updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined>;

  // Contact Inquiries
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;
  getContactInquiryById(id: string): Promise<ContactInquiry | undefined>;
}

export class MemStorage implements IStorage {
  private appointments: Map<string, Appointment>;
  private contactInquiries: Map<string, ContactInquiry>;

  constructor() {
    this.appointments = new Map();
    this.contactInquiries = new Map();
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = {
      ...insertAppointment,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getAppointmentById(id: string): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (appointment) {
      const updated = { ...appointment, status };
      this.appointments.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = randomUUID();
    const inquiry: ContactInquiry = {
      ...insertInquiry,
      id,
      status: "new",
      createdAt: new Date(),
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values());
  }

  async getContactInquiryById(id: string): Promise<ContactInquiry | undefined> {
    return this.contactInquiries.get(id);
  }
}

export const storage = new MemStorage();
