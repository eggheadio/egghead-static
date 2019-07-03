/* eslint-disable */
import React from 'react'
import { withPrefix } from 'gatsby'
import loadScript from 'load-script'
import { get } from 'lodash'
import Base from './Base'

const SDK_URL = 'https://cdn.bitmovin.com/player/web/8.11.1/bitmovinplayer.js'
const SDK_GLOBAL = 'bitmovin'
const MATCH_URL = /^(https?:\/\/d2c5owlt6rorc3.cloudfront.net\/)(.[^/]*)\/(.*)$/
const SUBTITLE_ID = 'eh-subtitles'

export default class Bitmovin extends Base {
  static displayName = 'Bitmovin'

  id = 'egghead-player'

  constructor(props) {
    super(props)
    const url = props.dash_url || props.hls_url || props.wistia_url
    this.id = url && url.match(MATCH_URL)[2]
  }

  static canPlay(url) {
    return MATCH_URL.test(url)
  }

  onVideoAdaptation = e => {
    const { videoQualityCookie } = this.props
    if (videoQualityCookie) {
      return videoQualityCookie.id
    } else {
      return e.suggested
    }
  }

  getConfig(props) {
    const {
      dash_url,
      hls_url,
      poster,
      title,
      subtitlesUrl,
      videoQualityCookie,
    } = props || this.props

    const bitrate = get(videoQualityCookie, 'bitrate', '2400kbps')
    return {
      key: 'b8b63d1d-d00d-4a79-9e21-6a4694dd95b3',
      source: {
        dash: dash_url,
        hls: hls_url,
        title,
      },
      tweaks: {
        startup_threshold: 2.2,
        max_buffer_level: 120,
      },
      adaptation: {
        desktop: {
          startupBitrate: bitrate,
        },
        mobile: {
          startupBitrate: '1200kbps',
        },
      },
      poster: poster,
      tracks: [
        {
          file: subtitlesUrl,
          kind: 'subtitle',
        },
      ],
      playback: {
        restoreUserSettings: true,
      },
      cast: {
        enable: true,
        application_id: 'A12B45C6',
        message_namespace: 'urn:x-cast:my.custom.chromecast.namespace',
      },
      skin: { screenLogoImage: '' },
    }
  }

  addSubtitles = subtitlesUrl => {
    this.player.addSubtitle({
      id: SUBTITLE_ID,
      url: subtitlesUrl,
      label: 'English',
      lang: 'en',
    })

    if (this.props.displaySubtitles) {
      this.player.setSubtitle(SUBTITLE_ID)
    } else {
      this.player.setSubtitle()
    }
  }

  handleArrowPress = e => {
    const LEFT = 37,
      RIGHT = 39
    const currentTime = this.player.getCurrentTime()
    const duration = this.getDuration()
    const seekToDelta = delta => this.seekTo((currentTime + delta) / duration)
    switch (e.keyCode) {
      case LEFT:
        seekToDelta(-1)
        break
      case RIGHT:
        seekToDelta(2)
        break
      default:
        break
    }
  }

  containerListenForPlay = event => {
    if (this.player && event.keyCode == 32) {
      if (this.player.isPlaying()) {
        this.player.pause()
      } else {
        this.player.play()
      }
    }
  }

  componentDidMount() {
    const { subtitlesUrl } = this.props

    this.loadingSDK = true
    this.getSDK().then(script => {
      this.loadingSDK = false
      console.log(this.playerContainer)
      console.log(window.bitmovin)
      this.player = new window.bitmovin.player.Player(
        this.playerContainer,
        this.getConfig(),
      )
      this.player.load(this.getConfig().source).then(
        value => {
          const { videoQualityCookie } = this.props
          if (videoQualityCookie) {
            this.player.setVideoQuality(videoQualityCookie.id)
          }
          this.player.setPosterImage(this.props.poster)
          if (subtitlesUrl) {
            this.addSubtitles(subtitlesUrl)
          }
          this.addEventListeners()
          this.container.focus()
          this.onReady()
        },
        reason => {
          throw `Error while creating bitdash player instance, ${reason}`
        },
      )
    })
  }

  componentWillUnmount() {
    if (this.player) {
      this.removeListeners()
      this.player.destroy()
    }
  }

  getSDK() {
    return new Promise((resolve, reject) => {
      if (window[SDK_GLOBAL]) {
        resolve()
      } else {
        loadScript(SDK_URL, { async: false }, (err, script) => {
          if (err) reject(err)
          resolve(script)
        })
      }
    })
  }

  addEventListeners() {
    const {
      onPause,
      onEnded,
      onError,
      onPlayerProgress,
      onSubtitleChange,
      onVideoQualityChanged,
    } = this.props
    const PlayerEvent = window.bitmovin.player.PlayerEvent
    this.player.on(PlayerEvent.Play, this.onPlay)
    this.player.on(PlayerEvent.Pause, onPause)
    this.player.on(PlayerEvent.Error, onError)
    this.player.on(PlayerEvent.PlaybackFinished, onEnded)
    this.player.on(PlayerEvent.VideoAdaptation, this.onVideoAdaptation)
    this.player.on(PlayerEvent.VideoQualityChanged, onVideoQualityChanged)
    this.player.on(PlayerEvent.TimeChanged, onPlayerProgress)
    this.player.on(PlayerEvent.SubtitleChanged, onSubtitleChange)
    document.addEventListener('keydown', this.handleArrowPress, false)
    this.container.addEventListener('keypress', this.containerListenForPlay)
  }

  removeListeners() {
    const {
      onPause,
      onEnded,
      onError,
      onPlayerProgress,
      onSubtitleChange,
      onVideoQualityChanged,
    } = this.props
    const PlayerEvent = window.bitmovin.player.PlayerEvent
    this.player.off(PlayerEvent.Play, this.onPlay)
    this.player.off(PlayerEvent.Pause, onPause)
    this.player.off(PlayerEvent.Error, onError)
    this.player.off(PlayerEvent.VideoAdaptation, this.onVideoAdaptation)
    this.player.off(PlayerEvent.VideoQualityChanged, onVideoQualityChanged)
    this.player.off(PlayerEvent.PlaybackFinished, onEnded)
    this.player.off(PlayerEvent.TimeChanged, onPlayerProgress)
    this.player.off(PlayerEvent.SubtitleChanged, onSubtitleChange)
    document.removeEventListener('keydown', this.handleArrowPress)
    this.container.removeEventListener('keypress', this.containerListenForPlay)
  }

  load(nextProps) {
    if (this.isReady) {
      this.removeListeners()

      this.player.load(this.getConfig(nextProps).source).then(() => {
        this.player.removeSubtitle(SUBTITLE_ID)
        this.player.setPosterImage(nextProps.poster)
        if (nextProps.subtitlesUrl) {
          this.addSubtitles(nextProps.subtitlesUrl)
        }
        this.addEventListeners()
        this.props.onReady()
        this.onReady()
      })
    }
  }

  play() {
    if (!this.isReady || !this.player) return
    this.player.play()
  }

  pause() {
    if (!this.isReady || !this.player) return
    this.player && this.player.pause()
  }

  stop() {
    if (!this.isReady || !this.player) return
    this.player.pause()
  }

  seekTo(fraction) {
    super.seekTo(fraction)
    if (!this.isReady || !this.player) return
    this.player.seek(this.getDuration() * fraction)
  }

  setVolume(fraction) {
    if (!this.isReady || !this.player || !this.player.setVolume) return
    this.player.setVolume(fraction * 100)
  }

  setPlaybackRate(rate) {
    if (!this.isReady || !this.player || !this.player.setPlaybackSpeed) return
    this.player.setPlaybackSpeed(rate)
  }

  getDuration() {
    if (!this.isReady || !this.player || !this.player.getDuration) return
    return this.player.getDuration()
  }

  getFractionPlayed() {
    if (
      !this.isReady ||
      !this.player ||
      !this.player.getCurrentTime ||
      !this.player.getDuration
    )
      return null
    return this.player.getCurrentTime() / this.player.getDuration()
  }

  getFractionLoaded() {
    return null
  }

  render() {
    const url =
      this.props.dash_url || this.props.hls_url || this.props.wistia_url
    const style = {
      width: '100%',
      height: '100%',
      display: url ? 'block' : 'none',
    }
    return (
      <div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <input
            aria-hidden={true}
            ref={container => (this.container = container)}
            style={{ position: 'absolute', right: '-1000px', top: '-1000px' }}
          />
        </div>
        <div
          ref={playerContainer => (this.playerContainer = playerContainer)}
          id={this.id}
          className={this.id}
          style={style}
        />
      </div>
    )
  }
}
