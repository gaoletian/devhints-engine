const root = require('path').resolve.bind(null, __dirname)

/*
 * Where cheatsheets are
 */

const SHEET_PATH = process.env.SHEET_PATH || root('sheets')
const PATH_PREFIX = process.env.PATH_PREFIX

/*
 * Gatsby configuration
 */

module.exports = {
  ...(PATH_PREFIX ? { pathPrefix: PATH_PREFIX } : {}),
  siteMetadata: {
    title: 'Devhints',
    sheetPath: SHEET_PATH
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: SHEET_PATH,
        name: 'markdown-pages'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-component']
      }
    }
    // {
    //   resolve: `gatsby-plugin-sass`,
    //   options: {
    //     implementation: require('sass')
    //   }
    // }
  ]
}
