import { type Appointment, type InsertAppointment, type ContactInquiry, type InsertContactInquiry } from "@shared/schema";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
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
      notes: insertAppointment.notes || null,
    };

    // Save appointment
    this.appointments.set(id, appointment);

    // Send email
    try {
      const senderEmail = "madhu15901ps@gmail.com";
      const senderPassword = "lyyvbriedegkfixf";
      const receiverEmail = "madhusaravps@gmail.com"; // Salon inbox

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: senderEmail,
          pass: senderPassword,
        },
      });

      const { name, email, phone, service, date, time } = insertAppointment;

      // Email to salon
      await transporter.sendMail({
        from: senderEmail,
        to: receiverEmail,
        subject: `New Appointment from ${name}`,
        text: `
New Appointment Received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Date: ${date}
Time: ${time}
        `,
      });

      // Email to customer with HTML
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
          <h2 style="color: #d62828;">King Professional Salon</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Your appointment has been <strong style="color: green;">confirmed</strong>!</p>
          <div style="border: 1px solid #ddd; padding: 15px; margin-top: 10px; border-radius: 6px;">
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          <p style="margin-top: 20px;">Thank you for choosing <strong>King Professional Salon</strong> 🧖‍♀️</p>
          <hr/>
          <p style="font-size: 12px; color: gray;">This is an automated confirmation. Please contact us if anything needs to be changed.</p>
        </div>
      `;

      await transporter.sendMail({
        from: senderEmail,
        to: email,
        subject: "Your Appointment is Confirmed – King Professional Salon",
        html: htmlContent,
      });

      console.log(`📧 Emails sent for appointment ${id}`);
    } catch (error) {
      console.error("❌ Error sending appointment emails:", error);
    }

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
      phone: insertInquiry.phone || null,
      serviceInterest: insertInquiry.serviceInterest || null,
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
