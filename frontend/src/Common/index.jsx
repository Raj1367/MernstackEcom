
const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post",
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post",
    },
    currentUser: {
        url: `${backendDomain}/api/userdetails`,
        method: "get",
    },
    logoutUser: {
        url: `${backendDomain}/api/userLogout`,
        method: 'get'
    },
    allUsers: {
        url: `${backendDomain}/api/allusers`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomain}/api/updateuser`,
        method: 'post'
    },
    uploadProduct: {
        url: `${backendDomain}/api/uploadproduct`,
        method: 'post'
    },
    allProduct: {
        url: `${backendDomain}/api/getproduct`,
        method: 'get'
    },
    updateProduct: {
        url: `${backendDomain}/api/updateproduct`,
        method: 'post'
    },
    singleProductCategorywise: {
        url: `${backendDomain}/api/getsingleproductcategorywise`,
        method: 'get'
    },
    allProductCategorywise: {
        url: `${backendDomain}/api/getallproductcategorywise`,
        method: 'post'
    },
    productDetails: {
        url: `${backendDomain}/api/productdetails`,
        method: 'post'
    },
    productAddToCart: {
        url: `${backendDomain}/api/addtocart`,
        method: 'post'
    },
    cartProductCount: {
        url: `${backendDomain}/api/cartproductcount`,
        method: 'post'
    },
    cartProductView: {
        url: `${backendDomain}/api//cartporductview`,
        method: 'get'
    },
    updateCartQuantity: {
        url: `${backendDomain}/api/updatecartquantity`,
        method: 'post'
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/deletecartproduct`,
        method: 'post'
    },
    searchProduct: {
        url: `${backendDomain}/api/searchproduct`,
        method: 'get'
    },
    filterProduct: {
        url: `${backendDomain}/api/filterproduct`,
        method: 'post'
    },
    userCheckout: {
        url: `${backendDomain}/api/usercheckout`,
        method: 'post'
    },
    userOrders:{
        url: `${backendDomain}/api/userorders`,
        method: 'get'
    }


}

export default SummaryApi