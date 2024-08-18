import {
  Box,
  Button,
  forwardRef,
  Icon,
  TabList,
  Tabs,
  Text,
  useMultiStyleConfig,
  useTab,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { BiCollection } from "react-icons/bi";

const tabs = [
  {
    id: 1,
    name: "Get Todo",
    type: "request",
    method: "GET",
  },
  {
    id: 2,
    name: "MCC Manulife",
    type: "collections",
  },
];

const TabIcon = ({ type, method = "" }) => {
  switch (type) {
    case "request":
      return (
        <Text fontWeight={"bold"} color={"green.500"} mr={"10px"}>
          {method}
        </Text>
      );
    case "collections":
      return (
        <Icon as={BiCollection} boxSize={4} mr={"10px"} cursor="pointer" />
      );
  }
};

const CustomTab = forwardRef((props, ref) => {
  // 1. Reuse the `useTab` hook
  const tabProps = useTab({ ...props, ref });
//   const isSelected = !!tabProps["aria-selected"];

  // 2. Hook into the Tabs `size`, `variant`, props
  const styles = useMultiStyleConfig("Tabs", tabProps);

  return (
    <Button
      __css={{ ...styles.tab }}
      {...tabProps}
    >
      {tabProps.children}
    </Button>
  );
});

function WorkSpaceTabs() {
  return (
    <Box mb={"15px"}>
      <Tabs>
        <TabList>
          {tabs.map((tab) => (
            <CustomTab padding={"0px 30px 8px 30px"} key={tab.id}>
              <Box display={"flex"} alignItems={"center"}>
                <TabIcon type={tab.type} method={tab.method} />
                <Text>{tab.name}</Text>
              </Box>
            </CustomTab>
          ))}
          <Box display={"flex"} alignItems={"center"} paddingLeft={"15px"}>
            <Icon as={FaPlus} boxSize={4} cursor="pointer" />
          </Box>
        </TabList>
      </Tabs>
    </Box>
  );
}

export default WorkSpaceTabs;
