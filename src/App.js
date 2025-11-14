import { useEffect, useState } from "react";
import Header from "./common/header/Header";
import "./assets/css/media.css";
import "./assets/css/style.css";
// import "../src/Customer-Panal/custumerAssest/custumer_style.css"
import { Navigate, Route, Routes } from "react-router-dom";

import { BsArrowUp } from "react-icons/bs";

import HomePage from "./pages/home";
import PageNotFoundPage from "./pages/page-not-found";
import ProductDetailPage from "./pages/product-detail";
import Footer from "./common/footer/Footer";
import ProductsPage from "./pages/products";
import ViewAllBrandPage from "./pages/view-all-brands";
import CartHome from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import RegistrationPage from "./pages/registration";
import LoginPage from "./pages/login";
import ResetPage from "./pages/reset";
import TrackOrderPage from "./pages/track-order";
import SellWithUsPage from "./pages/sell-with-us";
import CreateShopPage from "./pages/create-shop";
import TermsOfUsePage from "./pages/terms-of-use";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import BlogPage from "./pages/blog";
import BlogDetailPage from "./pages/blog-detail";
import PhotoGalleryPage from "./pages/photo-gallery";
import VideoGalleryPage from "./pages/video-gallery";
import FaqPage from "./pages/faq";
import SellerPage from "./pages/seller";
import TestimonialPage from "./pages/testimonial";
import TopSelling from "./components/seller/top-selling/TopSelling";
import AllProducts from "./components/seller/all-products/AllProducts";
import SellerHome from "./components/seller/seller-home/sellerHome";
import { Helmet } from "react-helmet";
import PrivacyPolicyPage from "./pages/privacy-policy";
import DeliveryPolicyPage from "./pages/delivery-policy";
import CareersPage from "./pages/careers";
import RecentViewed from "./common/recent-viewed/RecentViewed";
import ProfilePage from "./pages/profile";

import "./App.css";
import WishList from "./pages/wishList/Index";
import MyAccountDetail from "./pages/myAccountDetail/Index";
import OrderDetail from "./pages/orderDetails/Index";
import ProductCategoryPage from "./pages/product-category/Index";
import SignUpSeller from "./pages/sellerSection/signUpSeller";
import SellerLogin from "./pages/sellerSection/SellerLogin";
import AllSellerList from "./pages/sellerSection/AllSellerList";
import PrductBrandPage from "./pages/brand/ProductBeand";
import BillingAddress from "./pages/billingAdd/BillingAddress";
import ShippingAddress from "./pages/shippingadd/ShippingAddress";
import ChangePassword from "./pages/changePass/ChangePassword";
import SentRefundRequest from "./pages/sent-refund-request/SentRefundRequest";
import EarningPoints from "./pages/earning-points/EarningPoints";
import MyWallet from "./pages/myWallet/MyWallet";
import MyWallets from "./pages/myWallet/MyWallet";
import AffliateSystem from "./pages/affliate/affliate/affliateSystem/AffliateSystem";
import AffiliatePayment from "./pages/affliate/affliate/affliateSystem/affliatePayment/AffliatePayment";
import PaymentHistory from "./pages/affliate/affliate/paymentHistory/PaymentHistory";
import WithdrawRequestHistory from "./pages/affliate/affliate/withdrawRequestHistory/WithdrawRequestHistory";
import CustomerSupportTicket from "./Customer-Panal/components/customerSupportTicket/CustomerSupportTicket";
import RmaHistory from "./pages/rma_history/RmaHistory";
import CancellOrders from "./pages/cancellorders/CancellOrders";
import PickupList from "./pages/pickupsPoints/PickupList";
import OurPeople from "./pages/peoples/OurPeople";
import AffilieatRegister from "./pages/affliateRegis/AffilieatRegister";
import All_Categories from "./pages/all_categories/All_Categories";
import My_product_reviews from "./pages/my_product_reviews/My_product_reviews";
import HomeTwoPage from "./pages/home-two";
import { IoIosArrowUp } from "react-icons/io";
import SocialMedias from "./common/socialmedia/SocialMedia";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import ten from "./local/en/translation.json";
import de from "./local/de/translation.json";
import ReturnsRefundCancellationPage from "./pages/returns-refund-cancellation";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import OtpPage from "./pages/otp";
import RmarReturnPage from "./pages/rmaReturn";
import CraeteRmaReturm from "./components/rmaReturn/craeteRmaReturm/CraeteRmaReturm";
import RmaReturnView from "./components/rmaReturn/rmaReturnView/RmaReturnView";
import ThankyouSucccessPage from "./pages/thankyouSucccess/ThankyouSucccess";
import StatisticTrackerWrapper from "./StatisticTrackerWrapper";
import AddTicketPage from "./pages/supportTicket/addTicket";
import ListTicketPage from "./pages/supportTicket/listTicket";
import UserReply from "./pages/supportTicket/userReplay/UserReply";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: ten,
      },
      de: {
        translation: de,
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const changeLang = (l) => {
  return () => {
    i18n.changeLanguage(l);
    localStorage.setItem("lang", l);
  };
};

function App() {
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const [recent, setRecent] = useState("");
  // const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const isLogin = window.localStorage.getItem("isLogin");

  if (isLogin === null) {
    window.localStorage.setItem("isLogin", false);
  }

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  // Recent Viewed
  const handleRecent = () => {
    setRecent(!recent);
  };
  const closeRecent = () => {
    setRecent(false);
  };

  useEffect(() => {
    const preferredLanguage = window.localStorage.getItem("preferredLanguage");

    if (preferredLanguage) {
      i18n.changeLanguage(preferredLanguage);
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>

      <Header changeLang={changeLang} />

      {/* <div className="preloaderCount">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}

      <RecentViewed recent={recent} closeRecent={closeRecent} />
      <StatisticTrackerWrapper />
      <Routes>
        <Route path="/" element={<HomePage setShow={setShow} />} />
        <Route path="*" element={<Navigate to="/page-not-found" />} />
        <Route
          path="/page-not-found"
          element={<PageNotFoundPage setShow={setShow} />}
        />
        {/* <Route path="/home-two" element={<HomeTwoPage setShow={setShow} />} /> */}
        <Route path="/products" element={<ProductsPage setShow={setShow} />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart/:login" element={<LoginPage />} />
        <Route
          path="/registration"
          element={<RegistrationPage setShow={setShow} />}
        />
        <Route
          path="/products/:val"
          element={<ProductsPage setShow={setShow} />}
        />
        <Route
          path="/product/:_id/:slug"
          element={<ProductDetailPage setShow={setShow} />}
        />
        <Route
          path="/product/:_id/:slug/:var"
          element={<ProductDetailPage setShow={setShow} />}
        />
        <Route
          path="/product-detail"
          element={<ProductDetailPage setShow={setShow} />}
        />

        <Route
          path="/view-all-brands"
          element={<ViewAllBrandPage setShow={setShow} />}
        />
        <Route path="/cart" element={<CartHome setShow={setShow} />} />
        <Route path="/checkout" element={<CheckoutPage setShow={setShow} />} />
        <Route path="/checkout/:id" element={<CheckoutPage setShow={setShow} />} />


        <Route path="/reset" element={<ResetPage setShow={setShow} />} />
        <Route
          path="/track-order"
          element={<TrackOrderPage setShow={setShow} />}
        />
        <Route
          path="/sell/sell-with-us"
          element={<SellWithUsPage setShow={setShow} />}
        />
        <Route
          path="/shop/create"
          element={<CreateShopPage setShow={setShow} />}
        />
        <Route
          path="/terms-of-use"
          element={<TermsOfUsePage setShow={setShow} />}
        />
        <Route
          path="/returns-refund-cancellation"
          element={<ReturnsRefundCancellationPage setShow={setShow} />}
        />
        <Route path="/about" element={<AboutPage setShow={setShow} />} />
        <Route path="/contact" element={<ContactPage setShow={setShow} />} />
        <Route path="/blog" element={<BlogPage setShow={setShow} />} />
        {/* <Route
          path="/blog-detail/:id/:slug"
          element={<BlogDetailPage setShow={setShow} />}
        /> */}
        <Route
          path="/blog-detail/:id/:_id"
          element={<BlogDetailPage setShow={setShow} />}
        />
        <Route
          path="/photo-gallery"
          element={<PhotoGalleryPage setShow={setShow} />}
        />
        <Route
          path="/video-gallery"
          element={<VideoGalleryPage setShow={setShow} />}
        />
        <Route path="/faq" element={<FaqPage setShow={setShow} />} />

        <Route path="/seller/sign-Up" element={<SignUpSeller />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/allSeller" element={<AllSellerList />} />
        <Route
          path="/seller/"
          element={<Navigate to="/seller/seller-home" />}
        />
        <Route path="/seller" element={<SellerPage setShow={setShow} />}>
          <Route
            path="seller-home/:id"
            element={<SellerHome setShow={setShow} />}
          />
          <Route
            path="top-selling"
            element={<TopSelling setShow={setShow} />}
          />
          <Route
            path="all-products"
            element={<AllProducts setShow={setShow} />}
          />
        </Route>

        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/delivery-policy" element={<DeliveryPolicyPage />} />

        <Route path="/careers" element={<CareersPage />} />

        <Route
          path="/product/category/:id/:slug"
          element={<ProductCategoryPage />}
        />
        <Route path="/product/brand/:id" element={<PrductBrandPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/myAccount" element={<MyAccountDetail />} />
        <Route path="/order-detail/:id" element={<OrderDetail />} />

        <Route path="/billingAddress" element={<BillingAddress />} />
        <Route path="/shippingAddress" element={<ShippingAddress />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/sent-refund-request" element={<SentRefundRequest />} />
        <Route path="/earning-points" element={<EarningPoints />} />
        <Route path="/myWallet" element={<MyWallets />} />

        <Route path="affiliate_register" element={<AffilieatRegister />} />
        <Route path="affiliate" element={<AffliateSystem />} />
        <Route path="affiliate/payment" element={<AffiliatePayment />} />
        <Route
          path="withdraw_request_history"
          element={<WithdrawRequestHistory />}
        />

        <Route path="payment_history" element={<PaymentHistory />} />

        <Route path="support_ticket" element={<CustomerSupportTicket />} />

        <Route path="rma_history" element={<RmaHistory />} />
        <Route path="cancellOrders" element={<CancellOrders />} />
        <Route path="pickup_point_store" element={<PickupList />} />

        <Route path="our_people" element={<OurPeople />} />

        <Route path="all_categories" element={<All_Categories />} />
        <Route path="my_product_reviews" element={<My_product_reviews />} />

        <Route path="returns/rma/list" element={<RmarReturnPage />} />
        <Route path="returns/rma/new/:id" element={<CraeteRmaReturm />} />
        <Route path="returns/rma/view/:id" element={<RmaReturnView />} />
        <Route path="thankyou" element={<ThankyouSucccessPage />} />
        <Route path="add-support-ticket/:id" element={<AddTicketPage />} />
        <Route path="add-support-ticket" element={<AddTicketPage />} />
        <Route path='list-tickets' element={<ListTicketPage />} />
        <Route path='user-replay/:id' element={<UserReply />} />
      </Routes>

      <SocialMedias />
      <Footer />
      <div
        className="backTop"
        onClick={scrollToTop}
        style={{ opacity: visible ? "1" : "0" }}
      >
        <MdKeyboardDoubleArrowUp />
      </div>
    </>
  );
}

export default App;
