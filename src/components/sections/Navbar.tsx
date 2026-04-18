"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Benefits", href: "#benefits" },
  { name: "Ingredients", href: "#ingredients" },
  { name: "Products", href: "#products" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: { matches: boolean }) => {
      if (!("theme" in localStorage)) {
        setIsDark(e.matches);
        if (e.matches) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      }
    };
    mediaQuery.addEventListener("change", handleThemeChange);

    const initTimeout = setTimeout(() => {
      setIsMounted(true);
      
      const isDarkMode = 
        document.documentElement.classList.contains("dark") || 
        (!("theme" in localStorage) && mediaQuery.matches);
      
      setIsDark(isDarkMode);
      if (isDarkMode) document.documentElement.classList.add("dark");
    }, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleThemeChange);
      clearTimeout(initTimeout);
    };
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/geethika.svg"
              alt="Geethika logo"
              width={36}
              height={36}
            />
          </div>

          <span className="font-serif text-2xl font-bold text-primary tracking-tight">
            GEETHIKA
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-foreground"
            aria-label="Toggle Dark Mode"
          >
            {isMounted && isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={openCart}
            className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-foreground"
            aria-label="Open Cart"
          >
            <ShoppingBag size={20} />
            {isMounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Actions & Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-foreground"
          >
            {isMounted && isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={openCart}
            className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-foreground"
            aria-label="Open Cart"
          >
            <ShoppingBag size={20} />
            {isMounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          <button
            className="text-foreground p-1 ml-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-black/5 dark:border-white/5 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-black/5 dark:border-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}