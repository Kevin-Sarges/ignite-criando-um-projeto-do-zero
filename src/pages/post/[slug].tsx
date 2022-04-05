/* eslint-disable no-param-reassign */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticPaths, GetStaticProps } from 'next';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Prismic from '@prismicio/client';

import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const totalwords = post.data.content.reduce((total, contentItem) => {
    total += contentItem.heading.split(' ').length;

    const words = contentItem.body.map(item => item.text.split(' ').length);
    // eslint-disable-next-line no-return-assign
    words.map(word => (total += word));

    return total;
  }, 0);

  const time = Math.ceil(totalwords / 200);
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <Head>
        <title>{`${post.data.title} | Post`}</title>
      </Head>

      <main className={styles.componente}>
        <img
          className={styles.imagePost}
          src={post.data.banner.url}
          alt="ImagePost"
        />

        <div className={styles.contentPost}>
          <h1>{post.data.title}</h1>

          <ul className={styles.descriptionPost}>
            <li className={commonStyles.infoPost}>
              <AiOutlineCalendar />
              {post.first_publication_date}
            </li>

            <li className={commonStyles.infoPost}>
              <AiOutlineUser />
              {post.data.author}
            </li>

            <li className={commonStyles.infoPost}>
              <BiTimeFive />
              {`${time} min`}
            </li>
          </ul>

          {post.data.content.map(content => (
            <article key={post.uid} className={styles.contentPost}>
              <h2>{content.heading}</h2>

              <div
                key={post.uid}
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body),
                }}
              />
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();

  const posts = await prismic.query([
    Prismic.predicates.at('document.type', 'posts'),
  ]);

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  // console.log(paths);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID<any>('posts', String(slug), {});

  const post = {
    uid: slug,
    first_publication_date: format(
      new Date(response.first_publication_date),
      'dd MMM yyyy',
      { locale: ptBR }
    ),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  // console.log(post);

  return {
    props: {
      post,
    },
  };
};
