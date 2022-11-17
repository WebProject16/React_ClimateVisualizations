const regExName = /^[A-z][A-z0-9-_]{3,30}$/;
const regExPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;

export function checkInput(username, password){

    if(!regExName.test(username)){
        return "Username cannot contain special characters";
    }

    if(!regExPwd.test(password)){
        return "invalid password";
    }

    return "";
}