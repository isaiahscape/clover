"use client";

import { type ReactNode } from "react";
import { StackItem } from "@/src/types";
import { motion } from "motion/react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface StackSectionProps {
  stack: StackItem[];
}

export function StackSection({ stack }: StackSectionProps) {
  const applicationItems = stack.filter((item) => item.category === "applications");
  const toolboxItems = stack.filter((item) => item.category !== "applications");

  return (
    <div className="space-y-8 py-4" id="stack-section-container">
      <div className="text-left space-y-2" id="stack-header-block">
        <h2 className="text-2xl font-bold font-sans tracking-tight text-foreground flex items-center gap-2">
          Dev Toolbox
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl font-sans">
          My daily drivers, hardware, and digital toolkit - the gear that ships ideas.
        </p>
      </div>

      <div className="space-y-8" id="stack-content-groups">
        <StackGroup title="Applications" items={applicationItems} />
        <StackGroup title="Toolbox used in this site" items={toolboxItems} />
      </div>
    </div>
  );
}

function StackGroup({ title, items }: { title: string; items: StackItem[] }) {
  return (
    <section className="space-y-3" id={`stack-group-${title.toLowerCase()}`}>
      <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <TooltipProvider delay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/50 hover:border-border transition-colors duration-200 cursor-help"
              id={`stack-item-${item.name.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <Tooltip>
                <TooltipTrigger className="p-1.5 rounded-lg bg-secondary border border-border shadow-xs">
                  {getIconElement(item.iconName)}
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-foreground text-background rounded-lg px-2.5 py-1 text-xs font-mono border-none shadow-md">
                  Level: {item.level || "Highly Capable"}
                </TooltipContent>
              </Tooltip>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground truncate">{item.name}</p>
                <p className="text-[11px] text-muted-foreground truncate">{getCategoryLabel(item.category)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </TooltipProvider>
    </section>
  );
}

function getCategoryLabel(category: StackItem["category"]) {
  const labels: Record<StackItem["category"], string> = {
    applications: "Applications",
    toolbox: "Toolbox",
    languages: "Languages",
    frameworks: "Frameworks",
    hardware: "Hardware",
  };

  return labels[category];
}

function getIconElement(iconName?: string) {
  if (!iconName) return <span className="text-xs text-muted-foreground">App</span>;

  const iconMap: Record<string, ReactNode> = {
    Code2: <span className="text-xs font-bold text-sky-500">JSX</span>,
    Terminal: <span className="text-xs font-bold text-blue-600">TS</span>,
    Cpu: <span className="text-xs font-bold text-violet-500">V</span>,
    Palette: <span className="text-xs font-bold text-cyan-500">TW</span>,
    Activity: <span className="text-xs font-bold text-pink-500">FM</span>,
    Server: <span className="text-xs font-bold text-green-600">Ex</span>,
    Github: <span className="text-xs font-bold text-foreground">Git</span>,
    Laptop: <span className="text-xs font-bold text-violet-500">App</span>,
    Figma: <span className="text-xs font-bold text-pink-500">Fig</span>,
    Photoshop: <span className="text-xs font-bold text-blue-500">Ps</span>,
    Illustrator: <span className="text-xs font-bold text-orange-500">Ai</span>,
    Lightroom: <span className="text-xs font-bold text-sky-500">Lr</span>,
    InDesign: <span className="text-xs font-bold text-pink-500">Id</span>,
    Canva: <span className="text-xs font-bold text-cyan-500">Ca</span>,
    CapCut: <span className="text-xs font-bold text-foreground">Cc</span>,
    Music: <span className="text-xs font-bold text-emerald-500">Au</span>,
    Keyboard: <span className="text-xs font-bold text-amber-500">Kb</span>,
  };

  return iconMap[iconName] || <span className="text-xs text-muted-foreground">App</span>;
}

export default StackSection;
