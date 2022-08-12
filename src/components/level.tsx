import { ILvlData, ITableLine } from "../App";
import LevelTables from "./levelTables";
import Gorizontal from "../images/Gorizontal.svg";

interface ITables {
  data: ITableLine[];
  dateEnd: number;
  dateStart: number;
  subTitle: string;
  title: string;
}

interface LevelProps {
  title: string;
  items: ILvlData[];
  active: boolean;
  LevelChange: Function;
  activeLvl: Record<string, boolean>;
  level_cnt: number;
  tables: Record<string, ITables[]>;
  haveTable: boolean;
}

const Level = ({
  title,
  active,
  LevelChange,
  activeLvl,
  level_cnt,
  tables,
  haveTable,
}: LevelProps) => {
  const visible = !active ? "hidden_elem" : "";
  
  const tableHeader = () => {
    if (haveTable) {
      const tabs = tables[title].map((el) => {
        
        return (
          <LevelTables
            title={el.title}
            data={el}
            active={activeLvl[el.title]}
          />
        );
      });

      

      return (
        <div className={`level_tables tables_vertical`}>
          {tabs}
        </div>
      );
    }
  };

  const levelView = () => {
    if (level_cnt === 1) {
      return (
        <div className={`level `} onClick={() => LevelChange(title)}>
          {title}
        </div>
      );
    } else {
      return (
        <>
          <div className="gorizontal">
            <img src={Gorizontal} alt="gorizontal_line" />
          </div>
          <div className={`level `} onClick={() => LevelChange(title)}>
            {title}
          </div>
        </>
      );
    }
  };

  const verticalLine = level_cnt === 1 ? "" : "vertical";

  return (
    <div
      className={`elem_container ${visible} ${verticalLine}`}
      style={{ marginLeft: `${level_cnt - 1 + 12}px` }}
    >
      {levelView()}
      {tableHeader()}
    </div>
  );
};

export default Level;
