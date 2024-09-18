export interface Recipe {
  id: number
  title: string
  image: string
  description: string
  ingredients: string[]
}

export type PageProps = {
  params: {
    id: string
  }
}
