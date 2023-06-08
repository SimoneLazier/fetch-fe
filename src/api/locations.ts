import axios from 'axios'

export interface LocationFilters {
  states: string[]
  city: string
  boundingBox?: {
    top: number
    left: number
    bottom: number
    right: number
  }
}

/**
 * The class that handles the API communication for locations' data
 */
class LocationsApi {
  /**
   * Get the locations that match the filters
   *
   * @param filters The filters to be matched
   * @returns The list of locations
   */
  async search(filters: LocationFilters) {
    if (
      filters.city === '' &&
      !filters.boundingBox &&
      filters.states.length === 0
    )
      return { results: [], total: 0 }

    const { data } = await axios.post<{ results: Location[]; total: number }>(
      '/locations/search',
      {
        city: filters.city ? filters.city : undefined,
        states: filters.states.length ? filters.states : undefined,
        geoBoundingBox: filters.boundingBox
          ? {
              top_left: {
                lat: filters.boundingBox.top,
                lon: filters.boundingBox.left,
              },
              bottom_right: {
                lat: filters.boundingBox.bottom,
                lon: filters.boundingBox.right,
              },
            }
          : undefined,
        size: 100,
      },
    )

    return data.results.length ? data : null
  }
}

export default new LocationsApi()
