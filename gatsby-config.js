module.exports = {
  siteMetadata: {
    title: `egghead.io`,
    description: `Static version of egghead.io`,
    author: `@eggheadio`,
    canonicalUrl: `egghead.io`,
    keywords: [`development`],
    image: `images/logo.png`,
  },
  plugins: [
    `gatsby-transformer-egghead-resources`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data`,
        name: 'resources',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md', '.markdown'],
        defaultLayouts: {
          default: require.resolve('./src/components/layout.js'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'egghead.io',
        short_name: 'Static egghead.io',
        description: 'Static version of egghead.io',
        start_url: '/',
        background_color: '#5348ff',
        theme_color: '#5348ff',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    // `gatsby-plugin-offline`
  ],
}
