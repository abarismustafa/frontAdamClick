const getLanguageCode = () => {
  return window.localStorage.getItem("languageCode");
};

const getCountryCode = () => {
  return window.localStorage.getItem("countryCode");
};

const getCartToken = () => {
  return window.localStorage.getItem("cartItem");
};
const getCouponToken = () => {
  return window.localStorage.getItem("couponToken");
};

const getLoginDetails = () => {
  return window.localStorage.getItem("isLogin");
};

export {
  getCountryCode,
  getLanguageCode,
  getCartToken,
  getCouponToken,
  getLoginDetails,
};
