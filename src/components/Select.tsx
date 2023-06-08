import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { classNames } from '../utils/class-names'

interface SelectProps extends Record<string, unknown> {
  options: string[]
  value: string | string[]
  multiple?: boolean
  onChange: (values: string | string[]) => void
}

/**
 * A select element with searchable elements
 *
 * @param props The possible options, the current value, whether to allows multiple selections, the event listener. The other props are forwarded to the search box
 */
function Select({ options, multiple, value, onChange, ...props }: SelectProps) {
  const [selected, setSelected] = useState(value)
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase()),
        )

  const setSelectedOption = (options: string | string[]) => {
    setSelected(options)
    onChange(options)
  }

  return (
    <Combobox
      as="div"
      value={selected}
      onChange={setSelectedOption}
      className="relative"
      multiple={multiple as false | undefined /* Library typing is wrong */}
    >
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        {...props}
      />
      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </Combobox.Button>

      {filteredOptions.length > 0 && (
        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredOptions.map((option) => (
            <Combobox.Option
              key={option}
              value={option}
              className={({ active }) =>
                classNames([
                  'relative cursor-default select-none py-2 pl-8 pr-4',
                  active ? 'bg-indigo-800 text-white' : 'text-gray-900',
                ])
              }
            >
              {({ active, selected }) => (
                <>
                  <span
                    className={classNames([
                      'block truncate',
                      selected && 'font-semibold',
                    ])}
                  >
                    {option}
                  </span>

                  {selected && (
                    <span
                      className={classNames([
                        'absolute inset-y-0 left-0 flex items-center pl-1.5',
                        active ? 'text-white' : 'text-indigo-800',
                      ])}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </Combobox>
  )
}

export default Select
