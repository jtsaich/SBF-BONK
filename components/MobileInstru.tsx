import { Text, Stack, Box } from "@chakra-ui/react";
import { FaVolumeUp } from "react-icons/fa";
interface Props {
  count: number;
  isHeigher: boolean;
  isMobile: boolean;
}
const MobileInstru: React.FC<Props> = ({ count, isHeigher, isMobile }) => {
  return (
    <>
      {!isMobile ? (
        count < 111 && (
          <Text
            position="absolute"
            fontSize="30px"
            top={
              isHeigher
                ? "calc(100vh - (100vh - 1094px) - 74px)"
                : "calc(100vh -  (100vh - 1094px) - 26px - 74px)"
            }
            left="50%"
            transform="translateX(-50%)"
            color="#ffffff"
          >
            {count} / 111
          </Text>
        )
      ) : (
        <Stack
          position="absolute"
          fontSize="20px"
          top="calc( 100vh + 68px)"
          left="50%"
          transform="translateX(-50%)"
          color="#9FCAD3"
        >
          <Text align="center">Click to BONK</Text>
          <Box
            position={"absolute"}
            right={"35px"}
            top={"-15px"}
            transform={"rotate(-25deg)"}
          >
            <FaVolumeUp color="#9FCAD3" />
          </Box>
          <Text align="center">*Use PC for full experience</Text>
        </Stack>
      )}
    </>
  );
};
export default MobileInstru;
