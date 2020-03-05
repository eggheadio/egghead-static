import { jsx } from "theme-ui"
import Podcast from "../../components/podcast"

export default props => {
  return jsx(Podcast, {
    ...props,
    ...props.data.podcast,
  })
}
