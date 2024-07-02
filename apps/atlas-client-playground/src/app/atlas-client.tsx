import { PropsWithChildren, useState } from 'react';
import { Message } from '@bufbuild/protobuf';
import { Heading } from '../components/heading';
import {
  GetCountriesRequest,
  GetCountriesResponse,
  GetProductsByCountryRequest,
  GetProductsByCountryResponse,
} from '@red-pill/atlas-proto';
import { Button } from '../components/button';
import { Input } from '../components/input';

function Card({
  title,
  children,
  response,
}: PropsWithChildren<{ title: string; response: unknown }>) {
  console.log({ response });
  return (
    <div className="p-6 border rounded-lg border-graphic-second-2 flex flex-col gap-6">
      <header>
        <Heading level={4}>{title}</Heading>
      </header>
      <div className="flex flex-1 flex-col gap-4">{children}</div>
      <div className="flex">
        <DebugCode>{JSON.stringify(response, null, 2)}</DebugCode>
      </div>
    </div>
  );
}

function DebugCode({ children }: PropsWithChildren) {
  return (
    <code className="p-2 text-[12px] rounded border border-graphic-second-2 bg-gray-200/30 dark:bg-gray-800/20 w-full min-h-4 max-h-[300px] overflow-auto">
      <div className="tracking-normal font-mono uppercase text-[10px] text-graphic-base-2 font-[600] mb-2">
        Response
      </div>
      <pre className="font-mono">{children}</pre>
    </code>
  );
}

function createAtlasApiClient({ baseUrl }: { baseUrl: string }) {
  async function postRequest<T extends Message>(
    endpoint: string,
    request: T
  ): Promise<Response> {
    const binaryData = request.toBinary();
    const response = await fetch(new URL(endpoint, baseUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-protobuf',
      },
      body: binaryData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response;
  }

  return {
    getCountries: async (data: Partial<GetCountriesRequest>) => {
      const requestData = new GetCountriesRequest(data);

      try {
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
    getProductsByCountry: async (
      data: Partial<GetProductsByCountryRequest>
    ) => {
      const requestData = new GetProductsByCountryRequest(data);

      try {
        const response = await postRequest<GetProductsByCountryRequest>(
          '/api/v1/products',
          requestData
        );
        const responseData = await response.arrayBuffer();
        const responseMessage = GetProductsByCountryResponse.fromBinary(
          new Uint8Array(responseData)
        );
        return responseMessage.toJson();
      } catch (error) {
        console.error('Error fetching products for country:', error);
        throw error;
      }
    },
  };
}

const baseUrl = 'https://api.atls.rs';
const atlasApiClient = createAtlasApiClient({ baseUrl });

function AtlasGetCountries() {
  const [resp, setResp] = useState<unknown>({});

  return (
    <Card title="getCountries" response={resp}>
      <Button
        className="w-full"
        onClick={async () => {
          try {
            const resp = await atlasApiClient.getCountries({});
            setResp({ type: 'success', data: resp });
          } catch (error) {
            console.log(error);
            setResp({ type: 'error', data: error });
          }
        }}
      >
        getCountries
      </Button>
    </Card>
  );
}

function AtlasGetProductsByCountries() {
  const [resp, setResp] = useState<unknown>({});
  const [countryId, setCountryId] = useState<string>('');

  return (
    <Card title="getProductsByCountry" response={resp}>
      <Input
        placeholder="countryId"
        onChange={(event) => {
          const value = event.currentTarget.value;
          setCountryId(value);
        }}
      />
      <Button
        className="w-full"
        disabled={!countryId || countryId === '' || countryId.length === 0}
        onClick={async () => {
          try {
            const resp = await atlasApiClient.getProductsByCountry({
              countryId,
            });
            setResp({ type: 'success', data: resp });
          } catch (error) {
            console.log(error);
            setResp({ type: 'error', data: error });
          }
        }}
      >
        getProductsByCountry
      </Button>
    </Card>
  );
}

export function AtlasClient() {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-6">
      <AtlasGetCountries />
      <AtlasGetProductsByCountries />
    </div>
  );
}
