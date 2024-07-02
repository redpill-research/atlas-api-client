import clsx from "clsx";
import logoDesktop from "../assets/logo-icon-desktop.svg";
import logoMobile from "../assets/logo-icon-mobile.svg";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="/"
      className="flex flex-row gap-[6px] shrink-0 px-2 sm:px-5 md:p-5 group"
    >
      <img
        className={clsx("hidden md:block", className)}
        width={96}
        height={28}
        src={logoDesktop}
        alt="atlas logo"
      />
      <img
        className={clsx("block md:hidden", className)}
        width={24}
        height={24}
        src={logoMobile}
        alt="atlas logo"
      />
      <span className="flex-initial md:mt-[-10px] mt-[-3px]">
        <span className="uppercase text-white bg-[#EF3E23] rounded font-[500] inline-block transform-gpu text-xs px-[5px] py-[2px] group-hover:animate-bounce">
          dev
        </span>
      </span>
    </a>
  );
}
