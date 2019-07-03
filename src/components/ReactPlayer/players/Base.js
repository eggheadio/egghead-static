import { Component } from 'react'

import { propTypes, defaultProps } from '../props'

const SEEK_ON_PLAY_EXPIRY = 5000

export default class Base extends Component {
  static propTypes = propTypes
  static defaultProps = defaultProps
  isReady = false
  startOnPlay = true
  durationOnPlay = false
  seekOnPlay = null
  componentDidMount() {
    const { url } = this.props
    this.mounted = true
    if (url) {
      this.load(url)
    }
  }
  componentWillUnmount() {
    this.stop()
    this.mounted = false
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { playing, volume, playbackRate } = this.props
    const url =
      this.props.dash_url ||
      this.props.hls_url ||
      this.props.wistia_url ||
      this.props.url
    const nextUrl =
      nextProps.dash_url || nextProps.hls_url || nextProps.wistia_url
    // Invoke player methods based on incoming props
    if (url !== nextUrl && nextUrl) {
      this.seekOnPlay = null
      this.startOnPlay = true
      this.load(nextProps)
    }

    if (url && !nextUrl) {
      this.stop()
      clearTimeout(this.updateTimeout)
    }

    if (!playing && nextProps.playing) {
      this.play()
    }

    if (playing && !nextProps.playing) {
      this.pause()
    }

    if (volume !== nextProps.volume) {
      this.setVolume(nextProps.volume)
    }

    if (playbackRate !== nextProps.playbackRate) {
      this.setPlaybackRate(nextProps.playbackRate)
    }
  }
  shouldComponentUpdate(nextProps) {
    const url =
      this.props.dash_url || this.props.hls_url || this.props.wistia_url
    const nextUrl =
      nextProps.dash_url || nextProps.hls_url || nextProps.wistia_url
    return url !== nextUrl
  }
  seekTo(fraction) {
    // When seeking before player is ready, store value and seek later
    if (!this.isReady && fraction !== 0) {
      this.seekOnPlay = fraction
      setTimeout(() => {
        this.seekOnPlay = null
      }, SEEK_ON_PLAY_EXPIRY)
    }
  }
  onPlay = () => {
    const { onStart, onPlay, onDuration, playbackRate } = this.props
    if (this.startOnPlay) {
      this.setPlaybackRate(playbackRate)
      onStart()
      this.startOnPlay = false
    }
    onPlay()
    if (this.seekOnPlay) {
      this.seekTo(this.seekOnPlay)
      this.seekOnPlay = null
    }
    if (this.durationOnPlay) {
      onDuration(this.getDuration())
      this.durationOnPlay = false
    }
  }
  onReady = () => {
    const { onReady, playing, onDuration } = this.props
    this.isReady = true
    this.loadingSDK = false
    onReady()
    if (playing || this.preloading) {
      this.preloading = false
      if (this.loadOnReady) {
        this.load(this.loadOnReady)
        this.loadOnReady = null
      } else {
        this.play()
      }
    }
    const duration = this.getDuration()
    if (duration) {
      onDuration(duration)
    } else {
      this.durationOnPlay = true
    }
  }
}
