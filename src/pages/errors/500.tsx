import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import img404 from '../../assets/error-dog.png'
import { useNavigate } from 'react-router'

function Error500() {
  const navigate = useNavigate()
  const redirect = () => {
    navigate('/dogs')
  }

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-full">
      <img src={img404} className="mb-8" />
      <h1 className="text-2xl font-semibold">An unexpected error occurred</h1>
      <button
        className="flex items-center mt-4 font-medium text-indigo-800 hover:text-indigo-600"
        onClick={redirect}
      >
        Go back to the dog list
        <ArrowLongRightIcon className="ml-3 h-5 w-5 -mb-1" aria-hidden="true" />
      </button>
    </div>
  )
}

export default Error500
