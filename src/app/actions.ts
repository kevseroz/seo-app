'use server'

import { Recipe } from '@/app/types'

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}recipes`, {
    cache: 'no-store',
  })
  const data = await res.json()
  return Array.isArray(data) ? data : [data]
}

export const fetchRecipe = async (id: string): Promise<Recipe> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}recipes/${id}`, {
    cache: 'no-store',
  })
  return res.json()
}
