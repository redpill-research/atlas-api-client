import clsx from "clsx";
import { Logo } from "./logo";

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
        "bg-bg-1 border-graphic-second-2 z-50 border-y",
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
