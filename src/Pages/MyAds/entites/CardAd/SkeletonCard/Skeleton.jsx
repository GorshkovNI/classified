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
        <rect x="220" y="140" rx="2" ry="2" width="180" height="10" />
        <rect x="220" y="70" rx="2" ry="2" width="180" height="50" />
        <rect x="22" y="66" rx="0" ry="0" width="180" height="180" />
        <rect x="220" y="160" rx="0" ry="0" width="180" height="8" />
    </ContentLoader>
)

export default MyLoader