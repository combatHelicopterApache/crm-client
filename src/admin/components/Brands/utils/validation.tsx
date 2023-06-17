import * as yup from 'yup'

export const brandFormSchema = yup.object({
  title: yup.string().required('Brand name is required').label('Brand name'),
  description: yup.string().nullable().label('Description'),
})
