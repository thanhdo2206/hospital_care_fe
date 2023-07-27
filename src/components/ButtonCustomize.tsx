import React from "react";

import "../assets/css/components/button_customize.css";

type Props = {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClickBtn?: () => void;
  backgroundColor?: string;
};

export default function ButtonCustomize(props: Props) {
  const { text, icon, className, type, onClickBtn, backgroundColor } = props;
  const btnStyle = {
    backgroundColor: backgroundColor,
  };
  return (
    <button
      type={`${type ?? "button"}`}
      className={`button__customize ${className ?? ""}`}
      onClick={onClickBtn}
      style={btnStyle}
    >
      {icon} {text}
    </button>
  );
}
