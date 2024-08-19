"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getActive(currentPath: string, path: string){
    return currentPath == path ? "active" : "";
}

export default function Sidebar() {
    const path = usePathname();
    return (
    <div className="d-flex justify-content-center">
        <nav className="text-center btn-group-vertical my-2">
            <Link
                className={`btn btn-second px-3 py-2 rounded-0 ${getActive(path, "/back-office/pages/languages")}`}
                href="/back-office/pages/languages"
            >
                <span className="h5">Languages</span>
            </Link>
            <Link
                className={`btn btn-second px-3 py-2 rounded-0 ${getActive(path, "/back-office/pages/categories")}`}
                href="/back-office/pages/categories/EN"
            >
                <span className="h5">Categories</span>
            </Link>
            
        </nav>
    </div>
    );
}
