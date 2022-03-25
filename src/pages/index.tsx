/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import Prismic from '@prismicio/client';

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
  // console.log('Array lógo abaixo  \n');
  // console.log(JSON.stringify(postsPagination, null, 2));

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
      ) : null}
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts'),
  ]);

  // console.log(postsResponse);

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(
        post.last_publication_date
      ).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  // console.log(JSON.stringify(results, null, 2));

  const { next_page } = postsResponse;

  // console.log(next_page);

  return {
    props: { postsPagination: { results, next_page } },
  };
};
