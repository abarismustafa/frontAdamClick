import React from "react";

import FeaturedProducts from "../featured-products/FeaturedProducts";
import NewArrivalProducts from "../new-arrival-products/NewArrivalProducts";
import { Carousel } from "react-bootstrap";

function SellerHome() {

  return (
    <>
      <section className="sellerHomeSec p-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sellerHomeInfo">
                {/* <img src={abarisBg} alt="Abaris" /> */}




                <Carousel fade>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={""}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={""}
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={""}
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>






                <FeaturedProducts />
                <NewArrivalProducts />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SellerHome;
