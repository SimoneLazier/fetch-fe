import { vi } from 'vitest'
import locationsApi, { LocationFilters } from './locations'

const mockLocation: DogLocation = {
  zip_code: '123',
  city: 'Chicago',
  county: 'Cook',
  latitude: 0,
  longitude: 0,
  state: 'IL',
}

vi.mock('axios', () => ({
  default: {
    async post(_: string, filters: LocationFilters) {
      return {
        data: {
          results: [mockLocation].filter((el) => el.city === filters.city),
          total: 1,
        },
      }
    },
  },
}))

describe('Locations API', () => {
  it('searches a location', async () => {
    expect(
      await locationsApi.search({ city: 'Chicago', states: ['IL'] }),
    ).toEqual({ results: [mockLocation], total: 1 })
  })

  it('returns an empty array if there are no filters', async () => {
    expect(await locationsApi.search({ city: '', states: [] })).toEqual({
      results: [],
      total: 0,
    })
  })

  it('returns null if there is no match', async () => {
    expect(
      await locationsApi.search({
        city: 'Madison',
        states: [],
        boundingBox: { top: 0, bottom: 0, left: 0, right: 0 },
      }),
    ).toBeNull()
  })
})
