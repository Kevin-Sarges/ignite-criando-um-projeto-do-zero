import LogoImg from '../../assets/Logo.svg';
import styles from './header.module.scss';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Header() {
  return (
    <header>
      <div className={styles.logo}>
        <img src={LogoImg} alt="Logo" />
      </div>
    </header>
  );
}
