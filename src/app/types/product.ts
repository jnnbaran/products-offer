export interface Product {
  agreementCode?: string,
  agreementDesc?: string,
  allowModify?: boolean,
  basePrice: number,
  description: string,
  eduLicenseDescription: string,
  lastReleaseDate: string,
  lastVersion: string,
  maxNumberOfUsers: number,
  operatingSystem: string,
  packetDescription?: string,
  packets?: Packets[],
  prgCode: number,
  productCode: number,
  productId: number,
  productName: string,
  productNameDescription: string,
  productNameShortcut: string,
  productUrl: string,
  requiredProducts?: RequiredProducts[],
  variantDescription: string,
  variants: Variants[],
  versions: Versions[]
}

export interface Packets {
  orderWWW: number,
  packetCode: number,
  packetId: number,
  packetName: string,
  productId: number
}

export interface RequiredProducts {
  requiredProductId: number,
  requiredProductName: string
}

export interface Variants {
  maxNumberOfUsers: number,
  orderWWW: number,
  productId: number,
  variantCode: number,
  variantId: number,
  variantName: string
}

export interface Versions {
  compareNumber: number,
  number: number,
  productId: string,
  versionCode: number,
  versionId: number
  versionNumber: string
  releaseDate?: string
}
