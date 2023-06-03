import { UserRole } from '../types'

export const getModulesByRole = (
  role_id: number,
): { [key: string]: boolean } => {
  let activeModules: string[] = []

  switch (role_id) {
    case UserRole.OWNER:
    case UserRole.ADMIN:
      activeModules = [
        'map',
        'dashboard',
        'appointments',
        'mail',
        'proposals',
        'properties',
        'clients',
        'schedules',
        'marketing',
        'time_cards',
        'request_review',
        'emailCampaign',
        'settings',
        'memberships',
        'work_schedule',
      ]
      break
    case UserRole.DISPATCHER:
      activeModules = [
        'map',
        'appointments',
        'proposals',
        'properties',
        'clients',
      ]
      break
    case UserRole.TECHNICIAN:
      activeModules = ['proposals', 'schedules']
      break
    case UserRole.WORKER:
      activeModules = ['schedules']
      break
    case UserRole.ACCOUNTANT:
      activeModules = [
        'fast_payment',
        'accounting',
        // 'dashboard',
        'mail',
        'proposals',
        'properties',
        'clients',
        // 'serviceContract',
        // 'time_cards',
        // 'request_review',
        // 'settings',
      ]
      break

    default:
      return activeModules
  }

  const modules = { ...MODULES }

  Object.keys(modules).forEach(module => {
    modules[module] = activeModules.includes(module) ? true : false
  })

  return modules
}
