import { useDispatch } from "react-redux";
import { removeFavorites } from "../../store/favorites/favoritesSlice";

export function FavoritesModal({orders}) {
    
    const dispatch = useDispatch()
    return (
        <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style={{ zIndex: "100", position: "absolute", width: "25%", right: "0", top: "calc(100% + 200%)" }}>
            <span className="fs-5 fw-semibold">Favorites list</span>
            {
                orders.map((order, index) => (
                    <div key={index} className="list-group list-group-flush border-bottom scrollarea">
                        <a href="#" className="list-group-item list-group-item-action active py-3 lh-tight" aria-current="true">
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{order.title}</strong>
                                <span><i className="bi bi-trash" onClick={()=>dispatch(removeFavorites(order.id))}></i></span>
                            </div>
                            <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                        </a>
                    </div>
                ))
            }
        </div>
    )
}