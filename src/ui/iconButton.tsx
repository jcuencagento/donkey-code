import React from "react";

interface IconButtonProps {
  id?: string,
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const IconButton = (props: IconButtonProps) => {
  return (
    <button
      aria-label={props.id}
      onClick={props.onClick}
      className={`flex rounded-full hover:scale-110 transition duration-200 ease-in-out ${props.className}`}
    >
      {props.icon}
    </button>
  );
};

export default IconButton;
