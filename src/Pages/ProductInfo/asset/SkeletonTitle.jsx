import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonLine = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={25}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="19" y="0" rx="2" ry="2" width="347" height="25" />
    </ContentLoader>
)

export default SkeletonLine