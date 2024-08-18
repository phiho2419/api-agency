import {
  Box,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { ParamsChangeMode } from "../../store/api-request";
import { IParam } from "../../types";
import { converChangingMode } from "../../utils";
import { TableInput } from "./TableInput";

interface DynamicTableProps {
  title: string;
  values?: IParam[];
  onChange?: (name: string, value: string, index: number) => void;
  deleteRow?: (index: number) => void;
  valueMode?: ParamsChangeMode;
}
export const DynamicTable = ({
  values,
  onChange,
  valueMode,
  title,
  deleteRow,
}: DynamicTableProps) => {
  const [rowLength, setRowLength] = useState<number>(0);

  const handleChange = (name: string, value: string, index: number) => {
    if (index + 1 === rowLength) {
      setRowLength(rowLength + 1);
    }
    onChange(name, value, index);
  };

  useEffect(() => {
    setRowLength(values.length ? values.length + 1 : 1);
  }, [values.length]);

  return (
    <Box>
      <Text fontSize="0.875rem" fontWeight="bold" color="tomato">
        {title}
      </Text>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Key</Th>
              <Th>Value</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {[...new Array(rowLength)].map((_, index) => (
              <Tr key={index}>
                <Td>
                  <TableInput
                    onChange={(value) => handleChange("key", value, index)}
                    defaultValue={values?.[index]?.key || ""}
                    valueMode={converChangingMode(valueMode)}
                  />
                </Td>
                <Td>
                  <TableInput
                    onChange={(value) => handleChange("value", value, index)}
                    defaultValue={values?.[index]?.value || ""}
                    valueMode={converChangingMode(valueMode)}
                  />
                </Td>
                <Td>
                  {index + 1 !== rowLength && (
                    <Icon
                      as={MdDeleteForever}
                      boxSize={5}
                      onClick={() => deleteRow(index)}
                      cursor="pointer"
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
