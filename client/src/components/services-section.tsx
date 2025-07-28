import { Button } from "@/components/ui/button";

interface ServicesSectionProps {
  onBookService: (service: string) => void;
}

const services = [
  {
    id: "hair-styling",
    title: "Hair Styling",
    description: "Professional cuts, colors, and treatments using premium products. From classic styles to modern trends.",
    price: "$85 - $150",
    duration: "60-90 min",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: "facial",
    title: "Facial Treatments",
    description: "Rejuvenating facial treatments customized for your skin type. Deep cleansing, hydration, and anti-aging.",
    price: "$75 - $120",
    duration: "45-75 min",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: "nail-care",
    title: "Nail Care",
    description: "Complete manicure and pedicure services with premium polishes and nail art options for perfect nails.",
    price: "$45 - $80",
    duration: "30-60 min",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: "makeup",
    title: "Makeup Services",
    description: "Professional makeup application for special events, photoshoots, or everyday glam using premium cosmetics.",
    price: "$60 - $100",
    duration: "45-75 min",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: "massage",
    title: "Massage Therapy",
    description: "Therapeutic and relaxation massages to relieve stress, tension, and promote overall wellness and rejuvenation.",
    price: "$90 - $140",
    duration: "60-90 min",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: "eyebrow",
    title: "Eyebrow Services",
    description: "Professional eyebrow shaping, tinting, and microblading services to perfectly frame your face and enhance your features.",
    price: "$35 - $200",
    duration: "30-120 min",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  }
];

export default function ServicesSection({ onBookService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">Our Premium Services</h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            From cutting-edge hair styling to rejuvenating skincare treatments, we offer comprehensive beauty solutions tailored to your unique needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-3xl p-8 shadow-lg service-card">
              <div className="mb-6">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-48 object-cover rounded-2xl" 
                />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-foreground/70 mb-4">{service.description}</p>
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-primary">{service.price}</span>
                <span className="text-sm text-foreground/60">{service.duration}</span>
              </div>
              <Button 
                onClick={() => onBookService(service.id)}
                className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Book Service
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
