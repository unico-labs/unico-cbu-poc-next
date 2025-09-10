"use client";
import { useCallback, useState, useEffect } from "react";
import TestLayout from "../components/TestLayout";

export default function IframeTest() {
  const [transactionId, setTransactionId] = useState("");
  const [token, setToken] = useState("");
  const [SDK, setSDK] = useState(null);

  // Dynamic loading do SDK
  useEffect(() => {
    import("idpay-b2b-sdk").then(({ ByUnicoSDK }) => {
      setSDK(ByUnicoSDK);
    });
  }, []);

  const handleChangeTransactionId = (evt) => {
    setTransactionId(evt.target.value);
  };

  const handleChangeToken = (evt) => {
    setToken(evt.target.value);
  };

  const initIframe = () => {
    if (!SDK) return;
    
    SDK.init({
      env: "uat",
      token,
    });
  };

  const onFinish = useCallback(
    (transaction) => console.log(">>>>>> onFinish", transaction),
    []
  );

  const open = () => {
    if (!SDK) return;
    
    SDK.open({
      transactionId,
      token,
      onFinish,
    });
  };

  const close = () => {
    if (!SDK) return;
    
    SDK.close();
  };

  return (
    <TestLayout
      title="Iframe Box Test"
      description="SDK displayed in embedded iframe on the page"
    >
      <div className="test-controls">
        <div className="input-group">
          <label htmlFor="transactionId">Transaction ID:</label>
          <input
            id="transactionId"
            onChange={handleChangeTransactionId}
            placeholder="Enter the transaction ID"
            type="text"
            value={transactionId}
            className="test-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="token">Token:</label>
          <input
            id="token"
            onChange={handleChangeToken}
            placeholder="Enter the token"
            type="text"
            value={token}
            className="test-input"
          />
        </div>

        <div className="button-group">
          <button 
            data-testid="init" 
            className="action-button init-button" 
            onClick={initIframe}
            disabled={!token || !SDK}
          >
            Initialize SDK
          </button>
          <button 
            data-testid="open" 
            className="action-button open-button" 
            onClick={open}
            disabled={!transactionId || !token || !SDK}
          >
            Open Flow
          </button>
          <button 
            data-testid="close" 
            className="action-button close-button" 
            onClick={close}
            disabled={!SDK}
          >
            Close
          </button>
        </div>
      </div>

      <div className="iframe-container">
        <div id="unico_iframe" className="iframe">
          <div id="unico_iframe_embedded"></div>
        </div>
      </div>
    </TestLayout>
  );
}
