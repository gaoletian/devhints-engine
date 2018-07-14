/* @flow */
import * as React from 'react'
import { Consumer } from '../lib/context'
import CommentsArea from './CommentsArea'
import MainHeading from './MainHeading'
import MiniMarkdown from './MiniMarkdown'
import PostContent from './PostContent'
import PreFooter from './PreFooter'
import RelatedPostsArea from './RelatedPostsArea'
import SearchFooter from './SearchFooter'
import CommonHead from './CommonHead'
import TopNav from './TopNav'
import Helmet from 'react-helmet'
import type { HtmlAst, Frontmatter, Context, SiteLink } from '../types'

/**
 * Properties for the `<View />`
 */

export type Props = {
  frontmatter: Frontmatter,
  htmlAst: HtmlAst,
  relatedPages: Array<SiteLink>,
  topPages: Array<SiteLink>,
  pageCount: number
}

export type ViewProps = Props & {
  sheetSuffix: string
}

/**
 * Logic-less view
 */

export const View = ({
  frontmatter,
  htmlAst,
  relatedPages,
  topPages,
  pageCount,
  sheetSuffix
}: ViewProps) => (
  <React.Fragment>
    <Helmet>
      <title>{(frontmatter.title || '') + ' ' + sheetSuffix}</title>
    </Helmet>

    <CommonHead />

    <TopNav back />

    <div className='body-area'>
      <MainHeading title={frontmatter.title || ''} suffix={sheetSuffix} />

      {/* Introduction */}
      {frontmatter && frontmatter.intro ? (
        <div className='intro-content MarkdownBody'>
          <MiniMarkdown source={frontmatter.intro} />
        </div>
      ) : null}

      {/* Post content */}
      <PostContent className='post-content MarkdownBody' {...{ htmlAst }} />
    </div>

    <PreFooter />
    <CommentsArea />
    <SearchFooter />
    <RelatedPostsArea
      {...{ pageCount, relatedPages, topPages, categoryName: frontmatter.category }}
    />
  </React.Fragment>
)

/**
 * Sheet template view (connected).
 *
 * @example
 *     <SheetTemplateView
 *       frontmatter={{ title: 'Vim', category: 'Editors' }}
 *       htmlAst={...}
 *       relatedPages={[ ... ]}
 *       topPages={[ ... ]}
 *       pageCount={382}
 *     />
 */

export const SheetTemplateView = (props: Props) => (
  <Consumer>
    {({ CONTENT }: Context) => (
      <View {...props} sheetSuffix={CONTENT.sheet.suffix || ''} />
    )}
  </Consumer>
)

export default SheetTemplateView
