import React, { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRazorpay } from "react-razorpay";
import "react-toastify/dist/ReactToastify.css";

import { load } from "@cashfreepayments/cashfree-js";

import {
  setCartCalc,
  setCartLeng,
  useAddAddressDetailMutation,
  useClearAllListMutation,
  useGetActiveBillingQuery,
  useGetCartCheackoutMutation,
  useGetCartQuery,
  useGetCouponMutation,
  useGetCurrencyQuery,
  useGetLanguageQuery,
  useGetOrderHistoryQuery,
  usePostBillAddresMutation,
  useSetCartTemptMutation,
  useSetEditedAddresMutation,
} from "../products/productSlice";
import AddShipping from "./AddShipping";
import "./Checkout.css";
import ShippingAddress from "./ShippingAddress";
import { CustomToaster } from "../../common/toaster/CustomToaster";
import payment from "../../assets/img/paymentTing.jpg";
import PaymentSectins from "./PaymentSectins";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import SussessMsg from "./SussessMsg";
import { useTranslation } from "react-i18next";
import CoupensList from "../cart/CoupensList";
import { base_url } from "../../server";
import {
  getCartToken,
  getCouponToken,
  getLoginDetails,
} from "../../Utils/localStorage";
import { RiSecurePaymentLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";

function Checkout() {
  const params = useParams();
  const Razorpay = useRazorpay();
  const handlePayment = useCallback(
    async (data) => {
      console.log("paymetRzor", data);
      // const filterSecrateKy = paymentSelectData?.map((item) => {
      //   return item
      // })
      // console.log(filterSecrateKy);

      // const filterRoazarKey = filterSecrateKy?.filter((item) => {
      //   return item?.slug == 'razorpay'
      // })
      // console.log('filterRoazarKey', filterRoazarKey[0]?.key);
      try {
        // const res = await rozarPayApi(rozarPayData);
        // "rzp_test_9VeeiBAgDSX9Tq"
        // console.log('hkjbhjkhjlknl', user);
        // rzp_test_Y1vZ5apL1BJ4Gg
        const options = {
          key: data?.data?.paymentCred, // Replace with your Razorpay key
          amount: data?.data?.Total, // Amount in paise (500 INR)
          // amount: payableAmount * 100,
          currency: "INR",
          name: "Baofeng",
          description: "  Transaction",
          image: "https://your-logo-url.com", // Optional logo URL
          order_id: data?.data?.order?.id,
          handler: (response) => {
            console.log(response);
            checkoutApi(response);
            // alert(`Payment ID: ${response.razorpay_payment_id}`);
          },
          prefill: {
            name: window.localStorage.getItem("userName"),
            email: window.localStorage.getItem("email"),
            // contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        // const rzpay = new Razorpay(options);
        const rzpay = new window.Razorpay(options);

        rzpay.on("payment.failed", function (response) {
          // console.log(response);
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);
        });
        rzpay.open();
      } catch (error) {
        console.error("Error in handlePayment:", error);
      }
    },
    [Razorpay]
  );
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    // script.onload = () => {
    //   setScriptLoaded(true);
    // };
    script.onerror = () => {
      console.error("Razorpay SDK failed to load.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // new

  const [diliveryAdd, setDiliveryAdd] = useState([]);
  const [billingAddres, setBillingAddres] = useState([]);
  console.log("message", billingAddres[0]);

  const userid = window.localStorage.getItem("user_id");
  const isLogin = window.localStorage.getItem("isLogin");
  const [shipping, setShipping] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const navigate = useNavigate();
  const dispacher = useDispatch();

  const [editAdd, { isLoading }] = useSetEditedAddresMutation();
  const [
    tempCart,
    { data: plaecedData, isError, isSuccess, isLoading: cartIsLoading },
  ] = useSetCartTemptMutation();

  useEffect(() => {
    if (isSuccess) {
      window.localStorage.removeItem("cartItem");
      dispacher(setCartLeng(0));
      dispacher(setCartCalc([]));
    }
  }, [isSuccess]);
  const [modalShowCoupen, setModalShowCoupen] = useState(false);

  const [deleteList] = useClearAllListMutation();
  let isTempLoading = false;
  // const [addAddress] = useAddAddressDetailMutation()
  const token = window.localStorage.getItem("token");

  const [showModal, setShowMoal] = useState(true);
  const [cartValue, setCartValue] = useState();
  const [cartValueVa, setCartValueVa] = useState(null);
  const [cartDetail, setcartDetail] = useState(null);
  const baseUrl = base_url();
  // const { data: cartDetail } = useGetCartCheackoutMutation({ id: null, token: token })
  const shippingSelectionActive = async (id) => {
    if (id) {
      try {
        // const res = await axios.post(
        //   `${baseUrl}cart/checkout?products=${getCartToken() || ""}&coupon=${getCouponToken() || ""
        //   }`,
        const res = await axios.get(
          `${baseUrl}abndt/${params?.id}`,
          // { shipId: id },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setcartDetail(res.data);
      } catch (error) {}
    } else {
      try {
        // const res = await axios.post(
        //   `${baseUrl}cart/checkout?products=${getCartToken() || ""}&coupon=${getCouponToken() || ""
        //   }`,

        const res = await axios.get(
          `${baseUrl}abndt/${params?.id}`,
          // { shipId: cartValueVa },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setcartDetail(res.data);
      } catch (error) {}
    }
  };
  const [showTaoster, setShowToaster] = useState({
    show: false,
    message: "",
    color: "success",
  });

  const curr = window.localStorage.getItem("currencySym");
  let currencySymbol = curr;
  if (currencySymbol === "undefined") {
    currencySymbol = "ZK";
  }
  // const { data: cartval, isSuccess: iscartin } = useGetCartQuery(user_id);

  const { object, cartCal } = useSelector((state) => {
    return state.productList;
  });

  const [AddBillAdd, { isLoading: isLoadingBillAdd }] =
    usePostBillAddresMutation();

  const [alert1, setAlert] = useState(false);
  const [showPayment, seShowPayment] = useState(false);

  const [formData, setFormData] = useState({
    btype: "both",
    bcountry: "",
    bstate: "",
    bcity: "",
    bzip: "",
    baddressLine1: "",
    baddressLine2: "",
    blandmark: "",
    bprovince: "",
    bfirstname: "",
    blastname: "",
    bcompany: "",
    bdeliveryType: "home",
    bemail: "",
    bmobile: "",
    user_gst: "",
    // userid: window.localStorage.getItem('user_id')
  });

  console.log(formData);

  // console.log(formData);

  const [validationBill, setvalidationBill] = useState({
    country: false,
    city: false,
    fullAddress: false,
    firstName: false,
    lastName: false,

    deliveryType: false,
  });

  const updateAddress = async () => {
    if (data?.address?._id) {
      const obj = {
        type: "both",
        country: formData.bcountry,
        state: formData.bstate,
        city: formData.bcity,
        zip: formData.bzip,
        addressLine1: formData.baddressLine1,
        addressLine2: formData.baddressLine2,
        landmark: formData.blandmark,
        province: formData.bprovince,
        company: formData.bcompany,
        selectedBillingAddress: true,

        deliveryType: formData.bdeliveryType,
        email: formData.bemail,
        mobile: formData.bmobile,
        user_gst: "",

        userid: window.localStorage.getItem("user_id"),
      };
      editAdd({
        data: { ...obj, ship_id: data.address._id },
        token: window.localStorage.getItem("token"),
      });
    } else {
      AddBillAdd({
        data: { ...formData, selectedBillingAddress: true },
        token: window.localStorage.getItem("token"),
      });

      try {
        const res = await AddBillAdd({
          data: { ...formData, selectedBillingAddress: true },
          token: window.localStorage.getItem("token"),
        }).unwrap(); // unwrap() se promise resolve hota hai

        getDiliveryAddres();
        setAddresListData(null);
        setFormData({
          btype: "both",
          bcountry: "",
          bstate: "",
          bcity: "",
          bzip: "",
          baddressLine1: "",
          baddressLine2: "",
          blandmark: "",
          bprovince: "",
          bfirstname: "",
          blastname: "",
          bcompany: "",
          bdeliveryType: "home",
          bemail: "",
          bmobile: "",
          user_gst: "",
        });
        setNewAddress(true);

        // const resBilling = await axios.post(`user/register/billAddress-new` ,)
      } catch (err) {
        console.error("Error adding bill address:", err);
      }
    }
  };

  const [addresListData, setAddresListData] = useState(null);
  // console.log(addresListData);

  const addresUpdateGetdata = (item) => {
    if (item?._id) {
      setAddresListData(item);

      const clone = {
        btype: item?.type,
        bcountry: item?.country,
        bstate: item?.state,
        bcity: item?.city,
        bzip: item?.zip,
        baddressLine1: item?.addressLine1,
        baddressLine2: item?.addressLine2,
        blandmark: item?.landmark,
        bprovince: item?.province,
        bfirstname: item?.firstname,
        blastname: item?.lastname,
        bcompany: item?.company,
        bdeliveryType: item?.deliveryType,
        bemail: item?.email,
        bmobile: item?.phone,
        user_gst: item?.user_gst,
      };

      setFormData(clone);
      setNewAddress(true);
    }
  };

  const addresUpdate = async () => {
    try {
      const res = await axios.put(
        `${baseUrl}user/register/billAddress-new/${addresListData?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.data?.statusCode == 200) {
        alert(res?.data?.message);
        getDiliveryAddres();
        setAddresListData(null);
        setNewAddress(false);
        setFormData({
          btype: "both",
          bcountry: "",
          bstate: "",
          bcity: "",
          bzip: "",
          baddressLine1: "",
          baddressLine2: "",
          blandmark: "",
          bprovince: "",
          bfirstname: "",
          blastname: "",
          bcompany: "",
          bdeliveryType: "home",
          bemail: "",
          bmobile: "",
          user_gst: "",
        });
      } else {
        alert("server side error");
      }
    } catch (error) {}
  };

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  // console.log(selectedData);

  useEffect(() => {
    if (diliveryAdd.length > 0) {
      const firstItem = diliveryAdd[0];
      setSelectedAddressId(String(firstItem._id));
      setSelectedData(firstItem);
      const clone = {
        ...formData,
        btype: firstItem?.type,
        bcountry: firstItem?.country,
        bstate: firstItem?.state,
        bcity: firstItem?.city,
        bzip: firstItem?.zip,
        baddressLine1: firstItem?.addressLine1,
        baddressLine2: "",
        blandmark: firstItem?.landmark,
        bprovince: firstItem?.province,
        bfirstname: firstItem?.firstname,
        blastname: firstItem?.lastname,
        bcompany: firstItem?.company,
        bdeliveryType: firstItem?.deliveryType,
        bemail: firstItem?.email,
        bmobile: firstItem?.phone,
        user_gst: firstItem?.user_gst,
      };
      setFormData(clone);
    }
  }, [diliveryAdd]);

  const handleSelect = (item) => {
    setSelectedAddressId(String(item?._id));
    setSelectedData(item);
    const clone = {
      ...formData,
      btype: item?.type,
      bcountry: item?.country,
      bstate: item?.state,
      bcity: item?.city,
      bzip: item?.zip,
      baddressLine1: item?.addressLine1,
      baddressLine2: "",
      blandmark: item?.landmark,
      bprovince: item?.province,
      bfirstname: item?.firstname,
      blastname: item?.lastname,
      bcompany: item?.company,
      bdeliveryType: item?.deliveryType,
      bemail: item?.email,
      bmobile: item?.phone,
      user_gst: item?.user_gst,
    };
    // console.log('lkjl', clone);
    // console.log(item);
    setFormData(clone);
  };

  const getDiliveryAddres = async () => {
    try {
      const resBillingAddress = await axios.get(`${baseUrl}user/billAddress`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("resBillingAddress response", resBillingAddress);
      
      if (resBillingAddress?.status === 200) {
        const activeAddresses = resBillingAddress?.data?.address?.filter(
          (item) => item?.active === true
        );
        console.log("activeAddresses", activeAddresses);

        setBillingAddres(activeAddresses);
      }

      const resShipping = await axios.get(`${baseUrl}user/shipAddress`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resShipping?.status == 200) {
        setDiliveryAdd(resShipping?.data?.address);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDiliveryAddres();
  }, []);

  const [uiShow, setUiShow] = useState(false);
  const [messageShow, setMessageShow] = useState("");
  const [isServiceable, setIsServiceable] = useState(null);
  const [buttonDisabled, setButtonDisbled] = useState(true);
  const [paymentMode, setPaymentMode] = useState("");

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let val = value;

    if (name === "bzip") {
      val = value.replace(/\D/g, "");
      if (val.length > 6) return;
    }

    const cloneData = { ...formData, [name]: val };
    setFormData(cloneData);
    console.log("formData", formData);

    if (name === "bzip") {
      if (val.length === 6) {
        try {
          const res = await axios.post(`${baseUrl}delivery-service/pincode`, {
            pincode: val,
          });

          if (res?.data?.is_serviceable === true) {
            setMessageShow();
            setIsServiceable(true);
            setUiShow(true);
            setButtonDisbled(false);
          } else {
            setMessageShow(
              res?.data?.message || "Currently this pincode is not serviceable"
            );
            setIsServiceable(false);
            setUiShow(true);
            setButtonDisbled(true);
          }
        } catch (error) {
          setMessageShow("Something went wrong, please try again.");
          setIsServiceable(false);
          setUiShow(true);
          setButtonDisbled(true);
        }
      } else {
        setUiShow(false);
        setMessageShow("");
        setIsServiceable(null);
        setButtonDisbled(true);
      }
    }
  };

  let shippingAdd;
  const setShippingAdd = (item) => {
    shippingAdd = item;
  };
  let ship = true;

  useEffect(() => {
    if (isError) {
      alert("Something went Wrong Order Not Placed !!");
    } else {
      setCartValue(cartCal);
      alertMsg();
    }
  }, [isError]);

  const alertMsg = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
      // navigate('/')
    }, 2000);
  };

  // const { data } = useGetActiveBillingQuery(userid)
  const [data, setData] = useState(null);

  // const token = window.localStorage.getItem('token')
  const getBillData = async () => {
    try {
      const res = await axios.get(`${baseUrl}user/getActiveBillAddress`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    let isLogin = getLoginDetails();
    if (!!!isLogin) getBillData();
  }, []);

  const handleToaster = () => {
    setShowToaster({ ...showTaoster, show: false });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const obj = {
      btype: "both",
      bcountry: data?.address?.country,
      bstate: data?.address?.state,
      bcity: data?.address?.city,
      bzip: data?.address?.zip,
      bfirstname: data?.address?.firstname,
      blastname: data?.address?.lastname,
      baddressLine1: data?.address?.addressLine1,
      baddressLine2: data?.address?.addressLine2,
      blandmark: data?.address?.landmark,
      bprovince: data?.address?.province,
      bcompany: data?.address?.company,
      bdeliveryType: "home",
      bemail: data?.address?.email,
      bmobile: data?.address?.mobile,
      user_gst: data?.address?.user_gst,
      userid: window.localStorage.getItem("user_id"),
    };
    setFormData(obj);
    window.localStorage.setItem("shippingId", "");
  }, [data]);
  console.log(data);

  const [
    getDisCoupons,
    { isLoading: forCoupons, isSuccess: forcoupensucc, data: couponData },
  ] = useGetCouponMutation();

  const couponRef = useRef();
  useEffect(() => {
    if (forcoupensucc) {
      shippingSelectionActive();
    }
  }, [forcoupensucc]);

  useEffect(() => {
    if (couponData?.coupon) {
      window.localStorage.setItem("couponToken", couponData?.coupon);
    }
  }, [couponData]);

  const sendCouponFree = (val) => {
    getDisCoupons({ value: val, id: window.localStorage.getItem("user_id") });
  };

  // const cashDelevery = () => {
  //   seShowPayment(false);
  // };

  const [data1, setData1] = useState();

  const getPayments1 = async () => {
    try {
      const res = await axios.get(`${baseUrl}paymentGate/public`);
      setData1(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getPayments1();
  }, []);
  const { t, i18n } = useTranslation();

  const [contactDetail, setcontactDetail] = useState("");

  const [formDataShipp, setFormDataShipp] = useState({
    btype: "shipping",
    bcountry: "",
    bstate: "",
    bcity: "",
    bzip: "",
    baddressLine1: "",
    baddressLine2: "",
    blandmark: "",
    bfirstname: "",
    blastname: "",
    bprovince: "",
    bcompany: "",
  });

  const [validationShipp, setvalidationShipp] = useState({
    country: false,
    city: false,
    fullAddress: false,
    firstName: false,
    lastName: false,
  });

  const handleChangeship = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    const cloneData = { ...formDataShipp };
    cloneData[name] = val;
    setFormDataShipp(cloneData);
  };

  const [shippingoffline, setShippingOffline] = useState(false);
  const [namecus, setnamecus] = useState();

  const setShippingOfflineTwo = () => {
    setShippingOffline(!shippingoffline);
  };

  const cheackValidationForm = () => {
    let clone = {
      country: false,
      city: false,
      fullAddress: false,
      firstName: false,
      lastName: false,
    };

    if (!formData.bcountry) {
      clone.country = true;
    }
    if (formData.bcountry) {
      clone.country = false;
    }
    if (!formData.bcity) {
      clone.city = true;
    }
    if (formData.bcity) {
      clone.city = false;
    }
    if (!formData.baddressLine1) {
      clone.fullAddress = true;
    }
    if (formData.baddressLine1) {
      clone.fullAddress = false;
    }
    if (!formData.bfirstname?.length) {
      clone.firstName = true;
    }
    if (formData.bfirstname?.length) {
      clone.firstName = false;
    }
    if (!formData.blastname?.length) {
      clone.lastName = true;
    }
    if (formData.blastname?.length) {
      clone.lastName = false;
    }
    console.log(clone);
    console.log(formData);
    setvalidationBill(clone);
  };

  const cheackValidationFormShipp = () => {
    let clone = {
      country: false,
      city: false,
      fullAddress: false,
      firstName: false,
      lastName: false,
    };
    if (!formDataShipp.bcountry) {
      clone.country = true;
    }
    if (formDataShipp.bcountry) {
      clone.country = false;
    }
    if (!formDataShipp.bcity) {
      clone.city = true;
    }
    if (formDataShipp.bcity) {
      clone.city = false;
    }
    if (!formDataShipp.baddressLine1) {
      clone.fullAddress = true;
    }
    if (formDataShipp.baddressLine1) {
      clone.fullAddress = false;
    }
    if (!formDataShipp.bfirstName) {
      clone.firstName = true;
    }
    if (formDataShipp.bfirstName) {
      clone.firstName = false;
    }
    if (!formDataShipp.blastName) {
      clone.lastName = true;
    }
    if (formDataShipp.blastName) {
      clone.lastName = false;
    }
    setvalidationShipp(clone);
  };

  const notify = () => toast("Please Add Delivery address");
  // notify()

  const [contactDetailValid, setcontactDetailValid] = useState(false);
  const handlePlaceOffline = (e) => {
    if (isLogin === "false") {
      navigate("/login");
      return;
    }
    // if (diliveryAdd?.length > 0) {
    //   // setShowDeliveryPopup(true);
    //   console.log('abc test');

    //   notify()
    //   return;
    // }
    setvalidationBill({
      country: false,
      city: false,
      fullAddress: false,
      firstName: false,
      lastName: false,
    });
    setvalidationShipp({
      country: false,
      city: false,
      fullAddress: false,
      firstName: false,
      lastName: false,
    });
    if (!contactDetail) {
      setcontactDetailValid(true);
    }

    cheackValidationForm();
    if (contactDetail) {
      setcontactDetailValid(false);
    }
    if (!contactDetail) {
      return;
    }
    if (shipping) {
      cheackValidationFormShipp();
      if (
        !formDataShipp.bcountry ||
        !formDataShipp.bcity ||
        !formDataShipp.bfirstname ||
        !formDataShipp.bfirstname ||
        !formDataShipp.baddressLine1
      ) {
        return;
      }
    }
    if (
      !formData.bcountry ||
      !formData.bcity ||
      !formData.bfirstname ||
      !formData.blastname ||
      !formData.baddressLine1
    ) {
      return;
    }

    e.preventDefault();
    if (formDataShipp?.bcity?.length > 0) {
      const paylode = {
        billAddress: formData,
        shipping_Address: formDataShipp,
        contactDetail: contactDetail,
        trans_type: paymentMode,
        name: namecus,
        Seller: window.localStorage.getItem("sellerId"),
        Delivery_Status: "Pending",
        // Payment_method: "COD",
        Payment_method: paymentMode,
        Payment_Status: "Unpaid",
        orderStatus: "Not Processed",
        shipId: cartValueVa,
        billAddress_Active: false,
      };
      tempCart({
        data: paylode,
        token: token,
      });
    } else {
      const paylode = {
        billAddress: formData,
        shipping_Address: formData,
        contactDetail: contactDetail,
        trans_type: paymentMode,
        name: namecus,
        Seller: window.localStorage.getItem("sellerId"),
        Delivery_Status: "Pending",
        Payment_method: paymentMode,
        Payment_Status: "Unpaid",
        orderStatus: "Not Processed",
        shipId: cartValueVa,
        billAddress_Active: false,
      };
      tempCart({
        data: paylode,
        token: token,
      });
    }
  };

  const handlePlace = (e) => {
    // debugger
    if (isLogin === "false") {
      navigate("/login");
      return;
    }
    setvalidationBill({
      country: false,
      city: false,
      fullAddress: false,
      firstName: false,
      lastName: false,
    });
    setvalidationShipp({
      country: false,
      city: false,
      fullAddress: false,
      firstName: false,
      lastName: false,
    });

    // cheackValidationForm();

    // if (
    //   !formData.bcountry ||
    //   !formData.bcity ||
    //   !formData.bfirstname ||
    //   !formData.blastname ||
    //   !formData.baddressLine1
    // ) {
    //   return;
    // }
    e.preventDefault();
    if (!billingAddres[0] || billingAddres[0]?.active !== true) {
      
      alert("Please fill billing address before placing order!");
      return;
    }
    
    
    const paylode = {
      // billAddress: formData,
      // shipping_Address: shippingAdd,
      abndnt: params?.id,
      shipping_Address: formData,
      billAddress: billingAddres[0],
      Seller: cartDetail?.cart?.products[0]?.price?.seller_id,
      Delivery_Status: "Pending",
      trans_type: paymentMode,
      Payment_method: paymentMode,
      Payment_Status: "Unpaid",
      orderStatus: "Not Processed",
      shipId: cartValueVa,
      billAddress_Active: ship,
    };
    tempCart({
      data: paylode,
      token: token,
    });
    // setSuccessModal(true);
  };

  const [listShips, setListShips] = useState(null);
  const shippingSelection = async () => {
    try {
      const res = await axios.get(`${baseUrl}shippingPrice/public`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setListShips(res.data);
      setCount(0);
      shippingSelectionActive(res?.data[0]?._id);
      setCartValueVa(res.data[0]?._id);
    } catch (error) {}
  };
  useEffect(() => {
    shippingSelection();
    shippingSelectionActive();
  }, []);

  const [count, setCount] = useState(0);
  const changeIndex = (ind, item) => {
    setCount(ind);
    shippingSelectionActive(item?._id);
    setCartValueVa(item?._id);
  };
  const sendCouponRemove = async () => {
    // getDisCoupons({ value: "#removecoupon" })
    try {
      const res = await axios.delete(`${baseUrl}cart/removeCoupon`, {
        withCredentials: true,
      });
      shippingSelectionActive();
    } catch (error) {}
  };

  const [timeslot, setTimeslot] = useState(null);
  // console.log('timeslot', timeslot);

  const [currentDate, setCurrentDate] = useState("");
  console.log("currentDate", currentDate);

  useEffect(() => {
    // Call the function to set the current date when the component mounts
    setCurrentDate(getFormattedDate());
  }, []);

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const timeSlotGet = async () => {
    try {
      const res = await axios.get(
        `https://onlineparttimejobs.in/api/timeGroup/public`,
        { withCredentials: true }
      );
      console.log(res.data);
      setTimeslot(res.data);
    } catch (error) {
      alert(error);
    }
  };

  const [sloteid, setSlote] = useState(null);
  const [groupid, setgroupid] = useState(null);

  const setValues = (slotid, groupids) => {
    setSlote(slotid);
    setgroupid(groupids);
  };

  useEffect(() => {
    timeSlotGet();
  }, []);

  const [showSuccessModal, setSuccessModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const handlePaymentSelect = (mode) => {
    setPaymentMode((prev) => (prev === mode ? "" : mode));
  };

  // const isPlaceOrderEnabled =
  //   cartDetail?.cart?.products?.length > 0 && paymentMode !== "";
  const isPlaceOrderEnabled =
    cartDetail?.cart?.products?.length > 0 &&
    paymentMode !== "" &&
    diliveryAdd?.length > 0;
  diliveryAdd?.some(
    (item) => item?.btype === "shipping" || item?.btype === "billing"
  );

  useEffect(() => {
    if (plaecedData?.error == false) {
      // console.log('plaecedData', plaecedData);
      handlePayment(plaecedData);
    }
  }, [plaecedData]);

  useEffect(() => {
    if (plaecedData?.statusCode == 200) {
      setSuccessModal(true);
      navigate("/thankyou", { state: { placedData: plaecedData } });
    }
  }, [plaecedData]);

  useEffect(() => {
    if (diliveryAdd?.length <= 0) {
      setNewAddress(true);
    } else {
      setNewAddress(false);
    }
  }, [diliveryAdd]);

  const checkoutApi = async (data) => {
    const clone = {
      ...plaecedData?.data,
      razorpay_order_id: data?.razorpay_order_id,
      razorpay_payment_id: data?.razorpay_payment_id,
      razorpay_signature: data?.razorpay_signature,
    };
    try {
      const token = window.localStorage.getItem("token");
      const res = await axios.post(`${baseUrl}paymentGate/razorpay-nw`, clone, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res?.data?.statusCode == 201) {
        setSuccessModal(true);
        setCheckoutData(res);
      }
    } catch (error) {}
  };

  // useEffect(() => {
  //   const callAbndtUpdate = async () => {
  //     try {
  //       // 1️⃣ Wait for 5 seconds after checkout page load
  //       await new Promise((resolve) => setTimeout(resolve, 5000));

  //       // 2️⃣ Get the abandoned cart data
  //       const getRes = await axios.get(`${baseUrl}abndt/${params?.id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // 3️⃣ Prepare the payload
  //       const payload = {
  //         ...getRes?.data?.cart,
  //         shippingAddress_save: diliveryAdd?.length > 0 ? diliveryAdd[0] : null, // shipping address

  //       };

  //       // 4️⃣ PUT call to update
  //       const putRes = await axios.put(`${baseUrl}abndt/${params?.id}`, payload, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       console.log("✅ Abandoned checkout updated successfully:", putRes.data);
  //     } catch (error) {
  //       console.error("❌ Error updating abandoned checkout:", error);
  //     }
  //   };

  //   // Run only if we have address data available
  //   if (data?.address || diliveryAdd?.length > 0) {
  //     callAbndtUpdate();
  //   }
  // }, [data, diliveryAdd]);

  useEffect(() => {
    let timer;
    let userInteracted = false;

    const callAbndtUpdate = async () => {
      try {
        const getRes = await axios.get(`${baseUrl}abndt/${params?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const latestAddress =
          diliveryAdd?.length > 0 ? diliveryAdd[0] : data?.address || null;

        const payload = {
          ...getRes?.data?.cart,
          shippingAddress_save: latestAddress,
        };

        const putRes = await axios.put(
          `${baseUrl}abndt/${params?.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ Abandoned checkout updated successfully:", putRes.data);
      } catch (error) {
        console.error("❌ Error updating abandoned checkout:", error);
      }
    };

    // 🕒 1️⃣ PAGE LOAD PE bhi 5 sec baad call karo
    timer = setTimeout(() => {
      callAbndtUpdate();
    }, 5000);

    // 🧑‍💻 2️⃣ User input detect hone par bhi reset timer
    const resetTimer = () => {
      userInteracted = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        callAbndtUpdate();
      }, 5000);
    };

    // 🎯 Target form area
    const addressContainer = document.querySelector("#shippingAddressForm");
    if (addressContainer) {
      ["input", "change", "keyup"].forEach((event) =>
        addressContainer.addEventListener(event, resetTimer)
      );
    }

    // 🧹 Cleanup
    return () => {
      clearTimeout(timer);
      if (addressContainer) {
        ["input", "change", "keyup"].forEach((event) =>
          addressContainer.removeEventListener(event, resetTimer)
        );
      }
    };
  }, [data, diliveryAdd]);

  // const [payementModee, setpaymentModee] = useState("COD");
  const verifyPayment = async (data) => {
    const clone = {
      orderId: data,
    };
    try {
      const res = await axios.post(
        `${baseUrl}paymentGate/checkout-cashf`,
        clone,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("cashfree res", res);

      if (res?.data?.statusCode == 201) {
        setSuccessModal(true);
        setCheckoutData(res);
      }
    } catch (error) {
      console.log("Cashfree payment error", error);
    }
  };

  const handleCashFree = async (data) => {
    try {
      const cashfree = await load({ mode: "sandbox" });
      const checkoutOptions = {
        paymentSessionId: data?.data?.paymentSessionId,
        redirectTarget: "_modal",
      };
      cashfree.checkout(checkoutOptions).then((res) => {
        console.log("payment initialized", res);

        verifyPayment(data?.data?.orderId);
      });
    } catch (error) {
      console.log("payment error", error);
    }
  };

  useEffect(() => {
    if (plaecedData?.error == false && plaecedData?.data.method == "Razorpay") {
      handlePayment(plaecedData);
    } else if (
      plaecedData?.error == false &&
      plaecedData?.data.method == "CashFree"
    ) {
      handleCashFree(plaecedData);
    }
  }, [plaecedData]);

  const cashDelevery = (e) => {
    seShowPayment(false);
    setPaymentMode(e?.target?.value);
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Bofeng</title>
        <meta name="keyword" content="Bofeng" />
        <meta name="description" content="Bofeng" />
      </Helmet>
      <section className="checkoutSec mt-4 mb-4">
        <div className="container">
          {forCoupons && (
            <div className="preloaderCount">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {cartIsLoading && (
            <div className="preloaderCount">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-lg-12">
              {!isLogin && (
                <div className="loginInfo">
                  <div className="coupon">
                    <p>
                      New Registration{" "}
                      <Link to="/registration">Create Account</Link>
                    </p>
                  </div>
                  <div className="coupon">
                    <p>
                      Already Have Account <Link to="/login">Login</Link>
                    </p>
                  </div>
                </div>
              )}
              {isLogin === "false" && (
                <div className="neww">
                  <form className="row">
                    <div className="col-6 col-md-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        {t("Mobile No")}
                      </label>
                      <input
                        type="number"
                        className={`form-control ${
                          contactDetailValid && "cusvalidate"
                        }`}
                        name="bcountry"
                        placeholder="Mobile No"
                        value={contactDetail}
                        onChange={(e) => {
                          setcontactDetail(e.target.value);
                        }}
                        aria-describedby="emailHelp"
                      />
                      {contactDetailValid && (
                        <span style={{ color: "red" }}> Enter Mobile</span>
                      )}
                    </div>
                    {/* <div className="col-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">{t('Name')}</label>
                    <input type="text" className="form-control" name="bcountry" placeholder="Name" value={namecus} onChange={(e) => { setnamecus(e.target.value) }} aria-describedby="emailHelp" />
                  </div> */}
                  </form>
                </div>
              )}
            </div>

            <div className="col-lg-7">
              <div className="allAddedAddress mt-2">
                <h6>Delivery Address</h6>
                <div className="addressList">
                  {diliveryAdd &&
                    diliveryAdd?.map((item) => {
                      const isSelected =
                        String(item?._id) === String(selectedAddressId);

                      // console.log(isSelected);
                      return (
                        <div className="addressListItem" key={item?._id}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioDefault"
                              id={`radio-${item._id}`}
                              checked={isSelected}
                              onChange={() => handleSelect(item)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="radioDefault1"
                            >
                              <h6>
                                <span>
                                  {item?.firstname} {item?.lastname}
                                </span>{" "}
                                <strong>
                                  {item?.deliveryType
                                    ? item?.deliveryType
                                    : "Home"}
                                </strong>{" "}
                                <span>{item?.phone}</span>{" "}
                              </h6>
                              <p>
                                {item?.addressLine1}
                                <strong> {item?.zip}</strong>
                              </p>

                              {isSelected && (
                                <div className="deliveryHere">
                                  <button className="btn btn-warning">
                                    Deliver Here
                                  </button>
                                </div>
                              )}
                            </label>
                          </div>
                          <div
                            className="listaddress-edit"
                            onClick={() => addresUpdateGetdata(item)}
                          >
                            Edit
                          </div>
                        </div>
                      );
                    })}

                  {/* <div className="addressListItem">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="radioDefault"
                        id="radioDefault2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="radioDefault2"
                      >
                        <h6>
                          <span>Shahid Kapoor</span> <strong>HOME</strong>{" "}
                          <span>9565848688</span>{" "}
                        </h6>
                        <p>
                          R213 Gali No. 4 (4th Floor) Sir Syed Road, Joga Bai
                          Extension, Batla House, Okhla, New Delhi, 110025,
                          Batla House, New Delhi, Delhi <strong>110025</strong>
                        </p>

                        <div className="deliveryHere">
                          <button className="btn btn-warning">
                            Delivery Here
                          </button>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="addressListItem">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="radioDefault"
                        id="radioDefault3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="radioDefault3"
                      >
                        <h6>
                          <span>Shahid Kapoor</span> <strong>HOME</strong>{" "}
                          <span>9565848688</span>{" "}
                        </h6>
                        <p>
                          Post - Pandeybara, District - Hazaribagh,, Kesath,
                          Chauparan, Jharkhand <strong>825406</strong>
                        </p>

                        <div className="deliveryHere">
                          <button className="btn btn-warning">
                            Delivery Here
                          </button>
                        </div>
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="addNewAddress">
                <button
                  className="commonButton"
                  onClick={() => setNewAddress(!newAddress)}
                >
                  Add a New Address
                </button>
              </div>

              {newAddress && (
                <div className="checkoutBody">
                  <div className="billingDetails">
                    <h5>{t("Add New Address")}</h5>

                    <CustomToaster
                      color={showTaoster.color}
                      title={data?.name}
                      show={showTaoster.show}
                      setShow={handleToaster}
                      message={showTaoster.message}
                      position="bottom-end"
                      delay={3000}
                    />

                    <form
                      className="row needs-validation"
                      novalidate
                      id="shippingAddressForm"
                    >
                      <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                        <label className="form-label form-label-high">
                          {t("Delivery Type")}{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <div className="d-flex gap-3">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="bdeliveryType"
                              value="home"
                              checked={formData?.bdeliveryType === "home"}
                              onChange={handleChange}
                              className="form-check-input me-2"
                            />
                            Home
                          </label>

                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="bdeliveryType"
                              value="office"
                              checked={formData?.bdeliveryType === "office"}
                              onChange={handleChange}
                              className="form-check-input me-2"
                            />
                            Office
                          </label>

                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="bdeliveryType"
                              value="other"
                              checked={formData?.bdeliveryType === "other"}
                              onChange={handleChange}
                              className="form-check-input me-2"
                            />
                            Other
                          </label>
                        </div>
                      </div>
                      <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                        <label className="form-label form-label-high">
                          {t("Address Type")}{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>

                        {/* <div className="d-flex gap-3">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="bdeliveryType"
                              value="home"
                              checked={formData?.bdeliveryType === "home" || !formData?.bdeliveryType}
                              onChange={handleChange}
                              className="form-check-input me-2"
                            />
                            Billing
                          </label>

                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="bdeliveryType"
                              value="office"
                              checked={formData?.bdeliveryType === "office"}
                              onChange={handleChange}
                              className="form-check-input me-2"
                            />
                            Delivery
                          </label>

                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="bdeliveryType"
                              value="other"
                              checked={formData?.bdeliveryType === "other"}
                              onChange={handleChange}
                              className="form-check-input me-2"
                            />
                            Both
                          </label>
                        </div> */}
                        <div className="d-flex gap-3">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="btype"
                              value="billing"
                              checked={formData?.btype === "billing"}
                              onChange={handleChange}
                              className="form-check-input me-2"
                            />
                            Billing
                          </label>

                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="btype"
                              value="shipping"
                              checked={formData?.btype === "shipping"}
                              onChange={handleChange}
                              className="form-check-input me-2"
                            />
                            Delivery
                          </label>

                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="btype"
                              value="both"
                              checked={
                                formData?.btype === "both" || !formData?.btype
                              }
                              onChange={handleChange}
                              className="form-check-input me-2"
                            />
                            Both
                          </label>
                        </div>

                        {validationBill?.bdeliveryType && (
                          <span style={{ color: "red" }}>
                            Enter a Delivery Type
                          </span>
                        )}
                      </div>
                      {/* <div className="mb-3 col-lg-12">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          {t("Delivery Type")}
                        </label>
                        <select
                          className="form-select"
                          value={formData?.bdeliveryType}
                          onChange={handleChange}
                          name="bdeliveryType"
                        >
                          <option value="">Select Delivery Type</option>
                          <option value="home">Home</option>
                          <option value="office">Office</option>
                          <option value="other">Others</option>
                        </select>
                        {validationBill?.bdeliveryType && (
                          <span style={{ color: "red" }}>
                            Enter a First Name
                          </span>
                        )}
                      </div> */}
                      <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          {t("First Name")}{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            validationBill?.firstName && "cusvalidate"
                          }`}
                          name="bfirstname"
                          placeholder="Enter First Name"
                          value={formData?.bfirstname}
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                        {validationBill?.firstName && (
                          <span style={{ color: "red" }}>
                            Enter a First Name
                          </span>
                        )}
                      </div>
                      <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          {t("Last Name")}{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            validationBill?.lastName && "cusvalidate"
                          }`}
                          name="blastname"
                          value={formData?.blastname}
                          placeholder="Enter Last Name"
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                        {validationBill?.lastName && (
                          <span style={{ color: "red" }}>
                            Enter a Last Name
                          </span>
                        )}
                      </div>
                      <div className="mb-3 col-12">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          {t("Full Address")}{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <textarea
                          className={`form-control ${
                            validationBill?.fullAddress && "cusvalidate"
                          }`}
                          name="baddressLine1"
                          placeholder="Full Address (Area and Street)"
                          value={formData?.baddressLine1}
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                        ></textarea>
                        {validationBill?.fullAddress && (
                          <span style={{ color: "red" }}>Enter an Address</span>
                        )}
                      </div>

                      <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                        <label
                          htmlFor="exampleInputEmail10"
                          className="form-label"
                        >
                          {t("Pincode")}{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            validationBill?.bzip && "cusvalidate"
                          }`}
                          id="exampleInputEmail10"
                          required
                          name="bzip"
                          placeholder="Pincode"
                          value={formData?.bzip}
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                        {validationBill?.zip && (
                          <span style={{ color: "red" }}> Enter Pincode</span>
                        )}

                        {uiShow && (
                          <p
                            style={{
                              color: isServiceable ? "green" : "red",
                              marginTop: "5px",
                            }}
                          >
                            {messageShow}
                          </p>
                        )}
                      </div>

                      <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          {t("City")}{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            validationBill?.city && "cusvalidate"
                          }`}
                          name="bcity"
                          placeholder="City"
                          value={formData?.bcity}
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                        {validationBill?.city && (
                          <span style={{ color: "red" }}> Enter a city</span>
                        )}
                      </div>

                      <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                        <label
                          htmlFor="exampleInputEmail10"
                          className="form-label"
                        >
                          {t("State")}{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            validationBill?.bstate && "cusvalidate"
                          }`}
                          id="exampleInputEmail10"
                          required
                          name="bstate"
                          placeholder="Enter State"
                          value={formData?.bstate}
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                        {validationBill?.state && (
                          <span style={{ color: "red" }}>Enter State</span>
                        )}
                      </div>

                      <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                        <label
                          htmlFor="exampleInputEmail10"
                          className="form-label"
                        >
                          {t("Country")}{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            validationBill?.country && "cusvalidate"
                          }`}
                          id="exampleInputEmail10"
                          required
                          name="bcountry"
                          placeholder="Enter Country"
                          value={formData?.bcountry}
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                        {validationBill?.country && (
                          <span style={{ color: "red" }}> Enter Country</span>
                        )}
                      </div>

                      {/* <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                      <label htmlFor="exampleInputEmail1" className="form-label">{('State')}</label>
                      <input type="text" className="form-control" name="bstate" value={formData?.bstate} onChange={handleChange} aria-describedby="emailHelp" />
                    </div> */}
                      <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          {"GST Number"}(Optional)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="user_gst"
                          placeholder="Enter GST Number"
                          value={formData?.user_gst}
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          {"Email"} (Optional)
                        </label>
                        <input
                          type="mail"
                          className="form-control"
                          name="bemail"
                          placeholder="Email for order communication"
                          value={formData?.bemail}
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          {"Mobile Number Of Delivery Receiver"} (Optional)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="bmobile"
                          placeholder="Mobile Number Of Delivery Receiver"
                          value={formData?.bmobile}
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                      </div>

                      {/* <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                      <label htmlFor="exampleInputEmail1" className="form-label">{t('Province')}</label>
                      <input type="text" className="form-control" name="bprovince" value={formData?.bprovince} onChange={handleChange} aria-describedby="emailHelp" />
                    </div> */}

                      {/* <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                      <label htmlFor="exampleInputEmail1" className="form-label">{t('Address Line2')}</label>
                      <input type="text" className="form-control" name="baddressLine2" value={formData?.baddressLine2} onChange={handleChange} aria-describedby="emailHelp" />
                    </div> */}

                      {/* <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                      <label htmlFor="exampleInputEmail1" className="form-label">{t('Company')}</label>
                      <input type="text" className="form-control" name="bcompany" value={formData?.bcompany} onChange={handleChange} aria-describedby="emailHelp" />
                    </div> */}
                    </form>
                    {isLoadingBillAdd && (
                      <>
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <h5>{t("Adding Your Billing Address")}</h5>
                      </>
                    )}

                    {addresListData && addresListData._id ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ margin: "10px 0" }}
                        onClick={addresUpdate}
                        // disabled={buttonDisabled}
                      >
                        {t("Update Address")}
                      </button>
                    ) : (
                      // <button
                      //   type="button"
                      //   className="btn btn-primary"
                      //   style={{ margin: "10px 0" }}
                      //   onClick={updateAddress}
                      //   disabled={buttonDisabled}
                      // >
                      //   {t("Save Address")}
                      // </button>

                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ margin: "10px 0" }}
                        onClick={updateAddress}
                        // disabled={buttonDisabled}
                        disabled={
                          !formData?.bfirstname ||
                          !formData?.blastname ||
                          !formData?.baddressLine1 ||
                          !formData?.bzip ||
                          !formData?.bcity ||
                          !formData?.bcountry ||
                          !formData?.bstate ||
                          buttonDisabled
                        }
                      >
                        {t("Save Address")}
                      </button>
                    )}

                    <form id="checkout-form">
                      {/* {isLogin == "true" ? (
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={shipping}
                          onChange={() => {}}
                          onClick={() => setShipping(!shipping)}
                        />
                        <label
                          className="form-check-label"
                          onClick={() => setShipping(!shipping)}
                        >
                          {t("Ship to a different address?")}
                        </label>
                      </div>
                    ) : (
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={shipping}
                          onChange={() => {}}
                          onClick={() => setShippingOfflineTwo()}
                        />
                        <label
                          className="form-check-label"
                          onClick={() => setShippingOfflineTwo()}
                        >
                          {t("Ship to a different address?")}
                        </label>
                      </div>
                    )} */}

                      {/* shipping price */}
                      {shippingoffline && (
                        <div>
                          <h4>Shipping Address</h4>

                          <form className="row">
                            <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                {t("First Name")}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="bfirstname"
                                value={formDataShipp?.bfirstname}
                                onChange={handleChangeship}
                                aria-describedby="emailHelp"
                              />
                            </div>
                            <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                {t("Last Name")}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="blastname"
                                value={formDataShipp?.blastname}
                                onChange={handleChangeship}
                                aria-describedby="emailHelp"
                              />
                            </div>
                            <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                {t("Country")}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="bcountry"
                                value={formDataShipp?.bcountry}
                                onChange={handleChangeship}
                                aria-describedby="emailHelp"
                              />
                            </div>

                            {/* <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                      <label htmlFor="exampleInputEmail1" className="form-label">{('State')}</label>
                      <input type="text" className="form-control" name="bstate" value={formDataShipp?.bstate} onChange={handleChangeship} aria-describedby="emailHelp" />
                    </div> */}
                            <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                {t("City")}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="bcity"
                                value={formDataShipp?.bcity}
                                onChange={handleChangeship}
                                aria-describedby="emailHelp"
                              />
                            </div>
                            <div className="mb-3 col-12">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                {t("Full Address")}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="bzip"
                                value={formDataShipp?.bzip}
                                onChange={handleChangeship}
                                aria-describedby="emailHelp"
                              />
                            </div>

                            {/* <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                      <label htmlFor="exampleInputEmail1" className="form-label">{t('Province')}</label>
                      <input type="text" className="form-control" name="bprovince" value={formDataShipp?.bprovince} onChange={handleChangeship} aria-describedby="emailHelp" />
                    </div> */}

                            {/* <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                      <label htmlFor="exampleInputEmail1" className="form-label">{t('Address Line2')}</label>
                      <input type="text" className="form-control" name="baddressLine2" value={formDataShipp?.baddressLine2} onChange={handleChangeship} aria-describedby="emailHelp" />
                    </div> */}

                            {/* <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                      <label htmlFor="exampleInputEmail1" className="form-label">{t('Company')}</label>
                      <input type="text" className="form-control" name="bcompany" value={formDataShipp?.bcompany} onChange={handleChangeship} aria-describedby="emailHelp" />
                    </div> */}
                          </form>

                          {/* <form className="row">
                        <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                          <label htmlFor="exampleInputEmail1" className="form-label">{t('Country')}</label>
                          <input type="text" className="form-control" name="bcountry" value={formDataShipp?.bcountry} onChange={handleChangeship} aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                          <label htmlFor="exampleInputEmail1" className="form-label">{('State')}</label>
                          <input type="text" className="form-control" name="bstate" value={formDataShipp?.bstate} onChange={handleChangeship} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                          <label htmlFor="exampleInputEmail1" className="form-label">{t('City')}</label>
                          <input type="text" className="form-control" name="bcity" value={formDataShipp?.bcity} onChange={handleChangeship} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                          <label htmlFor="exampleInputEmail1" className="form-label">{t('ZIP')}</label>
                          <input type="text" className="form-control" name="bzip" value={formDataShipp?.bzip} onChange={handleChangeship} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                          <label htmlFor="exampleInputEmail1" className="form-label">{t('Province')}</label>
                          <input type="text" className="form-control" name="bprovince" value={formDataShipp?.bprovince} onChange={handleChangeship} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                          <label htmlFor="exampleInputEmail1" className="form-label">{t('Address Line1')}</label>
                          <input type="text" className="form-control" name="baddressLine1" value={formDataShipp?.baddressLine1} onChange={handleChangeship} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                          <label htmlFor="exampleInputEmail1" className="form-label">{t('Address Line2')}</label>
                          <input type="text" className="form-control" name="baddressLine2" value={formDataShipp?.baddressLine2} onChange={handleChangeship} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                          <label htmlFor="exampleInputEmail1" className="form-label">{t('Landmark')}</label>
                          <input type="text" className="form-control" name="blandmark" value={formDataShipp?.blandmark} onChange={handleChangeship} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-sm-6">
                          <label htmlFor="exampleInputEmail1" className="form-label">{t('Company')}</label>
                          <input type="text" className="form-control" name="bcompany" value={formDataShipp?.bcompany} onChange={handleChangeship} aria-describedby="emailHelp" />
                        </div>

                      </form> */}
                        </div>
                      )}

                      {shipping && (
                        <div>
                          <ShippingAddress setShippingAdd={setShippingAdd} />
                          {showModal && (
                            <div
                              className="modal fade"
                              id="exampleModal"
                              tabIndex="-1"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <AddShipping setShowMoal={setShowMoal} />
                            </div>
                          )}
                        </div>
                      )}

                      <div className="form-group mb-3">
                        <label className="order-comments">
                          {t("Order notes (optional)")}
                        </label>
                        <textarea
                          className="form-control"
                          placeholder={t(
                            "Notes about your order, e.g. special notes for delivery."
                          )}
                          required
                          defaultValue={""}
                          rows="4"
                          name="notes"
                          onChange={handleChangeship}
                        />
                      </div>
                      {/* <button type="submit" className="btn btn-primary">
                      place order
                    </button> */}
                    </form>
                  </div>
                </div>
              )}
              <div className="time-slot d-none">
                <div className="head-time">
                  <h2>{t("Date & Time")} </h2>
                </div>
                <div className="choose-date">
                  <input
                    type="date"
                    className="date-1"
                    name="date"
                    value={currentDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="morning-slot">
                  <div className="row">
                    {timeslot &&
                      timeslot?.map((item) => {
                        return (
                          <>
                            <h5>
                              <BsSunFill />
                              {item?.displayName}
                            </h5>
                            {item?.value &&
                              item?.value?.map((val) => {
                                return (
                                  <div className="col-lg-4" key={item?._id}>
                                    <div
                                      className="form-check radioo"
                                      id="flexRadioDefault1"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="timeSlot"
                                        value={formData?.timeSlot}
                                        id="flexRadioDefault1"
                                        onChange={() => {
                                          setValues(val?.uid, item?.uid);
                                        }}
                                      />
                                      <label
                                        className="form-check-label"
                                        for="flexRadioDefault1"
                                      >
                                        {val.name}
                                      </label>
                                    </div>
                                  </div>
                                );
                              })}
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="orderInfo">
                {/* <input placeholder={t('Apply Coupon')} className="form-control" ref={couponRef} />
                <button type="button" className="btn btn-info" style={{ margin: '10px 0' }} onClick={sendCouponFree}>{t('Apply Coupon')}</button> */}
                <Button
                  variant="primary"
                  disabled={cartDetail?.cart?.products?.length == 0}
                  onClick={() => setModalShowCoupen(true)}
                >
                  Apply Coupon
                </Button>
                <button
                  type="button"
                  className="btn btn-info"
                  style={{ margin: "10px 4px" }}
                  disabled={cartDetail?.cart?.discount == 0}
                  onClick={sendCouponRemove}
                >
                  Remove Coupon
                </button>
                {modalShowCoupen && (
                  <CoupensList
                    show={modalShowCoupen}
                    onHide={() => setModalShowCoupen(false)}
                    sendCouponFree={sendCouponFree}
                  />
                )}
                <h5 className="mb-4">
                  Your Order has{" "}
                  <span style={{ color: "red" }}>
                    {cartDetail?.cart?.products?.length}
                  </span>{" "}
                  Items
                </h5>

                <div style={{ overflow: "auto" }}>
                  <table className="table">
                    <thead>
                      <tr className="fontHead">
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th>
                        {/* <th scope="col">Variant</th> */}
                        <th scope="col">Price</th>
                        {/* <th scope="col">Sub Total</th> */}
                        {/* <th scope="col">Tax %</th>
                        <th scope="col">Tax</th> */}
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartDetail &&
                        cartDetail?.cart?.products?.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{++i}</td>
                              <td>{item?.name}</td>
                              {/* <td>{item?.variant?.weight}</td> */}
                              <td>(*{item?.qty})</td>
                              <td>{item?.price?.sale_rate}</td>
                              {/* <td>{item?.subtotal}</td> */}
                              {/* <td>{item?.tax}</td>
                          <td>{item?.price?.tax}</td> */}
                              <td>{item?.total}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                <div className="row">
                  <div className="col-12">Shipping method</div>
                  <div className="col-12">
                    {listShips &&
                      listShips?.map((item, i) => {
                        return (
                          <div
                            onClick={() => {
                              changeIndex(i, item);
                            }}
                            className={`wrapperDiv ${
                              count == i && "activeNum"
                            }`}
                          >
                            <div className="selectPay">
                              <div className="form-check">
                                {/* <input className="form-check-input" type="radio" name="flexRadioDefaults" id={`flexRadioDefault20${i}`} /> */}
                                <label
                                  className={`form-check-label `}
                                  htmlFor={`flexRadioDefault20${i}`}
                                >
                                  {item?.area}
                                </label>
                              </div>
                              <div>
                                {cartDetail?.currency?.code} {item?.price}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="productAdd" style={{ textAlign: "right" }}>
                  <div className="col">
                    <div className="cartTotals">
                      <h5 className="cartTitle">{t("Price Details")}</h5>
                      <div className="subTotal">
                        <h6>{t("Subtotal")}</h6>
                        <p>
                          {currencySymbol} {cartDetail?.cart?.subTotal}
                        </p>
                      </div>
                      <div className="subTotal">
                        <h6>{t("Coupon Applied")}</h6>
                        <p>
                          {currencySymbol} {cartDetail?.cart?.discount}
                        </p>
                      </div>
                      <div className="subTotal">
                        <h6>{t("Shipping")}</h6>
                        <p>
                          {currencySymbol} {cartDetail?.cart?.shippingCost}
                        </p>
                      </div>
                      <div className="subTotal">
                        <h6>{t("IGST")}</h6>
                        <p>
                          {currencySymbol}{" "}
                          {cartDetail?.cart?.igst?.toFixed(2)
                            ? cartDetail?.cart?.igst?.toFixed(2)
                            : cartDetail?.cart?.tax?.toFixed(2)}
                        </p>
                      </div>
                      <div className="subTotal">
                        <h6>{t("SGST")}</h6>
                        <p>
                          {currencySymbol}{" "}
                          {cartDetail?.cart?.sgst
                            ? cartDetail?.cart?.sgst
                            : "0"}
                        </p>
                      </div>
                      <div className="subTotal">
                        <h6>{t("CGST")}</h6>
                        <p>
                          {currencySymbol}{" "}
                          {cartDetail?.cart?.cgst
                            ? cartDetail?.cart?.cgst
                            : "0"}
                        </p>
                      </div>
                      {/* <div className="subTotal">
                        <h6>{t('GST')}</h6>
                        <p>{currencySymbol} {cartDetail?.cart?.tax}</p>
                      </div> */}
                      <hr />
                      <div className="subTotal">
                        <h6>{t("Cart Total")}</h6>
                        <p>
                          {cartDetail?.currency?.code}{" "}
                          {cartDetail?.cart?.grandTotal}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="shipping">
                  {/* <h6>Shipping</h6> */}
                  {/* <div className="shippingRadio">
                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Local pickup
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          Flat rate
                        </label>
                      </div>
                    </div>
                    <hr />
                  </div> */}
                  <div className="cartTotalFooter">
                    <div className="totalAmount"></div>

                    <div className="paymentMethods">
                      {/* <h4>Payment </h4> */}
                      {/* <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault4"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault4"
                          onClick={cashDelevery}
                        >
                          Cash on Delivery
                        </label>
                      </div> */}
                      {/* <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault5"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault5"
                          onClick={cashDelevery}
                        >
                          Card on Delivery
                        </label>
                      </div> */}
                      {/* <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault5"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault5"
                          onClick={handleRazorpay}
                        >
                          Pay with Razorpay
                        </label>
                      </div> */}

                      {/* <p style={{ marginBottom: "5px" }}>
                        <FaInfoCircle />COD
                      </p> */}

                      {/* {data1 && data1.map((item) => {
                        return <p key={item._id} className="d-flex payTingg" style={{ marginTop: "5px" }}
                          // onClick={() => { seShowPayment(!showPayment) }}
                        >
                          <img style={{ width: "25px", marginLeft: "-5px", marginRight: "6px" }} src={payment} /><h6>{item?.name}</h6>
                        </p>
                      })} */}

                      {/* {data1 && data1.map((item, i) => {
                        return <div className="form-check" key={i}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id={`flexRadioDefault4${1 + i}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexRadioDefault4${1 + i}`}
                            onClick={cashDelevery}
                          >
                            {item?.name}
                          </label>
                        </div>
                        //  <p key={item._id} className="d-flex payTingg" style={{ marginTop: "5px" }}
                        //   // onClick={() => { seShowPayment(!showPayment) }}
                        // >
                        //   <img style={{ width: "25px", marginLeft: "-5px", marginRight: "6px" }} src={payment} /><h6>{item?.name}</h6>
                        // </p>
                      })} */}
                    </div>

                    <div className="paymentMethods">
                      <h4 className="mt-2 mb-3">Payment </h4>
                      <div className="paymentMethodList">
                        {data1?.map((item) => {
                          return (
                            <div
                              className="form-check paymentGatCheck"
                              key={item?._id}
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                value={item?.paymentGat_method}
                                checked={
                                  paymentMode === item?.paymentGat_method
                                }
                                id={item?.paymentGat_method}
                                onClick={cashDelevery}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={item?.paymentGat_method}
                              >
                                <img
                                  src={item?.log_url}
                                  alt={item?.paymentGat_method}
                                  title={item?.paymentGat_method}
                                  className="paymentGatImg"
                                />
                                {item?.paymentGat_method}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      <div className="paymentOp d-none">
                        <div className="form-group">
                          <button
                            // className={`btn ${paymentMode === "COD" ? "btn-primary" : "btn-outline-primary"}`}
                            className={`commonButton btn bg-white ${
                              paymentMode === "COD" ? "active" : ""
                            }`}
                            type="button"
                            onClick={() => handlePaymentSelect("COD")}
                          >
                            <RiSecurePaymentLine />{" "}
                            <span>Cash on Delivery</span>
                          </button>
                        </div>

                        <div className="form-group d-none">
                          <button
                            // className={`btn ${paymentMode === "Card" ? "btn-secondary" : "btn-outline-secondary"}`}
                            className={`commonButton btn bg-white ${
                              paymentMode === "Razorpay" ? "active" : ""
                            }`}
                            type="button"
                            onClick={() => handlePaymentSelect("Card")}
                          >
                            <RiSecurePaymentLine />{" "}
                            <span>Card on Delivery</span>
                          </button>
                        </div>

                        <div className="form-group">
                          <button
                            className={`btn ${
                              paymentMode === "Razorpay"
                                ? "btn-warning"
                                : "btn-outline-warning"
                            }`}
                            type="button"
                            onClick={() => handlePaymentSelect("Razorpay")}
                          >
                            <RiSecurePaymentLine />{" "}
                            <span>Credit Card & Netbanking</span>
                          </button>
                        </div>
                      </div>
                      {/* <div className="paymentOp">
                        <div className="form-group">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={cashDelevery}
                          >
                            <RiSecurePaymentLine />{" "}
                            <span>Cash on Delivery</span>
                          </button>
                        </div>
                        <div className="form-group d-none">
                          <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={cashDelevery}
                          >
                            <RiSecurePaymentLine />{" "}
                            <span>Card on Delivery</span>
                          </button>
                        </div>
                        <div className="form-group">
                          <button
                            className="btn btn-warning"
                            type="button"
                            onClick={handleRazorpay}
                          >
                            <RiSecurePaymentLine />{" "}
                            <span>Credit card & netbanking</span>
                          </button>
                        </div>
                      </div> */}

                      {/* <p style={{ marginBottom: "5px" }}>
                                            <FaInfoCircle />COD
                                          </p> */}

                      {/* {data1 && data1.map((item) => {
                                            return <p key={item._id} className="d-flex payTingg" style={{ marginTop: "5px" }}
                                              // onClick={() => { seShowPayment(!showPayment) }}
                                            >
                                              <img style={{ width: "25px", marginLeft: "-5px", marginRight: "6px" }} src={payment} /><h6>{item?.name}</h6>
                                            </p>
                                          })} */}

                      {/* {data1 && data1.map((item, i) => {
                                            return <div className="form-check" key={i}>
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id={`flexRadioDefault4${1 + i}`}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor={`flexRadioDefault4${1 + i}`}
                                                onClick={cashDelevery}
                                              >
                                                {item?.name}
                                              </label>
                                            </div>
                                            //  <p key={item._id} className="d-flex payTingg" style={{ marginTop: "5px" }}
                                            //   // onClick={() => { seShowPayment(!showPayment) }}
                                            // >
                                            //   <img style={{ width: "25px", marginLeft: "-5px", marginRight: "6px" }} src={payment} /><h6>{item?.name}</h6>
                                            // </p>
                                          })} */}
                    </div>

                    {showPayment && (
                      <div className="paymentProcess">
                        <PaymentSectins />
                      </div>
                    )}

                    <div className="proceed">
                      {isLogin == "true" ? (
                        <button
                          type="button"
                          className={`btn btn-primary commonButton ${
                            isPlaceOrderEnabled ? "enabled" : "disabled"
                          }`}
                          // className="commonButton w-100 d-flex justify-content-center"
                          onClick={handlePlace}
                          // disabled={!cartDetail?.cart?.products?.length || !paymentMode}
                          disabled={!isPlaceOrderEnabled}
                        >
                          Place Order
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="commonButton  w-100 text-center justify-content-center"
                          onClick={handlePlaceOffline}
                          disabled={!cartDetail?.cart?.products?.length}
                        >
                          Checkout as Guest
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showSuccessModal && (
        <SussessMsg
          plaecedData={
            plaecedData?.statusCode === 200
              ? plaecedData
              : checkoutData?.data?.statusCode === 201
              ? checkoutData?.data
              : ""
          }
          // plaecedData={
          //   plaecedData
          //     ? plaecedData
          //     : (checkoutData?.data?.statusCode === 201
          //       ? checkoutData?.data
          //       : '')
          // }
          cartValue={cartValue}
          currencySymbol={currencySymbol}
          // proceedToPayment={proceedToPayment}
          paymentMode={paymentMode}
          setSuccessModal={setSuccessModal}
        />
      )}

      {/* {isSuccess && (
        <SussessMsg
          plaecedData={plaecedData}
          cartValue={cartValue}
          currencySymbol={currencySymbol}
        />
      )} */}

      <ToastContainer />
    </>
  );
}

export default Checkout;
