import { createContext, useContext } from "react";
import { useCourses } from "./useCourses";

const CourseContext = createContext();

export const CoursesProvider = ({ children }) => {
  const { courses, isLoading, error, refetch } = useCourses();
  const context = {
    refetch,
    isLoading,
    error,
    courses,
    getCourse(courseSlug) {
      return courses?.find((c) => c.slug === courseSlug);
    },
  };

  return (
    <CourseContext.Provider value={context}>{children}</CourseContext.Provider>
  );
};

export function useCoursesContext() {
  const context = useContext(CourseContext);
  if (!context) {
    throw Error("You do not have access from the Provider");
  }
  return context || {};
}
