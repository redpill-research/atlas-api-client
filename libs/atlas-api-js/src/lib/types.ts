/* eslint-disable @typescript-eslint/no-empty-interface */

export enum OrderStatus {
  UNSPECIFIED = 0,
  CREATED = 1, // order was created
  PENDING = 2, // order is pending and waits for payment
  COMPLETED = 3,
  CANCELLED = 4, // order was cancelled by user
  EXPIRED = 5, // order was expired
}

export interface ICountry {
  id: string;
  name: string;
  flagUrl?: string;
}

export interface ICurrency {
  numericId: number;
  symbol: string;
  name: string;
}

export interface IProductValueRange {
  min: number;
  max: number;
}

export interface IProduct {
  id: string;
  name: string;
  countryId: string;
  currency: ICurrency;
  denominations: number[];
  valueRange: IProductValueRange;
  image: string;
  description?: string;
  termsAndConditions?: string;
  instructions?: string;
}

export interface IInviteCode {
  code: string;
  isUsed: boolean;
}

export interface ICardData {
  url: string;
  code: string;
  expiryDateIso: string; // "2024-06-29T19:48:24.334Z"
  faceValue: number;
}

export interface ICoin {
  amount: number;
  denom: string;
}

export interface IPaymentData {
  wallet: string;
  amount: ICoin;
  expiredAfterSeconds: number;
  txUrl?: string;
  txHash?: string;
}

export interface IOrder {
  id: string;
  paymentData: IPaymentData;
  status: OrderStatus;
  product: IProduct;
  cardData: ICardData;
  createdAt: string;
}

export interface IAuthStartRequest {
  address: string;
  refCode?: string;
}

export interface IAuthStartResponse {
  authId: string;
  messageForSign: string;
}

export interface IAuthConfirmRequest {
  authId: string;
  signature: string;
}

export interface IAuthConfirmResponse {
  sessionToken: string;
}

export interface IGetCountriesRequest {}

export interface IGetCountriesResponse {
  countries: ICountry[];
  preferredCountry?: ICountry;
}

export interface IGetProductsByCountryRequest {
  countryId: string;
}

export interface IGetProductsByCountryResponse {
  products: IProduct[];
}

export interface IGetProductByIdRequest {
  productId: string;
}

export interface IGetProductByIdResponse {
  product: IProduct;
  productCountry?: ICountry;
}

export interface ICreateOrderRequest {
  productId: string;
  productDenomination: number;
}

export interface ICreateOrderResponse {
  order: IOrder;
}

export interface IGetOrderByIdRequest {
  orderId: string;
}

export interface IGetOrderByIdResponse {
  order: IOrder;
}

export interface IGetAllOrdersRequest {}

export interface IGetAllOrdersResponse {
  orders: IOrder[];
}

export interface IGetReferralInfoRequest {}

export interface IGetReferralInfoResponse {
  availableCount: number;
  generatedCodes: IInviteCode[];
  invitedAddresses: string[];
}

export interface ISendInviteRequest {
  address: string;
}

export interface ISendInviteResponse {
  tx: string;
}

export interface IGenerateInviteCodeRequest {}

export interface IGenerateInviteCodeResponse {
  code: string;
}

export interface AtlasApiClient {
  authStart: (data: Partial<IAuthStartRequest>) => Promise<IAuthStartResponse>;
  authConfirm: (
    data: Partial<IAuthConfirmRequest>,
  ) => Promise<IAuthConfirmResponse>;
  getCountries: (
    data: Partial<IGetCountriesRequest>,
    authToken: string,
  ) => Promise<IGetCountriesResponse>;
  getProductsByCountry: (
    data: Partial<IGetProductsByCountryRequest>,
    authToken: string,
  ) => Promise<IGetProductsByCountryResponse>;
  getProductsById: (
    data: Partial<IGetProductByIdRequest>,
    authToken: string,
  ) => Promise<IGetProductByIdResponse>;
  getReferralInfo: (
    data: Partial<IGetReferralInfoRequest>,
    authToken: string,
  ) => Promise<IGetReferralInfoResponse>;
  sendInvite: (
    data: Partial<ISendInviteRequest>,
    authToken: string,
  ) => Promise<ISendInviteResponse>;
  generateInviteCode: (
    data: Partial<IGenerateInviteCodeRequest>,
    authToken: string,
  ) => Promise<IGenerateInviteCodeResponse>;
  createOrder: (
    data: Partial<ICreateOrderRequest>,
    authToken: string,
  ) => Promise<ICreateOrderResponse>;
  getOrderById: (
    data: Partial<IGetOrderByIdRequest>,
    authToken: string,
  ) => Promise<IGetOrderByIdResponse>;
  getAllOrders: (
    data: Partial<IGetAllOrdersRequest>,
    authToken: string,
  ) => Promise<IGetAllOrdersResponse>;
}
