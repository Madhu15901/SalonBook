const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "Hair styling transformation",
    className: "h-64"
  },
  {
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
    alt: "Professional makeup result",
    className: "h-80"
  },
  {
    src: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    alt: "Nail art design",
    className: "h-48"
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "Facial treatment results",
    className: "h-64"
  },
  {
    src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
    alt: "Hair coloring transformation",
    className: "h-80"
  },
  {
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    alt: "Eyebrow shaping result",
    className: "h-48"
  },
  {
    src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "Bridal makeup and styling",
    className: "h-64"
  },
  {
    src: "https://images.unsplash.com/photo-1525904097878-94fb15835963?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    alt: "Luxury pedicure result",
    className: "h-48"
  }
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">Our Work Gallery</h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Discover the transformations and beautiful results achieved by our talented team of beauty professionals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-2xl">
              <img 
                src={image.src} 
                alt={image.alt} 
                className={`w-full ${image.className} object-cover group-hover:scale-110 transition-transform duration-300`} 
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
