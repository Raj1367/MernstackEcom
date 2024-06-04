import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProductCategory from '../Helpers/ProductCategory'
import { useEffect } from 'react'
import SummaryApi from '../Common'
import SearchProductCard from '../Components/SearchProductCard'

const SearchProductCategorywise = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const URLSearch = new URLSearchParams(location.search)
  const URLCategoryListArray = URLSearch.getAll("category")
  const URLCategoryListObject = {}
  URLCategoryListArray.forEach((item) => { URLCategoryListObject[item] = true })

  const [selectCategory, setSelectCategory] = useState(URLCategoryListObject)
  const [filterCategory, setFilterCategory] = useState([])
  const [sortBy, setSortBy] = useState("")


  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategory
      })
    })
    const dataResponse = await response.json()
    setData(dataResponse?.data || [])
    console.log(dataResponse)
  }

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target

    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [filterCategory])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map((categoryKeyName) => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      else {
        return null
      }
    }).filter(el => el)
    setFilterCategory(arrayOfCategory)
    // console.log("selected category", arrayOfCategory)

    // url format
    const URLFormat = arrayOfCategory.map((item, index) => {
      if ((arrayOfCategory.length - 1) == index) {
        return `category=${item}`
      }
      return `category=${item}&&`
    })
    console.log(`urlFormat`, URLFormat.join(""))
    navigate("/productcategory?" + URLFormat.join(""))
  }, [selectCategory])

  const handleSortBy = (e) => {
    const { value } = e.target

    setSortBy(value)

    if (value === "asc") {
      setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice))
    }
    if (value === "dsc") {
      setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(() => {
  }, [sortBy])


  return (
    <div>
      <div className="container mx-auto px-4">
        {/* desktop */}
        <div className="hidden lg:grid grid-cols-[250px,1fr]">
          {/* left side */}
          <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">

            {/* sort by */}
            <div >
              <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Sort by</h3>

              <form className="text-sm flex flex-col gap-3 py-2">

                <div className="flex items-center gap-3">
                  <input type="radio" name="sortBy" checked={sortBy === "asc"} value={"asc"} onChange={handleSortBy} />
                  <label>Price-low to high</label>
                </div>

                <div className="flex items-center gap-3">
                  <input type="radio" name="sortBy" checked={sortBy === "dsc"} value={"dsc"} onChange={handleSortBy} />
                  <label>Price-high to low </label>
                </div>

              </form>
            </div>

            {/* fliter by */}
            <div>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Category</h3>
              <form className="text-sm flex flex-col gap-3 py-2">
                {
                  ProductCategory.map((categoryName, index) => {
                    return (
                      <div className='flex items-center gap-3'>
                        <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                    )
                  })
                }
              </form>
            </div>
          </div>

          {/* right side */}
          <div className="px-4">
            <p className="font-medium text-lg text-slate-800 my-2">Search Results : {data.length}</p>
            <div className="min-h-[calc(100vh-120px)]  overflow-y-scroll max-h-[calc(100vh-120px)]">
              {
                data.length !== 0 && (
                  <SearchProductCard data={data} loading={loading} />
                )
              }
            </div>
          </div>
        </div>
      </div>


      {/* mobile view */}
      <div className="md:hidden mt-3 flex flex-col justify-center items-center">
        <button className="border-2 border-red-600  text-red-500 rounded font-medium px-4 py-1 uppercase text-md hover:bg-red-600 hover:text-white transition-all active:bg-red-600 active:text-white">Filter by</button>
        <div className="bg-white mt-3 border border-slate-300 w-72 rounded shadow-md ">
          <div className="my-2">
            <h3 className="font-medium px-4 mb-1">Price:</h3>
            <div className="grid grid-cols-2 justify-items-center">
              <div className="flex items-center gap-1">
                <input type="radio" name="sortBy" checked={sortBy === "asc"} value={"asc"} onChange={handleSortBy} />
                <label className="text-sm">low to high</label>
              </div>
              <div className="flex items-center gap-1">
                <input type="radio" name="sortBy" checked={sortBy === "asc"} value={"asc"} onChange={handleSortBy} />
                <label className="text-sm">high to low</label>
              </div>
            </div>
          </div>
          <hr />
          <div className="my-2">
            <h3 className="font-medium px-4  mb-1">Category:</h3>
            <div className="grid grid-cols-2 justify-items-center">
              {
                ProductCategory.map((categoryName, index) => {
                  return (
                    <div className='flex items-center justify-start gap-1 text-sm mb-1'>
                      <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>

       <div>
          <p className="font-medium text-md text-slate-800 my-2 text-center">Search Results : {data.length}</p>
          <div className="min-h-[calc(100vh-120px)]  overflow-y-scroll max-h-[calc(100vh-120px)]">
            {
              data.length !== 0 && (
                <SearchProductCard data={data} loading={loading} />
              )
            }
          </div>
        </div>

    </div>
  )
}

export default SearchProductCategorywise