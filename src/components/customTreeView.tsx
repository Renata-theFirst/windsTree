import { useState } from "react";
import { ILvlData, ITables } from "../App";
import BtnClose from "./buttonClose";
import BtnFind from "./buttonFind";
import Level from "./level";

interface IData {
  items: any;
  title: string;
}

export interface IActiveLevels {
  status: boolean;
  subLvls: ITables[] | IData[];
}

interface CustomTreeProps {
  data: ILvlData[];
  tables: Record<string, ITables[]>;
  activeLevels: Record<string, boolean>;
  relations: Record<string, string[]>;
}

interface ButtonProps {
  activity: boolean;
  action: Function;
}

export interface ButtonFilterProps extends ButtonProps {
  filter: Function;
}

export interface ButtonSelectProps extends ButtonProps {
  selectData: string[];
  disableGroups: Function;
}

const CustomTreeView = ({
  data,
  tables,
  activeLevels,
  relations,
}: CustomTreeProps) => {
  const [activeLvl, setActiveLvl] = useState(activeLevels);
  const LevelClick = (title: string) => {
    setActiveLvl((oldValue: Record<string, boolean>) => {
      const newValue = { ...oldValue };
      const children = relations[title];
      children.forEach((el) => {
        if (newValue[el]) {
          DisableElements(el, newValue);
        } else {
          newValue[el] = true;
        }
      });
      return { ...newValue };
    });
  };

  const DisableElements = (
    title: string,
    newValue: Record<string, boolean>
  ) => {
    newValue[title] = false;
    if (relations[title] !== undefined) {
      const children: any = relations[title];
      children.forEach((el: string) => {
        DisableElements(el, newValue);
      });
    }
  };

  function recursionRender(data: ILvlData[], cmpnts: any[]) {
    for (let key in data) {
      const dataKey = data[key];
      cmpnts.push(
        <Level
          title={dataKey.title}
          items={dataKey.items}
          active={activeLvl[dataKey.title]}
          LevelChange={LevelClick}
          activeLvl={activeLvl}
          level_cnt={dataKey.level}
          tables={tables}
          haveTable={dataKey.haveTable}
        />
      );
      recursionRender(dataKey.items, cmpnts);
    }
  }

  const [toggleBtn, setToggleBtn] = useState(0);
  const BtnToggleAction = (mode: number) => {
    if (mode === toggleBtn) {
      setToggleBtn(0);
      setActiveLvl(activeLevels);
    } else {
      setToggleBtn(mode);
    }
  };

  const FilterElem = (value: string) => {
    const keys = Object.keys(activeLevels);
    const find = keys.filter((el) => {
      return el.includes(value);
    });
    setActiveLvl((oldValue: Record<string, boolean>) => {
      const newValue = { ...oldValue };
      for (let key in newValue) {
        newValue[key] = find.includes(key);
      }
      return newValue;
    });
  };

  const btnCloseData: string[] = [];
  for (let key in data) {
    btnCloseData.push(data[key].title);
  }

  const DisableGroupOnSelectChange = (groupTitle: string) => {
    setActiveLvl({
      ...activeLvl,
      [groupTitle]: false,
    });
  };

  let cmpnts: any[] = [];
  recursionRender(data, cmpnts);
  return (
    <div>
      <div>
        {cmpnts}
      </div>
      <div className="buttons">
        <BtnClose
          activity={toggleBtn === 1}
          action={BtnToggleAction}
          selectData={btnCloseData}
          disableGroups={DisableGroupOnSelectChange}
        />
        <BtnFind
          activity={toggleBtn === 2}
          action={BtnToggleAction}
          filter={FilterElem}
        />
      </div>
    </div>
  );
};

export default CustomTreeView;
