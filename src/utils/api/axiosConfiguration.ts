import axios from 'axios'
const directusInstance = axios.create({
    baseURL: '/directus',
    headers:{
        'Content-Type': 'application/json',
        'CF-Access-Client-Id': process.env.NEXT_PUBLIC_CF_ACCESS_CLIENT_ID,
        'CF-Access-Client-Secret': process.env.NEXT_PUBLIC_CF_ACCESS_CLIENT_SECRET,
        'Authorization': process.env.NEXT_PUBLIC_AUTH_TOKEN_DIRECTUS
    }
});

const miliSearchInstance = axios.create({
    baseURL: '/meilisearch',
    headers:{
        'Content-Type': 'application/json',
        'CF-Access-Client-Id': process.env.NEXT_PUBLIC_CF_ACCESS_CLIENT_ID,
        'CF-Access-Client-Secret': process.env.NEXT_PUBLIC_CF_ACCESS_CLIENT_SECRET,
        'Authorization': process.env.NEXT_PUBLIC_AUTH_TOKEN_MILISEARCH
    }
});

export {directusInstance, miliSearchInstance}