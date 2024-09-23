import Image from 'next/image'
import Link from 'next/link'
import { fetchRecipes } from '@/app/actions'
import { Recipe as RecipeType } from '@/app/types'
import type { Metadata } from 'next'
import { WithContext, Recipe } from 'schema-dts'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Recipes',
  description: 'Find home made recipes!',
  category: 'food',
  keywords: 'recipe, recipes, homemade, delicious',
  openGraph: {
    url: 'https://seo-app-woad.vercel.app/recipes',
    type: 'website',
    title: 'Recipe list',
    description: 'Homemade recipes that you can make at home.',
    images: [
      {
        url: 'https://seo-app-woad.vercel.app/images/cupcake.jpg',
        width: 1200,
        height: 630,
        alt: 'Recipe list',
      },
    ],
  },
  twitter: {
    site: 'https://seo-app-woad.vercel.app/recipes/',
    creator: '@skevseroz',
  },
}

const jsonLd: WithContext<Recipe> = {
  '@context': 'https://schema.org',
  '@type': 'Recipe',
  name: 'Recipe list',
  image: 'https://seo-app-woad.vercel.app/images/cupcake.jpg',
  description: 'Homemade recipes that you can make at home.',
}

export default async function Home() {
  const data: RecipeType[] = await fetchRecipes()

  return (
    <div>
      <Script
        id="recipe-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <ul>
        {data.map((item: RecipeType) => (
          <li key={item.id} className={'card'}>
            <Image
              src={`/images/${item.title.toLowerCase()}.jpg`}
              alt={item.title}
              width={150}
              height={150}
              className={'image'}
            />
            <div className={'card-content'}>
              <h2 className={'title'}>{item.title}</h2>
              <div className={'description'}>{item.description}</div>
            </div>
            <div className={'button-placement'}>
              <Link href={`/recipes/${item.id}`}>
                <button className={'button'}>Go To Recipe</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
