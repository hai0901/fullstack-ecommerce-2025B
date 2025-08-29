import TableOfContents from "~/components/table-of-contents";

const tocItems = [
  { id: "information-we-collect", title: "Information We Collect", level: 1 },
  { id: "personal-information", title: "Personal Information", level: 2 },
  { id: "automatically-collected", title: "Automatically Collected Information", level: 2 },
  { id: "payment-information", title: "Payment Information", level: 2 },
  { id: "how-we-use", title: "How We Use Your Information", level: 1 },
  { id: "information-sharing", title: "Information Sharing", level: 1 },
  { id: "third-party-services", title: "Third-Party Services", level: 1 },
  { id: "data-security", title: "Data Security", level: 1 },
  { id: "cookies-policy", title: "Cookies Policy", level: 1 },
  { id: "your-rights", title: "Your Rights", level: 1 },
  { id: "children-privacy", title: "Children's Privacy", level: 1 },
  { id: "international-transfers", title: "International Data Transfers", level: 1 },
  { id: "changes-policy", title: "Changes to This Policy", level: 1 },
  { id: "contact-us", title: "Contact Us", level: 1 },
];

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="max-w-4xl flex-1">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6">
            <section>
              <p className="text-muted-foreground leading-relaxed">
                Last updated: January 2025
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                NeoMall ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our 
                website or use our services.
              </p>
            </section>

            <section>
              <h2 id="information-we-collect" className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 id="personal-information" className="text-xl font-medium mb-2">Personal Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    We may collect personal information that you voluntarily provide to us, including:
                  </p>
                  <ul className="text-muted-foreground space-y-1 ml-6">
                    <li>• Name, email address, phone number, and shipping/billing addresses</li>
                    <li>• Account credentials, profile information, and preferences</li>
                    <li>• Order history, shopping cart contents, and wishlist items</li>
                    <li>• Product reviews, ratings, and feedback</li>
                    <li>• Communication preferences and marketing opt-ins</li>
                    <li>• Customer service interactions and support tickets</li>
                  </ul>
                </div>
                <div>
                  <h3 id="automatically-collected" className="text-xl font-medium mb-2">Automatically Collected Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    We automatically collect certain information when you visit our website:
                  </p>
                  <ul className="text-muted-foreground space-y-1 ml-6">
                    <li>• IP address, device type, and browser information</li>
                    <li>• Pages visited, time spent, and navigation patterns</li>
                    <li>• Search queries and product interactions</li>
                    <li>• Referring website information and traffic sources</li>
                    <li>• Cookies, web beacons, and similar tracking technologies</li>
                    <li>• Location data (with your consent)</li>
                  </ul>
                </div>
                <div>
                  <h3 id="payment-information" className="text-xl font-medium mb-2">Payment Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    For payment processing, we work with secure third-party payment processors:
                  </p>
                  <ul className="text-muted-foreground space-y-1 ml-6">
                    <li>• Credit card information is processed securely by our payment partners</li>
                    <li>• We do not store full credit card numbers on our servers</li>
                    <li>• Payment tokens and transaction IDs are stored for order processing</li>
                    <li>• Billing addresses are stored for tax and fraud prevention purposes</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 id="how-we-use" className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Providing and maintaining our services</li>
                <li>• Processing transactions and payments</li>
                <li>• Communicating with you about orders and services</li>
                <li>• Improving our website and user experience</li>
                <li>• Sending marketing communications (with your consent)</li>
                <li>• Preventing fraud and ensuring security</li>
                <li>• Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 id="information-sharing" className="text-2xl font-semibold mb-4">Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except in the following circumstances:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• With payment processors to complete transactions</li>
                <li>• With shipping partners to deliver your orders</li>
                <li>• With customer service providers to assist with support</li>
                <li>• With analytics providers to improve our services</li>
                <li>• To comply with legal requirements or court orders</li>
                <li>• To protect our rights, property, or safety</li>
                <li>• In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section>
              <h2 id="third-party-services" className="text-2xl font-semibold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our website integrates with various third-party services that may collect information:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Payment processors (Stripe, PayPal) for secure transactions</li>
                <li>• Shipping carriers (FedEx, UPS, DHL) for order delivery</li>
                <li>• Analytics services (Google Analytics) for website optimization</li>
                <li>• Social media platforms for sharing and authentication</li>
                <li>• Customer support tools for assistance and communication</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section>
              <h2 id="data-security" className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement comprehensive security measures to protect your personal information:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• SSL/TLS encryption for all data transmission</li>
                <li>• Secure payment processing with PCI DSS compliance</li>
                <li>• Regular security audits and vulnerability assessments</li>
                <li>• Access controls and authentication measures</li>
                <li>• Data backup and disaster recovery procedures</li>
                <li>• Employee training on data protection practices</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                However, no method of transmission over the internet is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 id="cookies-policy" className="text-2xl font-semibold mb-4">Cookies Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your shopping experience:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Required for basic website functionality, including shopping cart, user authentication, 
                    and security features.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Performance Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Help us understand how visitors interact with our website to improve performance and user experience.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Marketing Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Used to deliver personalized advertisements and track marketing campaign effectiveness.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can control cookie settings through your browser preferences, though disabling certain 
                cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h2 id="your-rights" className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Access and review your personal information and order history</li>
                <li>• Update or correct inaccurate account and shipping information</li>
                <li>• Request deletion of your account and associated data</li>
                <li>• Opt-out of marketing communications and promotional emails</li>
                <li>• Restrict or object to processing of your personal data</li>
                <li>• Data portability - receive your data in a structured format</li>
                <li>• Withdraw consent for data processing activities</li>
                <li>• Lodge a complaint with relevant data protection authorities</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 id="children-privacy" className="text-2xl font-semibold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for children under the age of 13. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe 
                your child has provided us with personal information, please contact us immediately. If we 
                become aware that we have collected personal information from a child under 13, we will 
                take steps to delete such information promptly.
              </p>
            </section>

            <section>
              <h2 id="international-transfers" className="text-2xl font-semibold mb-4">International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your personal information may be transferred to and processed in countries other than your 
                own. We ensure that such transfers comply with applicable data protection laws:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• We use standard contractual clauses approved by relevant authorities</li>
                <li>• We implement appropriate safeguards for data protection</li>
                <li>• We ensure our service providers maintain adequate security measures</li>
                <li>• We comply with local data protection regulations in all jurisdictions</li>
              </ul>
            </section>

            <section>
              <h2 id="changes-policy" className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or applicable laws. When we make changes:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• We will notify you of significant changes via email or website notice</li>
                <li>• The updated policy will be posted on our website with a new effective date</li>
                <li>• Your continued use of our services constitutes acceptance of the updated policy</li>
                <li>• We encourage you to review this policy periodically</li>
              </ul>
            </section>

            <section>
              <h2 id="contact-us" className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">NeoMall Privacy Team</p>
                <p className="text-muted-foreground">Email: privacy@neomall.com</p>
                <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
                <p className="text-muted-foreground">Address: 123 E-commerce St, Digital City, DC 12345</p>
                <p className="text-muted-foreground mt-2">Data Protection Officer: dpo@neomall.com</p>
              </div>
            </section>
          </div>
        </div>
        
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
}
