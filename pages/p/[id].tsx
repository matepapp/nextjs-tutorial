import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import Layout from "../../components/Layout";

type Props = {
  show: {
    name: string;
    summary: string;
    image?: { medium: string };
  };
};

const Post = ({ show: { name, summary, image } }: Props) => (
  <Layout>
    <h1>{name}</h1>
    <p>{summary.replace(/<[/]?[pb]>/g, "")}</p>
    {image ? <img src={image.medium} /> : null}
  </Layout>
);

Post.getInitialProps = async (context: NextPageContext) => {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;
