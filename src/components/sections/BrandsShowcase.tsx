"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const brandShowcase = [
  {
    name: "KERTILES",
    tagline: "Premium Solutions",
    image: "/placeholder.svg?height=300&width=500",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "EUROKER",
    tagline: "European Excellence",
    image: "/placeholder.svg?height=300&width=500",
    color: "from-green-600 to-green-800",
  },
  {
    name: "KERDECORA",
    tagline: "Natural Beauty",
    image: "/placeholder.svg?height=300&width=500",
    color: "from-orange-600 to-orange-800",
  },
]

const BrandsShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const brandCards = document.querySelectorAll(".brand-showcase-card")
    brandCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
    <section ref={sectionRef} className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Brands</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brandShowcase.map((brand, index) => (
            <div key={brand.name} className="brand-showcase-card group cursor-pointer">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${brand.color} opacity-80 group-hover:opacity-60 transition-opacity duration-300`}
                ></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                  <h3 className="text-3xl font-bold mb-2">{brand.name}</h3>
                  <p className="text-lg opacity-90">{brand.tagline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandsShowcase
