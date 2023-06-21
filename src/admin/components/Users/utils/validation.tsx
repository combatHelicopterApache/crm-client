import * as yup from 'yup'

const phoneRegExp = /^\+38\(\d{3}\) \d{2}-\d{2}-\d{3}$/

export const userFormSchema = yup.object({
  full_name: yup.string().required('User name is required').label('User name'),
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
    .label('Office phone')
    .required('Office Phone is required'),

  address: yup
    .string()
    .required('Company address is required')
    .label('Company address'),
  user_identifier: yup
    .string()
    .required('User identifier is required')
    .label('User identifier'),
})
