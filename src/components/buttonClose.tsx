import Close from "../images/Close.svg";
import { ButtonSelectProps } from "./customTreeView";

const BtnClose = ({
  activity,
  action,
  selectData,
  disableGroups,
}: ButtonSelectProps) => {
  const vision = activity ? "" : "hidden_elem";
  const listData = selectData?.map((el) => {
    return <option value={`${el}`}>{el}</option>;
  });

  const DisableGroup: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    disableGroups(e.target.value);
  };

  return (
    <div className="btn">
      <div className="btn_inset">
        <div className="btn_img__close">
          <img src={Close} alt="close" onClick={() => action(1)} />
        </div>
        <select className={`${vision}`} onChange={DisableGroup}>
          {listData}
        </select>
      </div>
    </div>
  );
};

export default BtnClose;
