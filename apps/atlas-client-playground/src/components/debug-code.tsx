import { PropsWithChildren } from 'react';

export function DebugCode({ children }: PropsWithChildren) {
  return (
    <code className="p-2 text-[12px] rounded border border-graphic-second-2 bg-gray-200/30 dark:bg-gray-800/20 w-full min-h-4 max-h-[300px] overflow-auto">
      <div className="tracking-normal font-mono uppercase text-[10px] text-graphic-base-2 font-[600] mb-2">
        Response
      </div>
      <pre className="font-mono">{children}</pre>
    </code>
  );
}
