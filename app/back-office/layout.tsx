import { Suspense } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";


export default function BackOfficeLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="container-fluid">
            <Header />
            <div className="row">
                <div className="col-1"><Sidebar /></div>
                <div className="col-11"><Suspense fallback="Loading">{children}</Suspense></div>
                
            </div>
        </div>
    );
}
