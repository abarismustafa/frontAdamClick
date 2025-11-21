import { Link } from "react-router-dom";

import { base_url } from "../../../server";
import { useEffect, useState } from "react";
import axios from "axios";

const SimilarCategory = () => {
  const [categoriesDatas, setCateData] = useState(null);
  console.log(categoriesDatas);

  const baseUrl = base_url();
  const getcateData = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/banner/pb?mod=home&pos=home-mini-banner`,
        {
          withCredentials: true,
        }
      );
      setCateData(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    getcateData();
  }, []);
  console.log("categoriesDatas", categoriesDatas);

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

              {Array.isArray(categoriesDatas) &&
                categoriesDatas?.map((item) => {
                  const cleanUrl = item?.url?.replace(
                    window.location.origin + "/",
                    ""
                  );
                  return (
                    <div
                      className="col-lg-4 col-md-4 col-sm-4 col-4"
                      key={item.id}
                    >
                      <div className="categoryBanner">
                        <a
                          href={cleanUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={item?.image?.url}
                            alt={"Category banner"}
                            className="img-fluid"
                          />
                        </a>
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
