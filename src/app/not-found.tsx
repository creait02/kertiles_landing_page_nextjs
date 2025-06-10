import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Project Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            The project you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#projects">
            <Button className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Projects
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Home size={16} />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
