export async function send_request(url: string) {
  let res
  try {
    res = await fetch(url)
  } catch (error) {
    console.log('REQUEST ERROR | Status: ', res?.status, ' Message: ', res?.statusText)
    return null
  }
  return res
}
