const regExName = /^[A-z0-9-_]*$/;
const regExPwd = /(?=.*[a-zA-Z])(?=.*[0-9])/;
const regExSpecials = /[<>{}()[\]]/;

export function checkInput(username, password){

    if(username === "")
        return "Username is missing"
    
    if(password === "")
        return "Password is missing"
    
    if(password.length > 30)
        return "Password must be shorter than 30 characters"
    
    if(password.length < 5)
        return "Password must be longer than 5 characters"

    if(username.length > 30)
        return "Username must be shorter than 30 characters"

    if(username.length < 3)
       return "Username must be longer than 2 characters"
    
    if(!regExPwd.test(password))
        return "Password must contain a letter and a number";

    if(regExSpecials.test(password))
        return "Password cannot have <>{}[]()"

    if(!regExName.test(username))
        return "Username cannot contain special characters or space";

    return "";
}