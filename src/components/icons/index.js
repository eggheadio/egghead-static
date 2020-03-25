import React from 'react'

export function VideoPlayer(props) {
  const title = props.title || 'video player'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
    >
      <title>{title}</title>
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      >
        <path
          d="M21,2a2,2,0,0,1,2,2V20a2,2,0,0,1-2,2H3a2,2,0,0,1-2-2V4A2,2,0,0,1,3,2Z"
          fill="none"
          stroke="currentColor"
        />
        <polygon fill="none" points="10 8 16 12 10 16 10 8" />
      </g>
    </svg>
  )
}
export function FreeForever(props) {
  const title = props.title || 'community resource'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 22"
    >
      <title>{title}</title>
      <path
        fill="currentColor"
        stroke="none"
        d="M22.08,8.88 L18.48,8.88 C17.744,7.136 16,5.92 13.984,5.92 C11.296,5.92 9.104,8.096 9.104,10.768 C9.104,13.44 11.296,15.616 13.984,15.616 C16,15.616 17.728,14.4 18.464,12.672 L22.08,12.672 C23.136,12.672 24,11.824 24,10.768 C24,9.744 23.136,8.88 22.08,8.88 Z M13.984,12.656 C12.944,12.656 12.096,11.824 12.096,10.784 C12.096,9.744 12.944,8.912 13.984,8.912 C15.024,8.912 15.872,9.744 15.872,10.784 C15.872,11.824 15.024,12.656 13.984,12.656 Z"
      />
      <path
        fill="currentColor"
        stroke="none"
        d="M21.664,17.824 L18.848,15.232 C18.64,15.04 18.336,15.056 18.144,15.248 C16.912,16.416 15.2,17.104 13.328,16.944 C10.304,16.704 7.872,14.24 7.664,11.232 C7.408,7.648 10.272,4.64 13.84,4.64 C15.408,4.64 16.832,5.216 17.936,6.176 C18.128,6.352 18.432,6.352 18.624,6.176 L21.488,3.552 C21.6,3.44 21.616,3.264 21.504,3.152 C19.408,1.072 16.48,-0.16 13.264,0.016 C8.208,0.272 4.032,4.032 3.152,8.88 L1.92,8.88 C0.864,8.88 0,9.744 0,10.8 C0,11.856 0.864,12.72 1.92,12.72 L3.152,12.72 C4.064,17.76 8.496,21.6 13.84,21.6 C16.928,21.6 19.696,20.32 21.68,18.272 C21.792,18.144 21.792,17.952 21.664,17.824 Z"
      />
    </svg>
  )
}

export function Play(props) {
  const title = props.title || 'play'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
    >
      <g fill="none" fillRule="evenodd">
        <polygon points="0 0 24 0 24 24 0 24" />
        <path
          fill="currentColor"
          fillRule="nonzero"
          d="M7.752,5.439 L18.26,11.569 C18.4132325,11.658703 18.507398,11.822942 18.507398,12.0005 C18.507398,12.178058 18.4132325,12.342297 18.26,12.432 L7.752,18.562 C7.5970255,18.652435 7.40547472,18.652895 7.25006768,18.5632053 C7.09466064,18.4735156 6.99922813,18.3074296 6.99999535,18.128 L6.99999535,5.871 C6.99999535,5.69192758 7.09566305,5.5264994 7.25093775,5.43729904 C7.40621244,5.34809868 7.59733449,5.34874749 7.752,5.439 Z"
        />
      </g>
    </svg>
  )
}
