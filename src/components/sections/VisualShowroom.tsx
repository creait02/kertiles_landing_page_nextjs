"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin } from "lucide-react"
import inaguration_image from "@images/about.jpg"

const projects = [
  {
    id: 1,
    slug: "modern-residential-complex",
    title: "Modern Residential Complex",
    category: "Residential",
    location: "Miami, FL",
    images: [
      `${inaguration_image.src}`,
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=500&width=700",
    ],
  },
  {
    id: 2,
    slug: "boutique-hotel-renovation",
    title: "Boutique Hotel Renovation",
    category: "Hospitality",
    location: "New York, NY",
    images: [
      `${inaguration_image.src}`,
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=500&width=700",
    ],
  },
  {
    id: 3,
    slug: "corporate-headquarters",
    title: "Corporate Headquarters",
    category: "Commercial",
    location: "Chicago, IL",
    images: [
      `${inaguration_image.src}`,
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=500&width=700",
    ],
  },
  {
    id: 4,
    slug: "luxury-spa-retreat",
    title: "Luxury Spa Retreat",
    category: "Wellness",
    location: "Los Angeles, CA",
    images: [
     `${inaguration_image.src}`,
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=500&width=700",
    ],
  },
]

const VisualProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      ".projects-header",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    const projectCards = document.querySelectorAll(".project-card")
    projectCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
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
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 gsap-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="projects-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Main Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">{project.category}</Badge>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>

                {/* Image Gallery Preview */}
                <div className="grid grid-cols-2 gap-2 p-4">
                  {project.images.slice(1, 3).map((image, imgIndex) => (
                    <div key={imgIndex} className="relative h-24 rounded-md overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - ${imgIndex + 2}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                    <MapPin size={16} className="mr-1" />
                    {project.location}
                  </div>
                  <Link href={`/projects/${project.slug}`}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      View Project Details
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link href="#contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              Request Custom Project
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default VisualProjects
