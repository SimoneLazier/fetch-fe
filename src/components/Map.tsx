import { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'

let map: google.maps.Map
let maps: google.maps.MapsLibrary
let area: google.maps.Rectangle

const rectStyle = {
  strokeColor: '#3730a3',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#3730a3',
  fillOpacity: 0.35,
}

interface MapProps {
  center: { lat: number; lng: number }
}

// TODO: Fix for mobile, add reset button
function Map({ center }: MapProps) {
  const [rectangle, setRectangle] = useState<number[]>([])
  const [lastClick, setLastClick] = useState<number[]>([])
  const [hover, setHover] = useState<number[]>([])

  useEffect(() => {
    const [lat, lng] = lastClick
    if (!lat || !lng || (rectangle.includes(lat) && rectangle.includes(lng)))
      return

    if (rectangle.length === 4 || rectangle.length === 0)
      setRectangle([lat, lng])
    else setRectangle([...rectangle, lat, lng])
  }, [lastClick, rectangle])

  useEffect(() => {
    if (!maps || rectangle.length !== 2) return
    area?.setMap(null)
    area = new maps.Rectangle({
      ...rectStyle,
      map,
      bounds: {
        north: Math.max(hover[0], rectangle[0]),
        south: Math.min(hover[0], rectangle[0]),
        east: Math.max(hover[1], rectangle[1]),
        west: Math.min(hover[1], rectangle[1]),
      },
    })
    area.setOptions({ clickable: false })
  }, [hover, rectangle])

  const apiLoaded = (
    newMap: google.maps.Map,
    newMaps: google.maps.MapsLibrary,
  ) => {
    map = newMap
    maps = newMaps
    map.addListener('click', clickHandler)
    map.addListener('mousemove', hoverHandler)
  }
  const clickHandler = (e: { latLng: google.maps.LatLng }) =>
    setLastClick([e.latLng.lat(), e.latLng.lng()])
  const hoverHandler = (e: { latLng: google.maps.LatLng }) =>
    setHover([e.latLng.lat(), e.latLng.lng()])

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: import.meta.env.VITE_MAPS_KEY }}
      options={{ clickableIcons: false }}
      defaultCenter={center}
      defaultZoom={13}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => apiLoaded(map, maps)}
    />
  )
}

export default Map
