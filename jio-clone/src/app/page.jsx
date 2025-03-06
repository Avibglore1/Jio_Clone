import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-center justify-center items-center">This is home</div>
      <ul className="flex flex-col gap-2">
        <li>
          <Link href='/about'>Go to about page</Link>
        </li>
        <li>
          <Link href='/movies/new'>Go to movie page</Link>
        </li>
      </ul>
    </>
  );
}
