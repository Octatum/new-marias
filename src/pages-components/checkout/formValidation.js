import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('La dirección de correo es inválida')
    .required('Este campo es requerido'),
  firstName: yup
    .string()
    .min(2, 'Este campo debe tener más de 2 caracteres')
    .required('Este campo es requerido'),
  lastName: yup
    .string()
    .min(2, 'Este campo debe tener más de 2 caracteres')
    .required('Este campo es requerido'),
  street: yup.string().required('Este campo es requerido'),
  suburb: yup.string().required('Este campo es requerido'),
  city: yup.string().required('Este campo es requerido'),
  country: yup.string().required('Este campo es requerido'),
  state: yup.string().required('Este campo es requerido'),
  zipCode: yup.string().required('Este campo es requerido'),
  phone: yup
    .string()
    .min(4, 'El número de teléfono es inválido')
    .required('Este campo es requerido'),
});

export default validationSchema;
