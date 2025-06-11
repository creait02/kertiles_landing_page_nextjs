"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { gsap } from "gsap"
import "animate.css"
import banner_image from "@images/banner_image.jpeg"
import banner from "@images/banner.jpeg"

const heroImages = [
  {
    src: `${banner_image.src}`,
    title: "Premium Ceramics",
    subtitle: "Luxury & Durability",
  },
  {
    src: `${banner.src}`,
    title: "Porcelain Excellence",
    subtitle: "Modern Designs",
  },
  {
    src: "/placeholder.svg?height=1080&width=1920",
    title: "Wall Panels",
    subtitle: "Natural Beauty",
  },
  {
    src: "/placeholder.svg?height=1080&width=1920",
    title: "Construction Solutions",
    subtitle: "Professional Grade",
  },
]

const VisualHero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(".hero-content", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })

    // Auto-slide functionality
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Background Images Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="hero-content text-white">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                KERTILES
                <span className="block text-primary text-3xl md:text-4xl font-normal">Premium Solutions</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                {heroImages[currentSlide].title} • {heroImages[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#gallery">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
                    Explore Gallery
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg"
                  >
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Image Grid */}
            <div className="hero-content grid grid-cols-2 gap-4">
              {heroImages.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                    index === 0 ? "col-span-2 h-48" : "h-32"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors"></div>
                  <div className="absolute bottom-2 left-2 text-white text-sm font-medium">{image.title}</div>
                  {currentSlide === index && (
                    <div className="absolute inset-0 border-2 border-primary rounded-lg"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-primary scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <Link href="#about" className="text-white/80 hover:text-white transition-colors">
          <ChevronDown size={32} />
        </Link>
      </div>
    </div>
  )
}

export default VisualHero
