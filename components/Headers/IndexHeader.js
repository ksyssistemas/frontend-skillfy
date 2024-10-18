/*!

=========================================================
* NextJS Argon Dashboard PRO - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Link from "next/link";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
} from "reactstrap";

function IndexHeader() {
  const slidesData = [
    {
      image: require("assets/img/brand/fundo-banner.png"), // Imagem que está no fundo da tela
      title: "A gestão de pessoas nunca foi tão fácil.",
      subtitle: "Conheça a plataforma SkillFy.",
      description:
        "A SkillFy torna a gestão de pessoas mais simples, eficiente e humana. Fique muito mais conectado com sua equipe e transforme a gestão em uma experiência muito mais agradável para você e sua equipe.",
      icon: require("assets/img/brand/skillfy-icon-big.png"), // Imagem do icone da Skillfy
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === slidesData.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? slidesData.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = slidesData.map((slide, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <div
          className="header bg-purple-sk pt-7 pb-8"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container>
            <div className="header-body">
              <Row className="align-items-center">
                <Col lg="8">
                  <div className="pr-5">
                    <h1 className="display-3 text-white font-weight-bold mb-0">
                      {slide.title}
                      <br />
                      {slide.subtitle}
                    </h1>
                    <p className="text-white font-weight-bold mt-5">{slide.description}</p>
                    <div className="mt-5">
                      <Button
                        className="text-purple-sk my-2 rounded-pill"
                        color="green-sk"
                        href="/auth/pricing"
                      >
                        Conheça nossos planos
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col lg="4">
                  <Row className="pt-5">
                    <Col md="6">
                      <img alt="..." className="img d-none d-md-block" src={slide.icon} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon points="2560 0 2560 100 0 100" fill="#e1dce8" /> 
          </svg>
        </div>
      </CarouselItem>
    );
  });

  return (
    <>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        className="carousel-fade"
      >
        <CarouselIndicators
          items={slidesData}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <a
          className="carousel-control-prev"
          role="button"
          onClick={previous}
        >
          <span
            className="carousel-control-prev-icon d-none d-md-block"
            aria-hidden="true"
          />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" role="button" onClick={next}>
          <span
            className="carousel-control-next-icon d-none d-md-block"
            aria-hidden="true"
          />
          <span className="sr-only">Next</span>
        </a>
      </Carousel>
    </>
  );
}

export default IndexHeader;

