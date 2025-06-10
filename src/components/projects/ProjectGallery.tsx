"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectGalleryProps {
  images: string[]
  selectedIndex: number
  onClose: () => void
  onImageChange: (index: number) => void
  projectTitle: string
}

const ProjectGallery = ({ images, selectedIndex, onClose, onImageChange, projectTitle }: ProjectGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex)

  useEffect(() => {
    setCurrentIndex(selectedIndex)
  }, [selectedIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [currentIndex])

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length
    setCurrentIndex(nextIndex)
    onImageChange(nextIndex)
  }

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    onImageChange(prevIndex)
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
    onImageChange(index)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
        onClick={onClose}
      >
        <X size={24} />
      </Button>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
        onClick={handlePrevious}
        disabled={images.length <= 1}
      >
        <ChevronLeft size={32} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
        onClick={handleNext}
        disabled={images.length <= 1}
      >
        <ChevronRight size={32} />
      </Button>

      {/* Main Image */}
      <div className="relative w-full h-full max-w-6xl max-h-[80vh] mx-4">
        <Image
          src={images[currentIndex] || "/placeholder.svg?height=800&width=1200"}
          alt={`${projectTitle} - Image ${currentIndex + 1}`}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
              index === currentIndex ? "border-primary scale-110" : "border-transparent hover:border-white/50"
            }`}
          >
            <Image
              src={image || "/placeholder.svg?height=64&width=64"}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProjectGallery
