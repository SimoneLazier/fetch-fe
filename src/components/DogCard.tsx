import { CheckIcon } from '@heroicons/react/24/outline'
import { CakeIcon, MapPinIcon } from '@heroicons/react/20/solid'
import { MouseEvent } from 'react'
import { classNames } from '../utils/class-names'

/**
 * A single dog card
 *
 * @param props The dog object, the active state, and the event listeners
 */
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
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md text-white">
          <div
            className={classNames([
              'absolute bg-gradient-to-tr from-purple-500/50 via-indigo-500/50 to-indigo-900/50 transition-all duration-200',
              active ? 'inset-0' : 'inset-full',
            ])}
          />
          <div
            className={classNames([
              'relative transition-all duration-200',
              active ? 'opacity-100' : 'opacity-0',
            ])}
          >
            <div className="flex font-semibold text-lg">
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
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{dog.name}</h3>
          <div className="mt-1 text-sm text-gray-500">
            <div className="flex items-center mb-1">
              <CakeIcon className="w-4 h-4 mr-1" /> {dog.age || '<1'} years old
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
