import { Suspense } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

export default function BackOfficeLayout({
        children,
        params,
    }: 
    {
        children: React.ReactNode, 
        params: {lang: string},
    }) {
    return (
        <div className="container-fluid" style={{fontSize: "0.8em"}}>
            <Header lang={params.lang} />
            <div className="row">
                <div className="col-xl-2"><Sidebar lang={params.lang} /></div>
                <div className="col-xl-10"><Suspense fallback="Loading">{children}</Suspense></div>
            </div>
            <Footer lang={params.lang} />
        </div>
    );
}
