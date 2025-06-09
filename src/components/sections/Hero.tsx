"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { gsap } from "gsap"
import "animate.css"

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(textRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }).fromTo(
      buttonRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5",
    )

    // Parallax effect on scroll
    gsap.to(heroRef.current, {
      backgroundPositionY: "30%",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      // Clean up
    }
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
        <div ref={textRef} className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate__animated animate__fadeIn">
            Premium Ceramic & Porcelain Solutions
          </h1>
          <p className="text-xl text-gray-200 mb-8 animate__animated animate__fadeIn animate__delay-1s">
            Elevate your spaces with KERTILES' exquisite collection of ceramics, porcelain tiles, and decorative wall
            panels.
          </p>
        </div>

        <div
          ref={buttonRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate__animated animate__fadeIn animate__delay-2s"
        >
          <Link href="#offer">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              Explore Our Products
            </Button>
          </Link>
          <Link href="#contact">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 px-8"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="#about" className="text-white/80 hover:text-white transition-colors">
          <ChevronDown size={32} />
          <span className="sr-only">Scroll Down</span>
        </Link>
      </div>
    </div>
  )
}

export default Hero
