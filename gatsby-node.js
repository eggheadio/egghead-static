const path = require('path')
const _ = require('lodash')
const axios = require('axios')
const { createFilePath } = require('gatsby-source-filesystem')
const { urlResolve, createContentDigest } = require('gatsby-core-utils')

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info,
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  createTypes(`interface BlogPost @nodeInterface {
      id: ID!
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      tags: [String]!
      keywords: [String]!
      excerpt: String!
      card: File @fileByRelativePath
      published: Boolean!
  }`)

  createTypes(
    schema.buildObjectType({
      name: `MdxBlogPost`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
        slug: {
          type: `String!`,
        },
        card: {
          type: `File`,
        },
        published: {
          type: `Boolean!`,
        },
        date: { type: `Date!`, extensions: { dateformat: {} } },
        tags: { type: `[String]!` },
        keywords: { type: `[String]!` },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
      },
      interfaces: [`Node`, `BlogPost`],
    }),
  )
}

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async (
  { node, actions, getNode, createNodeId },
  themeOptions,
) => {
  const { createNode, createParentChildLink } = actions

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (node.internal.type === `Mdx` && source === 'content') {
    let slug
    if (node.frontmatter.slug) {
      if (path.isAbsolute(node.frontmatter.slug)) {
        // absolute paths take precedence
        slug = node.frontmatter.slug
      } else {
        // otherwise a relative slug gets turned into a sub path
        slug = urlResolve('/', node.frontmatter.slug)
      }
    } else {
      // otherwise use the filepath function from gatsby-source-filesystem
      const filePath = createFilePath({
        node: fileNode,
        getNode,
        basePath: 'content',
      })

      slug = urlResolve('/', filePath)
    }
    // normalize use of trailing slash
    slug = slug.replace(/\/*$/, `/`)
    const fieldData = {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags || [],
      slug,
      date: node.frontmatter.date,
      keywords: node.frontmatter.keywords || [],
      card: node.frontmatter.card,
      published: node.frontmatter.published,
    }

    const mdxBlogPostId = createNodeId(`${node.id} >>> MdxBlogPost`)
    await createNode({
      ...fieldData,
      // Required fields.
      id: mdxBlogPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxBlogPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the BlogPost interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(mdxBlogPostId) })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { data } = await graphql(`
    {
      allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }
      allPodcast {
        edges {
          node {
            slug
          }
        }
      }
      allLesson {
        edges {
          node {
            slug
          }
        }
      }
      allCourse {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  `)

  if (data.errors) {
    reporter.panic(data.errors)
  }

  const { allBlogPost } = data
  const posts = allBlogPost.edges

  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    const { slug } = post
    actions.createPage({
      path: slug,
      component: path.resolve(`./src/templates/post/post-query.js`),
      context: {
        id: post.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    })
  })

  // Create the Posts page
  actions.createPage({
    path: '/archive',
    component: path.resolve(`./src/templates/posts/posts-query.js`),
    context: {},
  })

  data.allLesson.edges.forEach(({ node: lesson }) => {
    actions.createPage({
      path: `/lessons/${lesson.slug}`,
      component: path.resolve(`./src/templates/lesson/lesson-query.js`),
      context: {
        slug: lesson.slug,
      },
    })
  })

  data.allPodcast.edges.forEach(({ node: podcast }) => {
    actions.createPage({
      path: `/podcasts/${podcast.slug}`,
      component: path.resolve(`./src/templates/podcast/podcast-query.js`),
      context: {
        slug: podcast.slug,
      },
    })
  })

  data.allCourse.edges.forEach(({ node: course }) => {
    actions.createPage({
      path: `/courses/${course.slug}`,
      component: path.resolve(`./src/templates/course/course-query.js`),
      context: {
        slug: course.slug,
      },
    })
  })
}

exports.onCreateWebpackConfig = ({ actions, loaders }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
        $components: path.resolve(__dirname, 'src/components'),
      },
    },
  })
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const todoApp = await axios(`https://egghead.io/api/v1/playlists/349783`)
  const convertingServerlessApp = await axios(
    `https://egghead.io/api/v1/playlists/350751`,
  )

  const collections = [todoApp.data, convertingServerlessApp.data]

  collections.forEach(collection =>
    createNode(
      Object.assign({}, collection, {
        id: createNodeId(`collection-${collection.id}`),
        parent: null,
        children: [],
        internal: {
          type: `collection`,
          mediaType: `application/json`,
          content: JSON.stringify(collection),
          contentDigest: createContentDigest(collection),
        },
      }),
    ),
  )
}
