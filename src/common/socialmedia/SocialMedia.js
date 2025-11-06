import React from "react";
import { Link } from "react-router-dom";
import facebook from "../../assets/img/social/facebook.png";
import whatsapp from "../../assets/img/social/whatsapp.png";
import instagram from "../../assets/img/social/instagram.png";
import ReactWhatsapp from "react-whatsapp";
const socialMediaUrl = [
  {
    id: "2",
    imgurl: instagram,
    sociallink: "https://www.instagram.com/",
  },
  {
    id: "2",
    imgurl: facebook,
    sociallink: "https://www.facebook.com/",
  },
];
function SocialMedia() {
  const obj = {
    id: "1",
    imgurl: whatsapp,
    sociallink:
      "https://api.whatsapp.com/send/",
  };
  return (
    <div className="socialBody">
      <div className="socialItem">
        <a href="#" massage="adamclick">
          <img src={obj.imgurl} alt="socialLink" width={30} />
        </a>
      </div>
      {socialMediaUrl.map((item, key) => {
        return (
          <div key={key} className="socialItem">
            <a href={item?.sociallink} target="_blank">
              <img src={item.imgurl} alt="socialLink" width={30} />
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default SocialMedia;
