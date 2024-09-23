import Image from 'next/image'
import Link from 'next/link'
import { PageProps, Recipe } from '@/app/types'
import { fetchRecipe } from '@/app/actions'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id

  const data: Recipe = await fetchRecipe(id)

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: data.title,
    description: data.description,
    keywords: [data.title, 'recipe', 'homemade', 'delicious'],
    openGraph: {
      url: `https://seo-app-woad.vercel.app/recipes/${id}`,
      title: data.title,
      description: data.description,
      images: [
        `https://seo-app-woad.vercel.app/images/${data.title.toLowerCase()}.jpg`,
        ...previousImages,
      ],
      type: 'website',
    },
    twitter: {
      site: `https://seo-app-woad.vercel.app/recipes/${id}`,
      creator: '@skevseroz',
    },
  }
}

export default async function Page({ params }: PageProps) {
  const data: Recipe = await fetchRecipe(params.id)

  return (
    <>
      <div className={'button-container'}>
        <Link href={'/recipes'}>
          <button className={'back-button'}>Back To Recipes</button>
        </Link>
      </div>
      <div className={'detail-container'}>
        <div className={'image-card'}>
          <Image
            src={`/images/${data.title.toLowerCase()}.jpg`}
            alt={data.title}
            width={500}
            height={500}
            className={'detail-image'}
          />
        </div>
        <div className={'detail-card'}>
          <h1 className={'detail-title'}>{data.title}</h1>
          <ul>
            {data.ingredients.map((ingredient: string) => (
              <li className={'ingredients'} key={ingredient}>
                <Image
                  src={'/images/indicator.svg'}
                  alt={ingredient}
                  width={20}
                  height={20}
                  className={'svg'}
                />
                {ingredient}
              </li>
            ))}
          </ul>
          <p className={'detail-description'}>{data.description}</p>
        </div>
      </div>
    </>
  )
}
