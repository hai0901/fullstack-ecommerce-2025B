import TableOfContents from "~/components/table-of-contents";

const tocItems = [
  { id: "frequently-asked-questions", title: "Frequently Asked Questions", level: 1 },
  { id: "contact-support", title: "Contact Support", level: 1 },
  { id: "customer-service", title: "Customer Service", level: 2 },
  { id: "technical-support", title: "Technical Support", level: 2 },
  { id: "quick-links", title: "Quick Links", level: 1 },
  { id: "live-chat", title: "Live Chat", level: 1 },
];

export default function Help() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="max-w-4xl flex-1">
          <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
          
          <div className="space-y-8">
            <section>
              <h2 id="frequently-asked-questions" className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">How do I create an account?</h3>
                  <p className="text-muted-foreground">
                    Click the "Sign Up" button in the top navigation bar. Fill in your details including 
                    name, email, and password. Verify your email address to complete the registration.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">How do I place an order?</h3>
                  <p className="text-muted-foreground">
                    Browse our products, add items to your cart, and proceed to checkout. Enter your 
                    shipping and payment information to complete your purchase.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept major credit cards (Visa, MasterCard, American Express), PayPal, and 
                    digital wallets like Apple Pay and Google Pay.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">How long does shipping take?</h3>
                  <p className="text-muted-foreground">
                    Standard shipping typically takes 3-5 business days. Express shipping (1-2 business days) 
                    is available for an additional fee. International shipping times vary by location.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">What is your return policy?</h3>
                  <p className="text-muted-foreground">
                    We offer a 30-day return policy for most items. Products must be unused and in original 
                    packaging. Some items may have different return conditions.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 id="contact-support" className="text-2xl font-semibold mb-4">Contact Support</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h3 id="customer-service" className="text-lg font-medium mb-2">Customer Service</h3>
                  <p className="text-muted-foreground mb-3">
                    Our customer service team is available to help with orders, returns, and general inquiries.
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm"><strong>Email:</strong> support@neomall.com</p>
                    <p className="text-sm"><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p className="text-sm"><strong>Hours:</strong> Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 id="technical-support" className="text-lg font-medium mb-2">Technical Support</h3>
                  <p className="text-muted-foreground mb-3">
                    Need help with website functionality or technical issues?
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm"><strong>Email:</strong> tech@neomall.com</p>
                    <p className="text-sm"><strong>Phone:</strong> +1 (555) 123-4568</p>
                    <p className="text-sm"><strong>Hours:</strong> 24/7</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 id="quick-links" className="text-2xl font-semibold mb-4">Quick Links</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/about" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-medium mb-2">About Us</h3>
                  <p className="text-sm text-muted-foreground">Learn more about NeoMall</p>
                </a>
                <a href="/privacy" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-medium mb-2">Privacy Policy</h3>
                  <p className="text-sm text-muted-foreground">How we protect your data</p>
                </a>
                <a href="/copyright" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-medium mb-2">Copyright</h3>
                  <p className="text-sm text-muted-foreground">Intellectual property information</p>
                </a>
              </div>
            </section>

            <section>
              <h2 id="live-chat" className="text-2xl font-semibold mb-4">Live Chat</h2>
              <div className="p-4 border rounded-lg bg-muted">
                <p className="text-muted-foreground mb-4">
                  Need immediate assistance? Our live chat feature is available during business hours 
                  for real-time support.
                </p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                  Start Live Chat
                </button>
              </div>
            </section>
          </div>
        </div>
        
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
}
