export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price_per_unit?: number;
  currency_symbol?: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_TDZG8DZQgj2Ay0',
    priceId: 'price_1SH88S3ftBoDvYm1RSTaZ4En',
    name: 'Donation',
    description: 'Support DuelCore',
    currency_symbol: '$',
    mode: 'payment'
  },
  {
    id: 'prod_TDXLz3Qq6vhAhb',
    priceId: 'price_1SH6H43ftBoDvYm11sx2OYKX',
    name: 'VIP',
    description: 'VIP Subscription',
    price_per_unit: 9.99,
    currency_symbol: '€',
    mode: 'subscription'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};