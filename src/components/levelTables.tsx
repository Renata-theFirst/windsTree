import { useEffect, useState } from "react";
import { ITableLine, ITables } from "../App";
import Tables from "./tables";

interface TablesProps {
  title: string;
  data: ITables;
  active: boolean;
}

const LevelTables = ({ title, data, active }: TablesProps) => {
  const [tableLinesActive, setTableLinesActive] = useState(false);
  useEffect(() => {
    if (!active) {
      setTableLinesActive(false);
    }
  }, [active]);

  const TableLinesToggle = () => {
    if (data.title && active) {
      setTableLinesActive(!tableLinesActive);
    }
  };

  const tableHeader = () => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    currentDate.setMilliseconds(data.dateStart);
    let currentDateStr = currentDate.toLocaleString("ru", options);
    currentDate.setMilliseconds(data.dateEnd);
    currentDateStr += " - " + currentDate.toLocaleString("ru", options);
    if (title === data.title) {
      return (
        <div className="level_tables__header" onClick={TableLinesToggle}>
          <div className="tables_title">{title}</div>
          <div className="level_tables__date">{currentDateStr}</div>
          <div className="tables_subTitle">{data.subTitle}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const visible = active ? "" : "hidden_elem";

  return (
    <div className={`level__tables__inf ${visible}`}>
      {tableHeader()}
      <Tables data={data.data as ITableLine[]} active={tableLinesActive} />
    </div>
  );
};

export default LevelTables;
