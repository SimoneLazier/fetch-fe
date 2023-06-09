import { vi } from 'vitest'
import dogsApi from './dogs'

const mockDog: Dog = {
  id: '1',
  age: 1,
  breed: 'Golden Retriever',
  name: 'Sparky',
  img: '',
  zip_code: '60607',
}

vi.mock('axios', () => ({
  default: {
    async get(url: string) {
      switch (url) {
        case '/dogs/breeds':
          return { data: ['a', 'b'] }
        case '/dogs/search':
          return { data: { resultIds: ['1'], total: 1 } }
      }
    },
    async post(url: string) {
      switch (url) {
        case '/dogs':
          return { data: [mockDog] }
        case '/dogs/match':
          return { data: { match: mockDog } }
      }
    },
  },
}))

describe('Dogs API', () => {
  it('get the list of breeds', async () => {
    expect(await dogsApi.getBreeds()).toEqual(['a', 'b'])
  })

  it('gets one dog by id', async () => {
    expect(await dogsApi.get('1')).toEqual(mockDog)
  })

  it('gets an array of dogs by ids', async () => {
    expect(await dogsApi.get(['1'])).toEqual([mockDog])
  })

  it('searches dogs', async () => {
    expect(
      await dogsApi.search(1, 0, {
        breeds: [],
        desc: false,
        sortBy: 'breed',
        zipCodes: [],
      }),
    ).toEqual({ dogs: [mockDog], total: 1 })
  })

  it('returns an empty array if search zip_codes is null', async () => {
    expect(
      await dogsApi.search(1, 0, {
        breeds: [],
        desc: false,
        sortBy: 'breed',
        zipCodes: null,
      }),
    ).toEqual({ dogs: [], total: 0 })
  })

  it('returns a matching dog', async () => {
    expect(await dogsApi.match(['1'])).toEqual(mockDog)
  })
})
