"use client";
import { useCallback, useState, useEffect } from "react";
import TestLayout from "../components/TestLayout";

export default function FullscreenTest() {
  const [transactionId, setTransactionId] = useState("");
  const [token, setToken] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
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
    
    console.log("*** STARTING SDK in FULLSCREEN mode ***");
    SDK.init({
      env: "uat",
      token,
    });
  };

  const onFinish = useCallback(
    (transaction) => {
      console.log(">>>>>> onFinish Fullscreen", transaction);
      setIsFullscreen(false);
    },
    []
  );

  const openFullscreen = () => {
    if (!SDK) return;
    
    console.log("*** OPENING SDK in FULLSCREEN ***");
    
    setIsFullscreen(true);
    
    setTimeout(() => {
      SDK.open({
        transactionId,
        token,
        onFinish,
      });
    }, 100);
  };

  return (
    <TestLayout
      title="Fullscreen Test"
      description="SDK taking up the entire browser screen"
    >
      <div className="test-header">
        {isFullscreen ? (
          <p className="fullscreen-hint">
            Fullscreen mode active - flow will close automatically when complete
          </p>
        ) : (
          <p className="fullscreen-ready">
            Fill in the fields below and click "Open Fullscreen" to start
          </p>
        )}
      </div>

      <div className={`test-controls ${isFullscreen ? 'hidden-in-fullscreen' : ''}`}>
        <div className="input-group">
          <label htmlFor="fullscreenTransactionId">Transaction ID:</label>
          <input
            id="fullscreenTransactionId"
            onChange={handleChangeTransactionId}
            placeholder="Enter the transaction ID"
            type="text"
            value={transactionId}
            className="test-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="fullscreenToken">Token:</label>
          <input
            id="fullscreenToken"
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
            className="action-button fullscreen-open-button"
            onClick={openFullscreen}
            disabled={!transactionId || !token || !SDK}
          >
            Open Fullscreen
          </button>
        </div>

        {!isFullscreen && (
          <div className="fullscreen-instructions">
            <p><strong>Instructions:</strong> Enter your Token and Transaction ID above, then click "Open Fullscreen" to start the SDK in full screen mode.</p>
          </div>
        )}
      </div>

      <div className="fullscreen-container">
        <div 
          id="unico_iframe" 
          className={`fullscreen-iframe ${isFullscreen ? 'fullscreen' : ''}`}
        >
          <div id="unico_iframe_embedded"></div>
        </div>
      </div>
    </TestLayout>
  );
}
