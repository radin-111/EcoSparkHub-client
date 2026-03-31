import React from "react";

import type { AnyFieldApi } from "@tanstack/react-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const getErrorText = (error: unknown): string => {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }

  return String(error);
};

type AppFieldOptions = {
  field: AnyFieldApi;
  label: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function AppField({
  field,
  label,
  type,
  placeholder,
  append,
  prepend,
  className,
  disabled,
}: AppFieldOptions) {
  const firstError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? getErrorText(field.state.meta.errors[0])
      : null;
  const hasError = firstError !== null;
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label
        htmlFor={field.name}
        className={cn(hasError && "text-destructive")}
      >
        {label}
      </Label>
      <div className="relative">
        {prepend && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {prepend}
          </div>
        )}
        <Input
          id={field.name}
          name={field.name}
          type={type}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${field.name}-error` : undefined}
          className={cn(
            prepend && "pl-10",
            append && "pr-10",
            hasError && "border-destructive focus-visible:ring-destructive/20",
          )}
        />
        {append && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {append}
          </div>
        )}
        {hasError && (
          <p
            id={`${field.name}-error`}
            className="mt-1 text-sm text-destructive"
          >
            {firstError}
          </p>
        )}
      </div>
    </div>
  );
}
