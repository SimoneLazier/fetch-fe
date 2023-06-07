import axios from 'axios'

const useDogs = async (): Promise<Dog[]> => {
  const { data: ids } = await axios.get<{ resultIds: string[] }>('/dogs/search')
  const { data } = await axios.post('/dogs', ids.resultIds.slice(0, 100))
  return data
}

export default useDogs
