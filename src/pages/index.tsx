import { Button, Heading, VStack, useStatStyles } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useDisclosure, Modal, ModalBody, ModalOverlay, ModalHeader, ModalCloseButton, ModalFooter, ModalContent } from "@chakra-ui/react";
import WalletModal from "./WalletModal";

const home = "assets/home.jpg";
const RouteComponent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(true);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const mobileKeywords = ["iphone", "ipad", "android"];
    const isMobileDevice = mobileKeywords.some((keyword) =>
      userAgent.includes(keyword)
    );
    setIsMobile(isMobileDevice);
    if (window?.phantom?.solana?.isPhantom) setIsPhantomInstalled(true);
    else setIsPhantomInstalled(false);
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  const handleRedirect = () => {
    const deepLink = `phantom://browse/${window.location.origin}?ref=${window.location.origin}`; // Deep link for Phantom wallet
    // Attempt to open the wallet app
    window.location.href = deepLink;
  };

  // Redirect to Phantom wallet if on a mobile device
  useEffect(() => {
    if (isMobile && !isPhantomInstalled) {
      handleRedirect();
    }
  }, [isMobile, isPhantomInstalled]);

  return (
    <>
      {isMobile ? (
        <p>
          If the Phantom wallet is installed, this feature will redirect to the
          Phantom wallet deep link.
        </p>
      ) : (
        <p>This feature is only available on mobile devices.</p>
      )}
      <div className="image">
        <img src={home} alt="" />
      </div>
    </>
  );
};

const IndexPage: React.FC = () => {
  const [modalState, setModalState] = useState(false)
  const showModal = () => {
    setModalState(true)
  }

  return (
    <>
      <VStack gap={8} mt={16} >
        <WalletModal />
      </VStack>
      <RouteComponent />
    </>

  );
}
export default IndexPage