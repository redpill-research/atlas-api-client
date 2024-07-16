import { useState } from 'react';
import { Header } from '../components/header';
import { Heading } from '../components/heading';
import { DayIcon, NightIcon } from '../components/icons';
import { Input } from '../components/input';
import { Container, Page } from '../components/layout';
import { useThemeToggle } from '../hooks/use-theme-toggle';
import {
  AtlasAuth,
  AtlasCreateOrder,
  AtlasGenerateInviteCode,
  AtlasGetAllOrders,
  AtlasGetCountries,
  AtlasGetOrderById,
  AtlasGetProductById,
  AtlasGetProductsByCountries,
  AtlasRefInfo,
  AtlasSendInvite,
} from './atlas-client-playground';
import { AppProviders } from '../providers/providers';

function RightSlot() {
  const [theme, toggleTheme] = useThemeToggle();

  return (
    <button
      type="button"
      className="border-graphic-second-2 h-full border-l hover:bg-graphic-second-3 active:bg-graphic-second-4 flex cursor-pointer items-center justify-center px-2 sm:px-3 md:px-6"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <NightIcon className="h-[26px] w-[26px] md:h-8 md:w-8" />
      ) : (
        <DayIcon className="h-[26px] w-[26px] md:h-8 md:w-8" />
      )}
    </button>
  );
}

export function App() {
  const [apiEndpoint, setApiEndpoint] = useState<string>('https://api.atls.rs');

  return (
    <Page header={<Header rightSlot={<RightSlot />} />}>
      <Container className="py-6 md:py-8 lg:py-12 flex flex-col gap-12">
        <Heading level={1} className="uppercase">
          Atlas API Client Playground
        </Heading>

        <div>
          <Input
            placeholder="countryId"
            value={apiEndpoint}
            onChange={(event) => {
              setApiEndpoint(event.currentTarget.value);
            }}
          />
        </div>

        <AppProviders baseUrl={apiEndpoint}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AtlasAuth />
            <AtlasGetCountries />
            <AtlasGetProductsByCountries />
            <AtlasGetProductById />
            <AtlasGetAllOrders />
            <AtlasGetOrderById />
            <AtlasCreateOrder />
            <AtlasRefInfo />
            <AtlasGenerateInviteCode />
            <AtlasSendInvite />
          </div>
        </AppProviders>
      </Container>
    </Page>
  );
}
