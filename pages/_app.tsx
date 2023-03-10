import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";


const { chains, provider, webSocketProvider } = configureChains(
  [
    // mainnet,
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [
    jsonRpcProvider({
      rpc: (chain: any) => {
        if (chain.id === 11155111) {
          return {
            http: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
          };
        } else {
          return chain.rpcUrls.default;
        }
      },
    }),
    publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'KnowYourCat categoryUI demo',
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
