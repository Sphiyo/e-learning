"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer(props: {lang: string}) {
  const relPath = usePathname();
  let realPath = "";
  if(relPath.startsWith("/" + props.lang)){
    realPath = relPath.replace("/" + props.lang, "");
  }
  return (
  <footer className="position-fixed bottom-0 m-3">
    <Link className="btn btn-dark px-5 me-3" href={"/EN" + realPath }>EN</Link>
    <Link className="btn btn-dark px-5 me-3" href={"/FR" + realPath }>FR</Link>
    <Link className="btn btn-dark px-5 me-3" href={"/DE" + realPath }>DE</Link>
  </footer>
  );
}