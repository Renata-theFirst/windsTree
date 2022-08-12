import "./App.sass";
import CustomTreeView from "./components/customTreeView";
import { randomData } from "./data";
export interface ITableLine {
  number: number;
  title: string;
}
export interface ITables {
  data: ITableLine[];
  dateEnd: number;
  dateStart: number;
  subTitle: string;
  title: string;
}
export interface IData {
  items: ITables[];
  title: string;
}
interface IUniqueData {
  items: ITables[] | IData[];
  title: string;
}

export interface ILvlData {
  items: any[];
  title: string;
  haveTable: boolean;
  level: number;
}

function App() {
  const lvlTables: Record<string, ITables[]> = {};
  const activeLevels: Record<string, boolean> = {};
  const relations: Record<string, string[]> = {};

  const data: IUniqueData[] = randomData();
  function recursionInit(
    data: any,
    level_cnt: number,
    parent_title: string
  ): ILvlData[] {
    level_cnt += 1;
    let result: ILvlData[] = [];
    for (let key in data) {
      const dataKey = data[key];
      const dataItems = dataKey.items;
      const isTable = !!dataKey.dateStart;
      const haveTable = !!(dataItems && dataItems[0] && dataItems[0].dateStart);
      if (!isTable) {
        result.push({
          title: dataKey.title,
          haveTable,
          level: level_cnt,
          items: recursionInit(dataKey.items, level_cnt, dataKey.title),
        });
      }
      activeLevels[dataKey.title] = level_cnt <= 1;
      if (isTable) {
        if (!lvlTables[parent_title]) {
          lvlTables[parent_title] = [];
        }
        lvlTables[parent_title].push({ ...dataKey });
      }
      if (!isTable) {
        relations[dataKey.title] = dataItems.map((el: ILvlData) => el.title);
      }
    }
    return result;
  }

  let level_cnt = 0;
  const lvlData: ILvlData[] = recursionInit(data, level_cnt, "");

  return (
    <div className="App">
      <CustomTreeView
        data={lvlData}
        tables={lvlTables}
        activeLevels={activeLevels}
        relations={relations}
      />
    </div>
  );
}

export default App;
