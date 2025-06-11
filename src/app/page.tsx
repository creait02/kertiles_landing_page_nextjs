"use client"

import { useEffect } from "react"
import VisualHero from "@/components/sections/VisualHero"
import VisualAboutUs from "@/components/sections/VisualAboutUs"
import VisualProducts from "@/components/sections/VisualProducts"
import VisualProjects from "@/components/sections/VisualProjects"
import VisualShowroom from "@/components/sections/VisualShowroom"
import ContactUs from "@/components/sections/ContactUs"
import BrandsShowcase from "@/components/sections/BrandsShowcase"
import ProductGallery from "@/components/sections/ProductGallery"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Home() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Initialize animations
    const sections = document.querySelectorAll(".gsap-section")

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <VisualHero />
      <VisualAboutUs />
      <VisualProducts />
      <ProductGallery />
      <BrandsShowcase />
      <VisualProjects />
      <VisualShowroom />
      <ContactUs />
    </>
  )
}
