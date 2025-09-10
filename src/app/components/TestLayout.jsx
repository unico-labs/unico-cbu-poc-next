import Image from 'next/image';
import BackButton from './BackButton';
import logoHome from '../assets/logo-home.svg';

export default function TestLayout({ title, description, children }) {
  return (
    <div className="test-screen">
      <div className="test-header">
        <BackButton />
        <Image src={logoHome} alt="Unico Logo" className="test-logo" />
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
