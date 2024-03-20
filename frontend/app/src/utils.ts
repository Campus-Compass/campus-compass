import axios from 'axios'

export async function send_request(url: string, method: string, data: any) {
  let res = undefined
  res = await axios({ method: method, url: url, data: data })
    .then(function (response) {
      res = response
      console.log('Request response: ', response)
    })
    .catch(function (error) {
      console.log('REQUEST ERROR: ', error)
    })
  return res
}

export async function post_request(url: string, data: any) {
  return send_request(url, 'post', data)
}

export async function get_request(url: string) {
  return send_request(url, 'get', {})
}
