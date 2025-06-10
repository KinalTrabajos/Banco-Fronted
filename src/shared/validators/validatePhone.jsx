export const validatePhone = (phone) => {
    const regex = /^\S{8,8}$/;
    return regex.test(phone);
}

export const validateMessagePhone = "Solo se permite 8 digitos";