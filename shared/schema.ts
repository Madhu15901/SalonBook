import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  service: text("service").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceInterest: text("service_interest"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
