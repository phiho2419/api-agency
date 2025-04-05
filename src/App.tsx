import {
  Box,
  ChakraProvider,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { DynamicTable } from "./components/DynamicTable";
import RequestUrl from "./components/RequestUrl";
import useApiRequestStore from "./store/api-request";
import LeftSideBar from "./components/LeftSideBar";
import WorkSpaceTabs from "./components/WorkSpaceTabs";

function App() {
  const {
    params,
    setParamsIndex,
    paramChangingMode,
    deleteParam,
    deleteHeader,
    setHeaderIndex,
    headers,
    headerChangingMode,
  } = useApiRequestStore();
  return (
    <>
      <ChakraProvider>
        <Container maxW={"container.xl"}>
          <Heading color={"blue.500"} py={"2rem"} borderBottom={"1px solid #cecece"}>
            Api Agency
          </Heading>
          <Box display={"flex"}>
            <Box
              sx={{
                width: "450px",
                border: "1px solid #cecece",
                minHeight: "100vh",
                borderTop: "none",
              }}
            >
              <LeftSideBar />
            </Box>
            <Box style={{ width: "100%" }}>
              <WorkSpaceTabs />
              <Box style={{ padding: "0 10px" }}>
                <RequestUrl />
                <Tabs>
                  <TabList>
                    <Tab>Params</Tab>
                    <Tab>Headers</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <DynamicTable
                        title="Query Params"
                        onChange={setParamsIndex}
                        values={params}
                        valueMode={paramChangingMode}
                        deleteRow={deleteParam}
                      />
                    </TabPanel>
                    <TabPanel>
                      <DynamicTable
                        title="Headers"
                        onChange={setHeaderIndex}
                        values={headers}
                        valueMode={headerChangingMode}
                        deleteRow={deleteHeader}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Container>
      </ChakraProvider>
    </>
  );
}

export default App;
