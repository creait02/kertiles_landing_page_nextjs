export interface Project {
  id: number
  slug: string
  title: string
  category: string
  description: string
  fullDescription: string
  challenge: string
  solution: string
  images: string[]
  location: string
  completedDate: string
  client: string
  duration: string
  productsUsed: string[]
  results: {
    value: string
    label: string
  }[]
}
