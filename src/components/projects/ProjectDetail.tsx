"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Users, Clock, ZoomIn } from "lucide-react"
import type { Project } from "@/types/project"
import ProjectGallery from "./ProjectGallery"
import RelatedProjects from "./RelatedProjects"

interface ProjectDetailProps {
  project: Project
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero animation
    gsap.fromTo(heroRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

    // Content sections animation
    const sections = document.querySelectorAll(".animate-section")
    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: section,
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

  const openGallery = (index: number) => {
    setSelectedImageIndex(index)
    setIsGalleryOpen(true)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800 py-4 mt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/#projects" className="text-gray-500 hover:text-primary transition-colors">
              Projects
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-gray-100">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Image */}
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={project.images[0] || "/placeholder.svg?height=500&width=700"}
                  alt={project.title}
                  fill
                  className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => openGallery(0)}
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                  <ZoomIn className="text-white" size={32} />
                </div>
              </div>
              <Badge className="absolute top-4 left-4 bg-primary text-white">{project.category}</Badge>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <div>
                <Link href="/#projects">
                  <Button variant="ghost" className="mb-4 p-0 h-auto text-primary hover:text-primary/80">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Projects
                  </Button>
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">{project.description}</p>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary" size={20} />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600 dark:text-gray-400">{project.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="text-primary" size={20} />
                  <div>
                    <p className="font-medium">Completed</p>
                    <p className="text-gray-600 dark:text-gray-400">{project.completedDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="text-primary" size={20} />
                  <div>
                    <p className="font-medium">Client</p>
                    <p className="text-gray-600 dark:text-gray-400">{project.client}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-primary" size={20} />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-gray-600 dark:text-gray-400">{project.duration}</p>
                  </div>
                </div>
              </div>

              {/* Products Used */}
              <div>
                <h3 className="font-semibold mb-3">Products Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.productsUsed.map((product, index) => (
                    <Badge key={index} variant="secondary">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 animate-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Project Overview</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.fullDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 animate-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">The Challenge</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">Our Solution</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 animate-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((image, index) => (
              <div
                key={index}
                className="relative h-64 rounded-lg overflow-hidden shadow-md cursor-pointer group"
                onClick={() => openGallery(index)}
              >
                <Image
                  src={image || "/placeholder.svg?height=300&width=400"}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ZoomIn className="text-white" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Results */}
      <section className="py-16 animate-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Project Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.results.map((result, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary mb-2">{result.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{result.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <RelatedProjects currentProject={project} />

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-white animate-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in a Similar Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can bring your vision to life with our premium ceramic solutions.
          </p>
          <Link href="/#contact">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <ProjectGallery
          images={project.images}
          selectedIndex={selectedImageIndex}
          onClose={() => setIsGalleryOpen(false)}
          onImageChange={setSelectedImageIndex}
          projectTitle={project.title}
        />
      )}
    </div>
  )
}

export default ProjectDetail
