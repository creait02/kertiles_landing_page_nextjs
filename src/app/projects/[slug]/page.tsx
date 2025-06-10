import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ProjectDetail from "@/components/projects/ProjectDetail"
import { getProjectBySlug, getAllProjects } from "@/lib/projects"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)

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
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
