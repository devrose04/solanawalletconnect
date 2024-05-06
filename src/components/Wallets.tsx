import { VStack, Button, Image, Text } from "@chakra-ui/react";
import { WalletName } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

const Wallets = () => {
  const { select, wallets, publicKey, disconnect } = useWallet();
  const [walletName, setWalletName] = useState('')
  const selectWallet = (value : WalletName) => {
    console.log(value)
    setWalletName(value)
    select(value)
  }
  return !publicKey ? (
    <VStack gap={4}>
      {wallets.filter((wallet) => wallet.readyState === "Installed").length >
      0 ? (
        wallets
          .filter((wallet) => wallet.readyState === "Installed")
          .map((wallet) => (
            <Button
              key={wallet.adapter.name}
              onClick={() => selectWallet(wallet.adapter.name)}
              w="64"
              size="lg"
              fontSize="md"
              leftIcon={
                <Image
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  h={6}
                  w={6}
                />
              }
            >
              {wallet.adapter.name}
            </Button>
          ))
      ) : (
        <Text>No wallet found. Please download a supported Solana wallet</Text>
      )}
    </VStack>
  ) : (
    <VStack gap={4}>
      <Text>{walletName} Wallet Connected</Text>
      <Text>{publicKey.toBase58()}</Text>
      <Button onClick={disconnect}>disconnect wallet</Button>
    </VStack>
  );
};

export default Wallets;
