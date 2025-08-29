import TableOfContents from "~/components/table-of-contents";

const tocItems = [
  { id: "copyright-notice", title: "Copyright Notice", level: 1 },
  { id: "intellectual-property", title: "Intellectual Property Rights", level: 1 },
  { id: "platform-content", title: "Platform Content", level: 2 },
  { id: "user-generated-content", title: "User-Generated Content", level: 2 },
  { id: "permitted-use", title: "Permitted Use", level: 1 },
  { id: "restricted-activities", title: "Restricted Activities", level: 1 },
  { id: "third-party-content", title: "Third-Party Content", level: 1 },
  { id: "trademark-usage", title: "Trademark Usage", level: 1 },
  { id: "dmca-compliance", title: "DMCA Compliance", level: 1 },
  { id: "contact-information", title: "Contact Information", level: 1 },
];

export default function Copyright() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="max-w-4xl flex-1">
          <h1 className="text-3xl font-bold mb-6">Copyright Information</h1>
          
          <div className="space-y-6">
            <section>
              <h2 id="copyright-notice" className="text-2xl font-semibold mb-4">Copyright Notice</h2>
              <p className="text-muted-foreground leading-relaxed">
                © 2025 NeoMall. All rights reserved. This website and its content, including but not limited to 
                text, graphics, images, logos, and software, are the property of NeoMall and are protected by 
                copyright laws.
              </p>
            </section>

            <section>
              <h2 id="intellectual-property" className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All content on this website, including but not limited to:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Text, graphics, and images</li>
                <li>• Logos, trademarks, and service marks</li>
                <li>• Software, code, and applications</li>
                <li>• Product descriptions and specifications</li>
                <li>• User interface design and layout</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                are owned by NeoMall or its licensors and are protected by copyright, trademark, and other 
                intellectual property laws.
              </p>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 id="platform-content" className="text-xl font-medium mb-2">Platform Content</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    NeoMall owns and controls all platform-specific content, including:
                  </p>
                  <ul className="text-muted-foreground space-y-1 ml-6">
                    <li>• Website design, layout, and user interface elements</li>
                    <li>• Platform features, functionality, and algorithms</li>
                    <li>• Brand assets, logos, and marketing materials</li>
                    <li>• Terms of service, privacy policies, and legal documents</li>
                    <li>• Platform documentation and help resources</li>
                  </ul>
                </div>
                
                <div>
                  <h3 id="user-generated-content" className="text-xl font-medium mb-2">User-Generated Content</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Content created by users, including:
                  </p>
                  <ul className="text-muted-foreground space-y-1 ml-6">
                    <li>• Product reviews, ratings, and comments</li>
                    <li>• User profile information and preferences</li>
                    <li>• Forum posts, discussions, and community content</li>
                    <li>• Product listings and descriptions (vendor content)</li>
                    <li>• Customer support interactions and feedback</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    Users retain ownership of their content while granting NeoMall a license to use, 
                    display, and distribute it within our platform.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 id="permitted-use" className="text-2xl font-semibold mb-4">Permitted Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may use this website for the following purposes:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Browsing and purchasing products for personal use</li>
                <li>• Creating and managing your account and profile</li>
                <li>• Writing reviews and providing feedback on products</li>
                <li>• Participating in community discussions and forums</li>
                <li>• Accessing customer support and help resources</li>
                <li>• Sharing product links through social media (with proper attribution)</li>
              </ul>
            </section>

            <section>
              <h2 id="restricted-activities" className="text-2xl font-semibold mb-4">Restricted Activities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not use this website for the following activities:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Copying, reproducing, or distributing platform content without permission</li>
                <li>• Modifying, adapting, or creating derivative works of our software</li>
                <li>• Using our content for commercial purposes without authorization</li>
                <li>• Removing or altering copyright notices and branding</li>
                <li>• Reverse engineering or decompiling our software</li>
                <li>• Scraping or extracting data from our platform</li>
                <li>• Impersonating NeoMall or its representatives</li>
                <li>• Posting false, misleading, or fraudulent content</li>
                <li>• Violating intellectual property rights of others</li>
              </ul>
            </section>

            <section>
              <h2 id="third-party-content" className="text-2xl font-semibold mb-4">Third-Party Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Some content on this website may be owned by third parties, including:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Product images and descriptions provided by vendors and manufacturers</li>
                <li>• Brand logos and trademarks of product brands</li>
                <li>• User-generated content such as reviews and comments</li>
                <li>• Third-party software and integrations</li>
                <li>• Advertising content and promotional materials</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Such content is used with permission and remains the property of their respective owners. 
                We respect the intellectual property rights of all third parties.
              </p>
            </section>

            <section>
              <h2 id="trademark-usage" className="text-2xl font-semibold mb-4">Trademark Usage</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NeoMall trademarks, service marks, and trade names are protected by law. You may not use 
                our trademarks without our express written permission, except for:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Fair use in news reporting and commentary</li>
                <li>• Nominative use to refer to our products or services</li>
                <li>• Use in comparative advertising (subject to legal requirements)</li>
                <li>• Educational or non-commercial purposes (with proper attribution)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Any unauthorized use of our trademarks may result in legal action.
              </p>
            </section>

            <section>
              <h2 id="dmca-compliance" className="text-2xl font-semibold mb-4">DMCA Compliance</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NeoMall respects the intellectual property rights of others and complies with the Digital 
                Millennium Copyright Act (DMCA). If you believe that content on our platform infringes 
                your copyright, please submit a DMCA takedown notice containing:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• A description of the copyrighted work claimed to be infringed</li>
                <li>• Identification of the allegedly infringing material and its location</li>
                <li>• Your contact information and statement of good faith belief</li>
                <li>• A statement that the information is accurate and you are authorized to act</li>
                <li>• Your physical or electronic signature</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Send DMCA notices to: dmca@neomall.com
              </p>
            </section>

            <section>
              <h2 id="contact-information" className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about copyright or to request permission to use our content, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">NeoMall Copyright Department</p>
                <p className="text-muted-foreground">Email: copyright@neomall.com</p>
                <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
                <p className="text-muted-foreground">DMCA Notices: dmca@neomall.com</p>
                <p className="text-muted-foreground">Legal Department: legal@neomall.com</p>
              </div>
            </section>
          </div>
        </div>
        
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
}
