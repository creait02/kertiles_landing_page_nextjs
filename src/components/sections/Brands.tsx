"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const brands = [
  {
    name: "KERTILES",
    description: "Premium ceramic and porcelain solutions",
    logo: "/placeholder.svg?height=80&width=200",
  },
  {
    name: "EUROKER",
    description: "European export division",
    logo: "/placeholder.svg?height=80&width=200",
  },
  {
    name: "KERDECORA",
    description: "Natural wall panels and decoration",
    logo: "/placeholder.svg?height=80&width=200",
  },
]

const Brands = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const brandElements = document.querySelectorAll(".brand-item")
    brandElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
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
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Brands</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our family of brands, each specializing in different aspects of ceramic and decorative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="brand-item text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="relative h-20 mb-4">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{brand.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands
