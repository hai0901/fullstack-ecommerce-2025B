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

export default function CopyrightPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Copyright</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Ownership of Content</h2>
              <p className="mb-4">
                All design elements, source code, and instructional materials of this website are created as part of the <strong>RMIT University Vietnam – COSC2769 Full Stack Development 2025B Assignment 02</strong>. They are intended for educational use only.
              </p>
              <p>
                Product information (names, prices, images, and descriptions) is mock or sample data provided by Vendors for demonstration purposes. <strong>{SITE_NAME}</strong> does not claim ownership of user-generated content.
              </p>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Permitted Use</h2>
              <p className="mb-4">
                This website is a student project. You may not reproduce, redistribute, or use its code or content for commercial purposes without prior permission from the authors. Limited use for learning or academic reference is permitted with proper attribution.
              </p>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Third-Party References</h2>
              <p className="mb-4">
                The project concept takes inspiration from Lazada's public information, as referenced in the assignment background. All brand names, logos, or trademarks that may appear are the property of their respective owners.
              </p>
              <p>
                For academic integrity, any text copied from external sources in static pages (About, Privacy, Help, etc.) must be cited accordingly.
              </p>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
              <p>
                This is a simplified e-commerce system developed for coursework, not a production-ready platform. It does not represent Lazada or any commercial entity.
              </p>
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
  title: "Copyright | Neomall",
  description: "Copyright and ownership information for the Neomall e-commerce platform - RMIT University Vietnam COSC2769 Full Stack Development 2025B Assignment 02."
};
