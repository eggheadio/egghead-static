/** @jsx jsx */
import { jsx } from "theme-ui"

export default function Image({ items }) {
  return (
    <a
      href={`/lessons/${items[0].slug}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        height: 200,
        svg: { transition: "transform 150ms ease-in-out" },
        ":hover": {
          svg: {
            transition: "transform 150ms ease-in-out",
            transform: "scale(1.2)",
          },
        },
      }}
    >
      {items.slice(0, 3).map((item, i) => {
        const scale = 1 - i * 0.1
        return (
          <img
            key={item.id}
            src={item.thumb_nail}
            alt={item.title}
            width="240"
            style={{
              position: "absolute",
              zIndex: i,
              marginTop: i * 20,
              transform: `scale(${scale})`,
              boxShadow: "0 8px 25px -2px rgba(0,0,0,0.2)",
              borderRadius: 3,
            }}
          />
        )
      })}

      <svg
        sx={{
          position: "absolute",
          zIndex: 999,
          marginTop: "3rem",
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
      >
        <g fill="none" fillRule="evenodd" transform="translate(1 1)">
          <rect
            width="48"
            height="48"
            fill="#FFF"
            stroke="#242832"
            strokeWidth="2"
            rx="24"
          />
          <path
            fill="#242832"
            d="M20.8542732,17.9797719 L29.2605777,23.5839749 C29.490342,23.7371511 29.5524289,24.0475858 29.3992527,24.2773501 C29.3626353,24.3322762 29.3155038,24.3794077 29.2605777,24.4160251 L20.8542732,30.0202281 C20.6245088,30.1734044 20.3140742,30.1113174 20.1608979,29.8815531 C20.1061421,29.7994193 20.0769231,29.7029155 20.0769231,29.604203 L20.0769231,18.395797 C20.0769231,18.1196546 20.3007807,17.895797 20.5769231,17.895797 C20.6756356,17.895797 20.7721394,17.925016 20.8542732,17.9797719 Z"
          />
        </g>
      </svg>
    </a>
  )
}
