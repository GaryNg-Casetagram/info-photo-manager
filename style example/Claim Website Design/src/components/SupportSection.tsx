import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MessageCircle, Mail, Phone, FileText, HelpCircle, Headphones } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function SupportSection() {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      availability: "Available 24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      action: "Send Email",
      availability: "Response within 2-4 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      action: "Call Now",
      availability: "Mon-Fri 9AM-6PM EST"
    }
  ];

  const faqItems = [
    {
      question: "How long does the claims process take?",
      answer: "Most claims are processed within 24-48 hours. Replacement shipments typically arrive within 3-5 business days."
    },
    {
      question: "What information do I need to submit a claim?",
      answer: "You'll need your order number, product details, clear photos of the issue, and a description of what happened."
    },
    {
      question: "Is there a cost for warranty claims?",
      answer: "No, all valid warranty claims are processed free of charge, including return shipping."
    },
    {
      question: "Can I track my replacement shipment?",
      answer: "Yes, once your replacement ships, you'll receive a tracking number via email."
    }
  ];

  return (
    <section id="support" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Support Center</h2>
          <p className="text-gray-600 mt-4">We're here to help with any questions about your claim</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {supportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-black hover:bg-gray-800 mb-3">
                    {option.action}
                  </Button>
                  <p className="text-sm text-gray-500">{option.availability}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 pl-8">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <FileText className="h-4 w-4" />
                View All FAQs
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Headphones className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Premium Support</h3>
              <p className="text-gray-600 mt-2">
                Get priority assistance and dedicated support for your claims
              </p>
            </div>

            <ImageWithFallback
              src="https://images.unsplash.com/photo-1553775282-20af80779df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBzdXBwb3J0fGVufDF8fHx8MTc1ODE1NDY1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Customer support team"
              className="w-full h-48 object-cover rounded-lg mb-6"
            />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Expert technical assistance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Expedited claim processing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Direct phone line access</span>
              </div>
            </div>

            <Button className="w-full mt-6 bg-black hover:bg-gray-800">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}