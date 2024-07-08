import { Message } from '@bufbuild/protobuf';
import {
  Country,
  GetCountriesRequest,
  GetCountriesResponse,
  GetProductsByCountryRequest,
  GetProductsByCountryResponse,
  Product,
  AuthStartRequest,
  AuthStartResponse,
  AuthConfirmRequest,
  AuthConfirmResponse,
  GetProductByIdRequest,
  GetProductByIdResponse,
  InviteCode,
  GetReferralInfoRequest,
  GetReferralInfoResponse,
  SendInviteRequest,
  SendInviteResponse,
  GenerateInviteCodeRequest,
  GenerateInviteCodeResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderByIdRequest,
  GetOrderByIdResponse,
  GetAllOrdersRequest,
  GetAllOrdersResponse,
} from '@red-pill/atlas-proto';

export interface AtlasApiClient {
  getCountries: (
    data: Partial<GetCountriesRequest>,
  ) => Promise<{ countries: Country[]; preferredCountry?: Country }>;
  getProductsByCountry: (
    data: Partial<GetProductsByCountryRequest>,
  ) => Promise<{ products: Product[] }>;
  getProductsById: (
    data: Partial<GetProductByIdRequest>,
  ) => Promise<{ product: Product | undefined }>;
  authStart: (
    data: Partial<AuthStartRequest>,
  ) => Promise<{ authId: string; messageForSign: string }>;
  authConfirm: (
    data: Partial<AuthConfirmRequest>,
  ) => Promise<{ sessionToken: string }>;
  getReferralInfo: (
    data: Partial<GetReferralInfoRequest>,
    authToken: string,
  ) => Promise<{
    availableCount: number;
    invitedAddresses: string[];
    generatedCodes: InviteCode[];
  }>;
  sendInvite: (
    data: Partial<SendInviteRequest>,
    authToken: string,
  ) => Promise<{ tx: string }>;
  generateInviteCode: (
    data: Partial<GenerateInviteCodeRequest>,
    authToken: string,
  ) => Promise<{ code: string }>;
  createOrder: (
    data: Partial<CreateOrderRequest>,
    authToken: string,
  ) => Promise<CreateOrderResponse>;
  getOrderById: (
    data: Partial<GetOrderByIdRequest>,
    authToken: string,
  ) => Promise<GetOrderByIdResponse>;
  getAllOrders: (
    data: Partial<GetAllOrdersRequest>,
    authToken: string,
  ) => Promise<GetAllOrdersResponse>;
}

export function createAtlasApiClient({
  baseUrl,
}: {
  baseUrl: string;
}): AtlasApiClient {
  async function postRequest<T extends Message>(
    endpoint: string,
    request: T,
    authToken?: string,
  ): Promise<Response> {
    const headers = new Headers({
      'Content-Type': 'application/x-protobuf',
    });

    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    const response = await fetch(new URL(endpoint, baseUrl), {
      method: 'POST',
      headers,
      body: request.toBinary(),
    });

    if (!response.ok) {
      const errorMessage = response.statusText || 'Unknown error';
      throw new Error(
        `Request failed with status: ${response.status} - ${errorMessage}`,
      );
    }

    return response;
  }

  return {
    // Auth
    authStart: async (data) => {
      try {
        const requestData = new AuthStartRequest(data);
        const response = await postRequest('/api/v1/auth/start', requestData);
        const responseData = await response.arrayBuffer();
        const { authId, messageForSign } = AuthStartResponse.fromBinary(
          new Uint8Array(responseData),
        );
        return { authId, messageForSign };
      } catch (error) {
        console.error('Error starting authentication:', error);
        throw error;
      }
    },
    authConfirm: async (data) => {
      try {
        const requestData = new AuthConfirmRequest(data);
        const response = await postRequest('/api/v1/auth/confirm', requestData);
        const responseData = await response.arrayBuffer();
        const { sessionToken } = AuthConfirmResponse.fromBinary(
          new Uint8Array(responseData),
        );
        return { sessionToken };
      } catch (error) {
        console.error('Error confirming authentication:', error);
        throw error;
      }
    },

    // Public API
    getCountries: async (data) => {
      try {
        const requestData = new GetCountriesRequest(data);
        const response = await postRequest('/api/v1/countries', requestData);
        const responseData = await response.arrayBuffer();
        const { countries, preferredCountry } = GetCountriesResponse.fromBinary(
          new Uint8Array(responseData),
        );
        return { countries, preferredCountry };
      } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
      }
    },
    getProductsByCountry: async (data) => {
      try {
        const requestData = new GetProductsByCountryRequest(data);
        const response = await postRequest('/api/v1/products', requestData);
        const responseData = await response.arrayBuffer();
        const { products } = GetProductsByCountryResponse.fromBinary(
          new Uint8Array(responseData),
        );
        return { products };
      } catch (error) {
        console.error('Error fetching products for country:', error);
        throw error;
      }
    },
    getProductsById: async (data) => {
      try {
        const requestData = new GetProductByIdRequest(data);
        const response = await postRequest(
          '/api/v1/products/by_id',
          requestData,
        );
        const responseData = await response.arrayBuffer();
        const { product } = GetProductByIdResponse.fromBinary(
          new Uint8Array(responseData),
        );
        return { product };
      } catch (error) {
        console.error('Error fetching products for country:', error);
        throw error;
      }
    },

    // Private API
    getReferralInfo: async (data, authToken) => {
      try {
        const requestData = new GetReferralInfoRequest(data);
        const response = await postRequest(
          '/api/v1/referral/info',
          requestData,
          authToken,
        );
        const responseData = await response.arrayBuffer();
        const { generatedCodes, availableCount, invitedAddresses } =
          GetReferralInfoResponse.fromBinary(new Uint8Array(responseData));

        return { generatedCodes, availableCount, invitedAddresses };
      } catch (error) {
        console.error('Error fetching referral info:', error);
        throw error;
      }
    },
    sendInvite: async (data, authToken) => {
      try {
        const requestData = new SendInviteRequest(data);
        const response = await postRequest(
          '/api/v1/referral/send_invite',
          requestData,
          authToken,
        );
        const responseData = await response.arrayBuffer();
        const { tx } = SendInviteResponse.fromBinary(
          new Uint8Array(responseData),
        );
        return { tx };
      } catch (error) {
        console.error('Error sending invite:', error);
        throw error;
      }
    },
    generateInviteCode: async (data, authToken) => {
      try {
        const requestData = new GenerateInviteCodeRequest(data);
        const response = await postRequest(
          '/api/v1/referral/generate_code',
          requestData,
          authToken,
        );
        const responseData = await response.arrayBuffer();
        const { code } = GenerateInviteCodeResponse.fromBinary(
          new Uint8Array(responseData),
        );
        return { code };
      } catch (error) {
        console.error('Error generating invite code:', error);
        throw error;
      }
    },
    createOrder: async (data, authToken) => {
      try {
        const requestData = new CreateOrderRequest(data);
        const response = await postRequest(
          '/api/v1/orders/create',
          requestData,
          authToken,
        );
        const responseData = await response.arrayBuffer();
        const responseMessage = CreateOrderResponse.fromBinary(
          new Uint8Array(responseData),
        );
        return responseMessage;
      } catch (error) {
        console.error('Error creating order:', error);
        throw error;
      }
    },
    getOrderById: async (data, authToken) => {
      try {
        const requestData = new GetOrderByIdRequest(data);
        const response = await postRequest(
          '/api/v1/orders/by_id',
          requestData,
          authToken,
        );
        const responseData = await response.arrayBuffer();
        const responseMessage = GetOrderByIdResponse.fromBinary(
          new Uint8Array(responseData),
        );
        return responseMessage;
      } catch (error) {
        console.error('Error fetching order by id:', error);
        throw error;
      }
    },
    getAllOrders: async (data, authToken) => {
      try {
        const requestData = new GetAllOrdersRequest(data);
        const response = await postRequest(
          '/api/v1/orders/all',
          requestData,
          authToken,
        );
        const responseData = await response.arrayBuffer();
        const responseMessage = GetAllOrdersResponse.fromBinary(
          new Uint8Array(responseData),
        );
        return responseMessage;
      } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
      }
    },
  };
}
