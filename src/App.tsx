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
          <Box display={"flex"}>
            <Box
              style={{
                width: "450px",
                border: "1px solid #cecece",
                minHeight: "100vh",
              }}
            >
              <LeftSideBar />
            </Box>
            <Box style={{ width: "100%", padding: "10px" }}>
              <Heading color={"tomato"} my={"2rem"}>
                Api Agency
              </Heading>
              <RequestUrl />
              <Tabs>
                <TabList>
                  <Tab>Params</Tab>
                  <Tab>Headers</Tab>
                  <Tab>Body</Tab>
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
        </Container>
      </ChakraProvider>
    </>
  );
}

export default App;
