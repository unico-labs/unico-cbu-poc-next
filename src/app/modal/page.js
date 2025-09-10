"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import TestLayout from "../components/TestLayout";

// Dynamic import do SDK para evitar problemas de SSR
const ByUnicoSDK = dynamic(
  () => import("idpay-b2b-sdk").then((mod) => ({ default: mod.ByUnicoSDK })),
  { ssr: false }
);

export default function ModalTest() {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [token, setToken] = useState("");
  const [iframeKey, setIframeKey] = useState(0);
  const [sdkInitialized, setSdkInitialized] = useState(false);
  const [SDK, setSDK] = useState(null);

  const unicoIframeRef = useRef(null);

  // Dynamic loading do SDK
  useEffect(() => {
    import("idpay-b2b-sdk").then(({ ByUnicoSDK }) => {
      setSDK(ByUnicoSDK);
    });
  }, []);

  const closeByUnicoSDKSession = useCallback(() => {
    if (!sdkInitialized || !SDK) {
      console.log("*** SDK not initialized yet, skipping close ***");
      return;
    }

    console.log("*** EXECUTING closeByUnicoSDKSession ***");
    try {
      if (SDK && typeof SDK.close === "function") {
        console.log("*** CALLING ByUnicoSDK.close() ***");
        SDK.close();
        console.log("ByUnicoSDK session closed successfully.");
        setSdkInitialized(false);
      } else {
        console.warn("ByUnicoSDK.close method not available, skipping close.");
      }
    } catch (e) {
      console.error("Error closing ByUnicoSDK session:", e);
    }
  }, [sdkInitialized, SDK]);

  const handleCloseModal = useCallback(() => {
    console.log("*** CLOSING MODAL - starting cleanup process ***");
    setShowModal(false);
    closeByUnicoSDKSession();
    setIframeKey((prevKey) => prevKey + 1);
  }, [closeByUnicoSDKSession]);

  const onFinishSdk = useCallback((result) => {
    console.log("Finish SDK:", result);
    console.log("*** SDK FINISHED - closing modal automatically ***");
    handleCloseModal();
  }, [handleCloseModal]);

  const initializeAndOpenByUnicoSDK = useCallback(() => {
    if (!unicoIframeRef.current || !SDK) {
      console.warn("SDK or iframe ref not ready.");
      return;
    }

    const startInitialization = () => {
      console.log("*** STARTING ByUnicoSDK... ***");
      SDK.init({
        type: "IFRAME",
        env: "uat",
        token,
        element: unicoIframeRef.current,
      });

      setSdkInitialized(true);

      setTimeout(() => {
        console.log("*** OPENING ByUnicoSDK after 0.5s delay... ***");
        SDK.open({
          transactionId,
          token,
          onFinish: onFinishSdk,
        });
      }, 500);
    };

    if (sdkInitialized) {
      console.log("*** SDK already initialized, closing previous session ***");
      closeByUnicoSDKSession();
      setTimeout(startInitialization, 200);
    } else {
      startInitialization();
    }
  }, [token, transactionId, onFinishSdk, closeByUnicoSDKSession, sdkInitialized, SDK]);

  const handleOpenModal = () => {
    setError("");

    if (!token.trim()) {
      setError("Error: Token is required");
      return;
    }
    if (!transactionId.trim()) {
      setError("Error: Transaction ID is required");
      return;
    }

    setShowModal(true);
  };

  useEffect(() => {
    if (showModal && unicoIframeRef.current && SDK) {
      console.log("Modal is visible and SDK is ready. Initializing...");
      initializeAndOpenByUnicoSDK();
    }
  }, [showModal, unicoIframeRef.current, SDK, initializeAndOpenByUnicoSDK]);

  const handleChangeTransactionId = (evt) => {
    setError("");
    setTransactionId(evt.target.value);
  };

  const handleChangeToken = (evt) => {
    setError("");
    setToken(evt.target.value);
  };

  return (
    <TestLayout
      title="Modal Test"
      description="SDK displayed in overlay modal on page"
    >
      <div className="test-controls">
        <div className="input-group">
          <label htmlFor="modalTransactionId">Transaction ID:</label>
          <input
            id="modalTransactionId"
            onChange={handleChangeTransactionId}
            placeholder="Enter the transaction ID"
            type="text"
            value={transactionId}
            className={`test-input ${
              error.includes("Transaction ID") ? "error" : ""
            }`}
          />
        </div>

        <div className="input-group">
          <label htmlFor="modalToken">Token:</label>
          <input
            id="modalToken"
            onChange={handleChangeToken}
            placeholder="Enter the token"
            type="text"
            value={token}
            className={`test-input ${error.includes("Token") ? "error" : ""}`}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button
            className="action-button modal-open-button"
            onClick={handleOpenModal}
            disabled={!transactionId || !token}
          >
            Open SDK in Modal
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={handleCloseModal}>
              ×
            </button>
            <div className="modal-iframe-wrapper">
              <div
                id="unico_iframe_embedded"
                ref={unicoIframeRef}
                key={iframeKey}
              ></div>
            </div>
          </div>
        </div>
      )}
    </TestLayout>
  );
}
