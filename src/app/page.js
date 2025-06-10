"use client";
import { ByUnicoSDK } from "idpay-b2b-sdk";

export default function Home() {
  const token =
    "************************************.*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************.*************************************************************************************-*************************************-*****************-***********************************************************************************************-*******-*****************************************************************************************-******************-kACGwrhLKT1j7yHo3ZZ4j9dDLpNE9Anl2lz4UVO2ejBXT9QRUE2ZgO5yMTrT2QmlBAcOe07K3co0a7GyEn81g238TgliQIoCCcjIRoenIYv1j1yZvOTD3iqPk0DNBPCZbtFqZA4rpez4A3_RGFYW5jXXPGQtYyQBn8usogp_tCtGXJeyGKXjbJNxkWos7CMkiQYUA9vqhwj1caTp5AkaG7Qv8_JLoZGa2UOTHlyvspOdsn_XAriBmkB-q7cqwT9n9AMNsvdvT2RonICoU10BO3tN1PftzIrgWD94lArYFurdHslR8kC5-m4Dyq"; // Inserir o token do response do processo
  const processId = "392da0d1-a66c-4ee8-9829-a90c519ab439";

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
