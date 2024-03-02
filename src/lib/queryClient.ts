export function makeQueryClient() {
  const fetchMap = new Map<string, Promise<never>>()
  return function queryClient<QueryResult>(
    name: string,
    query: () => Promise<QueryResult>,
  ): Promise<QueryResult> {
    if (!fetchMap.has(name)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      fetchMap.set(name, query())
    }
    return fetchMap.get(name)!
  }
}
