export enum UserRole {
  DEFAULT_SUPER_ADMIN = 1,
  OWNER = 2,
  ADMIN = 3,
  MANAGER = 4,
  AGENT = 5,
  WORKER = 6,
  ACCOUNT_MANAGER = 7,
}
export const UserRoleStr = {
  1: 'SUPER_ADMIN',
  2: 'OWNER',
  3: 'ADMIN',
  4: 'MANAGER',
  5: 'AGENT',
  6: 'WORKER',
  7: 'ACCOUNT_MANAGER',
}

export enum UserStatus {
  Inactive,
  Active,
  Pending,
}

export enum UserSalesId {
  SALES = 1,
}
export enum UserSalesRole {
  SALES = 'sales',
}

export interface User {
  full_name: string
  title: string
  email: string
  phone: string
  password: string
  is_admin: boolean
  user_logo: string
  active: boolean
  role_id: UserRole
  role_name: string
  company_id: string
  company_name: string
  background_color: string
  notes: string
  address: string
  user_identifier: string
  permissions: { [key: string]: boolean }
  restrictions: {
    lead: {
      lead_upload: boolean
      lead_download: boolean
      lead_events: number[]
    }
    affiliates: {
      affiliates_events: number[]
    }
    deposits: {
      deposits_events: number[]
    }
    calendar: {
      calendar_events: number[]
    }
    groups: {
      groups_events: number[]
    }
    analytics: {
      analytics_events: number[]
    }
    settings: {
      user_events: number[]
      office_events: number[]
      company_events: number[]
    }
  }
  user_sales_role_id: UserSalesId
  user_sales_role: UserSalesRole
  user_ips: string[]
  last_login: string
  login_from_admin: boolean
  brands: { brand_id: string; brand_name: string }[]
  desk_id: string
  desk_name: string
  manager_id: string
  manager_name: string
  owner_id: string
  owner_name: string
  time_cards: {
    time_start: string
    time_end: string
  }
}

export enum UserCRUD {
  CREATE = 1,
  UPDATE = 2,
  DELETE = 3,
  READ = 4,
  ALL = 5,
}
