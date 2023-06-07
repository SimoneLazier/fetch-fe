import axios from 'axios'
import { FiltersState } from '../components/Filters'

interface SearchResponse {
  resultIds: string[]
  total: number
}

interface MatchResponse {
  match: string
}

class DogsApi {
  async getBreeds() {
    const { data } = await axios.get('/dogs/breeds')
    return data
  }

  async get(ids: string | string[]) {
    const { data } = await axios.post<Dog[]>(
      '/dogs',
      Array.isArray(ids) ? ids : [ids],
    )
    return Array.isArray(ids) ? data : data[0]
  }

  async search(take: number, skip: number, filters: FiltersState) {
    const { data } = await axios.get<SearchResponse>('/dogs/search', {
      params: {
        breeds: filters.breeds,
        ageMin: filters.minAge,
        ageMax: filters.maxAge,
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

  async match(ids: string[]) {
    const { data } = await axios.post<MatchResponse>('/dogs/match', ids)
    return data.match
  }
}

export default new DogsApi()
