import axios from 'axios'
import { FiltersState } from '../components/Filters'

interface SearchResponse {
  resultIds: string[]
}

interface MatchResponse {
  match: string
}

const useDogs = () => {
  const get = async (ids: string | string[]) => {
    const { data } = await axios.post<Dog[]>(
      '/dogs',
      Array.isArray(ids) ? ids : [ids],
    )
    return Array.isArray(ids) ? data : data[0]
  }
  const search = async (take: number, skip: number, filters: FiltersState) => {
    const { data } = await axios.get<SearchResponse>('/dogs/search', {
      params: {
        size: take,
        from: skip,
        sort: `${filters.sortBy}:${filters.desc ? 'desc' : 'asc'}`,
      },
    })
    return (await get(data.resultIds)) as Dog[]
  }
  const match = async (ids: string[]) => {
    const { data } = await axios.post<MatchResponse>('/dogs/match', ids)
    return data.match
  }
  return { get, search, match }
}

export default useDogs
