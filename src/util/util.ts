type Row = { char: string; value: number; pct: number };

export function aggregateLetters(
  input: string,
  opts?: {
    topK?: number;
    showOthers?: boolean;
    othersLabel?: string;
    excludeSpaces?: boolean;
  },
): { rows: Row[]; totalCount: number; wordCount: number; sentenceCount: number } {
  const { topK, showOthers = false, othersLabel = "Other", excludeSpaces = false } = opts ?? {};

  // Count words and sentences
  const wordCount = input.trim().length > 0 ? input.trim().split(/\s+/).length : 0;
  const sentenceCount = input.split(/[.!?]+/).filter(Boolean).length;

  // Handle letters
  const chars = Array.from(input).filter((ch) => {
    if (excludeSpaces && ch === " ") return false;
    return /[a-z]/i.test(ch);
  });

  const counts: Record<string, number> = {};
  for (const raw of chars) {
    const ch = raw.toLowerCase();
    counts[ch] = (counts[ch] ?? 0) + 1;
  }

  const totalCount = chars.length; // actual count, no +1 fallback
  let rows = Object.entries(counts)
    .map(([char, value]) => ({ char, value, pct: totalCount ? (value / totalCount) * 100 : 0 }))
    .sort((a, b) => b.value - a.value || a.char.localeCompare(b.char));

  if (topK && rows.length > topK) {
    const head = rows.slice(0, topK);
    if (showOthers) {
      const restSum = rows.slice(topK).reduce((s, r) => s + r.value, 0);
      if (restSum > 0) {
        head.push({ char: othersLabel, value: restSum, pct: (restSum / totalCount) * 100 });
      }
    }
    rows = head;
  }

  return { rows, totalCount, wordCount, sentenceCount };
}
