"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ZoomIn, Filter } from "lucide-react"
import project_1 from "@images/project_1.jpeg"
import project_2 from "@images/project_2.jpeg"
import project_3 from "@images/project_3.jpeg"
import project_4 from "@images/project_4.jpeg"
import project_5 from "@images/project_5.jpeg"
import project_6 from "@images/project_6.jpeg"
import project_7 from "@images/project_7.jpeg"
import project_8 from "@images/project_8.jpeg"
import product_1 from "@images/product_1.jpeg"
import product_2 from "@images/product_2.jpeg"
import product_3 from "@images/product_3.jpeg"
import product_4 from "@images/product_4.jpeg"
import product_5 from "@images/product_5.jpeg"

const galleryImages = [
  { src: `${project_1.src}`, category: "ceramic", title: "Modern Ceramic Floor" },
  { src: `${project_2.src}`, category: "porcelain", title: "Porcelain Wall Design" },
  { src: `${project_3.src}`, category: "wall-panel", title: "Natural Wall Panel" },
  { src: `${project_4.src}`, category: "ceramic", title: "Ceramic Bathroom" },
  { src: `${project_5.src}`, category: "porcelain", title: "Porcelain Kitchen" },
  { src: `${project_6.src}`, category: "wall-panel", title: "Decorative Panel" },
  { src: `${project_7.src}`, category: "ceramic", title: "Outdoor Ceramic" },
  { src: `${project_8.src}`, category: "porcelain", title: "Commercial Space" },
  { src: `${product_1.src}`, category: "wall-panel", title: "Textured Wall" },
  { src: `${product_2.src}`, category: "ceramic", title: "Living Room Floor" },
  { src: `${product_3.src}`, category: "porcelain", title: "Elegant Porcelain" },
  { src: `${product_4.src}`, category: "wall-panel", title: "Feature Wall" },
  { src: `${product_5.src}`, category: "wall-panel", title: "Feature Wall" },
]

const categories = [
  { id: "all", name: "All Products" },
  { id: "ceramic", name: "Ceramic" },
  { id: "porcelain", name: "Porcelain" },
  { id: "wall-panel", name: "Wall Panels" },
]

const ProductGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      ".gallery-header",
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

    // Animate gallery items
    const galleryItems = document.querySelectorAll(".gallery-item")
    galleryItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.1 * (index % 6),
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [filteredImages])

  return (
    <section id="gallery" ref={sectionRef} className="py-20 md:py-32 bg-white dark:bg-gray-900 gsap-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="gallery-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Product Gallery</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <Filter size={16} />
              {category.name}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item break-inside-avoid relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    size={32}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-medium">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Enlarged view"
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGallery
