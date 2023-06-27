import React, { useState, useEffect } from 'react'
import { getUsersList } from 'api/Users'

interface IUsersList {
  full_name: string
  id: string
}

export const useUsers = (): { users: IUsersList[] } => {
  const [users, setUsers] = useState<IUsersList[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsersList()
        setUsers(data || [])
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [])
  return { users }
}
