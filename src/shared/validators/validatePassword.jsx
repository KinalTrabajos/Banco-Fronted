export const validatePassword = (password) => {
    const regex = /^\S{10,20}$/;
    return regex.test(password);
}

export const validatePasswordMessage = "La contraseña debe tener entre 10 y 20 caracteres y no debe contener espacios.";