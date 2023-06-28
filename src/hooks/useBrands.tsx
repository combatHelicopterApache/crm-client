import React, { useState, useEffect } from 'react'

import { getBrands } from 'api/Brands'

interface IBrandsList {
  title: string
  id: string
}

export const useBrands = (): { brands: IBrandsList[] } => {
  const [brands, setBrands] = useState<IBrandsList[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getBrands()
        setBrands(data || [])
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [])
  return { brands }
}
