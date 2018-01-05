import React from 'react'
import ReactGA from 'react-ga'
import GithubLink from './modules/GithubLink'
import ExportButtonContainer from './containers/ExportButtonContainer'
import BlockNamerContainer from './containers/BlockNamerContainer'
import Logo from './modules/Logo'
import ElementListContainer from './containers/ElementListContainer'
import { isDev } from './utilities/utilities'
import ExporterContainer from './containers/ExporterContainer';

export default class extends React.Component {

  componentDidMount() {
    // Start GA tracking
    ReactGA.initialize('UA-111321688-1', {
      debug: isDev,
      titleCase: false,
    })

    ReactGA.pageview('/')
  }

  render() {
    const { isExport, blockName, isConfigOpen } = this.props

    return (
      <div className="container">

        <Logo />
        <GithubLink />

        { blockName ?

          <div className="section">
            <ElementListContainer />
            { ! isConfigOpen && <ExportButtonContainer isExport={isExport} /> }
          </div> :

          <BlockNamerContainer />
        }

        { isExport && <ExporterContainer /> }

      </div>
    )
  }

}
