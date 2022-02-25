function usePromise(p) {
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
// useMemo calls and gives return of function
// useCallback checks the dependency
  useEffect(() => {
    let isCurrent = true
    setIsLoading(true)
    p()
      .then(results => {
        if (isCurrent) {
          setResults(results)
          setIsLoading(false)
        }
      })
      .catch(e => {
        if (isCurrent) {
          setError(e)
          setIsLoading(false)
        }
      })
  return () => {
    isCurrent = false
  }
}, [p])
return { results, isLoading, error}
}