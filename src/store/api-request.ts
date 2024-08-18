import { create } from "zustand";
import { IHeader, IParam } from "../types";

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ParamsChangeMode = "table" | "url" | "deleteRow" | null;
export type HeaderChangeMode = "table" | "deleteRow" | null;

export type State = {
  params: IParam[];
  url: string;
  method: ApiMethod;
  paramChangingMode: ParamsChangeMode;
  headerChangingMode: ParamsChangeMode;
  headers: IHeader[];
};

type Action = {
  setHeaderIndex: (name: string, value: string, index: number) => void;
  setParams: (params: IParam[]) => void;
  setUrl: (url: string) => void;
  setMethod: (method: ApiMethod) => void;
  setParamsIndex: (name: string, value: string, index: number) => void;
  deleteParam: (index: number) => void;
  deleteHeader: (index: number) => void;
};

const useApiRequestStore = create<State & Action>((set) => ({
  paramChangingMode: null,
  headerChangingMode: null,

  headers: [],
  setHeaderIndex(name, value, index) {
    set(({ headers }) => {
      const newHeaders = [...headers];
      const headersIndex = newHeaders.findIndex(
        (_param, _index) => _index === index
      );
      if (headersIndex === -1) {
        const defaultHeaders = {
          key: "",
          value: "",
        };
        newHeaders.push({ ...defaultHeaders, [name]: value });
      } else {
        newHeaders[headersIndex][name] = value;
      }

      return { headers: newHeaders, headerChangingMode: "table" };
    });
  },
  deleteHeader: (index: number) => {
    set(({ headers }) => {
      const newHeaders = [...headers];
      newHeaders.splice(index, 1);
      return { headers: newHeaders, headerChangingMode: "deleteRow" };
    });
  },

  params: [],
  setParamsIndex: (name: string, value: string, index: number) => {
    set(({ params }) => {
      const newParams = [...params];
      const paramsIndex = newParams.findIndex(
        (_param, _index) => _index === index
      );
      if (paramsIndex === -1) {
        const defaultParams = {
          key: "",
          value: "",
        };
        newParams.push({ ...defaultParams, [name]: value });
      } else {
        newParams[paramsIndex][name] = value;
      }

      return { params: newParams, paramChangingMode: "table" };
    });
  },

  setParams: (_params: IParam[]) => {
    set(() => ({ params: _params, paramChangingMode: "url" }));
  },

  deleteParam: (index: number) => {
    set(({ params }) => {
      const newParams = [...params];
      newParams.splice(index, 1);
      return { params: newParams, paramChangingMode: "deleteRow" };
    });
  },

  url: "",
  setUrl: (url: string) => {
    set({ url });
  },

  method: "GET",
  setMethod: (method: ApiMethod) => {
    set({ method });
  },
}));

export default useApiRequestStore;
