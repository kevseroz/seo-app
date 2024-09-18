import Image from 'next/image'
import Link from 'next/link'
import { fetchRecipes } from '@/app/actions'
import { Recipe } from '@/app/types'

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
