import { useState, type ComponentPropsWithRef } from "react";
import { NumericFormat } from "react-number-format";
import { useFormContext, Controller } from "react-hook-form";

import { Input, InputAddon, InputWrapper } from "~/components/ui/Form";
import { config } from "~/config";
import clsx from "clsx";

export const AllocationInput = ({
  votingMaxProject,
  name,
  onBlur,
  tokenAddon,
  ...props
}: {
  votingMaxProject?: number;
  disabled?: boolean;
  tokenAddon?: boolean;
  error?: boolean;
} & ComponentPropsWithRef<"input">) => {
  const form = useFormContext();

  return (
    <InputWrapper className="min-w-[160px]">
      <Controller
        control={form.control}
        name={name!}
        {...props}
        render={({ field }) => (
          <NumericFormat
            aria-label="allocation-input"
            customInput={Input}
            error={props.error}
            {...field}
            autoComplete="off"
            className="pr-16"
            // Modificar la restricción de isAllowed para permitir valores aunque se pasen del max
            /*
            isAllowed={({ floatValue }) =>
              votingMaxProject !== undefined
                ? (floatValue ?? 0) <= votingMaxProject
                : true
            }*/
            isAllowed={({ value }) =>
               value.length <= 3 // Restringe a un máximo de 3 cifras
            }
            disabled={props.disabled}
            defaultValue={props.defaultValue as string}
            onChange={(v) => {
              // Parse decimal string to number to adhere to AllocationSchema
              field.onChange(parseFloat(v.target.value.replace(/,/g, "")));
            }}
            onBlur={onBlur}
            thousandSeparator=","
          />
        )}
      />
      {tokenAddon && (
        <InputAddon disabled={props.disabled}>{config.tokenName}</InputAddon>
      )}
    </InputWrapper>
  );
};
