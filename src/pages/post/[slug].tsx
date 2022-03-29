/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { asHTML } from '@prismicio/helpers';

import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Post({ post }: PostProps) {
  return (
    <main className={styles.componente}>
      <div className={styles.imagePost}>
        <Image
          src={post.data.banner.url}
          alt="ImagePost"
          width="1350px"
          height="450px"
          objectFit="cover"
        />
      </div>

      <div className={styles.contentPost}>
        <h1>{post.data.title}</h1>

        <div className={styles.descriptionPost}>
          <data className={commonStyles.infoPost}>
            <AiOutlineCalendar />
            <p>{post.first_publication_date}</p>
          </data>

          <div className={commonStyles.infoPost}>
            <AiOutlineUser />
            <p>{post.data.author}</p>
          </div>

          <div className={commonStyles.infoPost}>
            <BiTimeFive />
            <p>4 min</p>
          </div>
        </div>

        {/* <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post.data.content }}
        className={styles.contentPost}
      /> */}
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();

  // const posts = await prismic.query([
  //   Prismic.predicates.at('document.type', 'posts'),
  // ]);

  // console.log(posts);

  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
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
      content: asHTML(response.data.content),
    },
  };

  // console.log(JSON.stringify(post, null, 2));

  return {
    props: {
      post,
    },
  };
};
