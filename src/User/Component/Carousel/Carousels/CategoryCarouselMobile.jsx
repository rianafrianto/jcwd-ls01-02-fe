import React from "react";
import { categoryList } from "../../../../Helpers/categoryList";
import CardCategory from "../../CardCategory";

function CategoryCarouselMobile() {
  return (
    <div className="min-w-min h-20 flex gap-x-2">
      {categoryList.map((val, index) => {
        const { cardText, cardPic, cardPath } = val;
        return (
          <div key={index} className="w-36 h-20 px-2 text-sm">
            <CardCategory
              cardText={cardText}
              cardPath={cardPath}
              cardPic={cardPic}
              cardStyle="h-20 text-[12px]"
              imageStyle="h-9"
            />
          </div>
        );
      })}
    </div>
  );
}

export default CategoryCarouselMobile;
