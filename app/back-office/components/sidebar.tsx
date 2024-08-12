import Link from "next/link";



export default function Sidebar() {
    return (
        <nav className="text-center btn-group-vertical bg-secondary my-2">
            <Link
                className="btn px-3 py-2 rounded-0 text-light"
                href="/back-office/pages/languages"
            >
                <span className="h2">Languages</span>
            </Link>
            <Link
                className="btn px-3 py-2 rounded-0 text-light"
                href="/back-office/pages/courses"
            >
                <span className="h2">Modify</span>
            </Link>
            
        </nav>
    );
}
