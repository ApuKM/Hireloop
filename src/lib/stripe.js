import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PRICE_ID = {
  seeker_pro: "price_1TiEVQLFv6oRx3ojdZaGwQTR",
  seeker_premium: "price_1TiIEBLFv6oRx3ojjncGHffa",
  recruiter_growth: "price_1TiIIcLFv6oRx3ojclVmpEHt",
  recruiter_enterprise: "price_1TiIJYLFv6oRx3ojQ6xxzZbX",
};
