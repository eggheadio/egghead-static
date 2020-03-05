/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "./layout"

export default function Lesson({
  children,
  data: {
    lesson: { slug, title },
  },
  ...props
}) {
  return (
    <Layout title={title} {...props}>
      <Styled.h1 sx={{ mt: "6px" }}>{title}</Styled.h1>
    </Layout>
  )
}
