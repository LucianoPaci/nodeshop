import axios from 'axios'

// TODO: Add types
const GetOrders = async () => {
  return axios.get('/v1/orders')
}

export { GetOrders }
