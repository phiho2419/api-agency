import { uniqueId } from "lodash";
import { create } from "zustand";
import { ApiMethod } from "./api-request";
import { IHeader, IParam } from "../types";

export interface ICollections {
  id: string;
  type: "collection" | "folder" | "request";
  name: string;
  method?: ApiMethod;
  url?: string;
  params?: IParam[];
  headers?: IHeader[];
  body?: IParam[];
  children?: ICollections[];
}

const defaultCollections: ICollections[] = [
  { id: uniqueId(), type: "collection", name: "MCC Manulife" },
  {
    id: uniqueId(),
    type: "collection",
    name: "API Phantom Dev",
    children: [
      {
        id: uniqueId(),
        type: "folder",
        name: "Auth",
        children: [
          {
            id: uniqueId(),
            type: "request",
            name: "Login",
            method: "POST",
            url: "http://localhost:3000/auth/login",
            params: [],
            headers: [
              {
                key: "Content-Type",
                value: "application/json",
              },
            ],
            body: [
              {
                key: "username",
                value: "phiho",
              },
              {
                key: "password",
                value: "admin",
              },
            ],
          },
          {
            id: uniqueId(),
            type: "request",
            name: "Register",
            url: "http://localhost:3000/auth/register",
          },
        ],
      },
      {
        id: uniqueId(),
        type: "folder",
        name: "plans",
        children: [
          {
            id: uniqueId(),
            type: "folder",
            name: "manager",
            children: [
              {
                id: uniqueId(),
                type: "request",
                name: "Get Plans",
                url: "http://localhost:3000/plans",
                method: "GET",
                params: [
                  {
                    key: "page",
                    value: "1",
                  },
                  {
                    key: "limit",
                    value: "10",
                  },
                  {
                    key: "search",
                    value: "",
                  },
                ],
                headers: [],
                body: [],
              },
              {
                id: uniqueId(),
                type: "request",
                name: "Create Plan",
                url: "http://localhost:3000/plans",
                method: "POST",
                params: [],
                headers: [
                  {
                    key: "Content-Type",
                    value: "application/json",
                  },
                ],
                body: [
                  {
                    key: "name",
                    value: "test",
                  },
                  {
                    key: "description",
                    value: "test",
                  },
                ],
              },
            ],
          },
          {
            id: uniqueId(),
            type: "folder",
            name: "members",
            children: [
              {
                id: uniqueId(),
                type: "request",
                name: "Get Todo",
                url: "http://localhost:3000/todo",
                method: "GET",
                params: [
                  {
                    key: "page",
                    value: "1",
                  },
                  {
                    key: "limit",
                    value: "10",
                  },
                  {
                    key: "search",
                    value: "",
                  },
                ],
                headers: [],
                body: [],
              },
              {
                id: uniqueId(),
                type: "request",
                name: "Create todo",
                url: "http://localhost:3000/todo",
                method: "POST",
                params: [],
                headers: [
                  {
                    key: "Content-Type",
                    value: "application/json",
                  },
                ],
                body: [
                  {
                    key: "name",
                    value: "test",
                  },
                  {
                    key: "description",
                    value: "test",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export type State = {
  collections: ICollections[];
};

export type Action = {
  setCollections: (collections: ICollections[]) => void;
};

const useLeftSideBarStore = create<State & Action>((set) => ({
  collections: defaultCollections,
  setCollections: (collections) => set({ collections }),
}));

export default useLeftSideBarStore;
