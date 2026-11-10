// Storefront API client — Next.js 14 + TypeScript
// Usa la Storefront API de Shopify para headless storefronts

import { shopifyStorefrontApi, type ShopifyStorefrontConfig } from '@shopify/storefront-api-client';

const config: ShopifyStorefrontConfig = {
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'demo.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2024-10',
};

export const client = shopifyStorefrontApi(config);

export async function storefrontFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const result = await client.fetch(query, variables);
  return result as T;
}

export async function getProducts(limit: number = 8) {
  const query = `#graphql
    query getProducts($limit: Int!) {
      products(first: $limit) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 3) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price
                  availableForSale
                }
              }
            }
          }
        }
      }
    }`;

  const data = await storefrontFetch<{ products: { edges: Array<{ node: any }> } }>(query, { limit });
  return data.products.edges.map(e => e.node);
}

export async function getProductByHandle(handle: string) {
  const query = `#graphql
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              price
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        sellingPlanGroups(first: 5) {
          edges {
            node {
              id
              name
              options {
                name
                values
              }
            }
          }
        }
      }
    }`;

  const data = await storefrontFetch<{ product: any }>(query, { handle });
  return data.product;
}

export async function getCollection(handle: string, limit: number = 12) {
  const query = `#graphql
    query getCollection($handle: String!, $limit: Int!) {
      collection(handle: $handle) {
        id
        title
        products(first: $limit) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 3) {
                edges {
                  node {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }`;

  const data = await storefrontFetch<{ collection: any }>(query, { handle, limit });
  return data.collection;
}

export async function getHomepageCollections() {
  const query = `#graphql
    query getHomepageCollections {
      collections(first: 6) {
        edges {
          node {
            id
            title
            handle
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }`;

  const data = await storefrontFetch<{ collections: { edges: Array<{ node: any }> } }>(query);
  return data.collections.edges.map(e => e.node);
}

export async function getFAQs() {
  const query = `#graphql
    query getFAQs {
      pages(first: 10) {
        edges {
          node {
            id
            title
            handle
            body
          }
        }
      }
    }`;

  const data = await storefrontFetch<{ pages: { edges: Array<{ node: any }> } }>(query);
  return data.pages.edges.map(e => e.node);
}