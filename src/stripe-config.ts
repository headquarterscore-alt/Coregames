export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  currencySymbol: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1SH6H43ftBoDvYm11sx2OYKX',
    name: 'VIP',
    description: 'Premium VIP subscription with exclusive access to all features',
    mode: 'subscription',
    price: 9.99,
    currency: 'eur',
    currencySymbol: '€',
  },
];

export const stripeDonationPriceId = 'price_DONATION_PRICE_ID_HERE';