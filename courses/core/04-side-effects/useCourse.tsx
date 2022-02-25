function useCourse(courseSlug) {
  const [course, setCouse] = useState<CourseWithLessons | null>(null);
  const lessons = course && course.lessons
  const isLoading = course === null
  useEffect(() => {
    let isCurrent = true
    api.courses.getCourse(courseSlug).then(course => {
      if (isCurrent) {
        setCourse(course)
      }
    })
    return () => {
      isCurrent = false
    }
  }, [courseSlug])
}