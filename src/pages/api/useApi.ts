import Cookies from 'js-cookie'
import axios from 'axios'

const token = Cookies.get('token')
export const apiUrl = process.env.NEXT_PUBLIC_API_URL
export const api = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${token}` },
})

//         headers: { Authorization: `Bearer ${token}` },
//       },
//  { 'X-Custom-Header': 'foobar' }
export const apiAuth = axios.create({
  baseURL: apiUrl,
})
