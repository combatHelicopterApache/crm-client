export interface Brand {
  _id: string
  title: string
  description: string
  active: boolean
  logo: string
}

export interface Owner {
  _id: string
  full_name: string
  title: string
  phone: string
}

export interface Company {
  id: string
  title: string
  logo: string
  company_name: string
  company_identifier: string
  company_phone: string
  company_email: string
  admin_name: string
  admin_phone: string
  admin_email: string
  owner_id: string
  status: number
  notes: string
  address: string
  created_at: string
  brands: Brand[]
  owner: Owner
}
