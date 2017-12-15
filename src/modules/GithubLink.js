import React from 'react'
import ReactGA from 'react-ga'

export default class GithubLink extends React.Component {
  render() {
    return (
      <div>
        <ReactGA.OutboundLink
          eventLabel="Github link"
          to="https://github.com/ben-rogerson/bemgen"
          target="_blank"
          rel="noopener noreferrer"
          className="github">
          <img className="github__img" src="github.svg" alt="Check it out on github" />
        </ReactGA.OutboundLink>
      </div>
    )
  }
}
