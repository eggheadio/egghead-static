/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "./layout"

export default function Podcast({
  children,
  data: {
    podcast: { title },
  },
  ...props
}) {
  return (
    <Layout title={title} {...props}>
      <Styled.h1 sx={{ mt: "6px" }}>{title}</Styled.h1>
    </Layout>
  )
}
