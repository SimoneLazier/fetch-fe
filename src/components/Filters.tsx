import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'

export interface FiltersState {
  breed: string
  sortBy: 'name' | 'age' | 'zip_code' | 'breed'
  desc: boolean
}

interface FiltersProps {
  value: FiltersState
  onFilter: (filters: FiltersState) => void
}

function Filters({ value, onFilter }: FiltersProps) {
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
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            id="breed"
            type="text"
            name="breed"
            value={value.breed}
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-800 sm:text-sm sm:leading-6"
            placeholder="Labrador, Beagle, ..."
            onChange={(e) =>
              onFilter({
                ...value,
                breed: e.target.value.trim(),
              })
            }
          />
        </div>
      </div>
      <div className="flex gap-2 items-end">
        <select
          value={value.sortBy}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-800 sm:text-sm sm:leading-6"
          onChange={(e) =>
            onFilter({
              ...value,
              sortBy: e.target.value as FiltersState['sortBy'],
            })
          }
        >
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="zip_code">Zip Code</option>
          <option value="breed">Breed</option>
        </select>
        <button
          className="p-2 rounded-md hover:bg-gray-100 focus:ring-2 ring-purple-800"
          onClick={() => onFilter({ ...value, desc: !value.desc })}
        >
          {value.desc ? (
            <BarsArrowDownIcon className="w-5 h-5" />
          ) : (
            <BarsArrowUpIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  )
}

export default Filters
