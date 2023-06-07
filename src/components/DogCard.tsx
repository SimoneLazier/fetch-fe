import { CheckIcon } from '@heroicons/react/24/outline'
import { CakeIcon, MapPinIcon } from '@heroicons/react/20/solid'
import { MouseEvent } from 'react'

function DogCard({
  dog,
  active,
  onToggleSelect,
  onGetResults,
}: {
  dog: Dog
  active: boolean
  onToggleSelect: () => void
  onGetResults: () => void
}) {
  const toggle = (e: MouseEvent) => {
    e.preventDefault()
    onToggleSelect()
  }
  const getResults = (e: MouseEvent) => {
    e.stopPropagation()
    onGetResults()
  }
  return (
    <a href="#" key={dog.id} className="group relative" onClick={toggle}>
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
        <img
          src={dog.img}
          alt={dog.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
        {active && (
          <div className="absolute flex flex-col items-center justify-center inset-0 rounded-md bg-gradient-to-tr from-purple-400/50 to-indigo-800/50 text-white">
            <div className="flex">
              <CheckIcon className="w-6 h-6 mr-1" /> Selected
            </div>
            <button
              type="button"
              className="rounded-md mt-4 bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              onClick={getResults}
            >
              See Results
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{dog.name}</h3>
          <div className="mt-1 text-sm text-gray-500">
            <div className="flex items-center mb-1">
              <CakeIcon className="w-4 h-4 mr-1" /> {dog.age} years old
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-1" /> {dog.zip_code}
            </div>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-900">{dog.breed}</p>
      </div>
    </a>
  )
}

export default DogCard
