import React from "react";

const Input = (props) => {
  const { text = "", name, ...inputProps } = props;
  const inputId = `${name}-input`;

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-semibold mb-2"
        htmlFor={inputId}
      >
        {text}
      </label>
      <input
        id={inputId}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...inputProps}
      />
    </div>
  );
};

export default Input;
