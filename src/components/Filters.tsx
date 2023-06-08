import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import Select from './Select'
import dogsApi, { DogFilters } from '../api/dogs'
import { useEffect, useState } from 'react'
import LocationSelector from './LocationSelector'

interface FiltersProps {
  value: DogFilters
  onFilter: (filters: DogFilters) => void
}

function Filters({ value, onFilter }: FiltersProps) {
  const [breeds, setBreeds] = useState<string[]>([])
  useEffect(() => {
    dogsApi.getBreeds().then(setBreeds)
  }, [])

  return (
    <div className="flex flex-wrap gap-4 w-full my-8 justify-end sm:justify-between">
      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:w-auto">
          <label
            htmlFor="breed"
            className="block text-sm font-medium leading-6 text-gray-900 mr-2"
          >
            Breed:
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <Select
              id="breed"
              name="breed"
              options={breeds}
              value={value.breeds}
              placeholder="Labrador, Beagle, ..."
              multiple
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
              onChange={(breeds) =>
                onFilter({
                  ...value,
                  breeds: breeds as string[],
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900 mr-2 mb-2"
            >
              Location:
            </label>
            <LocationSelector
              onChange={(e) => onFilter({ ...value, zipCodes: e })}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="sm:w-36">
            <label
              htmlFor="minAge"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Minimum age:
            </label>
            <div className="mt-2">
              <input
                id="minAge"
                type="number"
                name="minAge"
                min={0}
                value={value.minAge ?? ''}
                placeholder="4"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  onFilter({
                    ...value,
                    minAge: e.target.value ? e.target.valueAsNumber : undefined,
                  })
                }
              />
            </div>
          </div>
          <div className="sm:w-36">
            <label
              htmlFor="maxAge"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Maximum age:
            </label>
            <div className="mt-2">
              <input
                id="maxAge"
                type="number"
                name="maxAge"
                min={0}
                value={value.maxAge ?? ''}
                placeholder="12"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  onFilter({
                    ...value,
                    maxAge: e.target.value ? e.target.valueAsNumber : undefined,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-end">
        <div>
          <label
            htmlFor="sort"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Sort By:
          </label>
          <select
            id="sort"
            name="sort"
            value={value.sortBy}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6 mt-2"
            onChange={(e) =>
              onFilter({
                ...value,
                sortBy: e.target.value as DogFilters['sortBy'],
              })
            }
          >
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="breed">Breed</option>
          </select>
        </div>
        <button
          className="p-2 rounded-md hover:bg-gray-100 focus:ring-2 ring-indigo-800"
          onClick={() => onFilter({ ...value, desc: !value.desc })}
        >
          {value.desc ? (
            <BarsArrowUpIcon className="w-5 h-5" />
          ) : (
            <BarsArrowDownIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  )
}

export default Filters
