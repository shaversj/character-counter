import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import type { LetterAggregateData } from "@/types/types.ts";

type ChartProps = {
  data: LetterAggregateData;
  showMore: boolean;
};

const RoundedBar = (props: any) => {
  const { fill, height, width, x, y } = props;
  const r = Math.min(height / 2, 1000);
  return <rect fill={fill} height={height} rx={r} ry={r} width={width} x={x} y={y} />;
};

const RoundedTrack = (props: any) => {
  const { height, width, x, y } = props;
  const r = Math.min(height / 2, 1000);
  const fill = document.documentElement.classList.contains("dark") ? "#232533" : "#f3f4f6";
  return <rect fill={fill} height={height} rx={r} ry={r} width={width} x={x} y={y} />; // dark
};

export default function Chart({ data, showMore }: ChartProps) {
  if (!data.rows || data.rows.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer height={showMore ? calcHeight(data.rows.length) : 175} width={"100%"}>
      <BarChart data={data.rows} layout="vertical">
        <XAxis domain={[0, "dataMax"]} hide type="number"></XAxis>
        <YAxis
          axisLine={false}
          dataKey="char"
          style={{
            fill: document.documentElement.classList.contains("dark") ? "#e4e7eb" : "#111827",
          }}
          tickFormatter={(v) => String(v).toUpperCase()}
          tickLine={false}
          type="category"
          width={28}
          yAxisId="letters"
        />
        <YAxis
          axisLine={false}
          dataKey="value"
          orientation="right"
          style={{
            fill: document.documentElement.classList.contains("dark") ? "#e4e7eb" : "#111827",
          }}
          tickFormatter={(v: number, i: number) =>
            `${v.toLocaleString()} (${data.rows[i] ? data.rows[i].pct.toFixed(2) : "0.00"}%)`
          }
          tickLine={false}
          type="category"
          width={110}
          yAxisId="right"
        />
        <Bar
          background={RoundedTrack}
          dataKey="value"
          fill="#d39ffa"
          minPointSize={2}
          shape={RoundedBar}
          yAxisId="right"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function calcHeight(count: number): number {
  return Math.round(32 + 28.6 * count);
}
