import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

const id = ({
  repo,
  readme,
  languages,
  name,
}: {
  repo: {
    name: string;
    license?: { name: string };
    homepage: string;
    html_url: string;
    updated_at: number;
  };
  languages: { [key: string]: number };
  readme: string;
  name: string;
}) => (
  <div>
    <Head>
      <meta name="description" content={`${name}'s ${repo.name}`} />
      <title>{repo.name}</title>
    </Head>
    <div className="paper">
      <h1>Name: {repo.name}</h1>
      <p>
        Language{Object.keys(languages).length > 1 && "s"}:{" "}
        {Object.keys(languages)
          .slice(0, 3)
          .map(
            (language) =>
              `${language}: 
              (${(
                (languages[language] /
                  Object.keys(languages).reduce<number>(
                    (prev, key) => prev + languages[key],
                    0
                  )) *
                100
              ).toPrecision(3)}%)`
          )
          .join(", ")}
      </p>
      <p>License: {repo.license ? repo.license.name : "None"}</p>
      <p>
        Homepage:{" "}
        {repo.homepage ? (
          <Link href={repo.homepage}>
            <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
              {repo.homepage}
            </a>
          </Link>
        ) : (
          "None"
        )}
      </p>
      <p>Last Modified: {new Date(repo.updated_at).toDateString()}</p>
      <p>
        Link:{" "}
        <Link href={repo.html_url}>
          <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
            {repo.html_url}
          </a>
        </Link>
      </p>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: readme }} />
    </div>
  </div>
);

export default id;

export const getStaticPaths: GetStaticPaths = async () => {
  const { login } = await (
    await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();

  const repos = (
    await (
      await fetch("https://api.github.com/user/repos", {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
        },
      })
    ).json()
  ).filter((repo) => repo.owner.login === login && !repo.private);
  return {
    paths: repos.map((repo) => ({ params: { name: repo.name } })),
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const { name, login } = await (
    await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();

  const repo = await (
    await fetch(
      `https://api.github.com/repos/${login}/${context.params.name}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
        },
      }
    )
  ).json();

  const readmeData = await (
    await fetch(repo.contents_url.replace("{+path}", "README.md"), {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();
  let readme = "";
  if (readmeData.download_url) {
    const readmeFile = await (
      await fetch(readmeData.download_url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
        },
      })
    ).text();
    readme = await (
      await fetch("https://api.github.com/markdown", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          text: readmeFile,
        }),
      })
    ).text();
  }

  const languages = await (
    await fetch(repo.languages_url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();

  return {
    props: {
      repo,
      readme,
      languages,
      name,
    },
    revalidate: 10 * 60 * 60,
  };
};

export const config = {
  unstable_runtimeJS: false,
};
