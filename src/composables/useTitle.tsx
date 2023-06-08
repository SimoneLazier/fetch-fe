import { useEffect } from 'react'

let initialTitle: string

const useTitle = (title?: string) => {
  useEffect(() => {
    if (!initialTitle) initialTitle = document.title
    if (title) document.title = `${title} - ${initialTitle}`
    else document.title = initialTitle
  }, [title])
}

export default useTitle
