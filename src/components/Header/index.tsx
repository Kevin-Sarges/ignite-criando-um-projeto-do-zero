/* eslint-disable import/no-unresolved */
import Image from 'next/image';

import Logo from '../../../public/images/logo.svg';
import styles from './header.module.scss';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Header() {
  return (
    <header>
      <div className={styles.logo}>
        <Image src={Logo} alt="Logo" />
      </div>
    </header>
  );
}
