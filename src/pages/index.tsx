/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Link from 'next/link';
import next, { GetStaticProps } from 'next';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useState } from 'react';
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
  const postFormatted = postsPagination.results.map(post => {
    return {
      ...post,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
    };
  });

  const [posts, setPost] = useState<Post[]>(postFormatted);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [currentPage, setCurrentPage] = useState(1);

  async function handleNextPage(): Promise<void> {
    if (currentPage !== 1 && nextPage === null) {
      return;
    }

    const postsResults = await fetch(`${nextPage}`).then(res => res.json());

    setNextPage(postsResults.next_page);
    setCurrentPage(postsResults.page);

    const newPost = postsResults.results.map(post => {
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

    setPost([...posts, ...newPost]);
  }

  return (
    <main className={styles.main}>
      {posts.map(post => (
        <Link key={post.uid} href={`/post/${post.uid}`}>
          <a className={styles.container}>
            <h1>{post.data.title}</h1>

            <p>{post.data.subtitle}</p>

            <ul className={styles.footerContainer}>
              <li className={commonStyles.infoPost}>
                <AiOutlineCalendar />
                <p>{post.first_publication_date}</p>
              </li>

              <li className={commonStyles.infoPost}>
                <AiOutlineUser />
                <p>{post.data.author}</p>
              </li>
            </ul>
          </a>
        </Link>
      ))}

      {nextPage && (
        <button className={styles.next_page} onClick={handleNextPage}>
          Carregar mais posts
        </button>
      )}
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
    }
  );

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  // console.log(postsResponse.next_page);

  const { next_page } = postsResponse;

  return {
    props: { postsPagination: { results, next_page } },
  };
};
