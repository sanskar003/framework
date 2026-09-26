export type PartStatus =
  | "PENDING"
  | "COMPLETE"


export interface Part {
  partNumber: string;
  partType: string;
  barcode: string;
}

export interface Assembly {
  _id: string;
  assemblyNumber: string;
  productCode: string;
  parentBarcode: string;
  status: "PENDING" | "COMPLETE";
  children: Part[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  imageType:
  |"MAIN_FRAME"
  |"BUTTON_LAYER"
  |"CIRCUIT_BOARD"
  |"FRONT_LED"
  |"BATTERY_COMPARTMENT"

  imageUrl: string;
  publicId: string;
}

export interface Product {
  productCode: string;
  name: string;
  requiredPartTypes: string[];
  images: ProductImage[];
}