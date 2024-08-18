import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import useApiRequestStore from "../store/api-request";
function RequestUrl() {
  const {
    params,
    url,
    method,
    setMethod,
    setParams,
    setUrl,
    paramChangingMode,
  } = useApiRequestStore();
  const [value, setValue] = useState("");

  const paramsConverted = useMemo(() => {
    const paramsOject = {};
    params.forEach((param) => {
      paramsOject[param.key] = param.value;
    });
    const paramsString = new URLSearchParams(paramsOject).toString();
    return paramsString.length ? "?" + paramsString : "";
  }, [params]);

  const handleChangeUrl = (e) => {
    const { value } = e.target;
    const searchIndex = value.indexOf("?");
    if (searchIndex === -1 || searchIndex + 1 === value.length) {
      setUrl(value);
      setParams([]);
    } else {
      const url = value.substring(0, searchIndex);
      setUrl(url);
      const searchString = value.substring(searchIndex);
      const searchParams = new URLSearchParams(searchString);
      const iterator = searchParams.entries();
      const paramsArray = [];
      while (true) {
        const result = iterator.next();
        if (result.done) break;
        paramsArray.push({ key: result.value[0], value: result.value[1] });
      }
      setParams(paramsArray);
    }
  };

  const urlValue = useMemo(() => {
    if (paramChangingMode === "url") {
      return value;
    } else if (paramChangingMode === "table") {
      return `${url}${paramsConverted}`;
    } else {
      return value || `${url}${paramsConverted}`;
    }
  }, [paramChangingMode, value, paramsConverted, url]);

  return (
    <Box>
      <InputGroup size="sm">
        <InputLeftAddon p={0}>
          <Select
            value={method}
            size={"sm"}
            onChange={(e) => setMethod(e.currentTarget.value as typeof method)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </Select>
        </InputLeftAddon>
        <Input
          value={urlValue}
          onChange={(e) => {
            setValue(e.target.value);
            handleChangeUrl(e);
          }}
          borderRadius={0}
          size={"sm"}
        />
        <InputRightAddon p={0}>
          <Button
            colorScheme="blue"
            size={"sm"}
            w={"100%"}
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
          >
            SEND
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Box>
  );
}

export default RequestUrl;
