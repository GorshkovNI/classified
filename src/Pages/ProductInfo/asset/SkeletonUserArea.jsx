import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonUserArea = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={460}
        viewBox="100 60 400 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="108" y="96" rx="2" ry="2" width="140" height="10" />
        <rect x="108" y="70" rx="2" ry="2" width="140" height="16" />
        <rect x="109" y="122" rx="0" ry="0" width="139" height="8" />
        <circle cx="375" cy="95" r="25" />
    </ContentLoader>
)

export default SkeletonUserArea