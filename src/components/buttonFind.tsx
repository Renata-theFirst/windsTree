import { useState } from "react";
import search from "../images/Search.svg";
import { ButtonFilterProps } from "./customTreeView";

const BtnFind = ({ activity, action, filter }: ButtonFilterProps) => {
  const [inputValue, setInputValue] = useState("");
  const vision = activity ? "" : "hidden_elem";
  const InputValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value: string = e.target.value;
    filter(value);
    setInputValue(value);
  };

  return (
    <div className="btn">
      <div className="btn_inset">
        <input
          className={`${vision}`}
          id="input_search"
          value={inputValue}
          onChange={InputValueChange}
        >
        </input>
        <div className="btn_img__find">
          <img src={search} alt="search" onClick={() => action(2)} />
        </div>
      </div>
    </div>
  );
};

export default BtnFind;
