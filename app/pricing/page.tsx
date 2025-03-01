import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent
            <span className="gradient-text"> Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your needs
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 ${
                plan.popular
                  ? 'bg-accent/10 border-2 border-accent'
                  : 'bg-card border border-border'
              }`}
            >
              {plan.popular && (
                <span className="inline-block bg-accent text-white text-sm px-3 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <Link href="/dashboard">
                <Button
                  className={`w-full mb-6 ${
                    plan.popular ? 'button-accent' : 'button-primary'
                  }`}
                >
                  Get Started
                </Button>
              </Link>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-20 text-center py-12 bg-secondary/50 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Contact us for enterprise pricing and custom features
          </p>
          <Link href="/contact">
            <Button size="lg" className="button-primary">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const plans = [
  {
    name: "Basic",
    price: 9.99,
    description: "Perfect for individual users and small projects",
    features: [
      "10GB storage",
      "2 devices",
      "Basic encryption",
      "30-day version history",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: 19.99,
    description: "Ideal for professionals and small teams",
    features: [
      "100GB storage",
      "5 devices",
      "Advanced encryption",
      "90-day version history",
      "Priority support",
      "Team sharing",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: 49.99,
    description: "For growing teams and organizations",
    features: [
      "500GB storage",
      "Unlimited devices",
      "Enterprise encryption",
      "1-year version history",
      "24/7 support",
      "Admin controls",
      "Custom integration",
      "Advanced security",
    ],
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, we offer a 14-day free trial for all plans. No credit card required.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for enterprise customers.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We use military-grade encryption and follow industry best practices to ensure your data is always secure.",
  },
]; 