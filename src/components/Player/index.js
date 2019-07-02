import React from 'react'
import Clappr from 'clappr'
export default class Player extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    let changed = nextProps.source !== this.props.source
    this.props = nextProps
    this.state = nextState
    if (changed) {
      this.change(nextProps.source)
    }
    return false
  }

  componentDidMount() {
    this.change(this.props.source)
  }

  componentWillUnmount() {
    this.destroyPlayer()
  }

  destroyPlayer() {
    if (this.player) {
      this.player.destroy()
    }

    this.player = null
  }

  change() {
    const { source, poster } = this.props
    console.log(source)
    if (this.player) {
      this.destroyPlayer()
    }
    this.player = new Clappr.Player({
      parentId: '#player',
      source,
      poster,
      width: '100%',
      height: '100%',
      hlsjsConfig: {
        enableWorker: true,
      },
    })
  }

  render() {
    return (
      <div
        css={{
          width: '720px',
          height: '480px',
        }}
        id="player"
      />
    )
  }
}
