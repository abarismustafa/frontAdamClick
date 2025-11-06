import React from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import { useGetVideoGalleryQuery } from "../products/productSlice";
function VideoGallery() {
  const { data, isLoading } = useGetVideoGalleryQuery();
  return (
    <>
      <Helmet>
        <title>Video Gallery | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <Breadcrumb title="Video Gallery" />
      <section className="videoGallery p-30">
        <div className="container">
          {/* Gallery */}
          <div className="row">
            {isLoading && (
              <div className="preloaderCount">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div className="col-lg-12 col-md-12 mb-4 mb-lg-0">
              <div className="pageTitle">
                <h4>Our Video Gallery</h4>
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
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="videoFrame">
                  {data &&
                    data.map((item) => {
                      return (
                        <iframe
                          width="100%"
                          height="315"
                          src="https://www.youtube.com/embed/mstHoDx3EPA"
                          title={item.video_url}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen={true}
                        ></iframe>
                      );
                    })}

                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/mstHoDx3EPA"
                    title="YouTube video player"
                    allowFullScreen={true}
                  ></iframe>
                </div>
              </div>
            </div>
            {/* Gallery */}
          </div>
          {/* Gallery */}
        </div>
      </section>
    </>
  );
}

export default VideoGallery;
