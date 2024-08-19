import { Suspense } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";


export default function BackOfficeLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="container-fluid" style={{fontSize: "0.8em"}}>
            <Header />
            <div className="row">
                <div className="col-xl-2"><Sidebar /></div>
                <div className="col-xl-10"><Suspense fallback="Loading">{children}</Suspense></div>
            </div>
        </div>
    );
}
