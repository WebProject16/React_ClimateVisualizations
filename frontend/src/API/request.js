import axios from 'axios'
import config from '../config/default.json';

const host = config.server.host;
const port = config.server.port;
const BASE_URL = "http://" + host + port

export async function AuthPost(path,body,cb){
    const token = "Bearer " + localStorage.getItem('token')

    axios.post(BASE_URL + path, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }}
    ).then(res => {
        cb(res)
    }).catch(err => {
        cb(err)
    })
}

export async function Post(path,body,cb){
    axios.post(BASE_URL + path, body)
    .then((res) => {
        cb(res)
    }).catch(err => {
        cb(err)
    })
}

export async function Delete(path,body,cb){
    const token = "Bearer " + localStorage.getItem('token')
    axios.delete(BASE_URL + path, {
        headers: {
            'Authorization':token
        },
        data: body
    })
    
    .then((res) => {
        console.log(res)
        cb(res)
    }).catch(err => {
        console.log(err)
        cb(err)
    })
}

export async function AuthGet(path,cb){
    const token = "Bearer " + localStorage.getItem('token')
    axios.get(BASE_URL + path, {
        headers: {
            'Authorization':token
        }
    })
    .then((res) => {
        cb(res)
    }).catch(err => {
        cb(err)
    })
}

export async function Get(path, cb) {
    axios.get(BASE_URL + path)
    .then((res) => {
        cb(res)
    }).catch(err => {
        cb(err)
    })
}