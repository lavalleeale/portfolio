import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

const id = ({
  repo,
  readme,
  total,
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
  total: number;
  languages: { [key: string]: number };
  readme: string;
  name: string;
}) => (
  <div>
    <Head>
      <meta name="description" content={`${name}'s ${repo.name}`} />
      <title>{repo.name}</title>
    </Head>
    <div className="grid sm:grid-cols-4">
      <div className="paper col-span-3 hidden sm:block">
        {/* eslint-disable-next-line react/no-danger */}
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: readme }}
        />
      </div>
      <div className="paper">
        <p className="inline-block mr-1">
          Language{Object.keys(languages).length > 1 && "s"}:
        </p>
        {Object.keys(languages)
          .slice(0, 3)
          .map((language) => (
            <p key={language} className="inline-block">
              {`${language}: ${(
                (languages[language] / total) *
                100
              ).toPrecision(3)}%`}
            </p>
          ))}
        <p>License: {repo.license ? repo.license.name : "None"}</p>
        <p>
          <span className="inline-block mr-1">Homepage: </span>
          {repo.homepage ? (
            <a
              href={repo.homepage}
              target="_blank"
              className="overflow-ellipsis block overflow-hidden underline text-blue-600 hover:text-blue-800"
              rel="noreferrer"
            >
              {repo.homepage}
            </a>
          ) : (
            "None"
          )}
        </p>
        <p className="mr-1">Last Modified: </p>{" "}
        <p>{new Date(repo.updated_at).toDateString()}</p>
        <p className="">
          Repository:{" "}
          <a
            href={repo.html_url}
            target="_blank"
            className="overflow-ellipsis block overflow-hidden underline text-blue-600 hover:text-blue-800"
            rel="noreferrer"
          >
            {repo.html_url}
          </a>
        </p>
      </div>
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

  const total: number = Object.values<number>(languages).reduce(
    (a, b) => a + b
  );
  const validLanguages = Object.fromEntries(
    Object.entries<number>(languages).filter(
      ([key, value]) => value / total > 0.05
    )
  );
  return {
    props: {
      repo,
      readme,
      total: Object.values<number>(validLanguages).reduce((a, b) => a + b),
      languages: validLanguages,
      name,
    },
    revalidate: 10 * 60 * 60,
  };
};

export const config = {
  unstable_runtimeJS: false,
};
