import React from 'react'
import SummaryApi from '../Common'

const FetchCategoryWiseProduct = async (category) => {
    const resp = await fetch(SummaryApi.allProductCategorywise.url, {
        method: SummaryApi.allProductCategorywise.method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            category:category
        })
    })

    const dataResp= await resp.json()
    return dataResp
}

export default FetchCategoryWiseProduct