import Link from 'next/link';

// import Logo from '../../../public';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.headerComponete}>
      <Link href="/">
        <a>
          <img src="./images/logo.png" alt="Logo" />
        </a>
      </Link>
    </header>
  );
}
