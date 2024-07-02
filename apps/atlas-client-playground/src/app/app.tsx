import { Header } from '../components/header';
import { Heading } from '../components/heading';
import { DayIcon, NightIcon } from '../components/icons';
import { Container, Page } from '../components/layout';
import { useThemeToggle } from '../hooks/use-theme-toggle';
import { AtlasClient } from './atlas-client';

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

function App() {
  return (
    <Page header={<Header rightSlot={<RightSlot />} />}>
      <Container className="py-6 md:py-8 lg:py-12">
        <Heading level={1} className="uppercase">
          Atlas Protocat Client Lab
        </Heading>

        <AtlasClient />
      </Container>
    </Page>
  );
}

export default App;
