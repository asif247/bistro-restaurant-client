// import React from 'react';

import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import quoteImg from '../../../../assets/home/quote-left.png'
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className="my-20">
      <SectionTitle
        subHeading="what out client say?"
        heading="Testimonials"
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col gap-px items-center mx-24 my-16">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
                    />
                    <img className="mt-[48px]" src={quoteImg} alt="" />
              <p className="py-8">{review.details}</p>
              <h3 className="text-2xl text-orange-400">{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;