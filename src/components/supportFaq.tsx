import React, { useState } from 'react';
import {
  Headphones,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Phone,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const SupportFAQ = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const adminPhoneNumber = '+919963516206'; // Replace with your admin number
  const adminEmail = 'yeshwantreddyanugu@gmail.com';
  const whatsappMessage = 'Hi! I need help with my booking.';

  const faqs = [
    {
      id: 1,
      question: 'How do I make changes to my booking?',
      answer:
        'You can modify your booking through your account dashboard or by contacting our customer support team. Most changes can be made up to 48 hours before your scheduled arrival.',
      category: 'bookings'
    },
    {
      id: 2,
      question: 'What is your cancellation policy?',
      answer:
        'Cancellation policies vary by property and rate plan. Generally, free cancellation is available up to 24-72 hours before check-in. Please check your booking confirmation for specific details.',
      category: 'bookings'
    },
    {
      id: 3,
      question: 'How do I contact customer support?',
      answer:
        'Our support team is available 24/7 via phone, live chat, or email. Average response time is under 15 minutes for urgent inquiries.',
      category: 'support'
    },
    {
      id: 4,
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and select local payment methods in various countries.',
      category: 'payments'
    },
    {
      id: 5,
      question: 'Is my payment information secure?',
      answer:
        'Yes, we use industry-standard 256-bit SSL encryption and comply with PCI DSS standards. Your payment details are never stored on our servers.',
      category: 'payments'
    },
    {
      id: 6,
      question: 'How do I earn loyalty points?',
      answer:
        'Earn 5 points for every $1 spent on bookings. Additional points can be earned through promotions, referrals, and special offers.',
      category: 'rewards'
    }
  ];

  const contactMethods = [
    {
      id: 1,
      title: 'WhatsApp Chat',
      description: 'Instant help from our support team',
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      actionLabel: 'Start Chat',
      action: () => {
        window.open(
          `https://wa.me/${adminPhoneNumber.replace('+', '')}?text=${encodeURIComponent(
            whatsappMessage
          )}`,
          '_blank'
        );
      },
      responseTime: 'Typically replies in 2 minutes'
    },
    {
      id: 2,
      title: 'Email Support',
      description: 'Detailed assistance via email',
      icon: <Mail className="h-6 w-6 text-purple-600" />,
      actionLabel: 'Send Email',
      action: () => {
        window.location.href = `mailto:${adminEmail}?subject=Support Request&body=Hi Wanderlust Team,%0A%0AI need assistance regarding...`;
      },
      responseTime: 'Typically replies in 1 hour'
    },
    {
      id: 3,
      title: 'Phone Support',
      description: '24/7 assistance in multiple languages',
      icon: <Phone className="h-6 w-6 text-green-600" />,
      actionLabel: 'Call Now',
      action: () => {
        window.location.href = `tel:${adminPhoneNumber}`;
      },
      responseTime: 'Immediate response'
    }
  ];

  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Help Center
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions or contact our support team
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-12">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-4 font-medium text-lg flex items-center gap-2 ${
              activeTab === 'faq'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <HelpCircle className="h-5 w-5" />
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-6 py-4 font-medium text-lg flex items-center gap-2 ${
              activeTab === 'support'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Headphones className="h-5 w-5" />
            Contact Support
          </button>
        </div>

        {/* FAQ Section */}
        {activeTab === 'faq' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Button variant="outline" className="h-auto py-3">
                <Shield className="h-4 w-4 mr-2" />
                Bookings & Cancellations
              </Button>
              <Button variant="outline" className="h-auto py-3">
                <HelpCircle className="h-4 w-4 mr-2" />
                General Questions
              </Button>
              <Button variant="outline" className="h-auto py-3">
                <Mail className="h-4 w-4 mr-2" />
                Payments & Refunds
              </Button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    {openQuestion === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openQuestion === faq.id && (
                    <div className="px-6 pb-6 pt-2 text-gray-600">
                      <p>{faq.answer}</p>
                      <Button variant="link" className="mt-4 pl-0 text-blue-600">
                        Read more
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                Didn't find what you were looking for?
              </p>
              <Button
                onClick={() => setActiveTab('support')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Contact Our Support Team
              </Button>
            </div>
          </div>
        )}

        {/* Support Section */}
        {activeTab === 'support' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {contactMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-blue-50">{method.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900">{method.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {method.responseTime}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={method.action}
                  >
                    {method.actionLabel}
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our customer support team is available 24/7 to help with any urgent matters.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => window.location.href = `tel:${adminPhoneNumber}`}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call {adminPhoneNumber}
                  </Button>
                  <Button
                    variant="outline"
                    className="px-8 py-4 border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${adminPhoneNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`,
                        '_blank'
                      )
                    }
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Start Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SupportFAQ;
