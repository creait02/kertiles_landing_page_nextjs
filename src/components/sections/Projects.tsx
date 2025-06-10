"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import project_image_4 from "@images/project_image_4.jpeg"
import project_image_3 from "@images/project_image_3.jpeg"
import project_image_2 from "@images/project_image_2.jpeg"
import project_image_1 from "@images/project_image_1.jpeg"

const projects = [
  {
    id: 1,
    title: "Modern Residential Complex",
    category: "Residential",
    description:
      "A luxury residential complex featuring our premium porcelain tiles throughout common areas and private spaces.",
    image: `${project_image_4.src}`,
    location: "Miami, FL",
  },
  {
    id: 2,
    title: "Boutique Hotel Renovation",
    category: "Hospitality",
    description:
      "Complete renovation of a boutique hotel using our KERDECORA wall panels to create a unique atmosphere.",
    image: `${project_image_3.src}`,
    location: "New York, NY",
  },
  {
    id: 3,
    title: "Corporate Headquarters",
    category: "Commercial",
    description: "A modern corporate office space featuring our ceramic tiles in a contemporary design pattern.",
    image: `${project_image_2.src}`,
    location: "Chicago, IL",
  },
  {
    id: 4,
    title: "Luxury Spa Retreat",
    category: "Wellness",
    description: "An exclusive spa featuring our waterproof porcelain tiles and decorative wall panels.",
    image: `${project_image_1.src}`,
    location: "Los Angeles, CA",
  },
]

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState(0)

  const nextProject = () => {
    setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

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

    // Animate project slider
    const projectElements = document.querySelectorAll(".project-slide")
    projectElements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
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

  // Animate project change
  useEffect(() => {
    const projectSlide = document.querySelector(".project-slide")
    gsap.fromTo(projectSlide, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 })
  }, [activeProject])

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 bg-white dark:bg-gray-900 gsap-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Explore our portfolio of completed projects showcasing the versatility and quality of KERTILES products.
          </p>
        </div>

        <div className="relative">
          {/* Project Slider */}
          <div className="project-slide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={projects[activeProject].image || "/placeholder.svg"}
                  alt={projects[activeProject].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-primary px-4 py-2">
                  <span className="text-white text-sm font-medium">{projects[activeProject].category}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{projects[activeProject].title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 flex items-center">
                    <span className="mr-2">{projects[activeProject].location}</span>
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300">{projects[activeProject].description}</p>

                <div className="pt-4">
                  <Link href="#contact">
                    <Button className="flex items-center gap-2">
                      Request Similar Project <ExternalLink size={16} />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Project {activeProject + 1} of {projects.length}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={prevProject}
                      className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      aria-label="Previous project"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextProject}
                      className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      aria-label="Next project"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Thumbnails */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`relative h-24 rounded-md overflow-hidden transition-all ${
                activeProject === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
