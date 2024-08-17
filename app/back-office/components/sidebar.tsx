"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getActive(currentPath: string, path: string){
    return currentPath == path ? "active" : "";
}

export default function Sidebar() {
    const path = usePathname();
    return (
        <nav className="text-center btn-group-vertical my-2">
            <Link
                className={`btn btn-second px-3 py-2 rounded-0 ${getActive(path, "/back-office/pages/languages")}`}
                href="/back-office/pages/languages"
            >
                <span className="h2">Languages</span>
            </Link>
            <Link
                className={`btn btn-second px-3 py-2 rounded-0 ${getActive(path, "/back-office/pages/categories")}`}
                href="/back-office/pages/categories"
            >
                <span className="h2">Categories</span>
            </Link>
            
        </nav>
    );
}
