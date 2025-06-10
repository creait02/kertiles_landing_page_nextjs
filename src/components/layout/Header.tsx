"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import kertiles_logo from "../../../public/assets/kertiles_logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Header animation
    gsap.from(".header-logo", {
      y: -50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    })

    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.5,
      ease: "power2.out",
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="header-logo flex items-center">
            <div className="relative h-10 w-32">
              <Image
                src={kertiles_logo}
                alt="KERTILES Logo"
                width={128}
                height={40}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#about"
              className="nav-item text-sm font-medium hover:text-primary transition-colors"
            >
              Who We Are
            </Link>
            <Link
              href="#offer"
              className="nav-item text-sm font-medium hover:text-primary transition-colors"
            >
              What We Offer
            </Link>
            <Link
              href="#projects"
              className="nav-item text-sm font-medium hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#showroom"
              className="nav-item text-sm font-medium hover:text-primary transition-colors"
            >
              Showroom
            </Link>
            <Link href="#contact">
              <Button className="nav-item bg-primary hover:bg-primary/90 text-white">
                Contact Us
              </Button>
            </Link>
            <button
              onClick={toggleTheme}
              className="nav-item p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="#about"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Who We Are
            </Link>
            <Link
              href="#offer"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              What We Offer
            </Link>
            <Link
              href="#projects"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Projects
            </Link>
            <Link
              href="#showroom"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Showroom
            </Link>
            <Link href="#contact" onClick={toggleMenu}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header
