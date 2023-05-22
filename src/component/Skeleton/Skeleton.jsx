import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={460}
        viewBox="0 0 400 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="25" y="27" rx="2" ry="2" width="177" height="130" />
        <rect x="26" y="164" rx="0" ry="0" width="169" height="17" />
        <rect x="495" y="527" rx="0" ry="0" width="128" height="16" />
        <rect x="27" y="188" rx="0" ry="0" width="133" height="17" />
    </ContentLoader>
)

export default MyLoader