import { useEffect, useState } from 'react'
import dogsApi from '../api/dogs'
import Loader from '../components/Loader'
import Filters, { FiltersState } from '../components/Filters'
import DogCard from '../components/DogCard'
import { useNavigate } from 'react-router'
import Pagination from '../components/Pagination'

const PER_PAGE = 8

function Dogs() {
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [dogs, setDogs] = useState<(Dog & { active: boolean })[]>()
  const [filters, setFilters] = useState<FiltersState>({
    breeds: [],
    sortBy: 'breed',
    desc: false,
  })

  useEffect(() => {
    dogsApi.search(PER_PAGE, (page - 1) * PER_PAGE, filters).then((res) => {
      setDogs(res.dogs.map((dog) => ({ ...dog, active: false })))
      setTotal(res.total)
    })
  }, [page, filters])

  const navigate = useNavigate()
  const getResults = async () => {
    const id = await dogsApi.match(
      dogs!.filter((dog) => dog.active).map((dog) => dog.id),
    )
    navigate(`/dogs/${id}`)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Dogs List
      </h1>

      {dogs === undefined && <Loader />}

      {dogs && (
        <>
          <Filters value={filters} onFilter={setFilters} />
          <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {dogs.map(({ active, ...dog }) => (
              <DogCard
                key={dog.id}
                dog={dog}
                active={active}
                onToggleSelect={() =>
                  setDogs(
                    dogs.map((d) =>
                      d.id === dog.id ? { ...d, active: !d.active } : d,
                    ),
                  )
                }
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
