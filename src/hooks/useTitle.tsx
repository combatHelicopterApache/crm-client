import { useEffect } from 'react'

export const useTitle = (title = 'Caparra CRM') => {
  useEffect(() => {
    document.title = title
    return () => {
      document.title = 'Caparra CRM'
    }
  }, [title])
}
