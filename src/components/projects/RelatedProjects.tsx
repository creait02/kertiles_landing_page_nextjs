"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { getAllProjects } from "@/lib/projects"
import type { Project } from "@/types/project"

interface RelatedProjectsProps {
  currentProject: Project
}

const RelatedProjects = ({ currentProject }: RelatedProjectsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const cards = document.querySelectorAll(".related-project-card")
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Get related projects (same category, excluding current project)
  const allProjects = getAllProjects()
  const relatedProjects = allProjects
    .filter((project) => project.slug !== currentProject.slug && project.category === currentProject.category)
    .slice(0, 3)

  if (relatedProjects.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore more projects in the {currentProject.category.toLowerCase()} category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProjects.map((project) => (
            <div
              key={project.slug}
              className="related-project-card bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.images[0] || "/placeholder.svg?height=200&width=400"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white">{project.category}</Badge>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{project.location}</span>
                  <Link href={`/projects/${project.slug}`}>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      View Project <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/#projects">
            <Button variant="outline" size="lg">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RelatedProjects
