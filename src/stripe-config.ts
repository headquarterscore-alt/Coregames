export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  currencySymbol: string;
  mode: 'subscription' | 'payment';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_TDXLz3Qq6vhAhb',
    priceId: 'price_1SH6H43ftBoDvYm11sx2OYKX',
    name: 'VIP',
    description: 'Premium access with exclusive features and priority support',
    price: 9.99,
    currency: 'eur',
    currencySymbol: '€',
    mode: 'subscription'
  }
];

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};