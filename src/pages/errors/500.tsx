import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import img404 from '../../assets/error-dog.png'
import useTitle from '../../composables/useTitle'

/**
 * The 500 page
 */
function Error500() {
  useTitle('Error')
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-full">
      <img src={img404} className="mb-8" />
      <h1 className="text-2xl font-semibold">An unexpected error occurred</h1>
      <a
        href="/dogs"
        className="flex items-center text-center mt-4 font-medium text-indigo-800 hover:text-indigo-600"
      >
        Go to the dog list
        <ArrowLongRightIcon className="ml-3 h-5 w-5 -mb-1" aria-hidden="true" />
      </a>
    </div>
  )
}

export default Error500
