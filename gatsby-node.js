const path = require('path')
const _ = require('lodash')

const paginate = require('gatsby-awesome-pagination')
const PAGINATION_OFFSET = 7

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
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
          }
        }
      }
    }
  `)

  const courseEdges = _.get(data.allCourse, 'edges')
  createPaginatedPages(
    actions.createPage,
    courseEdges,
    'src/templates/courses.js',
    '/courses',
    [],
  )

  data.allLesson.edges.forEach(({ node: lesson }) => {
    actions.createPage({
      path: `/lessons/${lesson.slug}`,
      component: path.resolve(`./src/templates/lesson.js`),
      context: {
        slug: lesson.slug,
      },
    })
  })

  data.allPodcast.edges.forEach(({ node: podcast }) => {
    actions.createPage({
      path: `/podcasts/${podcast.slug}`,
      component: path.resolve(`./src/templates/podcast.js`),
      context: {
        slug: podcast.slug,
      },
    })
  })

  data.allCourse.edges.forEach(({ node: course }) => {
    actions.createPage({
      path: `/courses/${course.slug}`,
      component: path.resolve(`./src/templates/course.js`),
      context: {
        slug: course.slug,
      },
    })
  })
}

const createPaginatedPages = (
  createPage,
  edges,
  templatePath,
  pathPrefix,
  context,
) => {
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET)

    if (!acc[pageIndex]) {
      acc[pageIndex] = []
    }

    acc[pageIndex].push(value.node.id)

    return acc
  }, [])

  pages.forEach((page, index) => {
    const nextPagePath = `${pathPrefix}/${index + 1}`
    const previousPagePath =
      index === 1 ? pathPrefix : `${pathPrefix}/${index - 1}`

    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
      component: path.resolve(templatePath),
      context: {
        pagination: {
          page,
          nextPagePath: index === pages.length - 1 ? null : nextPagePath,
          previousPagePath: index === 0 ? null : previousPagePath,
          pathPrefix,
        },
        ...context,
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

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const titleSlugged = _.join(_.drop(parent.name.split('-'), 3), '-')

    const slug =
      parent.sourceInstanceName === 'legacy'
        ? `blog/${node.frontmatter.date
            .split('T')[0]
            .replace(/-/g, '/')}/${titleSlugged}`
        : node.frontmatter.slug || titleSlugged

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter.published,
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    })

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : '',
    })

    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    })

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    })

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    })

    createNodeField({
      name: 'redirects',
      node,
      value: node.frontmatter.redirects,
    })
  }
}
