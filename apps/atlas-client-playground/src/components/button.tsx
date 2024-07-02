import { forwardRef, PropsWithChildren, ReactNode, Ref } from "react";
import clsx from "clsx";
import { SpinnerLoader } from "./spinner-loader";

type Type = "button" | "submit" | "reset";
type Variant = "primary" | "secondary" | "outline";
type Size = "small" | "default" | "big";

interface VariantStyles {
  bg: string;
  interactivity: string;
  border: string;
  textColor: string;
  spinnerColor: string;
  disabled: string;
}

const variants: Record<Variant, Partial<VariantStyles>> = {
  primary: {
    bg: "bg-graphic-red-1",
    interactivity:
      "hover:bg-graphic-red-3 active:bg-graphic-red-2 active:text-text-second-1-active",
    disabled: "bg-graphic-red-4",
    textColor: "text-text-base-3",
    spinnerColor: "text-text-base-3",
  },
  secondary: {
    bg: "bg-graphic-base-1",
    interactivity:
      "hover:bg-graphic-second-5 active:bg-graphic-second-6 active:text-text-second-1",
    disabled: "bg-graphic-second-2",
    textColor: "text-text-base-4",
    spinnerColor: "text-text-text-base-4",
  },
  outline: {
    bg: "bg-bg-1",
    interactivity:
      "hover:border-graphic-second-5 active:border-graphic-second-6 active:text-text-second-1",
    disabled: "border-graphic-second-2 text-text-second-1",
    border: "border border-graphic-base-1",
    textColor: "text-text-base-1",
    spinnerColor: "text-text-base-1",
  },
};

const sizeClasses: Record<Size, string> = {
  small: "py-[9px]",
  default: "py-3",
  big: "py-4 text-xl",
};

export interface IButton extends PropsWithChildren {
  className?: string;
  onClick?: (e: unknown) => void;
  variant?: Variant;
  type?: Type;
  uppercase?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  size?: Size;
}

export const Button = forwardRef(
  (
    {
      className,
      onClick,
      children,
      isLoading,
      leftSlot,
      rightSlot,
      uppercase = false,
      type = "button",
      variant = "primary",
      disabled = false,
      size = "default",
    }: IButton,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        className={clsx(
          "flex items-center justify-center gap-1.5 rounded-md px-9 opacity-100 outline-none",
          "font-base text-base leading-[22px]",
          "transition-color duration-150 ease-in-out will-change-[color,background]",
          uppercase && "uppercase [&>*]:uppercase",
          isLoading && `cursor-wait ${variants[variant].disabled}`,
          disabled
            ? `cursor-not-allowed ${variants[variant].disabled}`
            : "cursor-pointer",
          variants[variant].bg,
          !disabled && !isLoading && variants[variant].interactivity,
          variants[variant].border,
          variants[variant].textColor,
          sizeClasses[size],
          className
        )}
        onClick={onClick}
        disabled={disabled}
        type={type}
        ref={ref}
      >
        {isLoading && (
          <SpinnerLoader className={variants[variant].spinnerColor} />
        )}
        {leftSlot && leftSlot}
        {children}
        {rightSlot && rightSlot}
      </button>
    );
  }
);
