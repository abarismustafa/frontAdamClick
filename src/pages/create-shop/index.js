import React, { useEffect } from "react";
import CreateShop from "../../components/create-shop/CreateShop";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";

function CreateShopPage({setShow}) {

  return (
    <>
      <Breadcrumb title="Register Your Shop" />
      <CreateShop />
    </>
  );
}

export default CreateShopPage;
