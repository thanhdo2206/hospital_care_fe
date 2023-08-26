import React from "react";

import "../assets/css/components/button_customize.css";

type Props = {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClickBtn?: (event: React.MouseEvent<HTMLElement>) => void;
  backgroundColor?: string;
};

export default function ButtonCustomize(props: Props) {
  const { text, icon, className, type, onClickBtn, backgroundColor } = props;
  const cssIconText = icon ? { display: "flex", alignItems: "center" } : "";
  const btnStyle = {
    backgroundColor: backgroundColor,
    ...cssIconText,
  };
  return (
    <button
      type={`${type ?? "button"}`}
      className={`button__customize ${className ?? ""}`}
      onClick={onClickBtn}
      style={btnStyle}
    >
      <span className="icon__btn">{icon}</span>
      <span>{text}</span>
    </button>
  );
}
