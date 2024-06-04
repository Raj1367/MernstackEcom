import React from 'react'
import CategoryList from '../Components/CategoryList'
import BannerProduct from '../Components/BannerProduct'
import HorizontalProductCard from '../Components/HorizontalProductCard'
import VerticalCardProduct from '../Components/VerticalCardProduct'
import MobileSearchBar from '../Components/MobileSearchBar'


const Home = () => {

 

  return (
    <div>
      <MobileSearchBar></MobileSearchBar>
      <CategoryList></CategoryList>
      <BannerProduct></BannerProduct>
      <HorizontalProductCard category={"TWSEarbuds"} heading={"Top TWS Earbuds"}></HorizontalProductCard>
      <HorizontalProductCard category={"headphones"} heading={"Popular Headphones"}></HorizontalProductCard>
      <VerticalCardProduct category={"mobiles"} heading={"Trending SmartPhones"}></VerticalCardProduct>
      <VerticalCardProduct category={"printers"} heading={"Popular printers"}></VerticalCardProduct>
      <VerticalCardProduct category={"trimmers"} heading={"New in mens grooming"}></VerticalCardProduct>
      <VerticalCardProduct category={"refrigerator"} heading={"Latest refrigetaors"}></VerticalCardProduct>
    </div>
  )
}

export default Home