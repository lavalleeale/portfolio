import Link from "next/link";
import { repo } from "../helpers/getInfo";

const Header = ({
  name,
  repos,
  currentRepo,
}: {
  name: string;
  repos: repo[];
  currentRepo?: string;
}) => {
  return (
    <div className="mb-1 w-full bg-purple-800 p-3 overflow-hidden text-white h-14">
      <h3 className="text-xl inline">
        <Link href="/">
          <a>{name}&apos;s Portfolio</a>
        </Link>
      </h3>
      <label htmlFor="menu" className="inline header:hidden float-right">
        Menu
      </label>
      <input id="menu" className="hidden peer" type="checkbox" />
      <div className="hidden peer-checked:block absolute w-full backdrop-blur-sm bg-slate-500/70 h-[calc(100%-3.5rem)] bottom-0 left-0 text-center">
        {repos.map((repo) => (
          <Link key={repo.id} href={`/repo/${repo.name}`}>
            <a
              className={
                currentRepo === repo.name
                  ? "font-bold block mt-2"
                  : "block mt-2"
              }
            >
              {repo.name}
            </a>
          </Link>
        ))}
      </div>
      <div className="hidden header:inline">
        {repos.map((repo) => (
          <Link key={repo.id} href={`/repo/${repo.name}`}>
            <a
              className={currentRepo === repo.name ? "ml-6 font-bold" : "ml-6"}
            >
              {repo.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
