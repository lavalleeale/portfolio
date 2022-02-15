import Link from "next/link";

const Header = ({ name }: { name: string }) => (
  <div className="mb-1 w-full bg-purple-800 p-3 overflow-auto text-white">
    <h3 className="text-xl">
      <Link href="/">
        <a>{name}&apos;s Portfolio</a>
      </Link>
    </h3>
  </div>
);

export default Header;
