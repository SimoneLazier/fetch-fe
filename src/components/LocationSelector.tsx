import Select from './Select'
import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import Modal from './Modal'
import Loader from './Loader'
import Map from './Map'
import states from '../utils/states'
import { MapIcon } from '@heroicons/react/24/outline'
import LocationsApi, { LocationFilters } from '../api/locations'

function getLocation() {
  const defaultLocation = {
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
      latitude: 41.8827,
      longitude: -87.6233,
    },
    timestamp: Date.now(),
  }
  return new Promise<GeolocationPosition>((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, () =>
        resolve(defaultLocation),
      )
    } else {
      resolve(defaultLocation)
    }
  })
}
interface LocationSelectorProps {
  onChange: (zipCodes: string[] | null) => void
}

function LocationSelector({ onChange }: LocationSelectorProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [location, setLocation] = useState<GeolocationPosition>()
  const [error, setError] = useState(false)
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    states: [],
    city: '',
    boundingBox: undefined,
  })
  const center = {
    lat: location?.coords.latitude ?? 0,
    lng: location?.coords.longitude ?? 0,
  }

  useEffect(() => {
    getLocation().then(setLocation)
  }, [])

  const confirm = async () => {
    const filters = { ...locationFilters }
    filters.states = Object.entries(states)
      .filter((entry) => filters.states.includes(entry[1]))
      .map((entry) => entry[0])
    const locations = await LocationsApi.search(filters)

    if (locations && locations.total > 100) {
      setError(true)
    } else if (locations && locations.total <= 100) {
      setError(false)
      onChange(locations.results.map((r) => r.zip_code))
      setModalOpen(false)
    } else {
      setError(false)
      onChange(null)
      setModalOpen(false)
    }
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-800"
        onClick={() => setModalOpen(true)}
      >
        <MapIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Location Filters
      </button>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirm}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-semibold leading-6 text-gray-900 mb-4 text-center"
        >
          Select location
        </Dialog.Title>
        {error && (
          <p className="text-red-700">
            Too many results, please narrow your research!
          </p>
        )}
        <div className="flex flex-wrap w-full gap-2">
          <div className="w-full flex-grow sm:w-auto">
            <label
              htmlFor="state"
              className="block text-sm font-medium leading-6 text-gray-900 mr-2"
            >
              States:
            </label>
            <Select
              id="state"
              name="state"
              options={Object.values(states).sort()}
              value={locationFilters.states}
              multiple
              placeholder="Illinois, California, ..."
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6 mt-2"
              onChange={(e) =>
                setLocationFilters({
                  ...locationFilters,
                  states: e as string[],
                })
              }
            />
          </div>
          <div className="w-full flex-grow sm:w-auto">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900 mr-2"
            >
              City:
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={locationFilters.city}
              placeholder="Chicago"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6 mt-2"
              onChange={(e) =>
                setLocationFilters({
                  ...locationFilters,
                  city: e.target.value.trim(),
                })
              }
            />
          </div>
        </div>
        <div className="relative grow mt-4">
          <div className="flex flex-col absolute inset-0">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Or click twice to draw a rectangle on the map:
            </label>
            <div className="grow rounded-md overflow-hidden">
              {location ? (
                <Map
                  center={center}
                  onSelect={(bb) =>
                    setLocationFilters({ ...locationFilters, boundingBox: bb })
                  }
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default LocationSelector
