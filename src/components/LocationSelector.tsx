import Select from './Select'
import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import Modal from './Modal'
import Loader from './Loader'
import Map from './Map'
import states from '../utils/states'
import { MapIcon } from '@heroicons/react/24/outline'

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

// TODO: Update filters object, pull cities while writing
function LocationSelector() {
  const [modalOpen, setModalOpen] = useState(false)
  const [location, setLocation] = useState<GeolocationPosition>()
  const center = {
    lat: location?.coords.latitude ?? 0,
    lng: location?.coords.longitude ?? 0,
  }

  useEffect(() => {
    getLocation().then(setLocation)
  }, [])

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
        onConfirm={() => setModalOpen(false)}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-semibold leading-6 text-gray-900 mb-4 text-center"
        >
          Select location
        </Dialog.Title>
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
              options={Object.values(states)}
              value={[]}
              multiple
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6 mt-2"
              onChange={() => void 0}
            />
          </div>
          <div className="w-full flex-grow sm:w-auto">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900 mr-2"
            >
              Cities:
            </label>
            <Select
              id="city"
              name="city"
              options={['Chicago', 'Gaby']}
              value={[]}
              multiple
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6 mt-2"
              onChange={() => void 0}
            />
          </div>
        </div>
        <div className="relative grow mt-4">
          <div className="flex flex-col absolute inset-0">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Or click twice to draw a rectangle on the map:
            </label>
            <div className="grow rounded-md overflow-hidden">
              {location ? <Map center={center} /> : <Loader />}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default LocationSelector
