const path = require('path')
const _ = require('lodash')
const axios = require('axios')

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
            id
          }
        }
      }
    }
  `)

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
