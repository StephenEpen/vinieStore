  import React, { useEffect } from "react";
  import { useRef } from "react";

  const UploadInput = ({
    id,
    type,
    name,
    title,
    min,
    value,
    onChange,
    onBlur,
    onFocus
  }) => {
    const textareaRef = useRef(null);

    const handleTextareaInput = () => {
      const textarea = textareaRef.current;
      textarea.style.height = "auto"; 
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
      if (type === "textarea" && textareaRef.current) {
        handleTextareaInput();
      }
    }, [value]);

    return (
      <div className="relative z-0 w-full mb-5 group">
        {type === "textarea" ? (
          <textarea
            name={name}
            id={id}
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              onChange(e); 
              handleTextareaInput(e); 
            }}
            rows={1}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
            required
            style={{ resize: "none", overflow: "hidden" }} 
          />
        ) : (
          <input
            type={type}
            name={name}
            id={id}
            min={min}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
            required
          />
        )}
        <label
          htmlFor={name}
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {title}
        </label>
      </div>
    );
  };

  export default UploadInput;
