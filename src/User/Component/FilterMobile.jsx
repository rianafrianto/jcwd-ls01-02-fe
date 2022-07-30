import React from "react";
import { useNavigate } from "react-router-dom";
import { categoryList, printCategory } from "../../Helpers/categoryList";

function FilterMobile(props) {
  const { category, setPage, setOrder, setOrderShow } = props;
  const navigate = useNavigate();
  const catList = [
    { cardText: "Semua Produk", cardPath: "all" },
    ...categoryList,
  ];
  return (
    <div className="w-screen block  sm:hidden h-16 items-end overflow-x-scroll -mx-6 scrollbar-hide relative">
      <div
        className="border-b flex h-10 gap-x-5 px-6 absolute bottom-0"
        style={{ width: "870px" }}
      >
        {catList.map((val, i) => {
          return (
            <button
              className={`btn-plain py-2 flex items-center min-w-fit text-sm border-b-2 ${
                printCategory(category) === val.cardText ||
                printCategory(category) === val.cardText.split(" ")[0]
                  ? "font-bold text-primary border-primary"
                  : "text-neutral-gray border-none"
              } ${
                category === val.cardPath ? "font-semibold text-primary" : ""
              }`}
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setPage(0);
                setOrder("ORDER BY name ASC");
                setOrderShow("A-Z");
                navigate(`/category/${val.cardPath}`);
              }}
            >
              {val.cardText}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FilterMobile;
