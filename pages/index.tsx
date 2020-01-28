import fetch from "isomorphic-unfetch";
import { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";

type Show = {
  id: string;
  name: string;
};

const ShowLink = ({ show: { id, name } }: { show: Show }) => (
  <li key={id}>
    <Link href="/p/[id]" as={`/p/${id}`}>
      <a>{name}</a>
    </Link>
    <style jsx>
      {`
        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
          font-family: "Arial";
        }

        a:hover {
          opacity: 0.6;
        }
      `}
    </style>
  </li>
);

const Index: NextPage<{ shows: Show[]; userAgent?: string }> = ({
  shows,
  userAgent
}) => (
  <Layout>
    <h1>Batman TV Shows - {userAgent}</h1>
    <ul>
      {shows.map(show => (
        <ShowLink show={show} />
      ))}
    </ul>
    <style jsx>{`
      h1,
      a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }
    `}</style>
  </Layout>
);

Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map((entry: { show: Show }) => entry.show),
    userAgent
  };
};

export default Index;
