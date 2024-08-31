"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getActive(currentPath: string, path: string){
    return currentPath == path ? "active" : "";
}

function getFromLangTheLanguage(lang: string) : string{
    switch(lang){
        case "EN":
            return "Languages";
            break;
        case "FR":
            return "Langages";
            break;
        case "DE":
            return "Sprachen";
            break;
        default:
            return "Languages";
    }
}
function getFromLangTheCategory(lang: string) : string{
    switch(lang){
        case "EN":
            return "Categories";
            break;
        case "FR":
            return "Catégories";
            break;
        case "DE":
            return "Kategorien";
            break;
        default:
            return "Categories";
    }
}
function getFromLangTheCourse(lang: string) : string{
    switch(lang){
        case "EN":
            return "Courses";
            break;
        case "FR":
            return "Cours";
            break;
        case "DE":
            return "Kurse";
            break;
        default:
            return "Courses";
    }
}


export default function Sidebar(props: {lang: string}) {
    const path = usePathname();
    return (
    <div className="d-flex justify-content-center">
        <nav className="text-center btn-group-vertical my-2">
            <Link
                className={`btn btn-second px-3 py-2 rounded-0 ${getActive(path, "/" + props.lang + "/back-office/pages/languages")}`}
                href={ "/" + props.lang + "/back-office/pages/languages" }
            >
                <span className="h5">{getFromLangTheLanguage(props.lang)}</span>
            </Link>
            <Link
                className={`btn btn-second px-3 py-2 rounded-0 ${getActive(path, "/" + props.lang + "/back-office/pages/categories")}`}
                href={ "/" + props.lang + "/back-office/pages/categories" }
            >
                <span className="h5">{getFromLangTheCategory(props.lang)}</span>
            </Link>
            <Link
                className={`btn btn-second px-3 py-2 rounded-0 ${getActive(path, "/" + props.lang + "/back-office/pages/courses")}`}
                href={ "/" + props.lang + "/back-office/pages/courses" }
            >
                <span className="h5">{getFromLangTheCourse(props.lang)}</span>
            </Link>
        </nav>
    </div>
    );
}
