import { CardProduct } from '../CardProduct/CardProduct';
const Products = ({ currentData }) => {
    return (
        /* console.log(currentData) */
        currentData.map((ad) => {
            return <CardProduct key = {ad['_id']} id={ad['_id']} title={ad.title} city={ad.city} price={ad.price} photos={ad.photos} />
        })
    )
}

export default Products;