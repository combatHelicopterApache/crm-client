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
  background_color: string | null
  commission_type: number
  commission_percent: number
  email: string
  full_name: string
  id?: number
  invite_email?: null
  last_login?: string
  login_from_admin?: boolean
  labor_rate: string
  password_changed_at?: string
  permissions: { [key: string]: boolean }
  phone: string
  project_status_change: boolean
  restrict_contract_access: boolean
  role_id: number
  status: UserStatus
  title: string
  token_confirmation?: null
  useAsTech: boolean
  use_clock_in_with_gps: boolean
  can_open_proposal_insights: boolean
  has_access_to_proposal_insights: boolean
  proposal_insights_open_level: number | null
  proposal_insights_action_level: number | null
}
