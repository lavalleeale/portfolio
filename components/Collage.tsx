import Image from "next/image";
import Link from "next/link";
import ciPic from "../public/collage/ci.png";
import lambdaPic from "../public/collage/lambda.png";
import LemmiosPic from "../public/collage/lemmios.png";
import portfolioPic from "../public/collage/portfolio.png";

const Collage = () => {
  return (
    <div className="grid grid-cols-4 align-middle">
      <div className="col-span-3  inline-block">
        <div className="aspect-[2940/475] relative hover:z-40 hover:scale-150 transition-transform">
          <Link href="#Lambda" passHref>
            <a>
              <Image src={lambdaPic} alt="" layout="fill" />
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-2 pt-1 gap-1">
          <div className="aspect-[2940/1626] relative hover:z-50 hover:scale-150 transition-transform">
            <Link href="#portfolio" passHref>
              <a>
                <Image src={portfolioPic} alt="" layout="fill" />
              </a>
            </Link>
          </div>
          <div className="aspect-[2166/1198] relative hover:z-50 hover:scale-150 transition-transform">
            <Link href="#ContinuousInetegration" passHref>
              <a>
                <Image src={ciPic} alt="" layout="fill" />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="aspect-[1222/1616] relative inline-block hover:z-50 hover:scale-150 transition-transform">
        <Link href="#Lemmios" passHref>
          <a>
            <Image src={LemmiosPic} alt="" layout="fill" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Collage;
