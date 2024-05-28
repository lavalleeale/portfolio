import Link from "next/link";
import { basicRepo } from "../helpers/getInfo";

const Header = ({
  name,
  repos,
  currentRepo,
}: {
  name: string;
  repos: basicRepo[];
  currentRepo?: string;
}) => {
  return (
    <div className="mb-1 w-full bg-purple-800 p-3 overflow-hidden text-white h-14">
      <h3 className="text-xl inline mx-4">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </h3>
      <Link href="/portfolio">
        <a className="mx-4">Portfolio</a>
      </Link>
      <Link href="/blog">
        <a className="mx-4">Blog</a>
      </Link>
    </div>
  );
};

export default Header;
