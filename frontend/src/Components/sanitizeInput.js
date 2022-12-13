const regExName = /^[A-z0-9-_]*$/;
const regExPwd = /(?=.*[a-zA-Z])(?=.*[0-9])/;
const regExSpecials = /[<>{}()[\]]/;

export function checkInput(username, password){

    if(username === "")
        return "Käyttäjänimi puuttuu"
    
    if(password === "")
        return "Salasana puuttuu"
    
    if(password.length > 30)
        return "Salasanan on oltava alle 30 merkkiä"
    
    if(password.length < 5)
        return "Salasanan on oltava yli 5 merkkiä"

    if(username.length > 30)
        return "Käyttäjänimen on oltava alle 30 merkkiä"

    if(username.length < 3)
       return "Käyttäjänimen on oltava yli 2 merkkiä"
    
    if(!regExPwd.test(password))
        return "Salasanassa on oltava ainakin yksi merkki sekä numero";

    if(regExSpecials.test(password))
        return "Salasana ei voi pitää sisällään <>{}[]()"

    if(!regExName.test(username))
        return "Käyttäjä nimi ei voi sisältää erikoismerkkejä tai väliä";

    return "";
}