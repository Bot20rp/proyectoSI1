
/* sale de la documentacion  */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderCart } from "./SliderCart";
import {SliderData} from '../../utils/products'
export const Sliders = () => {
    const settings = {
        /* dots: true, */
        nav : false ,
        infinite: true,
        /* speed: 500, */
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay : true ,
      };

  return (
    <>

        <section className="homeSlide">
        <div className="slider-container"> {/* hacerlo responsiveee */}
      <Slider {...settings}>
        {/* usando .map .. tipo for  */}
       {SliderData.map((value ,index)=>{
        return (
          <SliderCart key={index} title={value.title } cover={value.cover} desc={value.desc} />
        )
       })}
      </Slider>
    </div>
        </section>
    </>
  )
}
