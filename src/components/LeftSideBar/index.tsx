import {
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import Box from "@mui/material/Box";
import { TreeItem } from "@mui/x-tree-view";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import useLeftSideBarStore from "../../store/left-side-bar";
const NestedNode = ({ id, name, children = [] }) => {
  return (
    <TreeItem itemId={id} label={name}>
      {children.map((child, index) => (
        <NestedNode key={index + child.id} {...child} />
      ))}
    </TreeItem>
  );
};
export default function LeftSideBar() {
  const { collections } = useLeftSideBarStore();

  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <InputGroup size="sm" mb={1}>
        <InputLeftAddon cursor="pointer">
          <Icon as={FaPlus} boxSize={5} />
        </InputLeftAddon>
        <InputGroup size="sm" mb={1}>
          <Input borderRadius={0} size={"sm"} />
          <InputRightElement cursor="pointer">
            <Icon as={CiSearch} boxSize={5} />
          </InputRightElement>
        </InputGroup>
        <InputRightAddon cursor="pointer">
          <Icon as={IoIosMore} boxSize={5} />
        </InputRightAddon>
      </InputGroup>
      <SimpleTreeView>
        {collections.map((item, index) => (
          <NestedNode
            key={index + item.id}
            id={item.id}
            name={item.name}
            children={item.children}
          />
        ))}
      </SimpleTreeView>
    </Box>
  );
}
