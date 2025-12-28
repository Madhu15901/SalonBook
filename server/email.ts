import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: parseInt(process.env.SMTP_PORT || "587") === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendAppointmentConfirmation(
  customerEmail: string,
  customerName: string,
  service: string,
  date: string,
  time: string,
  appointmentId: string
) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: customerEmail,
      subject: "Appointment Confirmation - King Professional Salon",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b7355;">Thank you for your booking, ${customerName}!</h2>
          <p>Your appointment has been confirmed with King Professional Salon.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Appointment Details</h3>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Confirmation #:</strong> ${appointmentId}</p>
          </div>
          
          <p>We look forward to seeing you soon. If you need to reschedule or have any questions, please contact us at hello@kingprofessional.com</p>
          
          <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #666;">
            <p>King Professional Salon<br>
            Making beauty a lifestyle</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send appointment confirmation email:", error);
  }
}

export async function sendAppointmentNotificationToSalon(
  service: string,
  date: string,
  time: string,
  customerName: string,
  customerEmail: string,
  customerPhone: string | null,
  appointmentId: string
) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_FROM_EMAIL,
      subject: "New Appointment Booking - King Professional Salon",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b7355;">New Appointment Booking</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Phone:</strong> ${customerPhone || "Not provided"}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Appointment Details</h3>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Appointment ID:</strong> ${appointmentId}</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send appointment notification to salon:", error);
  }
}

export async function sendContactInquiryConfirmation(
  customerEmail: string,
  customerName: string
) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: customerEmail,
      subject: "We received your inquiry - King Professional Salon",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b7355;">Thank you for reaching out, ${customerName}!</h2>
          <p>We've received your inquiry and will get back to you as soon as possible. Our team typically responds within 24 hours.</p>
          
          <p>In the meantime, feel free to call us or visit our salon for more information about our services.</p>
          
          <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #666;">
            <p>King Professional Salon<br>
            hello@kingprofessional.com<br>
            Making beauty a lifestyle</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact inquiry confirmation email:", error);
  }
}

export async function sendContactInquiryNotificationToSalon(
  customerName: string,
  customerEmail: string,
  customerPhone: string | null,
  message: string,
  serviceInterest: string | null
) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_FROM_EMAIL,
      subject: "New Contact Inquiry - King Professional Salon",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b7355;">New Contact Inquiry</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Phone:</strong> ${customerPhone || "Not provided"}</p>
            <p><strong>Service Interest:</strong> ${serviceInterest || "Not specified"}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message</h3>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact inquiry notification to salon:", error);
  }
}
