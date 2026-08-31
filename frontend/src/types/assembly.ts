export type PartStatus =
  | "PENDING"
  | "COMPLETE"
  | "FAILED";

export interface Part {
  partNumber: string;
  partType: string;
  barcode: string;
}