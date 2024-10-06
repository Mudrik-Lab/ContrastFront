import { useEffect } from "react"

export default function usePreventNumberInputScroll() {
    useEffect(() => {
      const handleWheel = (e:Event) => {
        if (document.activeElement && document.activeElement.tagName === 'INPUT') {
          const inputElement = document.activeElement as HTMLInputElement
          if (inputElement.type === 'number') {
            e.preventDefault()
          }
        }
      }
      // Attach the event listener to the window
      window.addEventListener('wheel', handleWheel, { passive: false })
      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('wheel', handleWheel)
      }
    }, [])
  }