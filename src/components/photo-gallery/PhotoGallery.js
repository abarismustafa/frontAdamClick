import React from "react";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
// import "lightbox.js-react/dist/index.css";
import { Helmet } from "react-helmet";
import { useGetGallaryListQuery } from "../products/productSlice";
import { ImgesData } from "../home/proImgs/ImgesData";

function PhotoGallery() {
  const { data, isLoading } = useGetGallaryListQuery();
  return (
    <>
      <Helmet>
        <title>Photo Gallery | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <Breadcrumb title="Photo Gallery" />
      <section className="photoGallery p-30">
        <div className="container">
          {isLoading && (
            <div className="preloaderCount">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {/* Gallery */}
          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4 mb-lg-0">
              <div className="pageTitle">
                <h4>Our Photo Gallery</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  excepturi fuga nemo vitae possimus repellat, praesentium
                  temporibus officiis, accusamus, labore nostrum aspernatur
                  dolore voluptatibus nesciunt placeat error odio atque ea.
                </p>
              </div>
            </div>
            {/* Gallery */}

            <div className="row">
              {data &&
                data.map((item, i) => {
                  return (
                    <div
                      className="col-lg-3"
                      key={item._id}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalPhoto"
                    >
                      <img
                        style={{ width: "100%" }}
                        src={ImgesData[i].url}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Fertilizer"
                      />
                    </div>
                  );
                })}
            </div>
            {/* Gallery */}
          </div>

          <div
            className="modal fade exampleModalPhoto"
            id="exampleModalPhoto"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <img src={ImgesData[0].url} />
                <div id="carouselExampleIndicators" className="carousel slide">
                  <div className="carousel-inner">
                    <div
                      style={{ borderTop: "2px solid gray" }}
                      className="carousel-item active"
                    >
                      <img src={ImgesData[0].url} />
                    </div>
                    <div className="carousel-item">
                      <img src={ImgesData[0].url} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PhotoGallery;
