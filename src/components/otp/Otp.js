import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import pin from "../../assets/img/pin.png";
function Otp() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Otp | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      {/* <CustomToaster color={showTaoster.color} show={showTaoster.show} setShow={handleToaster} message={showTaoster.message} position="bottom-end" delay={10000} /> */}
      <div className="registrationDetail sectionPD">
        <div className="container">
          <div className="registrationInfo">
            <div className="registerForm">
              <div className="otpForm">
                <img src={pin} alt="pin" className="img-fluid" />
                <h4>{t("Otp Verification")}</h4>
                <p>OTP verification is a security process that confirms user identity using a temporary code sent to their phone or email.</p>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your OTP here"
                    />
                  </div>
                  <div className="form-group">
                    <button className="commonButton border-0 w-100 d-flex justify-content-center bgPink text-white  ">
                      Verify Code
                    </button>
                  </div>
                  <div className="form-group">
                    <button className="commonButton border-0 w-100 d-flex justify-content-center">
                      Resend Code
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otp;
