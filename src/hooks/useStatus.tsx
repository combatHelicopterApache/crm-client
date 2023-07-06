import React, { useState, useEffect } from 'react'

import { getStatus } from 'api/LeadStatus'

interface IStatusList {
  title: string
  color: string
  id: string
}

export const useStatus = (): { status: IStatusList[] } => {
  const [status, setStatus] = useState<IStatusList[]>([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getStatus()
        setStatus(data || [])
      } catch (error) {
        console.error(error)
      }
    }
    fetch()
  }, [])
  return { status }
}
