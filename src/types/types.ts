export type Row = {
  char: string;
  value: number;
  pct: number;
};

export type LetterAggregateData = {
  rows: Row[];
  totalCount: number;
  wordCount: number;
  sentenceCount: number;
};
