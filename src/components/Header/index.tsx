/* eslint-disable import/no-unresolved */
import Image from 'next/image';
import Link from 'next/link';

import Logo from '../../../public/images/logo.svg';
import styles from './header.module.scss';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Header() {
  return (
    <header className={styles.headerComponete}>
      <Link href="/">
        <a>
          <Image src={Logo} alt="Logo" />
        </a>
      </Link>
    </header>
  );
}
