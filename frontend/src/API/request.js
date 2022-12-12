import axios from 'axios'
import config from '../config/default.json';

const BASE_URL = config.server.host;

export function AuthPost(path,body,cb){
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

export function Post(path,body,cb){
    axios.post(BASE_URL + path, body)
    .then((res) => {
        cb(res)
    }).catch(err => {
        cb(err)
    })
}

export function Delete(path,body,cb){
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

export function AuthGet(path,cb){
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

export function Get(path, cb) {
    axios.get(BASE_URL + path)
    .then((res) => {
        cb(res)
    }).catch(err => {
        cb(err)
    })
}