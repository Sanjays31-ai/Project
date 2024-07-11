import React from 'react'
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/weather.png';
import customizationImg from '../assets/images/customization.png';

const serviceData = [
    {
        imgUrl: weatherImg,
        title: "Calculate Weather",
        desc: "Wherever you go, no matter what the weather, always bring your own sunshine.",
    },
    {
        imgUrl: guideImg,
        title: "Best Tour Guide",
        desc: "Traveling is not something you’re good at. It’s something you do.",
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "We Wander For Distraction, But We Travel For Fulfillment.",
    },
];

const ServiceList = () => {
  return (
    <>
    {serviceData.map((item, index) => (
        <Col lg="3" key={index}>
            <ServiceCard item={item}/>
        </Col>
    ))}
    </>
  );
};

export default ServiceList