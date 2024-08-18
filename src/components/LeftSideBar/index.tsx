import useLeftSideBarStore from "../../store/left-side-bar";

const LeftSideBar = () => {
  const { collections } = useLeftSideBarStore();
  console.log("collections: ", collections);
  return <></>;
};

export default LeftSideBar;
