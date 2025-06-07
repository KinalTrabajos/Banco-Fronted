export const validateUsername = (username) => {
    const regex = /^.{3,15}$/
    return regex.test(username)
}

export const validateUsernameMessage = 'Debe tener entre 3 y 15 caracteres.'