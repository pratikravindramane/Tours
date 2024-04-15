// AboutUsPage.js
import React from "react";
import image from "../assets/bg.jpg";

const AboutUsPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">About Us</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={image}
            width={"100%"}
            className="img-fluid rounded"
            alt="About Us"
          />
        </div>
        <div className="col-md-6">
          <p>
            With years of experience in the travel industry, [Your Traveling
            Website Name] is dedicated to providing immersive and insightful
            experiences for college students. Our team of experts curates
            educational tours that offer invaluable insights into various
            industries, allowing students to witness firsthand the processes,
            technologies, and innovations driving modern businesses.
          </p>
          <br />
          <b>Why Us?</b>
          <p>
            Tailored Experiences: We work closely with colleges to design
            customized itineraries that align with their academic goals and
            interests.
            <br />
            Industry Connections: Through our extensive network of industry
            partners, we provide exclusive access to renowned companies and
            organizations across diverse sectors.
            <br />
            Educational Value: Our tours are designed to complement classroom
            learning by offering practical insights and real-world applications
            of theoretical concepts.
            <br />
            Safety and Comfort: The safety and comfort of our travelers are our
            top priorities. We ensure seamless travel arrangements and adhere to
            the highest standards of safety protocols.
          </p>

        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
