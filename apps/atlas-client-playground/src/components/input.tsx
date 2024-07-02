import {
  ChangeEvent,
  FocusEventHandler,
  forwardRef,
  ReactNode,
  Ref,
  useCallback,
} from "react";
import clsx from "clsx";

export function InputLabel({
  label,
  labelRightSlot,
  disabled,
  id,
}: {
  label: string;
  labelRightSlot?: ReactNode;
  disabled?: boolean;
  id?: string;
}) {
  return (
    <label
      htmlFor={id}
      className={clsx(
        "flex items-center gap-2",
        disabled && "cursor-not-allowed"
      )}
    >
      {label}
      {labelRightSlot && (
        <div className="text-text-second-1">{labelRightSlot}</div>
      )}
    </label>
  );
}

export function InputSlot({
  slot,
  error,
  disabled,
}: {
  slot: ReactNode;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        error && "[&>*]:text-text-red-1",
        disabled && "cursor-not-allowed"
      )}
    >
      {slot}
    </div>
  );
}

type InputType = "text" | "email" | "number";

export type InputOnChange = (event: ChangeEvent<HTMLInputElement>) => void;

export interface AdditionalInputProps<T extends InputType> {
  inputClassName?: string;
  className?: string;
  inputContainerClassName?: string;
  label?: string;
  labelRightSlot?: ReactNode;
  error?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onChange?: InputOnChange;
  onBlur?: FocusEventHandler;
  onFocus?: FocusEventHandler;
  disabled?: boolean;
  value?: string | number;
  id?: string;
  type?: T;
  placeholder?: string;
  hint?: ReactNode;
  name?: string;
  autoFocus?: boolean;
  required?: boolean;
}

export const Input = forwardRef(
  <T extends InputType>(
    {
      className,
      inputClassName,
      inputContainerClassName,
      label,
      labelRightSlot,
      type,
      id,
      placeholder,
      error,
      leftSlot,
      rightSlot,
      value,
      onChange,
      onBlur,
      onFocus,
      disabled,
      hint,
      name,
      required,
      autoFocus,
      ...rest
    }: AdditionalInputProps<T>,
    ref: Ref<HTMLInputElement>
  ) => {
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(event);
        }
      },
      [onChange]
    );

    return (
      <div
        className={clsx(
          "flex w-full flex-col gap-y-1",
          "text-text-base-1 text-base font-medium leading-[22px] [&>*]:text-base [&>*]:font-medium [&>*]:leading-[22px]",
          disabled && "cursor-not-allowed",
          className
        )}
      >
        {label && (
          <InputLabel
            label={label}
            labelRightSlot={labelRightSlot}
            id={id}
            disabled={disabled}
          />
        )}
        <div
          className={clsx(
            "bg-bg-1 border-graphic-second-2 focus-within:bg-graphic-second-3 flex w-full flex-row items-center gap-x-2 rounded-md border px-3 py-2 transition-colors duration-200",
            error && "border-graphic-red-1",
            inputContainerClassName
          )}
        >
          {leftSlot && (
            <InputSlot slot={leftSlot} disabled={disabled} error={error} />
          )}

          <input
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            id={id}
            name={name}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            value={value}
            ref={ref}
            autoFocus={autoFocus}
            className={clsx(
              "placeholder-text-base-2 w-full flex-1 bg-transparent outline-none transition-colors duration-200",
              error && "text-text-red-1",
              disabled && "cursor-not-allowed",
              inputClassName
            )}
            {...rest}
          />

          {rightSlot && (
            <InputSlot slot={rightSlot} disabled={disabled} error={error} />
          )}
        </div>

        {error && <div className="text-text-red-1">{error}</div>}
        {hint && hint}
      </div>
    );
  }
);
