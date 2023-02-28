import axios from 'axios'

// TODO: Add types
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000'
const GetOrders = async () => {
  return axios.get(`${apiUrl}/v1/orders?sort=desc`)
}
const PostOrder = async (data) => {
  return axios.post(`${apiUrl}/v1/order`, data)
}

export { GetOrders, PostOrder }
