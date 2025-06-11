import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ProjectDetail from "@/components/projects/ProjectDetail"
import { getProjectBySlug, getAllProjects } from "@/lib/projects"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects() // <-- ahora es async
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const project = await getProjectBySlug(resolvedParams.slug)
  // const project = await getProjectBySlug(params.slug) // <-- ahora es async

  if (!project) {
    return {
      title: "Project Not Found | KERTILES",
    }
  }

  return {
    title: `${project.title} | KERTILES Projects`,
    description: project.description,
    openGraph: {
      title: `${project.title} | KERTILES Projects`,
      description: project.description,
      images: [project.images[0]],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params
  const project = await getProjectBySlug(resolvedParams.slug) // <-- ahora es async

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}