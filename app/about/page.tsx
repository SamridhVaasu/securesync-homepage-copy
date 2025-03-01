import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function About() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            About
            <span className="gradient-text"> SecureSync</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to make file synchronization secure, simple, and
            accessible for everyone.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-lg">
            <p className="text-muted-foreground mb-4">
              Founded in 2024, SecureSync emerged from a simple observation: while
              cloud storage had become ubiquitous, truly secure and private file
              synchronization remained a challenge for many users and organizations.
            </p>
            <p className="text-muted-foreground mb-4">
              Our team of security experts and developers came together with a
              shared vision: to create a file synchronization platform that would
              never compromise on security while maintaining the ease of use that
              modern users expect.
            </p>
            <p className="text-muted-foreground">
              Today, SecureSync serves thousands of users worldwide, from
              individual professionals to large enterprises, all united by their
              need for secure and reliable file synchronization.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <div key={index} className="bg-card p-6 rounded-lg card-hover">
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-accent/10" />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 bg-secondary/50 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experience the future of secure file synchronization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="button-primary w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const values = [
  {
    title: "Security First",
    description:
      "We believe that security should never be an afterthought. It's built into everything we do.",
  },
  {
    title: "User Privacy",
    description:
      "Your data belongs to you. We design our systems with privacy at their core.",
  },
  {
    title: "Continuous Innovation",
    description:
      "We're constantly pushing the boundaries of what's possible in secure file synchronization.",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-founder",
  },
  {
    name: "Emily Thompson",
    role: "Head of Security",
  },
  {
    name: "David Kim",
    role: "Head of Product",
  },
]; 