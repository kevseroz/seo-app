import Image from 'next/image'
import Link from 'next/link'
import { PageProps, Recipe as RecipeType } from '@/app/types'
import { fetchRecipe } from '@/app/actions'
import type { Metadata, ResolvingMetadata } from 'next'
import { WithContext, Recipe } from 'schema-dts'
import Script from 'next/script'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id

  const data: RecipeType = await fetchRecipe(id)

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
  const data: RecipeType = await fetchRecipe(params.id)

  const jsonLd: WithContext<Recipe> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: data.title,
    image: `https://seo-app-woad.vercel.app/images/${data.title.toLowerCase()}.jpg`,
    description: data.description,
    recipeCategory: 'food',
    recipeCuisine: 'Global',
    recipeIngredient: data.ingredients,
    recipeInstructions: data.description,
    keywords: `${data.title}, recipe, recipes, homemade, delicious`,
  }

  return (
    <>
      <Script
        id="recipe-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className={'detail-container'}>
        <div className={'image-card'}>
          <div className={'button-container'}>
            <Link href={'/recipes'}>
              <button className={'back-button'}>Back To Recipes</button>
            </Link>
          </div>
          <Image
            src={`/images/${data.title.toLowerCase()}.jpg`}
            alt={data.title}
            width={500}
            height={500}
            className={'detail-image'}
            priority
          />
        </div>
        <div className={'detail-card'}>
          <h1 className={'detail-title'}>{data.title}</h1>
          <ul>
            {data.ingredients.map((ingredient: string) => (
              <li className={'ingredients'} key={ingredient}>
                <Image
                  src={'/images/indicator.svg'}
                  alt={'ingredient'}
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
