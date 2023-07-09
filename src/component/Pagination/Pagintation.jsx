import React, { useState } from 'react';
const Pagination = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPages); i++) {
        pageNumbers.push(i)
    }
    return (

        <div>
            <ul className="pagination" style={{ margin: "0", display: "flex", justifyContent: "center" }}>
                {pageNumbers.map(number => (
                    <li className="page_item" key={number}>
                        {
                            number ===currentPage ? <p style={{ cursor: "pointer", color:"white",backgroundColor:"#0d6efd", borderRadius:"5px"}} className="page-link" onClick={() => paginate(number)}>{number}</p>:
                            <p style={{ cursor: "pointer", borderRadius:"5px" }} className="page-link" onClick={() => paginate(number)}>{number}</p>
                        }
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;