import { fullRepo } from "../helpers/getInfo";

const Project = ({
  repo,
  readme,
  languages,
}: {
  repo: fullRepo;
  languages: string[];
  readme: string;
}) => {
  return (
    <div className="grid sm:grid-cols-4 gap-3">
      <div className="paper sm:col-span-3">
        {/* eslint-disable-next-line react/no-danger */}
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: readme }}
        />
      </div>
      <div className="paper hidden sm:block">
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
        <div>
          <p className="mr-1 inline-block">Last Modified: </p>{" "}
          <p className="inline-block">
            {new Date(repo.updated_at).toDateString()}
          </p>
        </div>
        <p>Repository: </p>
        <a
          href={repo.html_url}
          target="_blank"
          className="overflow-ellipsis block overflow-hidden underline text-blue-600 hover:text-blue-800"
          rel="noreferrer"
        >
          {repo.html_url}
        </a>
        {Object.keys(languages).length > 1 ? (
          <>
            <p className="inline-block mr-1">Languages:</p>
            <ul className="list-disc ml-4">
              {languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="inline-block mr-1">
            Language: {languages[0].slice(0, -7)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Project;
