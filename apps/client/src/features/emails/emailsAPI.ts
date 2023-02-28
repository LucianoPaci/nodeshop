import axios from 'axios'

// TODO: Add types
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000'
const GetEmails = async ({ sorted }) => {
  let url = `${apiUrl}/v1/emails`

  if (sorted) {
    url += `?sort=${sorted}`
  }
  return axios.get(url)
}
export { GetEmails }
