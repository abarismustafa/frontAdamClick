import { Link } from "react-router-dom";

import { base_url } from "../../../server";
import { useEffect, useState } from "react";
import axios from "axios";

const data = {
  categoryBanner: [
    {
      id: 1,
      url: "product/category/1/BeautyGlow",
      img_url: "",
    },
    {
      id: 2,
      url: "product/category/2/BodyLotion",
      img_url: "",
    },
    {
      id: 3,
      url: "product/category/5/HairStyle",
      img_url: "",
    },
    {
      id: 4,
      url: "product/category/4/FaceWash",
      img_url: "",
    },
    {
      id: 5,
      url: "product/category/3/Cosmetics",
      img_url: "",
    },
    {
      id: 6,
      url: "product/category/7/SkinCare",
      img_url: "",
    },
  ],
};



const SimilarCategory = () => {
  const [categoriesDatas, setCateData] = useState(null);
  console.log(categoriesDatas);

  const baseUrl = base_url();
  const getcateData = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/public`, {
        withCredentials: true,
      });
      setCateData(res.data);
    } catch (error) { }
  };
  useEffect(() => {
    getcateData();
  }, []);
  return (
    <>
      <section className="sectionPD pt-0">
        <div className="container">
          <div className="highlightPic">
            <div className="row">
              {/* {data.categoryBanner.map((item) => {
                return (
                  <div
                    className="col-lg-4 col-md-4 col-sm-4 col-4"
                    key={item.id}
                  >
                    <div className="categoryBanner">
                      <Link to={`/${item.url}`}>
                        <img
                          src={item.img_url}
                          alt={"Category banner"}
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })} */}

              {Array.isArray(categoriesDatas) && categoriesDatas?.map((item) => {
                return (
                  <div
                    className="col-lg-4 col-md-4 col-sm-4 col-4"
                    key={item.id}
                  >
                    <div className="categoryBanner">
                      <Link
                        // to={`/${item.url}`}
                        to={`/product/category/${item.uid}/${item?.slug}`}
                      >
                        <img
                          src={item?.banner?.url}
                          alt={"Category banner"}
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SimilarCategory;
