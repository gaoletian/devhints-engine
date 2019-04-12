import React from 'react'
import Helmet from 'react-helmet'
import Navigation from './Navigation'
import CSS from './Penpad.module.css'
import SpecimenPanels from './SpecimenPanels'
import SpecimenView from './SpecimenView'
import TitleBar from './TitleBar'
import TitleText from './TitleText'
import { Config } from './types'
import useAppState from './useAppState'

const Penpad = (props: Config) => {
  const { state, actions } = useAppState(props)
  const { title } = props
  const { activeView, specimens } = state

  // The active specimen
  const viewId = activeView && activeView.id
  const specimen = viewId && specimens && specimens[viewId]

  return (
    <div className={CSS.root}>
      <Helmet>
        <title>{title}</title>
        <meta name='viewport' content='width=1200px' />
      </Helmet>
      <div className={CSS.topnav}>
        <div className={CSS.title}>
          <TitleBar
            titleText={<TitleText parts={[<span>{title}</span>, viewId]} />}
          />
        </div>
      </div>
      <div className={CSS.body}>
        <main className={CSS.main}>
          {specimen ? <SpecimenView {...{ specimen }} /> : null}
        </main>
        <aside className={CSS.sidebar}>
          {specimens ? <Navigation {...{ specimens, state, actions }} /> : null}
        </aside>
        <aside className={CSS.panels}>
          {specimen && viewId ? (
            <SpecimenPanels {...{ specimen, id: viewId }} key={viewId} />
          ) : null}
        </aside>
      </div>
    </div>
  )
}

Penpad.defaultProps = {
  title: 'Penpad',
  pages: {}
}

export default Penpad
