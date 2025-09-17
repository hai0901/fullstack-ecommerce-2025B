/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

export default function About() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Neomall</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Neomall, we believe in creating a seamless, modern e-commerce experience that connects customers, 
                vendors, and shippers in a unified digital marketplace. Our platform empowers businesses to grow 
                while providing customers with access to a diverse range of products and services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to fostering innovation, supporting local businesses, and delivering exceptional 
                value to all our users through cutting-edge technology and customer-centric design.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2025, Neomall emerged from a vision to revolutionize the e-commerce landscape in Vietnam. 
                Our team of passionate developers and business professionals came together with a shared goal: 
                to create a platform that would bridge the gap between traditional retail and modern digital commerce.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Neomall serves as a comprehensive marketplace where customers can discover unique products, 
                vendors can showcase their offerings, and shippers can efficiently deliver goods across the region.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-3">For Customers</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Wide selection of products from verified vendors</li>
                    <li>• Secure payment processing</li>
                    <li>• Fast and reliable delivery options</li>
                    <li>• Customer reviews and ratings</li>
                    <li>• 24/7 customer support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3">For Vendors</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Easy product listing and management</li>
                    <li>• Analytics and sales insights</li>
                    <li>• Integrated inventory management</li>
                    <li>• Marketing tools and promotions</li>
                    <li>• Dedicated vendor support</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Innovation</h3>
                  <p className="text-muted-foreground text-sm">
                    We continuously evolve our platform with the latest technology to provide the best user experience.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Trust</h3>
                  <p className="text-muted-foreground text-sm">
                    Security and reliability are at the core of everything we do, ensuring safe transactions for all users.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Community</h3>
                  <p className="text-muted-foreground text-sm">
                    We foster a supportive ecosystem where businesses and customers can thrive together.
                  </p>
                </div>
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground leading-relaxed">
                Have questions about Neomall? We'd love to hear from you. Contact our team at{" "}
                <a href="mailto:support@neomall.com" className="text-primary hover:underline">
                  support@neomall.com
                </a>{" "}
                or visit our{" "}
                <a href="/help" className="text-primary hover:underline">
                  Help Center
                </a>{" "}
                for more information.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
