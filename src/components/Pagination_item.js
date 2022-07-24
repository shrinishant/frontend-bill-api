import React, { useState, useEffect } from 'react'
import './pagination.css'

const Pagination_item = (props) => {
    const [page, setPage] = useState([]);

    // not able to iterate over pages using for loop - don't know why ???

    useEffect(() => {
        setPage([]);
        for(let i=0; i<props.pages; i++){
            setPage((prevPage) => [...prevPage, i]);
        }
    
        console.log(props.pages);
    }, [props.pages]);

    const pageChange = (p) => {
        props.fun(p, props.sort)
    }
    

    return (
        <>
            <div className='dot_div'>
                {
                    page.map((i) => {
                        return(
                            <>
                                <span key={i} onClick={() => pageChange(i+1)} className={(props.cPage === i+1) ? "active dot" : "dot"}>{i + 1}</span>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Pagination_item