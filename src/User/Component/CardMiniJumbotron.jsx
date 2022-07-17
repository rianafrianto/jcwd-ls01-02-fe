import React from "react";

function CardMiniJumbotron(props) {
  const { img, parentClass, imgClass, figureClass, header, paragraph } = props;
  return (
    <div
      className={`flex justify-end pr-7 w-full h-full rounded-2xl relative overflow-hidden hover:scale-[102%] duration-300 ${parentClass}`}
    >
      <img src={img} alt="" className={imgClass} />
      <div className="flex flex-col justify-center items-center gap-y-3 text-center text-secondary w-60">
        <h3 className="text-2xl font-bold">{header}</h3>
        <p className="text-base">{paragraph}</p>
      </div>
    </div>
  );
}

export default CardMiniJumbotron;
