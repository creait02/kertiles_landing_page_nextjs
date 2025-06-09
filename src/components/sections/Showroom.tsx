"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Calendar, ArrowRight } from "lucide-react"
import "animate.css"

const showroomLocations = [
  {
    id: 1,
    name: "Main Showroom",
    address: "123 Ceramic Street, Tile City, TC 12345",
    hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 2,
    name: "Downtown Design Center",
    address: "456 Design Avenue, Metro City, MC 67890",
    hours: "Mon-Fri: 10AM-7PM, Sat: 11AM-5PM",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 3,
    name: "Suburban Outlet",
    address: "789 Porcelain Road, Suburb Town, ST 54321",
    hours: "Mon-Sat: 9AM-8PM, Sun: 11AM-5PM",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
]

const Showroom = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

    // Animate showroom cards
    const cards = document.querySelectorAll(".showroom-card")
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: cardsRef.current,
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
    <section id="showroom" ref={sectionRef} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 gsap-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Showrooms</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Experience our products firsthand at one of our elegant showroom locations. Our design consultants are ready
            to help you find the perfect solutions for your space.
          </p>
        </div>

        {/* Featured Showroom */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg animate__animated animate__fadeIn">
              <Image src="/placeholder.svg?height=600&width=800" alt="Main Showroom" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="bg-primary px-3 py-1 text-sm font-medium rounded-full">Featured Location</span>
                <h3 className="text-2xl font-bold mt-2">Main Showroom</h3>
                <p className="flex items-center mt-2">
                  <MapPin size={16} className="mr-2" />
                  123 Ceramic Street, Tile City, TC 12345
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Experience KERTILES In Person</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our flagship showroom features over 5,000 square feet of display space showcasing our complete product
                line. Touch, feel, and visualize how our products can transform your space.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">Virtual Tour Available</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Can't visit in person? Take a virtual tour of our showroom from the comfort of your home.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">Design Consultation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Schedule a free consultation with our design experts to help bring your vision to life.
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar size={18} className="mr-2" />
                <span>Mon-Fri: 9AM-6PM, Sat: 10AM-4PM, Closed on Sundays</span>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="#contact">
                  <Button className="bg-primary hover:bg-primary/90">Schedule a Visit</Button>
                </Link>
                <Link href="#">
                  <Button variant="outline">Virtual Tour</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* All Showroom Locations */}
        <div ref={cardsRef}>
          <h3 className="text-2xl font-bold mb-8 text-center">All Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showroomLocations.map((location) => (
              <div
                key={location.id}
                className="showroom-card bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image src={location.image || "/placeholder.svg"} alt={location.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{location.name}</h4>
                  <p className="flex items-start text-gray-600 dark:text-gray-400 mb-3">
                    <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                    <span>{location.address}</span>
                  </p>
                  <p className="flex items-start text-gray-600 dark:text-gray-400 mb-4">
                    <Calendar size={16} className="mr-2 mt-1 flex-shrink-0" />
                    <span>{location.hours}</span>
                  </p>
                  <Link href="#contact" className="text-primary hover:text-primary/80 font-medium flex items-center">
                    Get Directions <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Showroom
