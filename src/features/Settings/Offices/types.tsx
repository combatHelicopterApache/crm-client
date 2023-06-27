export interface Office {
  id?: string
  title?: string
  address?: string
  description?: string
  company_id?: string
  active?: boolean
  manager_id: string
  time_cards?: {
    time_start: string
    time_end: string
  }
}
