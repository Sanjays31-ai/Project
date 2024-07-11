import React, { useState } from "react";
import CommonSection from "./../shared/CommonSection";
import TourCard from "./../shared/TourCard";
import { Col, Container, Row } from "reactstrap";
import { useLocation } from "react-router-dom";

const SearchResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state);

  return (
    <div>
      <CommonSection title={"Tour Search Result"}></CommonSection>
      <section>
        <Container>
          <Row>
            {data.length === 0 ? (
              <h4>No tour found</h4>
            ) : (
              data?.map((tour) => {
                return <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour}></TourCard>
                </Col>;
              })
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default SearchResultList;
