import * as Yup from 'yup';


export const registerSchema = Yup.object({
    email: Yup.string()
                    .email('Email no tiene un formato valido')
                    .required('Requerido'),
    password: Yup.string()
                    .max(15, 'Debe de tener max 15 caracteres o menos')
                    .required('Requerido'),
    passConfirmation: Yup.string()
                    .oneOf([Yup.ref('password')], 'La contraseña debe de coincidir')
                    .required('Requerido'),

}) 