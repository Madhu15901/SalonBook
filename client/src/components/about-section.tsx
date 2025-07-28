import { CheckCircle, Heart, Clock } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">About <span className="font-script">Luxura</span> Salon</h2>
              <p className="text-xl text-foreground/80 leading-relaxed">
                With over 15 years of experience in the beauty industry, Luxura Salon has established itself as a premier destination for luxury beauty treatments and personalized care.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Expert Professionals</h3>
                  <p className="text-foreground/70">Our certified stylists and therapists bring years of experience and continuous training in the latest techniques.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Premium Products</h3>
                  <p className="text-foreground/70">We use only the finest professional-grade products from renowned brands to ensure exceptional results.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Personalized Care</h3>
                  <p className="text-foreground/70">Every treatment is customized to your unique needs, preferences, and lifestyle for optimal results.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-8 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">25+</div>
                <div className="text-sm text-foreground/70">Awards Won</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-sm text-foreground/70">Expert Stylists</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-foreground/70">Client Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000" 
              alt="Professional salon team" 
              className="rounded-3xl shadow-2xl w-full h-auto object-cover" 
            />
            
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9★</div>
                <div className="text-sm text-foreground/70">Average Rating</div>
                <div className="text-xs text-foreground/60 mt-1">Based on 500+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
