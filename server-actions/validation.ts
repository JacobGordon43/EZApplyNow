//Function for validating an email via a regex string
function validateEmail(email : string){
    let res = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm
    return res.test(email)
}
//Function for validating a password,  enforcing 8 characters, at least one special, numerical, upper, and lower case character

function validatePassword(password : string){
    let res = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/
    return res.test(password);
}

export {validateEmail, validatePassword}