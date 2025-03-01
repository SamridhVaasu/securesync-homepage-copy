import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Features() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Powerful Features for
            <span className="gradient-text"> Secure File Sync</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover all the ways SecureSync can help you manage and protect your files
          </p>
        </div>

        {/* Feature Sections */}
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } gap-8 mb-20 items-center`}
          >
            <div className="flex-1">
              <div className="bg-accent/10 p-8 rounded-2xl">
                {/* Placeholder for feature illustration */}
                <div className="aspect-video bg-accent/20 rounded-lg"></div>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold">{feature.title}</h2>
              <p className="text-lg text-muted-foreground">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* CTA Section */}
        <div className="text-center mt-20 py-12 bg-secondary/50 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience SecureSync?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start securing your files today with our 14-day free trial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="button-primary w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Military-grade Encryption",
    description:
      "Your data security is our top priority. We use state-of-the-art encryption to protect your files at rest and in transit.",
    benefits: [
      "AES-256 encryption for all stored files",
      "End-to-end encryption during file transfer",
      "Zero-knowledge architecture",
      "Optional private key management",
    ],
  },
  {
    title: "Seamless Synchronization",
    description:
      "Keep your files in sync across all your devices with real-time updates and intelligent conflict resolution.",
    benefits: [
      "Real-time file synchronization",
      "Automatic conflict resolution",
      "Bandwidth-efficient delta updates",
      "Offline access to your files",
    ],
  },
  {
    title: "Advanced Collaboration",
    description:
      "Work together with your team while maintaining complete control over access and permissions.",
    benefits: [
      "Granular access controls",
      "Secure file sharing",
      "Team workspace management",
      "Activity audit trails",
    ],
  },
  {
    title: "Enterprise Security",
    description:
      "Enterprise-grade security features to protect your organization's sensitive data.",
    benefits: [
      "Two-factor authentication",
      "Single sign-on (SSO) integration",
      "Remote device management",
      "Compliance reporting",
    ],
  },
]; 