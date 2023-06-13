import { useEffect, useState } from 'react'
import dogsApi, { DogFilters } from '../api/dogs'
import Loader from '../components/Loader'
import Filters from '../components/Filters'
import DogCard from '../components/DogCard'
import { useNavigate } from 'react-router'
import Pagination from '../components/Pagination'
import useTitle from '../composables/useTitle'

const PER_PAGE = 8

/**
 * The Dogs List page
 */
function Dogs() {
  useTitle('Dogs List')
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [dogs, setDogs] = useState<Dog[]>()
  const [selected, setSelected] = useState<string[]>([])
  const [filters, setFilters] = useState<DogFilters>({
    breeds: [],
    minAge: undefined,
    maxAge: undefined,
    zipCodes: [],
    sortBy: 'breed',
    desc: false,
  })

  // Remove/add a dog from the list of the selected ones
  const toggleSelected = (id: string) => {
    const i = selected.indexOf(id)
    setSelected(
      i >= 0
        ? [...selected.slice(0, i), ...selected.slice(i + 1)]
        : [...selected, id],
    )
  }

  useEffect(() => {
    // If page or filters change, fetch again the list of dogs
    dogsApi
      .search(PER_PAGE, (page - 1) * PER_PAGE, filters)
      .then(({ dogs, total }) => {
        setDogs(dogs)
        setTotal(total)
      })
  }, [page, filters])

  const navigate = useNavigate()
  const getResults = async () => {
    if (selected.length === 0) return
    const id = await dogsApi.match(selected)
    navigate(`/dogs/${id}`)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Choose your favorite dogs!
      </h1>

      {dogs === undefined && <Loader />}

      {dogs && (
        <>
          <Filters value={filters} onFilter={setFilters} />

          {dogs.length === 0 && <h3 className="my-6 text-lg">No results!</h3>}
          <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                active={selected.includes(dog.id)}
                onToggleSelect={() => toggleSelected(dog.id)}
                onGetResults={getResults}
              />
            ))}
          </div>

          <Pagination
            total={total}
            page={page}
            perPage={PER_PAGE}
            onChange={setPage}
          />
        </>
      )}
    </div>
  )
}

export default Dogs
