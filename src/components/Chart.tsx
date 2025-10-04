import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import type { LetterAggregateData } from "@/types/types.ts";

type ChartProps = {
  data: LetterAggregateData;
  showMore: boolean;
};

const RoundedBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  const r = Math.min(height / 2, 1000);
  return <rect x={x} y={y} width={width} height={height} fill={fill} rx={r} ry={r} />;
};

const RoundedTrack = (props: any) => {
  const { x, y, width, height } = props;
  const r = Math.min(height / 2, 1000);
  const fill = document.documentElement.classList.contains("dark") ? "#232533" : "#f3f4f6";
  return <rect x={x} y={y} width={width} height={height} rx={r} ry={r} fill={fill} />; // dark
};

function calcHeight(count: number): number {
  return Math.round(32 + 28.6 * count);
}

export default function Chart({ data, showMore }: ChartProps) {
  if (!data.rows || data.rows.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer width={"100%"} height={showMore ? calcHeight(data.rows.length) : 175}>
      <BarChart data={data.rows} layout="vertical">
        <XAxis type="number" hide domain={[0, "dataMax"]}></XAxis>
        <YAxis
          yAxisId="letters"
          dataKey="char"
          type="category"
          axisLine={false}
          tickLine={false}
          width={28}
          tickFormatter={(v) => String(v).toUpperCase()}
          style={{
            fill: document.documentElement.classList.contains("dark") ? "#e4e7eb" : "#111827",
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          dataKey="value"
          type="category"
          axisLine={false}
          tickLine={false}
          width={110}
          tickFormatter={(v: number, i: number) =>
            `${v.toLocaleString()} (${data.rows[i] ? data.rows[i].pct.toFixed(2) : "0.00"}%)`
          }
          style={{
            fill: document.documentElement.classList.contains("dark") ? "#e4e7eb" : "#111827",
          }}
        />
        <Bar
          yAxisId="right"
          dataKey="value"
          minPointSize={2}
          fill="#d39ffa"
          background={RoundedTrack}
          shape={RoundedBar}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
