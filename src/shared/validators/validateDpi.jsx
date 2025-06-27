export const validateDpI = (dpi) => {
    const regex = /^\S{13,13}$/;
    return regex.test(dpi);
}

export const validateMessageDpi = "Debe tener 13 caracteres y no debe contener espacios.";