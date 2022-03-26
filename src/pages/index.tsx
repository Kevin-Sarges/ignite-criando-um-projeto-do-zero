/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
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
    <main className={styles.main}>
      {postsPagination.results.map(post => (
        <Link key={post.uid} href={`/post/${post.uid}`}>
          <a className={styles.container}>
            <h1>{post.data.title}</h1>

            <p>{post.data.subtitle}</p>

            <div className={styles.footerContainer}>
              <data className={commonStyles.infoPost}>
                <AiOutlineCalendar />
                <p>{post.first_publication_date}</p>
              </data>

              <div className={commonStyles.infoPost}>
                <AiOutlineUser />
                <p>{post.data.author}</p>
              </div>
            </div>
          </a>
        </Link>
      ))}

      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      {postsPagination.next_page !== null ? (
        <Link href="/">
          <a className={styles.next_page}>Carregar mais posts</a>
        </Link>
      ) : (
        ''
      )}
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts'),
  ]);

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  // console.log(results);

  const { next_page } = postsResponse;

  return {
    props: { postsPagination: { results, next_page } },
  };
};
