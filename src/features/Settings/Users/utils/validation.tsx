import * as yup from 'yup'

const phoneRegExp = /^\+38\(\d{3}\) \d{2}-\d{2}-\d{3}$/

export const userFormSchema = yup.object({
  full_name: yup.string().required('User name is required').label('User name'),
  password: yup
    .string()
    .min(3)
    .required('Password  is required')
    .label('Password'),
  email: yup
    .string()
    .email('Invalid email address')
    .nullable()
    .required('User email is required')
    .label('User email'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone must match the following: +38(999) 99-99-999')
    .nullable()
    .label('User phone')
    .required('User Phone is required'),
  manager_id: yup
    .string()
    .nullable()
    .required('Manager is required')
    .label('Manager'),
  role_id: yup
    .number()
    .nullable()
    .label('Role ')
    .required('User Role  is required'),
  active: yup
    .boolean()
    .nullable()
    .label('Status')
    .required('Status  is required'),
  admin_id: yup
    .string()
    .nullable()
    .label('Admin')
    .required('Admin  is required'),
  brand_id: yup
    .string()
    .nullable()
    .label('Admin')
    .required('Brand  is required'),
  address: yup
    .string()
    .required('User address is required')
    .label('User address'),
  user_identifier: yup
    .string()
    .required('User identifier is required')
    .label('User identifier'),
  title: yup.string().label('Title'),
})
