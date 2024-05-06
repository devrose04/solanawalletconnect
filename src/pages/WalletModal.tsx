import { Button, Heading, VStack, useStatStyles } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useDisclosure, Modal, ModalBody, ModalOverlay, ModalHeader, ModalCloseButton, ModalFooter, ModalContent } from "@chakra-ui/react";

const Wallets = dynamic(() => import("../components/Wallets"), { ssr: false });

const WalletModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {/* <Heading>Connect Solana Wallet </Heading> */}
      <Button onClick={onOpen}>Connect Wallet</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Wallets />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  );
}
export default WalletModal