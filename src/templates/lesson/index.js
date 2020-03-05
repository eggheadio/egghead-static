import { jsx } from "theme-ui"
import Lesson from "../../components/lesson"

export default props => {
  return jsx(Lesson, {
    ...props,
    ...props.data.lesson,
  })
}
