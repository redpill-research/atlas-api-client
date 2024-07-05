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
}

export function createAtlasApiClient({
  baseUrl,
}: {
  baseUrl: string;
}): AtlasApiClient {
  async function postRequest<T extends Message>(
    endpoint: string,
    request: T,
  ): Promise<Response> {
    const headers: HeadersInit = {
      'Content-Type': 'application/x-protobuf',
    };

    const response = await fetch(new URL(endpoint, baseUrl), {
      method: 'POST',
      headers,
      body: request.toBinary(),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
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
  };
}
