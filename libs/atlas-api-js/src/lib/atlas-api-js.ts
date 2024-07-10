import { Message } from '@bufbuild/protobuf';
import {
  GetCountriesRequest,
  GetCountriesResponse,
  GetProductsByCountryRequest,
  GetProductsByCountryResponse,
  AuthStartRequest,
  AuthStartResponse,
  AuthConfirmRequest,
  AuthConfirmResponse,
  GetProductByIdRequest,
  GetProductByIdResponse,
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
import {
  AtlasApiClient,
  IAuthConfirmResponse,
  IAuthStartResponse,
  ICreateOrderResponse,
  IGenerateInviteCodeResponse,
  IGetAllOrdersResponse,
  IGetCountriesResponse,
  IGetOrderByIdResponse,
  IGetProductByIdResponse,
  IGetProductsByCountryResponse,
  IGetReferralInfoResponse,
  ISendInviteResponse,
} from './types';

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
        const responseMessage = AuthStartResponse.fromBinary(
          new Uint8Array(responseData),
        );
        const responseMessageJson: unknown = responseMessage.toJson();

        return responseMessageJson as IAuthStartResponse;
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
        const responseMessage = AuthConfirmResponse.fromBinary(
          new Uint8Array(responseData),
        );
        const responseMessageJson: unknown = responseMessage.toJson();

        return responseMessageJson as IAuthConfirmResponse;
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
        const responseMessage = GetCountriesResponse.fromBinary(
          new Uint8Array(responseData),
        );
        const responseMessageJson: unknown = responseMessage.toJson();

        return responseMessageJson as IGetCountriesResponse;
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
        const responseMessage = GetProductsByCountryResponse.fromBinary(
          new Uint8Array(responseData),
        );
        const responseMessageJson: unknown = responseMessage.toJson();

        return responseMessageJson as IGetProductsByCountryResponse;
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
        const responseMessage = GetProductByIdResponse.fromBinary(
          new Uint8Array(responseData),
        );
        const responseMessageJson: unknown = responseMessage.toJson();

        return responseMessageJson as IGetProductByIdResponse;
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
        const responseMessage = GetReferralInfoResponse.fromBinary(
          new Uint8Array(responseData),
        );
        const responseMessageJson: unknown = responseMessage.toJson();

        return responseMessageJson as IGetReferralInfoResponse;
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
        const responseMessage = SendInviteResponse.fromBinary(
          new Uint8Array(responseData),
        );
        const responseMessageJson: unknown = responseMessage.toJson();

        return responseMessageJson as ISendInviteResponse;
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
        const responseMessage = GenerateInviteCodeResponse.fromBinary(
          new Uint8Array(responseData),
        );
        const responseMessageJson: unknown = responseMessage.toJson();

        return responseMessageJson as IGenerateInviteCodeResponse;
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
        const responseMessageJson: unknown = responseMessage.toJson();

        return responseMessageJson as ICreateOrderResponse;
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
        const responseMessageJson: unknown = responseMessage.toJson();

        return responseMessageJson as IGetOrderByIdResponse;
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
        const responseMessageJson: unknown = responseMessage.toJson();

        return responseMessageJson as IGetAllOrdersResponse;
      } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
      }
    },
  };
}
