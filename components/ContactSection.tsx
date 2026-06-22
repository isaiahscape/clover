"use client";

import { useState } from "react";
import { Mail, MessageCircle, Github, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactSectionProps {}

export function ContactSection({}: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("thysvl.mlr@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const channels = [
    {
      label: "Email",
      value: "thysvl.mlr@gmail.com",
      icon: Mail,
      color: "text-indigo-500",
      onClick: copyEmail,
    },
    {
      label: "Discord",
      value: "@thysvl",
      icon: MessageCircle,
      color: "text-sky-500",
      onClick: undefined,
    },
    {
      label: "Instagram",
      value: "@bunniedoeu",
      icon: Image,
      color: "text-pink-500",
      onClick: undefined,
    },
    {
      label: "Github",
      value: "@isaiahscape",
      icon: Github,
      color: "text-violet-500",
      onClick: undefined,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4" id="contact-section-container">
      {/* Intro */}
      <div className="text-left space-y-2" id="contact-header-block">
        <h2 className="text-2xl font-bold font-sans tracking-tight text-foreground flex items-center gap-2">
          Collaborate / Reach Me
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl font-sans">
          For projects, commissions, or just to say hi. Pick a channel below.
        </p>
      </div>

      {/* Contact Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="contact-channels-list">
        {channels.map((channel) => (
          <button
            key={channel.label}
            onClick={channel.onClick}
            className={cn(
              "presence-card flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer group w-full text-left shadow-sm",
              copiedEmail && channel.label === "Email" && "bg-emerald-500/20! border border-emerald-500/40!"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="presence-card-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <channel.icon className={cn("w-4 h-4", channel.color)} />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{channel.label}</p>
                <p className="text-sm font-medium text-foreground font-mono">{channel.value}</p>
              </div>
            </div>
            {copiedEmail && channel.label === "Email" && (
              <span className="text-xs font-mono text-emerald-400">Copied!</span>
            )}
          </button>
        ))}
      </div>

      {/* Form */}
      <div
        className="p-6 sm:p-8 rounded-2xl border border-border bg-background/50 backdrop-blur-sm shadow-sm relative overflow-hidden"
        id="contact-form-pane"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = {
              name: formData.get("name"),
              email: formData.get("email"),
              message: formData.get("message"),
            };

            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            if (res.ok) {
              alert("Message sent!");
              form.reset();
            } else {
              const err = await res.json();
              alert(err.error || "Something went wrong.");
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          <div>
            <label className="block text-xs font-mono text-muted-foreground mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-lg bg-muted/50 border border-border text-foreground h-10 text-sm font-sans px-3"
              placeholder="e.g. Robin"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted-foreground mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg bg-muted/50 border border-border text-foreground h-10 text-sm font-mono px-3"
              placeholder="e.g. robin@domain.com"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-muted-foreground mb-1.5">Message</label>
            <textarea
              name="message"
              required
              className="w-full rounded-lg bg-muted/50 border border-border text-foreground text-sm font-sans h-28 resize-none px-3 py-2"
              placeholder="I'm planning to launch an electronic project..."
            />
          </div>
          <button
            type="submit"
            className="w-full sm:col-span-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactSection;
