import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
import { NextIntlProvider } from "next-intl";
import { useEffect } from "react";
import ReactGA from "react-ga";
import Head from "next/head";
import { GoogleTagManager } from "../components/GoogleTagManager";
import { GOOGLE_TAG_MANAGER_ID } from "../libs/googleTagManager";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    // chain.goerli,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.goerli]
      : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: "yourAlchemyApiKey",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    if (
      process.env.googleAnalyticsID &&
      process.env.NODE_ENV === "production"
    ) {
      // Checks for GA ID and only turns on GA in production
      ReactGA.initialize(process.env.googleAnalyticsID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  });
  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          theme={lightTheme({
            accentColor: "#169bb4",
          })}
        >
          <NextIntlProvider messages={pageProps.messages}>
            <Head>
              <link rel="icon" type="image/jpg" href="/favicon.ico" />
            </Head>
            <GoogleTagManager />
            <Component {...pageProps} />
          </NextIntlProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
