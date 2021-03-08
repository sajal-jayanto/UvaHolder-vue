import axios from 'axios'

const http = axios.create({
    
    baseURL: 'https://uhunt.onlinejudge.org/api/', 
    headers: { 'Content-Type': 'application/json' }
    
});

export default http;
