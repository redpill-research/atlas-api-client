import { useState } from 'react';
import { Card } from '../components/card';
import {
  useGetCountries,
  useGetProductsByCountry,
} from '@red-pill/atlas-api-react';
import { Input } from '../components/input';

export function AtlasGetCountries() {
  const { data: countries } = useGetCountries({});

  return <Card title="getCountries" response={countries} />;
}

export function AtlasGetProductsByCountries() {
  const [countryId, setCountryId] = useState<string>('');
  const { data: products } = useGetProductsByCountry({ countryId });

  return (
    <Card title="getProductsByCountry" response={products}>
      <Input
        placeholder="countryId"
        onChange={(event) => {
          const value = event.currentTarget.value;
          setCountryId(value);
        }}
      />
    </Card>
  );
}
