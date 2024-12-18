import React from "react";
import { text } from "../../utils/constant";
import { Province } from "../../components";

const Homepage = () => {
  return (
    <div className="border border-red-500 w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
    </div>
  );
};

export default Homepage;
