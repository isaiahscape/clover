"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, FolderGit2, Mail, Cpu } from "lucide-react";

import { DEFAULT_PROFILE, DEFAULT_PROJECTS, DEFAULT_EXPERIENCES, DEFAULT_STACK } from "../data";

import { HomeSection } from "@/components/HomeSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";
import { ContactSection } from "@/components/ContactSection";
import { GallerySection } from "@/components/GallerySection";
import { ServicesSection } from "@/components/ServicesSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Image, Wrench } from "lucide-react";

type ActiveTab = "home" | "projects" | "stack" | "gallery" | "services" | "contact";

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

function DesktopNav({
  navItems,
  activeTab,
  setActiveTab,
}: {
  navItems: NavItem[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 z-30 hidden sm:block pointer-events-none"
      initial={false}
      animate={{
        y: visible ? 0 : -60,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <nav className="floating-nav-progressive mx-auto w-fit p-1 px-1.5 flex gap-0.5 justify-center items-center rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex items-center justify-center p-2.5 rounded-full transition-all group active:scale-95 cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId="active-island-slide-desktop"
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/10 border border-primary/5 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className={`shrink-0 z-10 transition-all duration-200 ${
                  isActive
                    ? "text-primary w-4 h-4 drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                    : "text-muted-foreground group-hover:text-foreground w-4 h-4"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}

function MobileNav({
  navItems,
  activeTab,
  setActiveTab,
}: {
  navItems: NavItem[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95%] sm:hidden pointer-events-none"
      initial={false}
      animate={{
        y: visible ? 0 : 100,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <nav className="floating-nav-progressive p-1 px-1.5 flex gap-0.5 justify-center items-center rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex items-center justify-center p-2.5 rounded-full transition-all group active:scale-95 cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId="active-island-slide-mobile"
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/10 border border-primary/5 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className={`shrink-0 z-10 transition-all duration-200 ${
                  isActive
                    ? "text-primary w-4 h-4 drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                    : "text-muted-foreground group-hover:text-foreground w-3.5 h-3.5"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowApp(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const profile = DEFAULT_PROFILE;
  const projects = DEFAULT_PROJECTS;

  const renderActiveSection = () => {
    switch (activeTab) {
      case "home":
        return <HomeSection profile={profile} experiences={DEFAULT_EXPERIENCES} />;
      case "projects":
        return <ProjectsSection projects={projects} />;
      case "stack":
        return <StackSection stack={DEFAULT_STACK} />;
      case "gallery":
        return <GallerySection />;
      case "services":
        return <ServicesSection />;
      case "contact":
        return <ContactSection />;
      default:
        return null;
    }
  };

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "stack", label: "Toolbox", icon: Cpu },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "services", label: "Services", icon: Wrench },
    { id: "contact", label: "Collaborate", icon: Mail },
  ];

  return (
    <AnimatePresence mode="wait">
      {!showApp ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-indigo-500/10 transition-colors duration-200"
            id="main-app-container"
          >
            <header
              className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/40 dark:bg-background/40 floating-nav-progressive header-blur"
              id="top-floating-header"
            >
              <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between" id="header-content-inner">
                <div
                  className="flex items-center gap-2 cursor-pointer group select-none"
                  onClick={() => setActiveTab("home")}
                  id="brand-logo"
                >
                  <img src="/favicon.svg" alt="Logo" className="w-6 h-6 dark:invert" />
                  <span className="font-mono text-sm tracking-tight font-bold text-foreground">
                    Thysvl's Clover
                  </span>
                  <span className="text-muted-foreground font-normal">/</span>
                  <span className="font-mono text-xs text-muted-foreground capitalize">{activeTab}</span>
                </div>
                <div className="flex items-center gap-2" id="action-tools-panel">
                  <ThemeToggle />
                </div>
              </div>
            </header>

            <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 pt-8 pb-24 md:pb-16" id="core-content-stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  id={`tab-content-panel-${activeTab}`}
                >
                  {renderActiveSection()}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Mobile — bottom nav bar with auto-hide on scroll */}
            <MobileNav
              navItems={navItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Desktop — auto-hide nav on scroll */}
            <DesktopNav
              navItems={navItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <footer
              className="text-center py-6 border-t border-border/20 max-w-[1440px] mx-auto w-full px-6 text-xs font-mono text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0"
              id="app-credit-footer"
            >
              <p>&copy; 2026 @isaiahscape, @thysvl. Built with realm, shenanigans, shadcnUI.</p>
              <div className="flex gap-4">
                <a href="https://github.com/isaiahscape/clover" target="_blank" rel="noreferrer" className="hover:text-indigo-500 dark:hover:text-indigo-400">
                  repository
                </a>
              </div>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}