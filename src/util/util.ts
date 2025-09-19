import type { Row } from "@/types/types.ts";

export function aggregateLetters(
  input: string,
  opts: {
    topK: number;
    showOthers: boolean;
    othersLabel: string;
    excludeSpaces: boolean;
  },
): { rows: Row[]; totalCount: number; wordCount: number; sentenceCount: number } {
  const { topK, showOthers, othersLabel, excludeSpaces } = opts;

  const wordCount = input.trim().length > 0 ? input.trim().split(/\s+/).length : 0;
  const sentenceCount = input.split(/[.!?]+/).filter(Boolean).length;

  const codepoints = Array.from(input);
  const spaceCount = codepoints.filter((ch) => /\s/.test(ch)).length;
  const totalCount = excludeSpaces ? codepoints.length - spaceCount : codepoints.length;

  const lettersOnly = codepoints.filter((ch) => /[a-z]/i.test(ch));
  const counts: Record<string, number> = {};
  for (const raw of lettersOnly) {
    const ch = raw.toLowerCase();
    counts[ch] = (counts[ch] ?? 0) + 1;
  }

  let rows: Row[] = Object.entries(counts)
    .map(([char, value]) => ({
      char,
      value,
      pct: totalCount ? (value / totalCount) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value || a.char.localeCompare(b.char));

  if (topK && rows.length > topK) {
    const head = rows.slice(0, topK);
    if (showOthers) {
      const restSum = rows.slice(topK).reduce((s, r) => s + r.value, 0);
      if (restSum > 0) {
        head.push({
          char: othersLabel,
          value: restSum,
          pct: totalCount ? (restSum / totalCount) * 100 : 0,
        });
      }
    }
    rows = head;
  }

  return { rows, totalCount, wordCount, sentenceCount };
}
