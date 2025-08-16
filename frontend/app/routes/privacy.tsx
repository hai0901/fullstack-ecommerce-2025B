// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: [Your Names]
// ID: [Your Student ID]

import { Separator } from "~/components/ui/separator";

// Fallback Card component since shadcn/ui card is not installed
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const SITE_NAME = "Neomall";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Introduction</h2>
              <p>
                This Privacy Policy explains how <strong>{SITE_NAME}</strong> (an e-commerce system built for the RMIT COSC2769 – Full Stack Development 2025B assignment) collects, uses, stores, and protects information. This project is created for educational purposes only and is not intended for commercial deployment.
              </p>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
              <p className="mb-4">When you register as a Customer, Vendor, or Shipper, we collect:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Username (unique across the system)</li>
                <li>Password (stored securely in hashed form)</li>
                <li>Profile picture (image file)</li>
                <li>Customer: name, address</li>
                <li>Vendor: business name, business address</li>
                <li>Shipper: assigned distribution hub</li>
              </ul>
              <p>We also process shopping cart contents, order details, and basic technical logs necessary for operating the system.</p>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create and manage accounts and sessions</li>
                <li>List products (Vendors), browse and purchase (Customers)</li>
                <li>Route orders to distribution hubs and enable delivery (Shippers)</li>
                <li>Maintain security, validate authentication, and improve reliability</li>
              </ul>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Legal Basis & Purpose (Academic Context)</h2>
              <p>
                Because <strong>{SITE_NAME}</strong> is a student project, data is handled strictly for coursework demonstration (teaching and assessment). It is not used for marketing or commercial profiling.
              </p>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Security</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Passwords are hashed with bcrypt; plaintext passwords are never stored</li>
                <li>Sessions use restricted, httpOnly cookies with appropriate settings</li>
                <li>Role-based access control limits which users can see or modify data</li>
                <li>Uploaded images are stored with controlled file access</li>
              </ul>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Sharing of Data</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Vendors can view and manage only their own products</li>
                <li>Customers can view product information provided by Vendors</li>
                <li>Shippers can view active orders assigned to their distribution hub</li>
                <li>We do not sell or otherwise disclose personal data to third parties outside this academic project</li>
              </ul>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Retention</h2>
              <p>Data is retained only for the duration of the course and may be reset or deleted after the assignment ends.</p>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and update your details via My Account</li>
                <li>Request account deletion by contacting the project administrators (course instructors)</li>
              </ul>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Children's Data</h2>
              <p><strong>{SITE_NAME}</strong> is an academic demonstration and is not intended for children. Do not submit real personal information.</p>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">International Transfers</h2>
              <p>No cross-border transfers are intended; the system is used within the course environment only.</p>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Third-Party Content</h2>
              <p>Any brand names or trademarks referenced remain the property of their respective owners. If static page text is copied from public sources, the source will be cited for academic integrity.</p>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
              <p><strong>{SITE_NAME}</strong> is a simplified, non-production system. Do not use real personal data. This project does not represent Lazada or any commercial entity.</p>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact</h2>
              <p>For privacy requests related to this coursework project, contact the teaching team (course instructors).</p>
            </section>

            <Separator className="my-6" />

            <footer className="text-sm text-muted-foreground">
              Last updated: August 17, 2025
            </footer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: "Privacy Policy | Neomall",
  description: "Privacy Policy for the Neomall e-commerce platform - RMIT University Vietnam COSC2769 Full Stack Development 2025B Assignment 02."
};
