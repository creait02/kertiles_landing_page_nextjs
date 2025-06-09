"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const AboutUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    })

    tl.fromTo(imageRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }).fromTo(
      contentRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.7",
    )

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-white dark:bg-gray-900 gsap-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="KERTILES Showroom"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary p-4 md:p-6 rounded-lg shadow-lg">
              <p className="text-2xl md:text-3xl font-bold text-white">25+</p>
              <p className="text-sm text-white/90">Years of Excellence</p>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Who We Are</h2>
              <div className="w-20 h-1 bg-primary"></div>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              KERTILES is a leading provider of premium ceramic, porcelain, and decorative wall panels. With over 25
              years of experience, we've established ourselves as industry pioneers, delivering exceptional quality and
              innovative designs.
            </p>
            <p className="text-gray-600 dark:text-gray-400">Our company comprises two specialized divisions:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover-scale">
                <h3 className="text-xl font-semibold mb-2 text-gradient">EUROKER</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our export division specializing in delivering premium ceramic solutions to European markets, ensuring
                  international quality standards.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover-scale">
                <h3 className="text-xl font-semibold mb-2 text-gradient">KERDECORA</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Focused on natural-looking wall panels and decorative solutions that transform spaces with elegance
                  and sophistication.
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              At KERTILES, we combine artistry with technology to create products that not only meet but exceed our
              customers' expectations. Our commitment to quality, innovation, and customer satisfaction drives
              everything we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
