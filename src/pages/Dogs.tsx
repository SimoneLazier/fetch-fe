import { useEffect, useState } from 'react'
import useDogs from '../composables/useDogs'
import Loader from '../components/Loader'
import Filters, { FiltersState } from '../components/Filters'
import DogCard from '../components/DogCard'
import { useNavigate } from 'react-router'
import Pagination from '../components/Pagination'

function Dogs() {
  const [dogs, setDogs] = useState<(Dog & { active: boolean })[]>()
  const [filters, setFilters] = useState<FiltersState>({
    breed: '',
    sortBy: 'breed',
    desc: false,
  })
  const { search, match } = useDogs()
  useEffect(() => {
    search(16, 0, filters).then((res) =>
      setDogs(res.map((dog) => ({ ...dog, active: false }))),
    )
  }, [])

  const navigate = useNavigate()
  const getResults = async () => {
    const id = await match(
      dogs!.filter((dog) => dog.active).map((dog) => dog.id),
    )
    navigate(`/dogs/${id}`)
  }

  const [page, setPage] = useState<number>(1)

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
            {dogs
              .slice((page - 1) * 8, page * 8)
              .map(({ active, ...dog }, i) => (
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
            total={dogs.length}
            page={page}
            perPage={8}
            onChange={setPage}
          />
        </>
      )}
    </div>
  )
}

export default Dogs
