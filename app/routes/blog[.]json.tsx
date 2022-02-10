import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = data => {
  console.log('asdasd', data)

  return new Response('adasdasdad', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
