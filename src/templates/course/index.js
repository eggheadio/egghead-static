import { jsx } from "theme-ui"
import Course from "../../components/course"

export default props => {
  return jsx(Course, {
    ...props,
    ...props.data.course,
  })
}
