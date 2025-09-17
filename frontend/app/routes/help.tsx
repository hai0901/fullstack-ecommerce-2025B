/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { useState } from "react";
import { ChevronDown, ChevronUp, Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { Button } from "~/components/ui/button";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I create an account on Neomall?",
    answer: "To create an account, click the 'Sign Up' button in the top navigation. Choose your role (Customer, Vendor, or Shipper), fill in your details, and verify your email address. You'll then be able to access all features of our platform."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express), debit cards, and digital wallets. All payments are processed securely through our encrypted payment gateway to ensure your financial information is protected."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is placed, you'll receive a confirmation email with tracking information. You can also log into your account and visit the 'My Orders' section to see real-time updates on your order status and delivery progress."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. To initiate a return, go to your order history, select the item you want to return, and follow the return process. Refunds are processed within 5-7 business days."
  },
  {
    question: "How do I become a vendor on Neomall?",
    answer: "To become a vendor, sign up with the 'Vendor' role during registration. You'll need to provide business information, tax details, and bank account information for payments. Once approved, you can start listing your products and managing your store."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can contact our support team through multiple channels: email us at support@neomall.com, call our hotline at +84 (0) 123 456 789, or use the live chat feature on our website. Our support team is available 24/7 to assist you."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take data security seriously. All personal and payment information is encrypted using industry-standard SSL technology. We never share your personal information with third parties without your consent, except as outlined in our Privacy Policy."
  },
  {
    question: "How do I update my account information?",
    answer: "To update your account information, log into your account and go to the 'Account Settings' section. From there, you can update your personal details, shipping addresses, payment methods, and notification preferences."
  }
];

export default function Help() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Help Center</h1>
          
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Welcome to the Neomall Help Center. Find answers to common questions, 
              learn how to use our platform, and get the support you need.
            </p>
          </div>

          {/* Contact Support Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Get in Touch</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg">
                <Mail className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-medium mb-2">Email Support</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Get detailed help via email
                </p>
                <a href="mailto:support@neomall.com" className="text-primary hover:underline">
                  support@neomall.com
                </a>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <Phone className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-medium mb-2">Phone Support</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Call us for immediate assistance
                </p>
                <a href="tel:+84123456789" className="text-primary hover:underline">
                  +84 (0) 123 456 789
                </a>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <MessageCircle className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-medium mb-2">Live Chat</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Chat with our support team
                </p>
                <Button variant="outline" size="sm">
                  Start Chat
                </Button>
              </div>
            </div>
            <div className="text-center mt-6">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Support available 24/7</span>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border rounded-lg">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Quick Links Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Quick Links</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-medium mb-3">For Customers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <a href="/shop" className="text-primary hover:underline">Browse Products</a></li>
                  <li>• <a href="/cart" className="text-primary hover:underline">Shopping Cart</a></li>
                  <li>• <a href="/account" className="text-primary hover:underline">Account Settings</a></li>
                  <li>• <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium mb-3">For Vendors</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <a href="/my-products" className="text-primary hover:underline">Manage Products</a></li>
                  <li>• <a href="/my-products/add-product" className="text-primary hover:underline">Add New Product</a></li>
                  <li>• <a href="/account" className="text-primary hover:underline">Vendor Dashboard</a></li>
                  <li>• <a href="/copyright" className="text-primary hover:underline">Copyright Information</a></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Getting Started Guide */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Getting Started</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Create Account</h3>
                <p className="text-muted-foreground text-sm">
                  Sign up with your email and choose your role (Customer, Vendor, or Shipper)
                </p>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Complete Profile</h3>
                <p className="text-muted-foreground text-sm">
                  Add your personal information and verify your account
                </p>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Start Using</h3>
                <p className="text-muted-foreground text-sm">
                  Begin shopping, selling, or delivering based on your role
                </p>
              </div>
            </div>
          </section>

          {/* Additional Support */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="mailto:support@neomall.com">Contact Support</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="tel:+84123456789">Call Now</a>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
