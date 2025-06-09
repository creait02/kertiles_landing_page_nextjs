"use client"

import { useEffect } from "react"
import Hero from "@/components/sections/Hero"
import AboutUs from "@/components/sections/AboutUs"
import WhatWeOffer from "@/components/sections/WhatWeOffer"
import Projects from "@/components/sections/Projects"
import Showroom from "@/components/sections/Showroom"
import ContactUs from "@/components/sections/ContactUs"
import Brands from "@/components/sections/Brands"
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
      <Hero />
      <AboutUs />
      <WhatWeOffer />
      <Brands />
      <Projects />
      <Showroom />
      <ContactUs />
    </>
  )
}
