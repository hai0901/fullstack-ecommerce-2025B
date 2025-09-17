/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

export default function Privacy() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <p className="text-muted-foreground leading-relaxed">
                <strong>Last Updated:</strong> January 2025
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                At Neomall, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-3">Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, make a purchase, 
                or contact us for support. This may include:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-6">
                <li>• Name, email address, and phone number</li>
                <li>• Billing and shipping addresses</li>
                <li>• Payment information (processed securely through third-party providers)</li>
                <li>• Profile pictures and account preferences</li>
                <li>• Communication preferences and support requests</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Usage Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We automatically collect certain information about your use of our platform, including:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-6">
                <li>• Device information (IP address, browser type, operating system)</li>
                <li>• Usage patterns and preferences</li>
                <li>• Pages visited and time spent on our platform</li>
                <li>• Search queries and product interactions</li>
                <li>• Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Third-Party Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may receive information about you from third parties, such as social media platforms when you 
                choose to connect your accounts, or from vendors and shippers who use our platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• Provide, maintain, and improve our services</li>
                <li>• Process transactions and send related information</li>
                <li>• Send technical notices, updates, and support messages</li>
                <li>• Respond to your comments, questions, and requests</li>
                <li>• Communicate about products, services, and promotional offers</li>
                <li>• Monitor and analyze trends and usage</li>
                <li>• Detect, investigate, and prevent fraudulent transactions</li>
                <li>• Comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except in the following circumstances:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• <strong>Service Providers:</strong> We share information with trusted third parties who assist us in operating our platform</li>
                <li>• <strong>Business Transfers:</strong> Information may be transferred in connection with mergers, acquisitions, or asset sales</li>
                <li>• <strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
                <li>• <strong>Consent:</strong> We may share information with your explicit consent</li>
                <li>• <strong>Vendors and Shippers:</strong> Limited information may be shared to facilitate transactions</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• Encryption of sensitive data in transit and at rest</li>
                <li>• Regular security assessments and updates</li>
                <li>• Access controls and authentication mechanisms</li>
                <li>• Employee training on data protection practices</li>
                <li>• Incident response procedures</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive 
                to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have certain rights regarding your personal information:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• <strong>Access:</strong> Request access to your personal information</li>
                <li>• <strong>Correction:</strong> Request correction of inaccurate information</li>
                <li>• <strong>Deletion:</strong> Request deletion of your personal information</li>
                <li>• <strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li>• <strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li>• <strong>Restriction:</strong> Request restriction of processing</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies are 
                small data files stored on your device that help us:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• Remember your preferences and settings</li>
                <li>• Analyze how you use our platform</li>
                <li>• Provide personalized content and advertisements</li>
                <li>• Improve our services and user experience</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You can control cookies through your browser settings, but disabling cookies may affect the functionality 
                of our platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer 
                need your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. 
                We ensure that such transfers comply with applicable data protection laws and implement appropriate 
                safeguards to protect your information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform is not intended for children under 13 years of age. We do not knowingly collect personal 
                information from children under 13. If we become aware that we have collected personal information 
                from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this 
                Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:{" "}
                <a href="mailto:privacy@neomall.com" className="text-primary hover:underline">
                  privacy@neomall.com
                </a>
              </p>
              <p className="text-muted-foreground text-sm mt-4">
                Neomall Privacy Team<br />
                Email: privacy@neomall.com<br />
                Phone: +84 (0) 123 456 789<br />
                Address: 123 Business District, Ho Chi Minh City, Vietnam
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
