const testimonials = [
  {
    rating: 5,
    content: "Absolutely incredible experience! The staff is so professional and the results exceeded my expectations. I'll definitely be coming back for all my beauty needs.",
    client: {
      name: "Sarah Johnson",
      service: "Hair Styling Client",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60"
    },
    date: "2 weeks ago"
  },
  {
    rating: 5,
    content: "The facial treatment was amazing! My skin has never looked better. The relaxing atmosphere and professional service made it a perfect experience.",
    client: {
      name: "Emily Davis",
      service: "Facial Treatment Client",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60"
    },
    date: "1 month ago"
  },
  {
    rating: 5,
    content: "Perfect for my wedding day! The makeup and hair styling were flawless. The team went above and beyond to make me feel beautiful and confident.",
    client: {
      name: "Jessica Williams",
      service: "Bridal Package Client",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60"
    },
    date: "3 weeks ago"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">What Our Clients Say</h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Read testimonials from our satisfied clients who have experienced our exceptional beauty services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="text-2xl text-primary mr-2">
                  {"★".repeat(testimonial.rating)}
                </div>
                <div className="text-sm text-foreground/60">{testimonial.date}</div>
              </div>
              <p className="text-foreground/80 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.client.image} 
                  alt={testimonial.client.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.client.name}</div>
                  <div className="text-sm text-foreground/60">{testimonial.client.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
