/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import { GetStaticProps } from 'next';
import Link from 'next/link';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';

// import { getPrismicClient } from '../services/prismic';

// import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Home({ postsPagination }: HomeProps) {
  return (
    <main>
      <div className={styles.container}>
        <h1>Como utilizar Hooks</h1>

        <p>Pensando em sincronização em vez de ciclos de vida.</p>

        <div className={styles.footerContainer}>
          <data>
            <AiOutlineCalendar />
            <p>15 Mar 2021</p>
          </data>

          <div className={styles.user}>
            <AiOutlineUser />
            <p>Joseph Oliveira</p>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <h1>Como utilizar Hooks</h1>

        <p>Pensando em sincronização em vez de ciclos de vida.</p>

        <div className={styles.footerContainer}>
          <data>
            <AiOutlineCalendar />
            <p>15 Mar 2021</p>
          </data>

          <div className={styles.user}>
            <AiOutlineUser />
            <p>Joseph Oliveira</p>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <h1>Como utilizar Hooks</h1>

        <p>
          Tudo sobre como criar a sua primeira aplicação utilizando Create React
          App.
        </p>

        <div className={styles.footerContainer}>
          <data>
            <AiOutlineCalendar />
            <p>15 Mar 2021</p>
          </data>

          <div className={styles.user}>
            <AiOutlineUser />
            <p>Joseph Oliveira</p>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <h1>Como utilizar Hooks</h1>

        <p>Pensando em sincronização em vez de ciclos de vida.</p>

        <div className={styles.footerContainer}>
          <data>
            <AiOutlineCalendar />
            <p>15 Mar 2021</p>
          </data>

          <div className={styles.user}>
            <AiOutlineUser />
            <p>Joseph Oliveira</p>
          </div>
        </div>
      </div>

      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link href="#">
        <a>Carregar mais posts</a>
      </Link>
    </main>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
