import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../../server";
import { getCartToken, getCouponToken } from "../../Utils/localStorage";
const token1 = window.localStorage.getItem("token");

const userid = window.localStorage.getItem("user_id");
// let getCartToken() = getgetCartToken()();
// let getCouponToken() = getgetCouponToken()();

const baseUrl = base_url();
const productListSlice = createSlice({
  name: "productList",
  initialState: {
    products: [],
    updatedProducts: [],
    object: null,
    feacerProduct: null,
    trendingProduct: null,
    todayDeal: null,
    cartCal: null,
    islogin: null,
    cartLists: [],
    cartLengh: 0,
    WishLengh: 0,
  },
  reducers: {
    setCartLeng: (state, data) => {
      state.cartLengh = data.payload;
    },
    setCartLengLogout: (state, data) => {
      state.cartLengh = 0;
    },
    getProducts: (state, data) => {
      state.products = data.payload;
    },
    setUpdatedProducts: (state, data) => {
      state.updatedProducts = data.payload.products;
    },
    setUpdatedProductsblack: (state, data) => {
      state.updatedProducts = [];
    },
    setCartCalc: (state, data) => {
      state.cartCal = data.payload;
    },
    setWishCalc: (state, data) => {
      state.WishLengh = data.payload;
    },
    changeCountInProduct: (state, data) => {
      state.updatedProducts = data.payload;
      // console.log(data.payload);
    },
    setObjectVal: (state, data) => {
      state.object = data.payload;
    },
    setFeachers: (state, data) => {
      state.feacerProduct = data.payload;
    },
    setTrendingProduct: (state, data) => {
      state.trendingProduct = data.payload;
    },
    setTodayDeal: (state, data) => {
      state.todayDeal = data.payload;
    },
    setIslogin: (state, data) => {
      state.islogin = data.payload;
    },
    clearUpdatedProduct: (state, data) => {
      state.updatedProducts = [];
    },
    setCartLists: (state, data) => {
      state.updatedProducts = data.payload;
    },
    clereCartLitsItem: (state, data) => {
      state.updatedProducts = data.payload;
    },
  },
});

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }),
  tagTypes: [
    "CartType",
    "wishUpdate",
    "Shipping",
    "Wishlist",
    "updateOffline",
    "Trending",
    "Featured",
    "billAdd",
    "BillAdd",
    "User",
    "billing",
    "shipping",
    "review",
    "blog",
    "blogCat",
    "reviewBlog",
  ],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `product`,
        method: "GET",
      }),
    }),

    getRelatedProducts: builder.query({
      query: (id) => ({
        url: `product/category/${id}`,
        method: "GET",
      }),
    }),

    getProductDetail: builder.query({
      query: (val) => ({
        url: `product/public/${val.proid + "&" + val.userid}`,
        method: "GET",
      }),
      providesTags: ["wishUpdate"],
    }),

    getAllStatusOrders: builder.query({
      query: () => ({
        url: "orderStatusMaster",
        method: "GET",
      }),
    }),

    // User Details
    getUserDetail: builder.query({
      query: (id) => ({
        url: `user`,
        method: "GET",
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${id}`,
        },
      }),
      providesTags: ["User"],
    }),
    editUserDetail: builder.mutation({
      query: (data) => ({
        // url: `user/edit-user`,
        url: `user/profile-update`,
        method: "PUT",
        body: data.data,
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Cart
    setCart: builder.mutation({
      query: (payload) => ({
        url: `cart?products=${getCartToken() || ""}&coupon=${getCouponToken() || ""
          }`,
        method: "POST",
        body: payload,
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${token1}`,
        },
      }),
      invalidatesTags: ["CartType"],
    }),

    // Cart
    setCartSingle: builder.mutation({
      query: (payload) => ({
        url: `order/temp_single`,
        method: "POST",
        body: {
          product: payload.product_id,
          products: [],
          variant: "64194f09cc684ae2fc9ba58d",
          count: 5,
          Seller: "ETG",
          Amount: "100",
          Delivery_Status: "Pending",
          Payment_method: "COD",
          Payment_Status: "Unpaid",
          orderStatus: "Not Processed",
          userid: payload.user_id,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token1}`,
        },
      }),
    }),

    setCartTempt: builder.mutation({
      query: (pay) => ({
        url: `order/temp_cart?products=${getCartToken() || ""}&coupon=${getCouponToken() || ""
          }`,
        method: "POST",
        body: pay.data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${pay.token}`,
        },
      }),
      invalidatesTags: ["orders", "CartType"],
    }),

    quantityCart: builder.mutation({
      query: (payload) => ({
        url: `updateById_Cart/${payload.id}`,
        method: "POST",
        body: payload.data,
      }),
    }),

    clearAllList: builder.mutation({
      query: (payload) => {
        return {
          url: `cart?products=${getCartToken() || ""}&coupon=${getCouponToken() || ""
            }`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["CartType"],
    }),

    deleteData: builder.mutation({
      query: (data) => ({
        url: `cart/${data.index}?products=${getCartToken() || ""}&coupon=${getCouponToken() || ""
          }`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token1}`,
        },
        // body: {
        //   userid: data.userid
        // }
      }),
      invalidatesTags: ["CartType"],
    }),
    getCart: builder.query({
      query: (token) => ({
        url: `cart?products=${getCartToken() || ""}&coupon=${getCouponToken() || ""
          }`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["CartType"],
    }),
    getCartCheackout: builder.mutation({
      query: (val) => ({
        url: `cart/checkout`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${val.token}`,
        },
        body: {
          shipId: val.id,
        },
      }),
      providesTags: ["CartType"],
    }),

    setQuantityCart: builder.mutation({
      query: (paylode) => ({
        url: `cart/updateById_Cart/${paylode.id}`,
        method: "POST",
        body: paylode.data,
      }),
    }),

    // Wishlist
    setWishList: builder.mutation({
      query: (payload) => ({
        // url: `product/wishlist`,
        url: `product/wishlist_nw`,
        method: "POST",
        body: payload.data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["Wishlist", "wishUpdate"],
    }),
    getWishList: builder.query({
      query: (userid) => {
        console.log("whishlist--");
        return {
          url: `user/wishlist/${userid}`,
          // url: `user/wishlist_nw/${userid}`,
          method: "GET",
        };
      },
      providesTags: ["Wishlist"],
    }),
    deleteWishlist: builder.mutation({
      query: (val) => ({
        url: `product/wishlist/delete_wishlist`,
        method: "DELETE",
        credentials: "include",
        body: val.data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${val.token}`,
        },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // get orderHistory

    getOrderHistory: builder.query({
      query: (id) => ({
        url: `order/getorderbyuser/${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    // Login
    setRegister: builder.mutation({
      query: (payload) => ({
        url: `user/register`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    setLogin: builder.mutation({
      query: (payload) => ({
        url: `user/login-otp-verify`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          // "auth" : `Bearer ${token1}`
        },
      }),
    }),

    getCategories: builder.query({
      query: () => ({
        url: `category/public`,
        credentials: "include",
      }),
    }),
    getBrands: builder.query({
      query: () => `brand`,
    }),
    getSizes: builder.query({
      query: () => `size`,
    }),

    // Pickup points
    getPickUpPoints: builder.query({
      query: () => ({
        url: `pickupPoints`,
        method: "GET",
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8",
        //   Authorization: `Bearer ${token1}`,
        // },
      }),
    }),

    getPickUpPointsById: builder.query({
      query: (id) => ({
        url: `pickupPoints/${id}`,
        method: "GET",
      }),
    }),

    // billing detail
    addAddressDetail: builder.mutation({
      query: (payload) => ({
        url: `user/register/billAddress`,
        // url: `user/register/billAddress-new`,
        method: "POST",
        body: payload?.data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["shipping"],
    }),

    getShiipingAdd: builder.query({
      query: (id) => ({
        url: `shippingAddress/customer/${id}`,
        method: "GET",
      }),
      providesTags: ["shipping"],
    }),

    deleteShipping: builder.mutation({
      query: (payload) => ({
        url: `shippingAddress/delete_shippingAddresss/${payload.id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["shipping"],
    }),

    getTrendingProduct: builder.query({
      query: () => ({
        url: `trending`,
        // url: `product/trendingSearches`,
        method: "GET",
      }),
      providesTags: ["Trending"],
    }),

    // featured prducts

    getFeaturedProduct: builder.query({
      query: () => ({
        url: `product/featured`,
        method: "GET",
      }),
      providesTags: ["Featured"],
    }),

    getOrderDetail: builder.query({
      query: (id) => ({
        url: `order/getOrderById/${id}`,
        method: "GET",
      }),
    }),

    //Billing Add
    postBillAddres: builder.mutation({
      query: (val) => ({
        url: `user/register/billAddress-new`,
        method: "POST",
        body: val.data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${val.token}`,
        },
      }),
      invalidatesTags: ["billing"],
    }),

    getBillingAdd: builder.query({
      query: (id) => ({
        url: `shippingAddress/customer/${id}`,
        method: "GET",
      }),
      providesTags: ["billing"],
    }),

    // Menu list
    getMenuList: builder.query({
      query: (id) => ({
        url: `category/filter`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // INCquantity

    IncCount: builder.mutation({
      query: (paylode) => ({
        url: `cart?products=${getCartToken() || ""}&coupon=${getCouponToken() || ""
          }`,
        method: "PUT",
        body: paylode,
      }),
      invalidatesTags: ["CartType"],
    }),

    // shipping Add

    getShippingAdd: builder.query({
      query: (token) => ({
        url: `shippingAddress/customer/shipping`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["shipping"],
    }),

    shippingAdd: builder.mutation({
      query: (paylode) => ({
        url: `shippingAddress/customer/shipping/${userid}`,
        method: "POST",
        body: paylode,
      }),
      invalidatesTags: ["Shipping"],
    }),
    getAddressDetail: builder.query({
      query: (pay) => ({
        url: `shippingAddress/${pay.id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${pay.token}`,
        },
      }),
      providesTags: ["shipping"],
    }),
    setEditedAddres: builder.mutation({
      query: (paylode) => ({
        url: `user/register/billAddress`,
        method: "PUT",
        body: paylode.data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${paylode.token}`,
        },
      }),
      invalidatesTags: ["billing"],
    }),

    //GET active billling adress
    getActiveBilling: builder.query({
      query: (id) => ({
        url: `user/getActiveBillAddress/${id}`,
        method: "GET",
      }),
    }),

    // GET Catogary Produts
    getCategoriesProduct: builder.query({
      query: (id) => ({
        url: `product/category/${id}`,
        method: "GET",
      }),
    }),

    // updateShipping and billing
    setBillingActive: builder.mutation({
      query: (val) => ({
        url: `user/updateSelectedBillingAddress`,
        method: "PUT",
        body: {
          userid: val.userid,
          ship_id: val.itemId,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${val.token}`,
        },
      }),
    }),

    //Coupons Api
    getCoupon: builder.mutation({
      query: (coopon) => ({
        url: `cart/coupon`,
        method: "POST",
        body: {
          coupon: coopon.value,
        },
      }),
      invalidatesTags: ["CartType"],
    }),

    //Seller Add
    addSeller: builder.mutation({
      query: (data) => ({
        url: `sellerList/add_sellers`,
        method: "POST",
        body: data,
      }),
    }),

    loginSeller: builder.mutation({
      query: (data) => ({
        url: `sellerList/add_sellers`,
        method: "POST",
        body: data,
      }),
    }),

    listSellers: builder.query({
      query: () => ({
        url: `sellerList`,
        method: "GET",
      }),
    }),

    SellerDetail: builder.query({
      query: (id) => ({
        url: `sellerList/${id}`,
        method: "GET",
      }),
    }),

    // List Alll Brand
    ListAllBrand: builder.query({
      query: () => ({
        url: `brand/public`,
        method: "GET",
      }),
    }),

    brandProduct: builder.query({
      query: (id) => ({
        url: `product/brand/${id}`,
        method: "GET",
      }),
    }),

    // Gallary List
    getGallaryList: builder.query({
      query: (id) => ({
        url: `photoGallery`,
        method: "GET",
      }),
    }),

    // VideoGallery List
    getVideoGallery: builder.query({
      query: (id) => ({
        url: `videoGallery`,
        method: "GET",
      }),
    }),

    //Faqs
    getFaqsList: builder.query({
      query: (id) => ({
        url: `faqs`,
        method: "GET",
      }),
    }),

    // contactMessage
    contactMessage: builder.mutation({
      query: (data) => ({
        url: `contactMessage/add_ContactMessage`,
        method: "POST",
        body: data,
      }),
    }),

    // Review Product
    reviewProduct: builder.mutation({
      query: (data) => ({
        url: `rating/add_Rating`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),

    getReviews: builder.query({
      query: (val) => ({
        url: `rating/product/${val.proid}&${val.variant_id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),

    filterReviewbyRate: builder.mutation({
      query: (data) => ({
        url: `rating/filtering`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),

    // Blogs Apis
    getBlogs: builder.query({
      query: () => ({
        url: `blogs`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),

    getBlogDetails: builder.query({
      query: (val) => ({
        url: `blogs/${val.id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${val.token}`,
        },
      }),
      providesTags: ["blog"],
    }),

    //privacyPolicy
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: `privacyPolicy/singlePrivacyPolicy`,
        method: "GET",
      }),
      providesTags: ["privacyPolicy"],
    }),

    //termsCondition

    getTermsCondition: builder.query({
      query: () => ({
        url: `termsCondition/singleTermsAndCondition`,
        method: "GET",
      }),
      providesTags: ["termsCondition"],
    }),

    // blogs catagarys

    getBlogCat: builder.query({
      query: () => ({
        url: `blogsCat`,
        method: "GET",
      }),
      providesTags: ["blogCat"],
    }),

    getRevireBlog: builder.query({
      query: (id) => ({
        url: `reviews/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["reviewBlog"],
    }),

    sendCommentBlogs: builder.mutation({
      query: (data) => ({
        url: `reviews/blogs`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviewBlog"],
    }),

    sendLinke: builder.mutation({
      query: (id) => ({
        url: `reviews/like/${id}`,
        method: "POST",
        body: { userid },
      }),
      invalidatesTags: ["reviewBlog"],
    }),

    //getLanguage
    getLanguage: builder.query({
      query: (id) => ({
        url: `language`,
        method: "GET",
      }),
    }),
    //getcurrency
    getCurrency: builder.query({
      query: (id) => ({
        url: `currency`,
        method: "GET",
      }),
    }),

    // change language and currency

    changeCurrency: builder.mutation({
      query: (data) => ({
        url: `user/currency`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    changeLanguage: builder.mutation({
      query: (data) => ({
        url: `user/language`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // pickstock

    pickupStock: builder.mutation({
      query: (data) => ({
        url: `productStocks/filter`,
        method: "POST",
        body: data.data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),

    postCartOffline: builder.mutation({
      query: (data) => ({
        url: `cart/offlineCart`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CartType"],
    }),

    // offline Add
    offlineAddPost: builder.mutation({
      query: (data) => ({
        url: `/cart/offline/add`,
        method: "POST",
        body: data,
      }),
    }),

    // offline CartList
    offlineCartList: builder.mutation({
      query: (data) => ({
        url: `cart/offline`,
        method: "POST",
        body: data,
      }),
      providesTags: ["updateOffline"],
    }),

    // offline cartUpdate
    offlineCartUpdate: builder.mutation({
      query: (paylode) => ({
        url: `cart/updateById_CartOffline/${paylode.id}`,
        method: "POST",
        body: paylode.data,
      }),
      invalidatesTags: ["updateOffline"],
    }),

    sendRma: builder.mutation({
      query: (data) => ({
        url: `rma/requestRMA`,
        method: "POST",
        body: data.data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),

    sendCombo: builder.mutation({
      query: (data) => ({
        url: `cart/combo`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetAllStatusOrdersQuery,
  useSendComboMutation,
  useSendRmaMutation,
  useOfflineCartUpdateMutation,
  useOfflineCartListMutation,
  useOfflineAddPostMutation,
  useChangeCurrencyMutation,
  usePickupStockMutation,
  useChangeLanguageMutation,
  useGetCurrencyQuery,
  useGetLanguageQuery,
  useSendLinkeMutation,
  useSendCommentBlogsMutation,
  useGetRevireBlogQuery,
  useGetBlogCatQuery,
  useGetTermsConditionQuery,
  useGetPrivacyPolicyQuery,
  useGetBlogDetailsQuery,
  useGetBlogsQuery,
  useFilterReviewbyRateMutation,
  useGetReviewsQuery,
  useReviewProductMutation,
  useContactMessageMutation,
  useGetVideoGalleryQuery,
  useGetFaqsListQuery,
  useGetGallaryListQuery,
  useBrandProductQuery,
  useListAllBrandQuery,
  useSellerDetailQuery,
  useListSellersQuery,
  useAddSellerMutation,
  useGetCouponMutation,
  useSetBillingActiveMutation,
  useGetCategoriesProductQuery,
  useGetActiveBillingQuery,
  useSetEditedAddresMutation,
  useGetAddressDetailQuery,
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetSizesQuery,
  useGetProductsQuery,
  useSetRegisterMutation,
  useSetLoginMutation,
  useGetCartQuery,
  useSetCartMutation,
  useSetWishListMutation,
  useGetPickUpPointsQuery,
  useSetCartSingleMutation,
  useGetProductDetailQuery,
  useSetCartTemptMutation,
  useClearAllListMutation,
  useDeleteDataMutation,
  useQuantityCartMutation,
  useAddAddressDetailMutation,
  useGetShiipingAddQuery,
  useDeleteShippingMutation,
  useSetQuantityCartMutation,
  useGetWishListQuery,
  useDeleteWishlistMutation,
  useGetOrderHistoryQuery,
  useGetPickUpPointsByIdQuery,
  useGetTrendingProductQuery,
  useGetFeaturedProductQuery,
  useGetOrderDetailQuery,
  usePostBillAddresMutation,
  useGetMenuListQuery,
  useIncCountMutation,
  useGetUserDetailQuery,
  useEditUserDetailMutation,
  useGetBillingAddQuery,
  useGetShippingAddQuery,
  usePostCartOfflineMutation,
  useGetRelatedProductsQuery,
  useGetCartCheackoutMutation,
} = productsApi;
export const {
  clearUpdatedProduct,
  setCartLists,
  setTodayDeal,
  setIslogin,
  setCartCalc,
  getProducts,
  setTrendingProduct,
  setFeachers,
  setUpdatedProducts,
  changeCountInProduct,
  setObjectVal,
  clereCartLitsItem,
  setCartLeng,
  setWishCalc,
  setCartLengLogout,
  setUpdatedProductsblack,
} = productListSlice.actions;
export default productListSlice.reducer;
