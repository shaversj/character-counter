export type LetterAggregateData = {
  rows: Row[];
  sentenceCount: number;
  totalCount: number;
  wordCount: number;
};

export type Row = {
  char: string;
  pct: number;
  value: number;
};
