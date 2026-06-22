"use client";

import { LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    title: "Full-Stack Development",
    description: "End-to-end web apps with Next.js, React, Node.js, and modern backend services.",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    description: "Clean, accessible interfaces grounded in design systems and user research.",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "System Design",
    description: "Scalable architecture and integration patterns for distributed systems.",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export function ServicesSection() {
  return (
    <div className="space-y-8 py-4" id="services-section-container">
      <div className="text-left space-y-2" id="services-header-block">
        <h2 className="text-2xl font-bold font-sans tracking-tight text-foreground flex items-center gap-2">
          Services & Collaboration
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl font-sans">
          Practical expertise for shipping products and refining experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="services-grid">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-xl border border-border bg-background/50 hover:border-border transition-all overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-secondary border border-border">
                  <service.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground font-mono">{service.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesSection;