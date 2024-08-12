import { Suspense } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";


export default function BackOfficeLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="container">
            <Header />
            <div className="row">
                <div className="col-3"><Sidebar /></div>
                <div className="col-9"><Suspense fallback="Loading">{children}</Suspense></div>
                
            </div>
        </div>
    );
}
