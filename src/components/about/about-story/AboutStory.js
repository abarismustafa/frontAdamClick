import React from "react";

import a1 from "../../../assets/img/h3-hero-banner-min.png";
import { TiTick } from "react-icons/ti";
function AboutStory({ data, t }) {
  return (
    <>
      <section className="sectionPD">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="videoDetail">
                <h2>About Baofeng</h2>
                <p>
                  Started in 2001, Baofeng has always been aiming at creating
                  user value and innovating all the way in the past for more
                  than 18 years.
                </p>
                <p>
                  From the first small factory of more than 30people, Baofeng
                  has developed into a high-tech enterprise specializing in R&D,
                  production, sales and after-sales service of handheld wireless
                  walkie-talkies as well as accessories.
                </p>
                <p>
                  Since the establishment, the company has been focusing on R&D
                  in the field of radio communication and is committed to
                  continuous innovation of products. At present, our company has
                  built up an R&D team of 50 people with rich experience in the
                  field of wireless communication and has launched various
                  series of wireless walkie-talkies and related supporting
                  products.
                </p>
                <p>
                  At present, we have more than 1000 employees and a production
                  base covering an area of more than 30,000 square meters, which
                  is with high-efficiency production strength and advanced
                  quality control levels. It is one of the major manufactures of
                  wireless communication equipment in China.
                </p>
                <p>
                  Baofeng is equipped with advanced production technology and
                  various modern high-tech equipment. including a fully
                  automatic SMT placement machine assembly line, injection
                  molding machine assembly line and integrated production line.
                  We also use advanced instruments to detect our product
                  performance such as wireless integrated tester, spectrum
                  analyzer, network analyzer, oscilloscope, adjustable power
                  supply, etc., ensuring the stability and high quality of
                  product quality. The company strictly follows the ISO
                  9001:2000 standard to arrange the production process, so
                  before the eath product leaves the factory it must undergo
                  various rigorous tests like vibration test, pressure test,
                  high and low-temperature test, rain test. etc., making sure
                  the product is 100% qualified equipment, including a fully
                  automatic SMT placement machine assembly line, injection
                  molding machine assembly line and integrated production line.
                  We also use advanced instruments to detect our product
                  performance such as wireless integrated tester.
                </p>
                <p>
                  The company's classic products, UV-3R and UV-5R. have passed
                  the CE certification Of the European Telecommunications
                  Standards Committee (certification number: CE 0678) in March
                  2011 and passed the RoHS certification in April of the same
                  year, laying a solid foundation in the European market. In May
                  2012, the new product UV-5R also passed the FCC certification
                  Of the US Federal Communications Commission and the European
                  ROHS certification, paving the way for large-scale entry into
                  the US market. AS time goes by, more and more Eaofeng radios
                  are with qualified certification in the US and EU.
                </p>
                <p>
                  Baofeng series products not only have been sold all over
                  China. having a large number Of agents and establishing a
                  nationwide marketing network. In addition, most Of the Baofeng
                  products are also exported to the United States, Europe.
                  Japan, Southeast Asia, South Asia, the Middle East. Africa,
                  and so om At the same time, Baofeng has more and more
                  resellers in foreign countries.
                </p>
                <p>
                  Baofeng's vision and mission is to become the industry leader,
                  Baofeng's way of innovation. Baofeng has always adhered to the
                  business philosophy of building the most professional
                  walkie-talkie manufacturer in China, Based on the tenet Of
                  "customer first, service first, reputation first", Baofeng
                  Strives to operate and forge ahead, With the concept Of
                  enterprise does not grow up from success. but from the times",
                  Baofeng is committed to building a century-old enterprise with
                  a long history.
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="videoInfo d-none">
                <img src={a1} alt={"adamclick"} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutStory;
