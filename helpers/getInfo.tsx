export const getInfo = async () => {
  const repos_urls = [];
  const {
    name,
    login,
    organizations_url,
    repos_url: selfReposUrl,
  } = await (
    await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();
  repos_urls.push({ login, repos_url: selfReposUrl });
  (
    await (
      await fetch(organizations_url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
        },
      })
    ).json()
  ).map((org) =>
    repos_urls.push({ login: org.login, repos_url: org.repos_url })
  );

  return {
    name,
    login,
    repos: (
      await Promise.all<basicRepo[][]>(
        await Promise.all(
          repos_urls.map(async ({ repos_url }) =>
            (
              await fetch(repos_url, {
                headers: {
                  Accept: "application/vnd.github.v3+json",
                  Authorization: `Token ${process.env.PAT}`,
                },
              })
            ).json()
          )
        )
      )
    )
      .map((repos_lists, index) =>
        repos_lists.filter(
          (repo) =>
            repo.owner.login === repos_urls[index].login &&
            !repo.private &&
            repo.name !== login &&
            process.env.ORDER.split(" ").includes(repo.name)
        )
      )
      .flat(),
  };
};

export const getRepoInfo = async ({
  url,
}: {
  url: string;
}): Promise<{
  repo: fullRepo;
  readme: string;
  languages: string[];
}> => {
  const repo = await (
    await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
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
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
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
  const validLanguages = Object.entries<number>(languages)
    .filter(([key, value]) => value / total > 0.05)
    .slice(0, 3)
    .map(
      ([key, value]) => `${key}: ${((value / total) * 100).toPrecision(3)}%`
    );
  return { repo, readme, languages: validLanguages };
};

export type basicRepo = {
  private: boolean;
  owner: { login: string };
  languages_url: string;
  id: number;
  name: string;
  url: string;
};

export type fullRepo = {
  name: string;
  license?: { name: string };
  homepage: string;
  html_url: string;
  updated_at: number;
};
