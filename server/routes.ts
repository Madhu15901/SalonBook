import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertContactInquirySchema } from "@shared/schema";
import { z } from "zod";
import {
  sendAppointmentConfirmation,
  sendAppointmentNotificationToSalon,
  sendContactInquiryConfirmation,
  sendContactInquiryNotificationToSalon,
} from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Appointment routes
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      
      // Send confirmation emails
      await sendAppointmentConfirmation(
        appointment.email,
        appointment.name,
        appointment.service,
        appointment.date,
        appointment.time,
        appointment.id
      );
      
      await sendAppointmentNotificationToSalon(
        appointment.service,
        appointment.date,
        appointment.time,
        appointment.name,
        appointment.email,
        appointment.phone,
        appointment.id
      );
      
      res.json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid appointment data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create appointment" });
      }
    }
  });

  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  app.get("/api/appointments/:id", async (req, res) => {
    try {
      const appointment = await storage.getAppointmentById(req.params.id);
      if (!appointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointment" });
    }
  });

  app.patch("/api/appointments/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        res.status(400).json({ message: "Status is required" });
        return;
      }
      const appointment = await storage.updateAppointmentStatus(req.params.id, status);
      if (!appointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update appointment" });
    }
  });

  // Contact inquiry routes
  app.post("/api/contact", async (req, res) => {
    try {
      const inquiryData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(inquiryData);
      
      // Send confirmation emails
      await sendContactInquiryConfirmation(inquiry.email, inquiry.name);
      
      await sendContactInquiryNotificationToSalon(
        inquiry.name,
        inquiry.email,
        inquiry.phone,
        inquiry.message,
        inquiry.serviceInterest
      );
      
      res.json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact inquiry" });
      }
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact inquiries" });
    }
  });

  app.get("/api/contact/:id", async (req, res) => {
    try {
      const inquiry = await storage.getContactInquiryById(req.params.id);
      if (!inquiry) {
        res.status(404).json({ message: "Contact inquiry not found" });
        return;
      }
      res.json(inquiry);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact inquiry" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
