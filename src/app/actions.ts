'use server'

import { Recipe } from '@/app/types'

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}recipes`)
  const data = await res.json()
  return Array.isArray(data) ? data : [data]
}

export const fetchRecipe = async (id: string): Promise<Recipe> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}recipes/${id}`)
  return res.json()
}
