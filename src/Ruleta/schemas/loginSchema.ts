import * as Yup from 'yup';


export const loginSchema = Yup.object({
    email: Yup.string()
                    .email('Email no tiene un formato valido')
                    .required('Requerido'),
    password: Yup.string()
                    .max(15, 'Debe de tener max 15 caracteres o menos')
                    .required('Requerido'),
}) 