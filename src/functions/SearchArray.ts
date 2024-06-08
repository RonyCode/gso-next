// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const searchCitiesOfState = (array, condition) => {
  if (array.length === 0) {
    return []
  }
  const [head, ...tail] = array
  if (condition(head)) {
    return [head, ...searchCitiesOfState(tail, condition)]
  }
  return searchCitiesOfState(tail, condition)
}
