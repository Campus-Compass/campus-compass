import axios from 'axios'

export async function send_request(url: string, method: string, data: any) {
  console.log(process.env)
  console.log(process.env.REACT_APP_DOMAIN_NAME)
  return await axios({ method: method, baseURL: process.env.REACT_APP_DOMAIN_NAME, url: url, data: data })
    .then(function (response) {
      console.log('Request response: ', response)
      return response.data
    })
    .catch(function (error) {
      console.log('REQUEST ERROR: ', error)
      return undefined
    })
}

export async function post_request(url: string, data: any) {
  return await send_request(url, 'post', data)
}

export async function get_request(url: string) {
  return await send_request(url, 'get', {})
}
