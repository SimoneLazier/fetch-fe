import { useEffect } from 'react'

let initialTitle: string

/**
 * A custom hook that changes the page title
 *
 * @param title The new title. If undefined, the initial title is set
 */
const useTitle = (title?: string) => {
  useEffect(() => {
    if (!initialTitle) initialTitle = document.title
    if (title) document.title = `${title} - ${initialTitle}`
    else document.title = initialTitle
  }, [title])
}

export default useTitle
