import Image from 'next/image'
import Link from 'next/link'
import { PageProps, Recipe } from '@/app/types'
import { fetchRecipe } from '@/app/actions'
import Head from 'next/head'

export default async function Page({ params }: PageProps) {
  const data: Recipe = await fetchRecipe(params.id)

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name={'description'} content={data.title} />
        <meta name={'keywords'} content={data.title} />
      </Head>
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
