export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">About NeoMall</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            NeoMall is a modern e-commerce platform designed to provide a seamless shopping experience 
            for customers while offering powerful tools for vendors and administrators. We strive to 
            create a marketplace that connects buyers with quality products and reliable sellers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-2">For Customers</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Wide selection of products across multiple categories</li>
                <li>• Secure payment processing</li>
                <li>• Fast and reliable shipping</li>
                <li>• Customer reviews and ratings</li>
                <li>• 24/7 customer support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">For Vendors</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Easy product management</li>
                <li>• Real-time inventory tracking</li>
                <li>• Analytics and reporting</li>
                <li>• Secure payment processing</li>
                <li>• Marketing tools and promotions</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Quality</h3>
              <p className="text-sm text-muted-foreground">We maintain high standards for all products and services</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Trust</h3>
              <p className="text-sm text-muted-foreground">Building lasting relationships through transparency and reliability</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">Continuously improving our platform with cutting-edge technology</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
