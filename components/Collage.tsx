import Image from "next/image";
import Link from "next/link";
import lambdaPic from "../public/collage/lambda.png";
import portfolioPic from "../public/collage/portfolio.png";
import stackPic from "../public/collage/stack.png";
import tetrisPic from "../public/collage/tetris.png";

const Collage = () => {
  return (
    <div className="paper">
      <div className="grid grid-cols-4 align-middle">
        <div className="col-span-3  inline-block">
          <div className="aspect-[2940/475] relative hover:z-40 hover:scale-110 transition-transform">
            <Link href="/repo/Lambda" passHref>
              <a>
                <Image src={lambdaPic} alt="" layout="fill" />
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-2 pt-1 gap-1">
            <div className="aspect-[2940/1626] relative hover:z-50 hover:scale-110 transition-transform">
              <Link href="/repo/portfolio" passHref>
                <a>
                  <Image src={portfolioPic} alt="" layout="fill" />
                </a>
              </Link>
            </div>
            <div className="aspect-[2166/1198] relative hover:z-50 hover:scale-110 transition-transform">
              <Link href="/repo/Stack" passHref>
                <a>
                  <Image src={stackPic} alt="" layout="fill" />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="aspect-[1222/1616] relative inline-block hover:z-50 hover:scale-110 transition-transform">
          <Link href="/repo/tetris" passHref>
            <a>
              <Image src={tetrisPic} alt="" layout="fill" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Collage;
