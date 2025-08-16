import NavBar from "~/components/nav-bar";

export default function HelpPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-24 px-6 max-w-4xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">Help Center</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to frequently asked questions or reach out to our team for support.
          </p>
        </section>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Contact Us</h2>
            <ul className="text-gray-700 dark:text-gray-300 mt-2 space-y-1">
              <li>Email: <a href="mailto:support@neomall.com" className="text-blue-600 dark:text-blue-400 underline">support@neomall.com</a></li>
              <li>Phone: +1 (800) 555-1234</li>
              <li>Live Chat: Available Mon–Fri, 9am–5pm (UTC+7)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Popular Questions</h2>
            <div className="space-y-4 mt-2">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">How do I update my account info?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Go to your profile settings and click "Edit Profile" to update your details.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Where can I view my orders?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Visit the "Orders" section in your dashboard to see your current and past purchases.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">How do I cancel a subscription?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Contact support with your order ID, and we'll help you process your cancellation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
