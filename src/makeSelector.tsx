import * as React from "react";
import { HTMLSelect } from "@blueprintjs/core";
import { IHTMLSelectProps } from "@blueprintjs/core";

type Props<T extends string> = {
  value?: string;
  shown?: boolean;
  selectProps?: IHTMLSelectProps;
  onChange?: (value?: T) => void;
};

const makeSelector = <T extends string>(
  label: string,
  entries: [T, string][]
) => ({ value, shown, selectProps, onChange }: Props<T>) => {
  if (shown === false) return null;
  return (
    <HTMLSelect
      {...selectProps}
      value={value}
      onChange={({ target: { value } }) => {
        if (onChange) {
          if (value === label) {
            onChange();
          } else {
            onChange(value as T);
          }
        }
      }}
    >
      <option>{label}</option>
      {entries.map(([k, v], i) => (
        <option key={i} value={k}>
          {v}
        </option>
      ))}
    </HTMLSelect>
  );
};

export default makeSelector;

// vim: set ts=2 sw=2 et:
