import { ITableLine } from "../App";

interface TableLinesProps {
  data: ITableLine[];
  active: boolean;
}

const Tables = ({ data, active }: TableLinesProps) => {
  const visible = active ? "" : "hidden_elem";
  const res = data.map((e, i) => {
    return (
      <tr key={`tblR-${i}`}>
        <td>{i + 1}</td>
        <td className="table_title">{e.title}</td>
        <td>{e.number}</td>
      </tr>
    );
  });
  return (
    <table className={`${visible}`}>
      <tbody>
        <tr>
          <th className="th_withArrow__sharp">#</th>
          <th className="table_title">Title</th>
          <th className="th_withArrow__num">Number</th>
        </tr>
        {res}
      </tbody>
    </table>
  );
};

export default Tables;
