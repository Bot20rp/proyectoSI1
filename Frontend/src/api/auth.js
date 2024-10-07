import axios from "./axios"


export const registerRequest = user => axios.post(`/clientReg`,user)
export const loginRequest = user => axios.post(`/login`,user)
export const obtenerRequest = () => { return axios.get('/obtener')};
export const verityTokenResquest = () => axios.get('/verify')