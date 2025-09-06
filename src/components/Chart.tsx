import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { useMemo } from "react";

type Row = { char: string; value: number; pct: number };

function aggregateLetters(
  input: string,
  opts?: { topK?: number; showOthers?: boolean; othersLabel?: string },
): { rows: Row[] } {
  const { topK, showOthers = false, othersLabel = "Other" } = opts ?? {};

  const letters = Array.from(input).filter((ch) => /[a-z]/i.test(ch));
  const counts: Record<string, number> = {};
  for (const raw of letters) {
    const ch = raw.toLocaleLowerCase();
    counts[ch] = (counts[ch] ?? 0) + 1;
  }

  const total = letters.length || 1;
  let rows = Object.entries(counts)
    .map(([char, value]) => ({ char, value, pct: (value / total) * 100 }))
    .sort((a, b) => b.value - a.value || a.char.localeCompare(b.char));

  if (topK && rows.length > topK) {
    const head = rows.slice(0, topK);
    if (showOthers) {
      const restSum = rows.slice(topK).reduce((s, r) => s + r.value, 0);
      if (restSum > 0)
        head.push({ char: othersLabel, value: restSum, pct: (restSum / total) * 100 });
    }
    rows = head;
  }

  return { rows };
}

const RoundedBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  const r = Math.min(height / 2, 1000);
  return <rect x={x} y={y} width={width} height={height} fill={fill} rx={r} ry={r} />;
};

export default function Chart({
  data,
  topK,
  showOthers = true,
  othersLabel = "Other",
}: {
  data: string;
  topK?: number;
  showOthers?: boolean;
  othersLabel?: string;
}) {
  // https://codesandbox.io/p/sandbox/recharts-horizontal-bar-with-dual-y-axis-25v91?file=%2Fsrc%2Findex.js%3A62%2C39-62%2C43

  const { rows } = useMemo(
    () => aggregateLetters(data ?? "", { topK, showOthers, othersLabel }),
    [data, topK, showOthers, othersLabel],
  );
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={rows} layout="vertical">
        <XAxis type="number" hide domain={[0, "dataMax"]} />
        <YAxis
          yAxisId="letters"
          dataKey="char"
          type="category"
          axisLine={false}
          tickLine={false}
          width={28}
          tickFormatter={(v: string) => v.toUpperCase()}
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
            `${v.toLocaleString()} (${rows[i] ? rows[i].pct.toFixed(2) : "0.00"}%)`
          }
        />
        <Bar
          yAxisId="right"
          dataKey="value"
          minPointSize={2}
          fill="#d39ffa"
          background={RoundedBar}
          shape={RoundedBar}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
