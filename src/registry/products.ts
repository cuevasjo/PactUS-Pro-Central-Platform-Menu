import type { ProductCode } from "./types";

export interface ProductDefinition {
  code: ProductCode;
  titleKey: string;
  descriptionKey: string;
  routeBase: string;
  entitlement: string;
}

export const PRODUCTS: ProductDefinition[] = [
  {
    code: "lro",
    titleKey: "products.lro.title",
    descriptionKey: "products.lro.description",
    routeBase: "/lro",
    entitlement: "product.lro",
  },
  {
    code: "pfie",
    titleKey: "products.pfie.title",
    descriptionKey: "products.pfie.description",
    routeBase: "/pfie",
    entitlement: "product.pfie",
  },
  {
    code: "scout",
    titleKey: "products.scout.title",
    descriptionKey: "products.scout.description",
    routeBase: "/scout",
    entitlement: "product.scout",
  },
];
