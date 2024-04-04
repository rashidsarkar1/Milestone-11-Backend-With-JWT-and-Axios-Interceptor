import "aos/dist/aos.css";

import "../Banar/Banar";
import ButtonCustom from "../../../Components/ButtonCustom";
function Banar() {
  const backgroundImageStyle = {
    backgroundImage: `url('https://i.ibb.co/ykqJ23F/banar-man.png')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div className="relative">
      <div
        style={backgroundImageStyle}
        className={`relative min-h-[80vh] md:min-h-screen lg:min-h-screen  bg-center bg-no-repeat bg-cover`}
        // className={`relative min-h-screen bg-[url(image/weeding-bg.jpg')] bg-center bg-no-repeat bg-cover`}
      ></div>

      <div className=" bg-[#00000077] absolute top-0 left-0 w-full h-full transition-all duration-300 rounded-none "></div>
      <div className="absolute w-full text-center text-white transform -translate-x-1/2 -translate-y-1/2 md:pt-0 pt-14 top-1/2 left-1/2">
        <p className="text-2xl leading-7 text-center">
          Looking For <span className="text-[#ff9d0f]">Help</span> From Premier
          Assignment.
        </p>

        <h1 className="mb-4 uppercase lg:text-8xl md:text-6xl text-5xl  md:leading-[140px] font-bold"></h1>
        <p className=" lg:text-[72px] text-center   lg:leading-[98px]">
          Assignment Help Service In <br className="hidden lg:block" /> The
          World.
        </p>
        <div className="hero-btn-wrap">
          <ButtonCustom>Read More About +</ButtonCustom>
        </div>
      </div>
      {/* <img src={image} alt="" /> */}
    </div>
  );
}

export default Banar;
