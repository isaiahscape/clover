"use client";

import { useState } from "react";
import { StackItem } from "@/src/types";
import { motion } from "motion/react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface StackSectionProps {
  stack: StackItem[];
}

export function StackSection({ stack }: StackSectionProps) {
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "software", label: "Software", items: stack.filter((item) => item.category === "software") },
    { id: "hardware", label: "Hardware", items: stack.filter((item) => item.category === "hardware") },
    { id: "gear", label: "Gear", items: stack.filter((item) => item.category === "gear") },
  ];

  const visibleItems = filter === "all" ? stack : categories.find((c) => c.id === filter)?.items || [];

  return (
    <div className="space-y-8 py-4" id="stack-section-container">
      <div className="text-left space-y-2" id="stack-header-block">
        <h2 className="text-2xl font-bold font-sans tracking-tight text-foreground flex items-center gap-2">
          Dev Toolbox
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl font-sans">
          My daily drivers, hardware, and digital toolkit — the gear that ships ideas.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2" id="stack-category-filters">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
            filter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              filter === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start" id="stack-content-grid">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-background overflow-hidden shadow-xs" id="gadgets-editor-frame">
          <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border" id="gadgets-editor-header">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs font-mono text-muted-foreground">projects.config</span>
            </div>
          </div>
          <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto" id="gadgets-code-body">
            {visibleItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="border border-border rounded-lg bg-muted/50 overflow-hidden transition-all duration-200 hover:border-border"
                id={`device-card-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <div
                  className="border-t border-border bg-background/50 p-4"
                  id={`device-specs-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-secondary border border-border shadow-xs">
                      {getIconElement(item.iconName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground font-mono truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
                      {item.level && (
                        <span className="inline-block mt-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5 bg-muted/80">
                          {item.level}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <TooltipProvider delayDuration={100}>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4" id="stack-tools-list">
            {visibleItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/50 hover:border-border transition-colors duration-200 cursor-help"
                id={`stack-item-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-1.5 rounded-lg bg-secondary border border-border shadow-xs">
                      {getIconElement(item.iconName)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-foreground text-background rounded-lg px-2.5 py-1 text-xs font-mono border-none shadow-md">
                    Level: {item.level || "Highly Capable"}
                  </TooltipContent>
                </Tooltip>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground truncate">{item.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}

function getIconElement(iconName?: string) {
  if (!iconName) return <span className="text-xs text-muted-foreground">⚡</span>;
  const iconMap: Record<string, React.ReactNode> = {
    react: <span className="text-xs font-bold text-sky-500">⚛️</span>,
    next: <span className="text-xs font-bold text-black dark:text-white">N</span>,
    typescript: <span className="text-xs font-bold text-blue-600">TS</span>,
    tailwind: <span className="text-xs font-bold text-cyan-500">TW</span>,
    node: <span className="text-xs font-bold text-green-600">N</span>,
    python: <span className="text-xs font-bold text-yellow-600">Py</span>,
    database: <span className="text-xs font-bold text-orange-500">🗄️</span>,
    docker: <span className="text-xs font-bold text-blue-500">🐳</span>,
    git: <span className="text-xs font-bold text-orange-600">Git</span>,
    ide: <span className="text-xs font-bold text-purple-500">📝</span>,
  };
  return iconMap[iconName] || <span className="text-xs text-muted-foreground">⚡</span>;
}

export default StackSection;