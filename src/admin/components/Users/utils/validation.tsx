import * as yup from 'yup'

//const phoneRegExp = /^[(][0-9]{3}[)][\s][0-9]{3}[-][0-9]{4}$/
const phoneRegExp = /^\+38\(\d{3}\) \d{2}-\d{2}-\d{3}$/

export const userFormSchema = yup.object({
  company_name: yup
    .string()
    .required('Company name is required')
    .label('Company name'),
  company_email: yup
    .string()
    .email('Invalid email address')
    .nullable()
    .required('Company email is required')
    .label('Company email'),
  company_phone: yup
    .string()
    .matches(phoneRegExp, 'Phone must match the following: +38(999) 99-99-999')
    .nullable()
    .label('Office phone')
    .required('Office Phone is required'),

  admin_name: yup
    .string()
    .required('Admin name is required')
    .label('Company name'),
  admin_email: yup
    .string()
    .email('Invalid email address')
    .nullable()
    .required('Admin email is required')
    .label('Admin email'),
  admin_phone: yup
    .string()
    .matches(phoneRegExp, 'Phone must match the following: +38(999) 99-99-999')
    .nullable()
    .label('Admin phone')
    .required('Admin Phone is required'),
  address: yup
    .string()
    .required('Company address is required')
    .label('Company address'),
  company_identifier: yup
    .string()
    .required('Company identifier is required')
    .label('Company identifier'),
})
