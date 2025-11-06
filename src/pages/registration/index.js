import React, { useEffect } from "react";
import Registration from "../../components/registration/Registration";

function RegistrationPage({ setShow }) {
  useEffect(() => {
    setShow(false);
  },[]);
  return (
    <>
      <Registration />
    </>
  );
}

export default RegistrationPage;
