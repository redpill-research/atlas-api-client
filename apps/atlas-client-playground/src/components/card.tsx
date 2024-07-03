import { PropsWithChildren } from 'react';
import { Heading } from './heading';
import { DebugCode } from './debug-code';

export function Card({
  title,
  children,
  response,
}: PropsWithChildren<{ title: string; response?: unknown }>) {
  return (
    <div className="p-6 border rounded-lg border-graphic-second-2 flex flex-col gap-6">
      <header>
        <Heading level={4}>{title}</Heading>
      </header>
      {children && <div className="flex flex-col gap-4">{children}</div>}
      {Boolean(response) && (
        <div className="flex">
          <DebugCode>{JSON.stringify(response, null, 2)}</DebugCode>
        </div>
      )}
    </div>
  );
}
