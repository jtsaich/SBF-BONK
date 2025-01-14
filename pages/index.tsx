import type { GetStaticPropsContext, NextPage } from "next";
import styles from "../styles/Home.module.css";
import Background from "../public/background.png";
import Cz from "../public/cz.png";
import Sbf from "../public/sbf.png";
import Nav from "../components/Nav";
import { useRef, useEffect, useState } from "react";
import useBalanceOf from "../hooks/useBalanceOf";
import useNFTMint from "../hooks/useNFTMint";
import {
  Container,
  Box,
  Button,
  useMediaQuery,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Members from "../components/Members";
import MobileInstru from "../components/MobileInstru";
import TrxStatus from "../components/TrxStatus";
import TrxLink from "../components/TrxLink";
import Title from "../components/Title";
import ComRiskSpread from "../components/ComRiskSpread";
import ComKeyManage from "../components/ComKeyManage";
import ComTransparency from "../components/ComTransparency";
import ComManagement from "../components/ComManagement";
import ComAudit from "../components/ComAudit";
import ComDecen from "../components/ComDecen";
import useMouseEvent from "../hooks/useMouseEvent";
import useSWR from "swr";
import React from "react";
import useNFTTransfer from "../hooks/useNFTTransfer";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  // language hooks
  const t = useTranslations("Index");
  // index page content
  const czRef = useRef<HTMLImageElement>(null);
  const sbfRef = useRef<HTMLImageElement>(null);
  const batRef = useRef<HTMLImageElement>(null);
  const bonkRef = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { mouseDown, mouseUp } = useMouseEvent(
    czRef,
    sbfRef,
    batRef,
    bonkRef,
    isMobile
  );

  // analytics
  // const data = useSWR("/api/cookies", fetcher);
  // console.log(data)

  const { balanceOf, refetchBalanceOf } = useBalanceOf();

  // Mint
  const { freeMintAsync, isConnected } = useNFTMint();
  const { transferAsync, transferFrom } = useNFTTransfer();
  const [status, setStatus] = useState("done!");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGift, setIsLoadingGift] = useState(false);
  const toast = useToast();
  const [bonkText, setBonkText] = useState("Bonk");

  const handleClick = async () => {
    if (count < 111) {
      setCount(count + 1);
    }
    if (count == 110) {
      setBonkText("MINT");
      setCount(111);
    }
    if (count == 111) {
      if (isConnected == false) {
        window.alert("請先連結錢包");
      } else {
        // 有連結錢包後才能執行 mint
        try {
          setIsLoading(true);
          setStatus("Minting...");
          let freeMintTx = await freeMintAsync?.();
          await freeMintTx?.wait();
          setLink(`https://etherscan.io/tx/${freeMintTx?.hash}`);
          setCount(0);
          setIsLoading(false);
          toast({
            title: "Minted!",
            position: "bottom-right",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
        } catch (error) {
          setStatus("Error, please try again.");
          setIsLoading(false);
        }
      }
    }
  };

  const handleClickGift = async () => {
    if (isConnected == false) {
      window.alert("請先連結錢包");
    } else {
      // 有連結錢包後才能執行 mint
      const to = window.prompt("Gifting to address", "0x0");
      if (!to) {
        return;
      }

      try {
        setIsLoadingGift(true);
        let transferTx = await transferAsync?.({
          recklesslySetUnpreparedArgs: [transferFrom, to, 0, 1, "0x00"],
        });
        await transferTx?.wait();
        refetchBalanceOf();
        setLink(`https://etherscan.io/tx/${transferTx?.hash}`);
        setIsLoadingGift(false);
        toast({
          title: "Gifted!",
          position: "bottom-right",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      } catch (error) {
        setStatus("Error, please try again.");
        setIsLoading(false);
      }
    }
  };

  const [isH, setIsH] = useState(false);
  const [height, setHeight] = useState(
    typeof window === "undefined" ? 0 : window.innerHeight
  );
  useEffect(() => {
    if (height >= 1094) {
      setIsH(true);
    }
  }, []);

  // mobile - click on screen
  if (typeof window !== "undefined" && isMobile) {
    document.body.addEventListener("touchstart", mouseDown, true);
    document.body.addEventListener("touchend", mouseUp, true);
  }

  return (
    <>
      <Container
        maxW="1440px"
        overflow="hidden"
        left={isMobile ? "0" : "0"}
        position={isMobile ? "relative" : "relative"}
        p={"0"}
        centerContent
        mt={isH ? "0" : isMobile ? "0" : "-100px"}
      >
        {!isMobile && <Nav isHeigher={isH} />}
        <Box
          bgImage={`url(${Background.src})`}
          w="1944px"
          h="1094px"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          pos="relative"
          mt={isMobile ? "-250px" : "-70px"}
          backgroundSize={isMobile ? "70%" : "unset"}
        >
          <Title isMobile={isMobile} />

          {/* -----↓↓↓↓ warnings ↓↓↓↓-----  */}
          <ComRiskSpread />
          <ComKeyManage />
          <ComTransparency />
          <ComManagement />
          <ComAudit />
          <ComDecen isMobile={isMobile} />
          {/* -----↑↑↑↑ warnings ↑↑↑↑-----  */}

          <Image src={Cz.src} alt="CZ" className={styles["cz"]} ref={czRef} />
          <Image
            src={Sbf.src}
            alt="SBF"
            className={styles["sbf"]}
            ref={sbfRef}
          />
          <Box className={styles["batWrapper"]} ref={batRef} />
          {/* BONK BUTTON */}
          {isMobile || (
            <Box
              position="absolute"
              display="flex"
              flexDir="column"
              gap="16px"
              zIndex="10"
              top={
                isH
                  ? "calc(100vh - (100vh - 994px) - 137px)"
                  : "calc(100vh - (100vh - 994px) - 5px - 155px) "
              }
              left={"calc(50% - 200px / 2)"}
            >
              <Button
                w="200px"
                height="50px"
                fontSize="30px"
                color="#07839E"
                borderRadius="38.5px"
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                className={styles["bonkButton"]}
                ref={bonkRef}
                onClick={handleClick}
                isLoading={isLoading}
                _hover={{ color: "#ffffff", backgroundColor: "#07839E" }}
                isDisabled={balanceOf?.gt(1)}
              >
                {bonkText}
              </Button>
              <Button
                w="200px"
                height="50px"
                fontSize="30px"
                color="#07839E"
                borderRadius="38.5px"
                className={styles["bonkButton"]}
                onClick={handleClickGift}
                isLoading={isLoadingGift}
                _hover={{ color: "#ffffff", backgroundColor: "#07839E" }}
                isDisabled={balanceOf?.lte(0)}
              >
                Gift
              </Button>
            </Box>
          )}
          {/* Transaction Status */}
          <TrxStatus
            status={status}
            count={count}
            isMobile={isMobile}
            isHeigher={isH}
          />
          {/* Transaction Link */}
          <TrxLink link={link} isHeigher={isH} />
          <MobileInstru
            balanceOf={balanceOf?.toString() || "0"}
            count={count}
            isHeigher={isH}
            isMobile={isMobile}
          />
        </Box>
        <Members isHeigher={isH} isMobile={isMobile} />
      </Container>
    </>
  );
};

export default Home;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../public/locales/${locale}.json`)).default,
    },
  };
}
