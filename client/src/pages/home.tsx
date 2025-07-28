import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import GallerySection from "@/components/gallery-section";
import AboutSection from "@/components/about-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import BookingModal from "@/components/booking-modal";
import Footer from "@/components/footer";
import { useState } from "react";

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openBookingModal = (service = "") => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService("");
  };

  return (
    <div className="min-h-screen">
      <Navigation onBookNow={() => openBookingModal()} />
      <HeroSection onBookNow={() => openBookingModal()} />
      <ServicesSection onBookService={openBookingModal} />
      <GallerySection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        selectedService={selectedService}
      />
    </div>
  );
}
