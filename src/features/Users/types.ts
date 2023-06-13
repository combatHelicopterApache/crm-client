export enum UserRole {
  DEFAULT_SUPER_ADMIN = 1,
  OWNER = 2,
  ADMIN = 3,
  MANAGER = 4,
  AGENT = 5,
  WORKER = 6,
  ACCOUNT_MANAGER = 7,
}

export enum UserStatus {
  Inactive,
  Active,
  Pending,
}

export interface User {
  email: string
  full_name: string
  id?: number
  permissions: { [key: string]: boolean }
  phone: string
  role_id: number
  status: UserStatus
  title: string
  address: string
  manager_id: null | number
  brand_id: null | number
  admin_id: null | number
  background_color: string | null
  user_identifier: string
  notes: string
  password: string
}
