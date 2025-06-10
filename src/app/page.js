"use client";
import { ByUnicoSDK } from "idpay-b2b-sdk";

export default function Home() {
  const token = ""; // Inserir o token do response do processo
  const processId = ""; // Inserir o ProcessID do processo

  const Init = () => {
    ByUnicoSDK.init({
      env: "uat", // Só irá ser preenchido se for ambiente de testes.
      token,
    });
  };

  const Open = () => {
    ByUnicoSDK.open({
      transactionId: processId,
      token: token,
      onFinish: onFinishCallback,
    });
  };

  const onFinishCallback = (process) => {
    console.log("Process", process);
  };

  const Close = () => {
    ByUnicoSDK.close();
  };

  return (
    <main className="container">
      <img src="/next.svg" alt="Next.js Logo" className="logo" />
      <h1>Unico POC CBU</h1>
      <div className="botoes">
        <button onClick={Init}>Init</button>
        <button onClick={Open}>Open</button>
        <button onClick={Close}>Close</button>
      </div>
      <div id="master-div" className="iframe-container">
        <div id="unico_iframe_embedded"></div>
      </div>
    </main>
  );
}
