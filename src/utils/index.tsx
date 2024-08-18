import { ParamsChangeMode } from "../store/api-request";

export const converChangingMode = (mode: ParamsChangeMode) => {
  switch (mode) {
    case "table":
      return "localValue";
    case "url":
      return "defaultValue";
    case "deleteRow":
      return "deleteRow";
    default:
      break;
  }
};
