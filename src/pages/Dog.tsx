import {
  ArrowLongLeftIcon,
  CakeIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid'
import dogsApi from '../api/dogs'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import confetti from 'canvas-confetti'
import { Link } from 'react-router-dom'
import useTitle from '../composables/useTitle'

/**
 * The Dog page
 */
function Dog() {
  const id = useParams().id as string
  const [dog, setDog] = useState<Dog>()
  useTitle(dog?.name)
  useEffect(() => {
    dogsApi.get(id).then((dog) => {
      setDog(dog as Dog)
      const confettiAnimation = confetti.create(undefined, {
        resize: true,
        useWorker: true,
      })
      confettiAnimation({ particleCount: 100, spread: 160 })
    })
  }, [id])

  return (
    <div className="bg-white">
      <div className="flex flex-col mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {!dog ? (
          <Loader />
        ) : (
          <>
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
                <CakeIcon className="w-5 h-5 mr-1" /> {dog.age || '<1'} years
                old
                <span className="mx-2">–</span>
                <MapPinIcon className="w-5 h-5 mr-1" /> {dog.zip_code}
              </div>
            </div>

            <div className="mt-8">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                <img
                  src={dog.img}
                  alt={dog.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            <div className="flex justify-center w-full">
              <Link
                to="/dogs"
                className="flex items-center mt-4 font-medium text-indigo-800 hover:text-indigo-600 text-center"
              >
                <ArrowLongLeftIcon
                  className="ml-3 h-5 w-5 -mb-1"
                  aria-hidden="true"
                />
                Try with another search
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dog
