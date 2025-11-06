import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
function SelectProAside() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/Sa0cc90fd2eca4c85aa1a958833bc8f18q/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/S59fb4d1d62944a318c929664ee423d31h/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/S6266cdd22b9247ec806f1f2ea322cbc3S/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/S3d20f857c6594ec98e82b0e234f26f44D/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/S54420db526ec4111878960b8e8f0177ab/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/Sb5536474d64d4e3e9d70c5b09159163ei/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_.webp" />
                </SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper my-4"
            >
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/Sa0cc90fd2eca4c85aa1a958833bc8f18q/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_220x220.jpg_.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/S59fb4d1d62944a318c929664ee423d31h/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_220x220.jpg_.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/S6266cdd22b9247ec806f1f2ea322cbc3S/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_220x220.jpg_.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/S3d20f857c6594ec98e82b0e234f26f44D/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_220x220.jpg_.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/S54420db526ec4111878960b8e8f0177ab/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_220x220.jpg_.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://ae01.alicdn.com/kf/Sb5536474d64d4e3e9d70c5b09159163ei/1Pcs-Waterproof-Eating-Smock-Infant-Toddler-Baby-Cartoon-Long-Sleeve-Art-Apron-Animal-Smock-Soft-Baby.jpg_220x220.jpg_.webp" />
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default SelectProAside
