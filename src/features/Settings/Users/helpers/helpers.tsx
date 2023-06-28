import { UserRole } from '../types'
import { MODULES } from '../utils/const'

export const getModulesByRole = (
  role_id: number,
): { [key: string]: boolean } => {
  let activeModules: string[] = []

  switch (role_id) {
    case UserRole.OWNER:
    case UserRole.ADMIN:
    case UserRole.MANAGER:
      activeModules = [
        'dashboard',
        'leads',
        'affiliates',
        'deposits',
        'calendar',
        'groups',
        'users',
        'analytics',
        'settings',
        'company_info',
      ]
      break

    case UserRole.AGENT:
      activeModules = ['leads']
      break
    case UserRole.WORKER:
      activeModules = ['leads']
      break
    case UserRole.ACCOUNT_MANAGER:
      activeModules = ['dashboard', 'leads', 'analytics']
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
