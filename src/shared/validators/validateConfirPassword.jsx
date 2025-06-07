export const validateConfirmPassword = (pass, confPass) => {
    return pass === confPass
}

export const passwordConfirmationMessage = "Las contraseñas no coinciden por favor verifica que sean iguales"