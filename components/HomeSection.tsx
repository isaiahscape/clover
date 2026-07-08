"use client";

import { useState, useEffect } from "react";
import { Profile, Experience } from "@/src/types";
import { Briefcase, ArrowUpRight, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { PresenceClock } from "./PresenceClock";

interface HomeSectionProps {
  profile: Profile;
  experiences: Experience[];
}

export function HomeSection({ profile, experiences }: HomeSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-12 py-4"
      id="home-section-container"
    >
      {/* Hero Greeting Copy */}
      <motion.div variants={itemVariants} className="space-y-6 text-left" id="home-greeting-block">
        <div className="flex items-center gap-3">
          <BadgeAvailability />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1">
            Creative Designer
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-sans leading-[1.1] mt-2 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
          This is {profile.name}, and I love purple.
        </h1>
        
        <p className="text-lg text-foreground leading-relaxed font-sans max-w-3xl">
          {profile.bio}
        </p>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans max-w-3xl">
          {profile.secondaryBio}
        </p>
      </motion.div>

      {/* Real-time Presence Clock Indicator */}
      <motion.div variants={itemVariants} id="interactive-clock-block">
        <PresenceClock 
          location={profile.location} 
          statusText={profile.statusText || ""} 
          codename={profile.codename}
          instagramUsername={profile.instagram?.username}
          instagramFollowers={profile.instagram?.followers}
        />
      </motion.div>

      {/* Career Journey Timeline */}
      <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8 text-left" id="home-timeline-block">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-base font-semibold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" /> Career Journey
          </h2>
          <span className="text-xs font-mono text-muted-foreground">Archived Timeline</span>
        </div>

        <div className="relative border-l border-violet-500/30 lg:ml-2 pl-4 sm:pl-6 space-y-8 sm:space-y-10" id="experience-vertical-timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative group text-left" id={`timeline-item-${exp.id}`}>
              {/* Timeline bubble indicator */}
              <div className="absolute -left-[21px] sm:-left-[29px] top-5 bg-primary border-2 border-violet-300 w-3 h-3 rounded-full group-hover:bg-primary transition-colors duration-300 ring-4 ring-violet-950/50 z-10" />
              
              <div className="card-surface rounded-xl p-4 border text-left">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base font-bold text-foreground font-sans flex items-center gap-1.5 group-hover:text-primary transition-colors duration-200">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">
                    {exp.period}
                  </span>
                </div>

                <div className="mt-0.5" id={`timeline-company-${exp.id}`}>
                  {exp.companyUrl && exp.companyUrl !== "#" ? (
                    <a 
                      href={exp.companyUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      rel="noreferrer"
                      className="text-xs font-semibold text-muted-foreground hover:text-foreground duration-150 inline-flex items-center gap-0.5 border-b border-dashed border-border pb-0.5 font-mono"
                    >
                      {exp.company} <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                    </a>
                  ) : (
                    <span className="text-xs font-semibold text-muted-foreground font-mono">
                      {exp.company}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-sans max-w-xl">
                  {exp.description}
                </p>

                {exp.tags && (
                  <div className="flex flex-wrap gap-1 mt-3" id={`timeline-tech-${exp.id}`}>
                    {exp.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-violet-950/60 text-violet-200 border border-violet-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function getPHTNow() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const pht = new Date(utc + 8 * 3600000);
  return {
    hour: pht.getHours(),
    day: pht.getDay(),
  };
}

function computeAvailability(): { status: 'available' | 'busy' | 'away'; text: string } {
  const { hour, day } = getPHTNow();
  const isWeekend = day === 0 || day === 6;

  if (hour >= 21 || hour < 8) {
    return { status: 'away', text: 'Sleep' };
  }

  if (isWeekend) {
    return { status: 'busy', text: 'Busy (Weekend)' };
  }

  if ((hour >= 8 && hour < 12) || (hour >= 13 && hour < 16)) {
    return { status: 'available', text: 'Active now' };
  }

  return { status: 'away', text: 'Away' };
}

function BadgeAvailability() {
  const [avail, setAvail] = useState(() => computeAvailability());

  useEffect(() => {
    const update = () => setAvail(computeAvailability());
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const configs: Record<string, { bg: string; indicator: string }> = {
    available: { bg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-400/5 border-emerald-500/20", indicator: "bg-emerald-500" },
    busy: { bg: "bg-amber-500/10 text-amber-700 dark:text-amber-400 dark:bg-amber-400/5 border-amber-500/20", indicator: "bg-amber-500" },
    away: { bg: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-400 dark:bg-zinc-400/5 border-zinc-500/20", indicator: "bg-zinc-500" }
  };

  const { bg, indicator } = configs[avail.status];
  const text = avail.text;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-medium border ${bg}`} id="badge-availability-tag">
      <span className={`h-1.5 w-1.5 rounded-full ${indicator}`} />
      {text}
    </span>
  );
}