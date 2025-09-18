export type Row = {
  letter: string;
  count: number;
  percentage: number;
  pct: number;
};

export type LetterAggregateData = {
  rows: Row[];
  totalCount: number;
  wordCount: number;
  sentenceCount: number;
};
