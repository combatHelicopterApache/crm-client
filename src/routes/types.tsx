export enum RoutesPath {
  LOGIN = '/login',
  HOME_ROUTE = '/',
  LEADS_ROUTE = '/leads',
  LEAD_ROUTE = '/lead/:id',
  GROUPS_ROUTE = '/groups',
  USERS_ROUTE = '/users',
  USER_ROUTE = '/users/:id',

  ANALYTICS_ROUTE = '/analytics',
  LOGIN_ROUTE = '/login',
  AFFILIATES_ROUTE = '/affiliates',
  CALENDAR_ROUTE = '/calendar',
  SETTINGS_ROUTE = '/settings/*',
  SETTINGS_ROUTE_USERS = '/users',
  SETTINGS_ROUTE_COMPANY = '/company-info',
  SETTINGS_ROUTE_OFFICES = '/offices',
  SETTINGS_ROUTE_USER = '/users/:id',
  DEPOSITS_ROUTE = '/deposits',
  BRANDS_ROUTE = '/brands',
  ALL = '*',
}

export enum AdminRoutesPath {
  LOGIN = '/login',
  ADMIN_USERS_ROUTE = '/admin/users',
  ADMIN_USER_ROUTE = '/admin/user/:id',
  ADMIN_USER_CREATE_ROUTE = '/admin/user/create',
  ADMIN_COMPANIES_ROUTE = '/admin/companies',
  ADMIN_COMPANY_CREATE_ROUTE = '/admin/companies/create',
  ADMIN_COMPANY_ROUTE = '/admin/company/:id',

  ADMIN_BRANDS_ROUTE = '/admin/brands',
  ADMIN_BRAND_CREATE_ROUTE = '/admin/brand/create',
  ADMIN_BRAND_ROUTE = '/admin/brand/:id',
}
