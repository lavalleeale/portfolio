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
}) => (
  <div className="mb-1 w-full bg-purple-800 p-3 overflow-auto text-white">
    <h3 className="text-xl inline">
      <Link href="/">
        <a>{name}&apos;s Portfolio</a>
      </Link>
    </h3>
    {repos.map((repo) => (
      <Link key={repo.id} href={`/repo/${repo.name}`}>
        <a className={currentRepo === repo.name ? "ml-12 font-bold" : "ml-12"}>
          {repo.name}
        </a>
      </Link>
    ))}
  </div>
);

export default Header;
