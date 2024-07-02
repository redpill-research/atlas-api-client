import { Message } from '@bufbuild/protobuf';
import {
  GetCountriesRequest,
  GetCountriesResponse,
  // GetProductsByCountryRequest,
  // GetProductsByCountryResponse,
} from '@red-pill/atlas-proto';

export function createAtlasApiClient({ baseUrl }: { baseUrl: string }) {
  console.log('createAtlasApiClient', { baseUrl });
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
    getCountries: async (data: Partial<GetCountriesRequest>) => {
      try {
        const requestData = new GetCountriesRequest(data);
        const response = await postRequest('/api/v1/countries', requestData);
        const responseData = await response.arrayBuffer();
        const responseMessage = GetCountriesResponse.fromBinary(
          new Uint8Array(responseData)
        );
        return responseMessage.toJson();
      } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
      }
    },
    // getProductsByCountry: async (
    //   data: Partial<GetProductsByCountryRequest>
    // ) => {
    //   const requestData = new GetProductsByCountryRequest(data);

    //   try {
    //     const response = await postRequest<GetProductsByCountryRequest>(
    //       '/api/v1/products',
    //       requestData
    //     );
    //     const responseData = await response.arrayBuffer();
    //     const responseMessage = GetProductsByCountryResponse.fromBinary(
    //       new Uint8Array(responseData)
    //     );
    //     return responseMessage.toJson();
    //   } catch (error) {
    //     console.error('Error fetching products for country:', error);
    //     throw error;
    //   }
    // },
  };
}

// const baseUrl = 'https://api.atls.rs';
// const atlasApiClient = createAtlasApiClient({ baseUrl });
