import axios from 'axios'
const directusInstance = axios.create({
    baseURL: '/directus',
    headers:{
        'Content-Type': 'application/json',
        'CF-Access-Client-Id': process.env.CF_ACCESS_CLIENT_ID,
        'CF-Access-Client-Secret': process.env.CF_ACCESS_CLIENT_SECRET,
        'Authorization': process.env.AUTH_TOKEN_DIRECTUS
    }
});

const miliSearchInstance = axios.create({
    baseURL: '/meilisearch',
    headers:{
        'Content-Type': 'application/json',
        'CF-Access-Client-Id': process.env.CF_ACCESS_CLIENT_ID,
        'CF-Access-Client-Secret': process.env.CF_ACCESS_CLIENT_SECRET,
        'Authorization': process.env.AUTH_TOKEN_MILISEARCH
    }
});

export {directusInstance, miliSearchInstance}