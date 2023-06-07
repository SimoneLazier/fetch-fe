import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import Select from './Select'
import dogsApi from '../api/dogs'
import { useEffect, useState } from 'react'

export interface FiltersState {
  breeds: string[]
  sortBy: 'name' | 'age' | 'breed'
  desc: boolean
}

interface FiltersProps {
  value: FiltersState
  onFilter: (filters: FiltersState) => void
}

function Filters({ value, onFilter }: FiltersProps) {
  const [breeds, setBreeds] = useState<string[]>([])
  useEffect(() => {
    dogsApi.getBreeds().then(setBreeds)
  }, [])

  return (
    <div className="flex justify-between w-full my-8">
      <div>
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
      <div className="flex gap-2 items-end">
        <select
          value={value.sortBy}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
          onChange={(e) =>
            onFilter({
              ...value,
              sortBy: e.target.value as FiltersState['sortBy'],
            })
          }
        >
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="breed">Breed</option>
        </select>
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
