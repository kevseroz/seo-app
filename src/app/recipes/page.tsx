import Image from 'next/image'
import Link from 'next/link'
import { fetchRecipes } from '@/app/actions'
import { Recipe } from '@/app/types'
import type { Metadata } from 'next'

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
  },
}

export default async function Home() {
  const data: Recipe[] = await fetchRecipes()

  return (
    <div>
      <ul>
        {data.map((item: Recipe) => (
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
