import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onBookNow: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                Discover Your 
                <span className="text-primary"> Natural Beauty</span>
              </h1>
              <p className="text-xl text-foreground/80 leading-relaxed max-w-xl">
                Experience luxury beauty treatments in our serene salon environment. Professional stylists, premium products, and personalized care await you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onBookNow}
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
              >
                Book Appointment
              </Button>
              <Button 
                variant="outline"
                onClick={scrollToServices}
                className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-colors"
              >
                View Services
              </Button>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-foreground/70">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2000+</div>
                <div className="text-sm text-foreground/70">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9</div>
                <div className="text-sm text-foreground/70">Rating</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000" 
              alt="Luxurious salon interior" 
              className="rounded-3xl shadow-2xl w-full h-auto object-cover" 
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl booking-float">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Next Available</div>
                  <div className="text-sm text-foreground/70">Today 2:30 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
