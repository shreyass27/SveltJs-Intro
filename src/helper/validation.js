export function notEmpty(val) {
    return val && val.trim().length > 0;
}


const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export function validEmail(email) {
    return emailReg.test(email);
}