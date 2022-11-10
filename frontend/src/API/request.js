import axios from 'axios';
import config from '../config/default.json';

const host = config.server.host;
const  port = config.server.port;
const BASE_URL = "http://" + host + port

export async function Post(path,body,cb){
    axios.post(BASE_URL + path, body)
    .then((res) => {
        cb(res)
    }).catch(err => {
        cb(err)
    })
}

