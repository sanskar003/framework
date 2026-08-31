import { parts, products } from "../data/mockPart";
import type { completedAssembly } from "../pages/MainPage";


export const normalizeBarcode = (barcode: string) => {
  return barcode.trim().toUpperCase();
};

export const findPartByBarcode = (barcode: string) => {
  const scannedBarcode = normalizeBarcode(barcode);

  return parts.find(
    (part) =>
      normalizeBarcode(part.barcode) === scannedBarcode
  );
};

export const findProduct = (productCode: string) => {
  return products.find(
    (product) =>
      product.productCode === productCode
  );
};

export const validateChildPart = ({
  part,
  product,
  scannedParts,
  completedAssemblies,
}: {
  part: (typeof parts)[number];
  product: (typeof products)[number];
  scannedParts: (typeof parts)[number][];
  completedAssemblies: completedAssembly[];
}) => {

  const alreadyUsed = completedAssemblies.some(
    (assembly) =>
      assembly.parts.some(
        (usedPart) =>
          usedPart.barcode === part.barcode
      )
  );

  if (alreadyUsed) {
    return "This part has already been used in another assembly.";
  }

  const isRequired =
    product.requiredPartTypes.includes(
      part.partType
    );

  if (!isRequired) {
    return `${part.partType} is not required for this product.`;
  }

  const alreadyScanned =
    scannedParts.some(
      (scannedPart) =>
        scannedPart.barcode === part.barcode
    );

  if (alreadyScanned) {
    return "This part has already been scanned.";
  }

  const alreadyScannedType =
    scannedParts.some(
      (scannedPart) =>
        scannedPart.partType === part.partType
    );

  if (alreadyScannedType) {
    return `A ${part.partType} has already been added.`;
  }

  return null;
};