export async function isValidJSON(response: Response) {
  const json = await response.text()
  try {
    return JSON.parse(json)
  } catch (error) {
    return {}
  }
}
