"use client"
 import { UnicoSDK } from 'idpay-b2b-sdk/index.esm'

export default function Home() {

  const token = ""; // Inserir o token do response do processo
  const processId = ""; // Inserir o ProcessID do processo

  const Init = () => {
    UnicoSDK.init({
      env: 'uat', // Só irá ser preenchido se for ambiente de testes.
      token,
    });
  };

  const Open = () => {
    UnicoSDK.open({
      transactionId: processId,
      token: token,
      onFinish: onFinishCallback
    });
  };

  const onFinishCallback = process => {
    console.log('Process', process);
  }

  const Close = () => {

    UnicoSDK.close();

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