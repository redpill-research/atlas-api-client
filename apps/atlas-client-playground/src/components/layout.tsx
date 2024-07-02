'use client';
import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

export function Container({
  children,
  className,
  fullScreenOnMobile = false,
}: PropsWithChildren<{ className?: string; fullScreenOnMobile?: boolean }>) {
  return (
    <div
      className={clsx(
        'mx-auto w-full max-w-[1280px]',
        fullScreenOnMobile ? 'px-0 sm:px-0' : 'px-4',
        'md:px-14 xl:px-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Page({
  children,
  header,
  footer,
  className,
}: PropsWithChildren<{
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}>): ReactElement {
  return (
    <div
      className={clsx(
        'relative flex min-h-screen flex-col overflow-clip',
        className,
      )}
    >
      {header ? <div className="flex-0 sticky top-0 z-50">{header}</div> : null}
      <div className="relative flex flex-1 flex-col overflow-x-clip">
        {children}
      </div>
      {footer ? footer : null}
    </div>
  );
}
