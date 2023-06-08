import { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'

let map: google.maps.Map
let maps: google.maps.MapsLibrary
let area: google.maps.Rectangle

const drawRectangle = (rectangle: number[]) => {
  area = new maps.Rectangle({
    strokeColor: '#3730a3',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#3730a3',
    fillOpacity: 0.35,
    map,
    bounds: {
      north: Math.max(rectangle[2], rectangle[0]),
      south: Math.min(rectangle[2], rectangle[0]),
      east: Math.max(rectangle[3], rectangle[1]),
      west: Math.min(rectangle[3], rectangle[1]),
    },
  })
  area.setOptions({ clickable: false })
}

interface Rectangle {
  top: number
  left: number
  bottom: number
  right: number
}

interface MapProps {
  center: { lat: number; lng: number }
  value?: Rectangle
  onSelect: (rectangle?: Rectangle) => void
}

function Map({ center, value, onSelect }: MapProps) {
  const [rectangle, setRectangle] = useState<number[]>(
    value ? [value.top, value.left, value.bottom, value.right] : [],
  )
  const [firstClick, setFirstClick] = useState<number[] | undefined>(
    value ? [value.top, value.left] : undefined,
  )
  const [lastClick, setLastClick] = useState<number[] | undefined>(
    value ? [value.bottom, value.right] : undefined,
  )
  const [hover, setHover] = useState<number[]>([])
  const [click, setClick] = useState<number[]>(
    value ? [value.bottom, value.right] : [],
  )

  useEffect(() => {
    if (
      (firstClick?.at(0) === click[0] && firstClick?.at(1) === click[1]) ||
      (lastClick?.at(0) === click[0] && lastClick?.at(1) === click[1])
    )
      return
    if (!firstClick) setFirstClick(click)
    else if (!lastClick) setLastClick(click)
    else {
      setFirstClick(click)
      setLastClick(undefined)
    }
  }, [click, firstClick, lastClick])

  useEffect(() => {
    if (!firstClick) setRectangle([])
    else setRectangle([...firstClick, ...(lastClick ?? hover)])

    if (firstClick && lastClick)
      onSelect({
        top: Math.max(firstClick[0], lastClick[0]),
        left: Math.min(firstClick[1], lastClick[1]),
        bottom: Math.min(firstClick[0], lastClick[0]),
        right: Math.max(firstClick[1], lastClick[1]),
      })
    else onSelect(undefined)
    // TODO: fix dependency
  }, [firstClick, lastClick, hover])

  useEffect(() => {
    area?.setMap(null)
    if (maps && rectangle.length === 4) drawRectangle(rectangle)
  }, [rectangle])

  const apiLoaded = (
    newMap: google.maps.Map,
    newMaps: google.maps.MapsLibrary,
  ) => {
    map = newMap
    maps = newMaps
    map.addListener('click', clickHandler)
    map.addListener('mousemove', hoverHandler)
    if (rectangle.length === 4) drawRectangle(rectangle)
  }
  const clickHandler = (e: { latLng: google.maps.LatLng }) =>
    setClick([e.latLng.lat(), e.latLng.lng()])
  const hoverHandler = (e: { latLng: google.maps.LatLng }) =>
    setHover([e.latLng.lat(), e.latLng.lng()])

  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_MAPS_KEY }}
        options={{ clickableIcons: false }}
        defaultCenter={center}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiLoaded(map, maps)}
      />
      {lastClick && (
        <button
          className="absolute top-12 left-6 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          onClick={() => {
            setRectangle([])
            setClick([])
            setFirstClick(undefined)
            setLastClick(undefined)
          }}
        >
          Reset
        </button>
      )}
    </>
  )
}

export default Map
