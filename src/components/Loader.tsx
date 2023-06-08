import loading from '../assets/loading-dog.gif'

/**
 * A simple loader
 */
function Loader() {
  return (
    <div className="flex items-center w-full justify-center">
      <img src={loading} className="-mb-36" />
    </div>
  )
}

export default Loader
