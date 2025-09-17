/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

export default function Copyright() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Copyright Notice</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <p className="text-muted-foreground leading-relaxed">
                <strong>Last Updated:</strong> January 2025
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Copyright Ownership</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All content, materials, and intellectual property on Neomall, including but not limited to text, 
                graphics, logos, images, audio clips, video clips, digital downloads, data compilations, and software, 
                are the property of Neomall or its content suppliers and are protected by international copyright laws.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The compilation of all content on this site is the exclusive property of Neomall and is protected 
                by copyright laws. All software used on this site is the property of Neomall or its software suppliers 
                and is protected by copyright laws.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Permitted Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may use the content on Neomall for personal, non-commercial purposes only. You may not:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• Reproduce, distribute, or display any content without written permission</li>
                <li>• Modify, adapt, or create derivative works from our content</li>
                <li>• Use our content for commercial purposes without authorization</li>
                <li>• Remove or alter any copyright, trademark, or other proprietary notices</li>
                <li>• Reverse engineer, decompile, or disassemble any software</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">User-Generated Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you upload, post, or submit content to Neomall (including product listings, reviews, comments, 
                or images), you retain ownership of your content. However, by submitting content, you grant Neomall 
                a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, adapt, publish, translate, 
                create derivative works from, distribute, and display such content.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for ensuring that your content does not infringe upon the rights of third parties, 
                including copyright, trademark, privacy, or other proprietary rights.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Third-Party Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Neomall may contain links to third-party websites or display content from third parties. We do not 
                claim ownership of such content and are not responsible for the copyright practices of third parties.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you believe that your copyrighted work has been used in a way that constitutes copyright infringement, 
                please contact us immediately with the following information:
              </p>
              <ul className="text-muted-foreground space-y-2 mt-4">
                <li>• A description of the copyrighted work that you claim has been infringed</li>
                <li>• The location of the allegedly infringing material on our site</li>
                <li>• Your contact information</li>
                <li>• A statement that you have a good faith belief that the use is not authorized</li>
                <li>• A statement that the information is accurate and that you are authorized to act on behalf of the copyright owner</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Trademarks</h2>
              <p className="text-muted-foreground leading-relaxed">
                "Neomall" and related marks are trademarks of Neomall. All other trademarks, service marks, and trade 
                names used on this site are the property of their respective owners. You may not use any of our 
                trademarks without our prior written consent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Digital Millennium Copyright Act (DMCA)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Neomall respects the intellectual property rights of others and expects our users to do the same. 
                We will respond to notices of alleged copyright infringement that comply with the DMCA and other 
                applicable laws.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you are a copyright owner or an agent thereof and believe that any content on Neomall infringes 
                upon your copyrights, you may submit a notification pursuant to the DMCA by providing our designated 
                copyright agent with the following information in writing.
              </p>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For copyright-related inquiries, please contact us at:{" "}
                <a href="mailto:copyright@neomall.com" className="text-primary hover:underline">
                  copyright@neomall.com
                </a>
              </p>
              <p className="text-muted-foreground text-sm mt-4">
                Neomall Copyright Agent<br />
                Email: copyright@neomall.com<br />
                Phone: +84 (0) 123 456 789
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
