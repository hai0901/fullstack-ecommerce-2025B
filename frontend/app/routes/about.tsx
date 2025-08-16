import NavBar from "~/components/nav-bar";
import { ShoppingCart, Globe, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-24 px-6 ">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto mb-24 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            NeoMall transforms the way people shop and sell online.
          </h1>
          <p className="mt-6 text-lg">
            We're building a unified shopping experience that empowers both businesses and buyers.  
            Fast, secure, scalable — NeoMall delivers modern e-commerce without compromise.
          </p>
          <a
            href="/help"
            className="inline-block mt-8 rounded-md bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition"
          >
            Need Help?
          </a>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-800 divide-y md:divide-y-0 md:divide-x divide-gray-800 animate-fade-in-up delay-200">
          {/* Feature 1 */}
          <div className="p-8 flex flex-col items-center text-center">
            <ShoppingCart className="h-6 w-6 mb-3 text-white" />
            <h2 className="text-lg font-semibold mb-1">Seamless Shopping</h2>
            <p className=" text-sm">
              NeoMall makes browsing, checkout, and order tracking incredibly smooth for customers — across any device.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 flex flex-col items-center text-center">
            <Globe className="h-6 w-6 mb-3 text-white" />
            <h2 className="text-lg font-semibold mb-1">Global by Design</h2>
            <p className=" text-sm">
              Built to scale, NeoMall supports vendors and customers worldwide — optimized for speed and localization.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 flex flex-col items-center text-center">
            <ShieldCheck className="h-6 w-6 mb-3 text-white" />
            <h2 className="text-lg font-semibold mb-1">Secure & Trusted</h2>
            <p className="text-sm">
              Transactions are encrypted, protected, and monitored to ensure a safe experience for all users.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
