import { useRef, useEffect, useState } from "react";

import { useMediaQuery, UnorderedList, ListItem } from "@chakra-ui/react";

interface Props {
  isHeigher: boolean;
  isMobile: boolean;
}

const members: React.FC<Props> = ({ isHeigher, isMobile }) => {
  return (
    <>
      {!isMobile && (
        <UnorderedList
          color={"#9FCAD3"}
          position="absolute"
          top={
            isHeigher
              ? "calc(100vh - (100vh - 1094px) - 110px)"
              : "calc(100vh - 110px)"
          }
          left="20px"
          listStyleType={"none"}
        >
          Contract | Tina Lee Front-end | Siling Wang, Chou Yi Tao ART & UI |
          pupupupuisland
          <ListItem>Contract | Tina Lee</ListItem>
          <ListItem>Front-end | Siling Wang, Chou Yi Tao</ListItem>
          <ListItem>ART & UI | pupupupuisland</ListItem>
        </UnorderedList>
      )}
    </>
  );
};

export default members;
