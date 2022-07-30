import React from "react";

function CardMiniJumbotron(props) {
  const { img, parentClass, imgClass, figureClass, header, paragraph } = props;
  return (
    <div
      className={`flex justify-end lg:pr-7 w-full cursor-pointer h-32 lg:h-[212px] rounded-2xl relative overflow-hidden hover:scale-[102%] duration-300 ${parentClass}`}
    >
      <img src={img} alt="" className={imgClass} />
      <div className="flex flex-col justify-center items-center lg:gap-y-3 text-center text-secondary w-32 lg:w-60 mr-4">
        <h3 className="text-sm lg:text-2xl font-bold">{header}</h3>
        <p className="text-xs lg:text-base">{paragraph}</p>
      </div>
    </div>
  );
}

export default CardMiniJumbotron;
