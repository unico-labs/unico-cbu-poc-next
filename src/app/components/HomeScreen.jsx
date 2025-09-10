import Link from 'next/link';
import Image from 'next/image';
import logoHome from '../assets/logo-home.svg';

export default function HomeScreen() {
  return (
    <div className="home-screen">
      <div className="home-header">
        <Image src={logoHome} alt="Unico Logo" className="unico-logo" />
        <h1 className="home-title">Unico PoC By Unico - Next.js</h1>
        <p className="home-subtitle">
          Choose the display mode to test the Unico SDK integration
        </p>
      </div>

      <div className="mode-selection">
        <Link href="/modal" className="mode-button modal-button">
          <div className="button-icon">🪟</div>
          <h3>Modal Test</h3>
          <p>SDK displayed in overlay modal on page</p>
        </Link>

        <Link href="/fullscreen" className="mode-button fullscreen-button">
          <div className="button-icon">📺</div>
          <h3>Fullscreen Test</h3>
          <p>SDK taking up the entire browser screen</p>
        </Link>

        <Link href="/iframe" className="mode-button iframe-button">
          <div className="button-icon">🖼️</div>
          <h3>Iframe Box Test</h3>
          <p>SDK embedded in a box on the page</p>
        </Link>
      </div>

      <footer className="home-footer">
        <div className="footer-content">
          <p>
            For detailed implementation guide, visit our{' '}
            <a 
              href="https://devcenter.unico.io/idcloud/integracao/integracao-by-unico/controlando-a-experiencia/sdk#como-comecar"
              target="_blank"
              rel="noopener noreferrer"
              className="documentation-link"
            >
              Official Documentation
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
