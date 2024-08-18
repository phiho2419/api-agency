import { Input } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

interface TableInputProps {
  onChange?: (value: string) => void;
  defaultValue?: string;
  valueMode?: "localValue" | "defaultValue" | "deleteRow";
}

export const TableInput = ({
  onChange,
  defaultValue,
  valueMode,
}: TableInputProps) => {
  const [value, setValue] = useState<string>("");
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    onChange(value);
  };

  const inputValue = useMemo(() => {
    if (valueMode === "localValue") {
      return value || defaultValue;
    } else if (valueMode === "defaultValue") {
      return defaultValue;
    } else if (valueMode === "deleteRow") {
      return defaultValue;
    } else {
      return value || defaultValue;
    }
  }, [value, defaultValue, valueMode]);

  useEffect(() => {
    // once value mode is changed, update value with defaultValue
    setValue(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueMode]);

  return <Input onChange={onValueChange} value={inputValue} />;
};
