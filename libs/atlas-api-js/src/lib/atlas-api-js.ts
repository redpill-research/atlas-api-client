import { Message } from '@bufbuild/protobuf';
import {
  Country,
  GetCountriesRequest,
  GetCountriesResponse,
  GetProductsByCountryRequest,
  GetProductsByCountryResponse,
  Product,
} from '@red-pill/atlas-proto';

export interface AtlasApiClient {
  getCountries: (
    data: Partial<GetCountriesRequest>
  ) => Promise<{ countries: Country[] }>;
  getProductsByCountry: (
    data: Partial<GetProductsByCountryRequest>
  ) => Promise<{ products: Product[] }>;
}

export function createAtlasApiClient({
  baseUrl,
}: {
  baseUrl: string;
}): AtlasApiClient {
  async function postRequest<T extends Message>(
    endpoint: string,
    request: T
  ): Promise<Response> {
    const response = await fetch(new URL(endpoint, baseUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-protobuf',
      },
      body: request.toBinary(),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response;
  }

  return {
    getCountries: async (data) => {
      try {
        const requestData = new GetCountriesRequest(data);
        const response = await postRequest('/api/v1/countries', requestData);
        const responseData = await response.arrayBuffer();
        const responseMessage = GetCountriesResponse.fromBinary(
          new Uint8Array(responseData)
        );
        return responseMessage.toJson() as unknown as {
          countries: Country[];
        };
      } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
      }
    },
    getProductsByCountry: async (data) => {
      try {
        const requestData = new GetProductsByCountryRequest(data);
        const response = await postRequest<GetProductsByCountryRequest>(
          '/api/v1/products',
          requestData
        );
        const responseData = await response.arrayBuffer();
        const responseMessage = GetProductsByCountryResponse.fromBinary(
          new Uint8Array(responseData)
        );
        return responseMessage.toJson() as unknown as {
          products: Product[];
        };
      } catch (error) {
        console.error('Error fetching products for country:', error);
        throw error;
      }
    },
  };
}
