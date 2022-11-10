import axios from 'axios';
import config from '../config/default.json';

const host = config.server.host;
const  port = config.server.port;
const BASE_URL = "http://" + host + port

export async function RegisterReq(path,body,cb){
    axios.post(BASE_URL + path, {
        username: body.username,
        password: body.password,
        password_rpt: body.password_rpt
    })
    .then((res) => {
        cb(res)
    }).catch(err => {
        cb(err)
    })
}

