const regExName = /^[A-z0-9-_]*$/;
const regExPwd = /(?=.*[a-zA-Z])(?=.*[0-9])/;
const regExSpecials = /[<>{}()[\]]/;

export function checkInput(username, password){

    if(username === "")
        return "Käyttäjänimi puuttuu"
    
    if(password === "")
        return "Salasana puuttuu"
    
    if(password.length > 30)
        return "Salasanan tulee olla lyhyempi kuin 30 merkkiä"
    
    if(password.length < 5)
        return "Salasanan tulee olla pidempi kuin 5 merkkiä"

    if(username.length > 30)
        return "Käyttäjänimen on oltava lyhyempi kuin 30 merkkiä"

    if(username.length < 3)
       return "Käyttäjänimen on oltava yli 2 merkkiä pitkä"
    
    if(!regExPwd.test(password))
        return "Salasanassa on oltava kirjain ja numero";

    if(regExSpecials.test(password))
        return "Salasanassa ei saa olla merkkejä <>{}[]()"

    if(!regExName.test(username))
        return "Käyttäjänimi ei voi sisältää erikoismerkkejä";

    return "";
}