import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios  from 'axios'

axios.defaults.baseURL = 'http://13.51.242.248:8080/'
// axios.defaults.baseURL = 'http://localhost:8080/'

axios.interceptors.request.use(
  config => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers['Authorization'] = token;
      }
      return config;
  },
  error => Promise.reject(error)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
