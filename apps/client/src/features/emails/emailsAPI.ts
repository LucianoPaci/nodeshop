import axios from 'axios'

// TODO: Add types
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000'
const GetEmails = async () => {
  return axios.get(`${apiUrl}/v1/emails`)
}
export { GetEmails }
