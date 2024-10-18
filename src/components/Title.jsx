import React from "react";

const Title = ({text1, text2}) => {
  return (
    <div className="text-center py-8 text-4xl lg:text-5xl">
      <div className="inline-flex items-center mb-3">
        <p className="text-gray-500">
          {text1}
          <span className="text-gray-700 font-medium">{text2}</span>
        </p>
      </div>
    </div>
  );
};

export default Title;
