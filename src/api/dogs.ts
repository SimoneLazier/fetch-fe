import axios from 'axios'

interface SearchResponse {
  resultIds: string[]
  total: number
}

interface MatchResponse {
  match: string
}

export interface DogFilters {
  breeds: string[]
  minAge?: number
  maxAge?: number
  zipCodes: string[] | null
  sortBy: 'name' | 'age' | 'breed'
  desc: boolean
}

/**
 * The class that handles the API communication for dogs' data
 */
class DogsApi {
  /**
   * Get the list of breeds
   *
   * @returns The list of breeds
   */
  async getBreeds() {
    const { data } = await axios.get<string[]>('/dogs/breeds')
    return data
  }

  /**
   * Get dogs from id/ids
   *
   * @param ids An id or a list of ids
   * @returns The list of dogs
   */
  async get(ids: string | string[]) {
    const { data } = await axios.post<Dog[]>(
      '/dogs',
      Array.isArray(ids) ? ids : [ids],
    )
    return Array.isArray(ids) ? data : data[0]
  }

  /**
   * Search for dogs that match the given filters
   *
   * @param take For pagination
   * @param skip For pagination
   * @param filters Filters to match
   * @returns The ids of the dogs
   */
  async search(take: number, skip: number, filters: DogFilters) {
    if (filters.zipCodes === null)
      return {
        dogs: [],
        total: 0,
      }

    const { data } = await axios.get<SearchResponse>('/dogs/search', {
      params: {
        breeds: filters.breeds,
        ageMin: filters.minAge,
        ageMax: filters.maxAge,
        zipCodes: filters.zipCodes,
        size: take,
        from: skip,
        sort: `${filters.sortBy}:${filters.desc ? 'desc' : 'asc'}`,
      },
    })

    return {
      dogs: (await this.get(data.resultIds)) as Dog[],
      total: data.total,
    }
  }

  /**
   * Get the dog that matches the user preferences
   *
   * @param ids Id of the liked dogs
   * @returns The id of the matched dog
   */
  async match(ids: string[]) {
    const { data } = await axios.post<MatchResponse>('/dogs/match', ids)
    return data.match
  }
}

export default new DogsApi()
