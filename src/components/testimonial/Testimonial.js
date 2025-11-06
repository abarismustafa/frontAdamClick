import React from "react";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import client1 from "../../assets/img/client/1.jpg";
import client2 from "../../assets/img/client/2.jpg";
import client3 from "../../assets/img/client/3.jpg";
import client4 from "../../assets/img/client/4.jpg";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

function Testimonial() {
  var settings = {
    dots: true,
    margin: 10,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <>
      <Helmet>
        <title>Testimonial | adamclick</title>
        <meta name="keyword" content="adamclick" />
        <meta name="description" content="adamclick" />
      </Helmet>
      <Breadcrumb title="Testimonial" />
      <section className="testimonialPage p-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="pageTitle">
                <h4>See What Our Customers Say About Us</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Asperiores illum tenetur fuga dignissimos odit amet commodi
                  non officia delectus, praesentium id nam quae dolorem aliquam
                  voluptatum nemo accusantium esse eos.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <Slider {...settings} className="sliderWrapper">
                  <div className="col-sm-6">
                    <div className="testimonial-wrapper carousel">
                      <div className="testimonial">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nam eu sem tempor, varius quam at, luctus dui.
                          Mauris magna metus, dapibus nec turpis vel, semper
                          malesuada ante, commodo iacul viverra.Lorem ipsum
                          dolor sit amet, consectetur adipiscing elit. Nam eu
                          sem tempor, varius quam at, luctus dui. Mauris magna
                          metus, dapibus nec turpis vel, semper malesuada ante,
                          commodo iacul viverra.
                        </p>
                      </div>
                      <div className="media">
                        <img src={client1} className="mr-3" />
                        <div className="media-body">
                          <div className="overview">
                            <div className="name">
                              <b>Michael Holz</b>
                            </div>
                            <div className="details">
                              <h5>Web Developer / DevCorp</h5>
                            </div>
                            <div className="star-rating">
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star-o" />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="testimonial-wrapper carousel">
                      <div className="testimonial">
                        <p>
                          Vestibulum quis quam ut magna consequat faucibus.
                          Pellentesque eget mi suscipit tincidunt. Utmtc tempus
                          dictum. Pellentesque virra. Quis quam ut magna
                          consequat faucibus, metus id mi gravida. Vestibulum
                          quis quam ut magna consequat faucibus. Pellentesque
                          eget mi suscipit tincidunt. Utmtc tempus dictum.
                          Pellentesque virra. Quis quam ut magna consequat
                          faucibus, metus id mi gravida.
                        </p>
                      </div>
                      <div className="media">
                        <img src={client2} className="mr-3" />
                        <div className="media-body">
                          <div className="overview">
                            <div className="name">
                              <b>Mary Saveley</b>
                            </div>
                            <div className="details">
                              <h5>Graphic Designer / MarsMedia</h5>
                            </div>
                            <div className="star-rating">
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star-o" />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="testimonial-wrapper carousel">
                      <div className="testimonial">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nam eu sem tempor, varius quam at, luctus dui.
                          Mauris magna metus, dapibus nec turpis vel, semper
                          malesuada ante, commodo iacul viverra.Lorem ipsum
                          dolor sit amet, consectetur adipiscing elit. Nam eu
                          sem tempor, varius quam at, luctus dui. Mauris magna
                          metus, dapibus nec turpis vel, semper malesuada ante,
                          commodo iacul viverra.
                        </p>
                      </div>
                      <div className="media">
                        <img src={client1} className="mr-3" />
                        <div className="media-body">
                          <div className="overview">
                            <div className="name">
                              <b>Michael Holz</b>
                            </div>
                            <div className="details">
                              <h5>Web Developer / DevCorp</h5>
                            </div>
                            <div className="star-rating">
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star-o" />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="testimonial-wrapper carousel">
                      <div className="testimonial">
                        <p>
                          Vestibulum quis quam ut magna consequat faucibus.
                          Pellentesque eget mi suscipit tincidunt. Utmtc tempus
                          dictum. Pellentesque virra. Quis quam ut magna
                          consequat faucibus, metus id mi gravida. Vestibulum
                          quis quam ut magna consequat faucibus. Pellentesque
                          eget mi suscipit tincidunt. Utmtc tempus dictum.
                          Pellentesque virra. Quis quam ut magna consequat
                          faucibus, metus id mi gravida.
                        </p>
                      </div>
                      <div className="media">
                        <img src={client2} className="mr-3" />
                        <div className="media-body">
                          <div className="overview">
                            <div className="name">
                              <b>Mary Saveley</b>
                            </div>
                            <div className="details">
                              <h5>Graphic Designer / MarsMedia</h5>
                            </div>
                            <div className="star-rating">
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="fa fa-star-o" />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonial;
