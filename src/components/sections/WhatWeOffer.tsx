"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Tab } from "@/components/ui/tab"
import { Tabs } from "@/components/ui/tabs"
import "animate.css"

const productCategories = [
  {
    id: "ceramics",
    title: "Ceramic Tiles",
    description:
      "Our ceramic tiles combine durability with aesthetic appeal, perfect for both residential and commercial spaces. Available in various sizes, colors, and textures.",
    image: "/placeholder.svg?height=400&width=600",
    features: ["Stain-resistant", "Easy to clean", "Durable", "Versatile designs"],
  },
  {
    id: "porcelain",
    title: "Porcelain Tiles",
    description:
      "Premium porcelain tiles known for their exceptional hardness and water resistance. Ideal for high-traffic areas and outdoor applications.",
    image: "/placeholder.svg?height=400&width=600",
    features: ["Extremely durable", "Frost-resistant", "Low maintenance", "Elegant finish"],
  },
  {
    id: "wall-panels",
    title: "Wall Panels",
    description:
      "Decorative wall panels that add texture and dimension to any space. Our KERDECORA line offers natural-looking panels that transform interiors.",
    image: "/placeholder.svg?height=400&width=600",
    features: ["Easy installation", "Unique textures", "Natural appearance", "Sound absorption"],
  },
  {
    id: "construction",
    title: "Construction Materials",
    description:
      "High-quality construction materials designed for professional builders and DIY enthusiasts alike. Engineered for strength and longevity.",
    image: "/placeholder.svg?height=400&width=600",
    features: ["Professional grade", "Consistent quality", "Technical support", "Comprehensive range"],
  },
]

const WhatWeOffer = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    // Animate tabs when they come into view
    const tabItems = document.querySelectorAll(".tab-item")
    tabItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
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
    <section id="offer" ref={sectionRef} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 gsap-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Staying on top of trends is easy with materials that stand the test of time. Our porcelain tiles come in all the classic and latest fashions so that our architects, contractors, and distributors can keep their showrooms and projects looking fresh, modern, and sleek.
          </p>
        </div>

        <Tabs defaultValue="ceramics" className="w-full">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {productCategories.map((category) => (
              <Tab
                key={category.id}
                value={category.id}
                className="tab-item px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors"
              >
                {category.title}
              </Tab>
            ))}
          </div>

          {productCategories.map((category) => (
            <div
              key={category.id}
              value={category.id}
              className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div className="order-2 lg:order-1 space-y-6 animate__animated animate__fadeIn">
                <h3 className="text-2xl font-bold">{category.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{category.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 lg:order-2 animate__animated animate__fadeIn">
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg hover-scale">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

export default WhatWeOffer
