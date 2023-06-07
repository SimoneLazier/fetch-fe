import { CakeIcon, MapPinIcon } from '@heroicons/react/24/solid'
import useDogs from '../composables/useDogs'
import { useParams } from 'react-router'
import { useCallback, useEffect, useState } from 'react'

function Dog() {
  const id = useParams().id as string
  const dogsApi = useDogs()
  const get = useCallback((id: string) => dogsApi.get(id), [dogsApi])
  const [dog, setDog] = useState<Dog>()
  useEffect(() => {
    get(id).then((dog) => setDog(dog as Dog))
  }, [id])

  return (
    dog && (
      <div className="bg-white">
        <div className="flex flex-col mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Product details */}
          <div className="text-center">
            <div className="flex items-center mt-4">
              <p className="w-full text-lg text-gray-900 uppercase tracking-wider sm:text-xl">
                {dog.breed}
              </p>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {dog.name}
            </h1>

            <div className="flex items-center justify-center text-gray-700 mt-4">
              <CakeIcon className="w-5 h-5 mr-1" /> {dog.age} years old
              <span className="mx-2">–</span>
              <MapPinIcon className="w-5 h-5 mr-1" /> {dog.zip_code}
            </div>
          </div>

          {/* Product image */}
          <div className="mt-8">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <img
                src={dog.img}
                alt={dog.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Dog
