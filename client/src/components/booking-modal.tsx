import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertAppointment } from "@shared/schema";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

const services = [
  { id: "hair-styling", name: "Hair Styling", price: "$85-$150" },
  { id: "facial", name: "Facial Treatments", price: "$75-$120" },
  { id: "nail-care", name: "Nail Care", price: "$45-$80" },
  { id: "makeup", name: "Makeup Services", price: "$60-$100" },
  { id: "massage", name: "Massage Therapy", price: "$90-$140" },
  { id: "eyebrow", name: "Eyebrow Services", price: "$35-$200" }
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", 
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

export default function BookingModal({ isOpen, onClose, selectedService }: BookingModalProps) {
  const { toast } = useToast();
  const [selectedTime, setSelectedTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  useEffect(() => {
    if (!isOpen) {
      setShowConfirmation(false);
      setSelectedTime("");
      setFormData({
        service: "",
        date: "",
        time: "",
        name: "",
        email: "",
        phone: "",
        notes: ""
      });
    }
  }, [isOpen]);

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      const response = await apiRequest("POST", "/api/appointments", data);
      return response.json();
    },
    onSuccess: () => {
      setShowConfirmation(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    },
    onError: () => {
      toast({
        title: "Booking failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      toast({
        title: "Please select a time slot",
        description: "Choose your preferred appointment time.",
        variant: "destructive",
      });
      return;
    }
    
    const bookingData = { ...formData, time: selectedTime };
    bookingMutation.mutate(bookingData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (showConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Appointment Booked!</h3>
            <p className="text-foreground/70">
              We've sent a confirmation email with all the details. See you soon!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif font-bold text-foreground">Book Your Appointment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="booking-service">Select Service *</Label>
              <Select 
                value={formData.service} 
                onValueChange={(value) => handleInputChange("service", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} ({service.price})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="booking-date">Preferred Date *</Label>
              <Input 
                id="booking-date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                min={getMinDate()}
                required
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-foreground mb-3">Preferred Time *</Label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => handleTimeSlotClick(time)}
                  className={`py-2 px-3 rounded-lg text-center transition-colors ${
                    selectedTime === time 
                      ? "bg-primary text-white border-primary" 
                      : "border-input hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="booking-name">Full Name *</Label>
              <Input 
                id="booking-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your full name"
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="booking-email">Email Address *</Label>
              <Input 
                id="booking-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                required
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="booking-phone">Phone Number *</Label>
            <Input 
              id="booking-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="booking-notes">Special Requests or Notes</Label>
            <Textarea 
              id="booking-notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any specific requirements or preferences..."
              rows={3}
              className="mt-2 resize-none"
            />
          </div>

          <div className="flex space-x-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={bookingMutation.isPending}
              className="flex-1 bg-primary text-white hover:bg-primary/90"
            >
              {bookingMutation.isPending ? "Booking..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
