"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const brandImages = [
  {
    brand: "KERTILES",
    image: "/placeholder.svg?height=400&width=600",
    description: "Premium ceramic solutions",
  },
  {
    brand: "EUROKER",
    image: "/placeholder.svg?height=400&width=600",
    description: "European export division",
  },
  {
    brand: "KERDECORA",
    image: "/placeholder.svg?height=400&width=600",
    description: "Natural wall panels",
  },
]

const VisualAboutUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const cards = document.querySelectorAll(".brand-card")
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-white dark:bg-gray-900 gsap-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        {/* Visual Brand Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {brandImages.map((brand, index) => (
            <div key={index} className="brand-card group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.brand}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{brand.brand}</h3>
                  <p className="text-gray-200">{brand.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Visual */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">25+</div>
            <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">1000+</div>
            <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">50+</div>
            <div className="text-gray-600 dark:text-gray-400">Countries Served</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">500+</div>
            <div className="text-gray-600 dark:text-gray-400">Product Varieties</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisualAboutUs
