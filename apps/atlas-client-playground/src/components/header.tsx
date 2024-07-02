import clsx from 'clsx';
import { Logo } from './logo';

export function Header({
  className,
  rightSlot,
}: {
  className?: string;
  rightSlot?: JSX.Element;
}) {
  return (
    <header
      className={clsx(
        'border-graphic-second-2 z-50 border-y',
        'bg-[rgb(240,240,239)]/80 text-[rgb(18,18,18)] dark:bg-[rgb(18,18,18)]/80 dark:text-[rgb(240,240,239)] backdrop-blur',
        className
      )}
    >
      <div className="mx-auto flex h-[44px] w-full items-center justify-between md:h-[66px]">
        <Logo />

        <div className="flex h-full items-center justify-center">
          {rightSlot && rightSlot}
        </div>
      </div>
    </header>
  );
}
