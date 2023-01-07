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
    name: name,
    repos: (
      await Promise.all<repo[][]>(
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
            repo.name !== login
        )
      )
      .flat(),
  };
};

export type repo = {
  private: boolean;
  owner: { login: string };
  languages_url: string;
  id: number;
  name: string;
};
