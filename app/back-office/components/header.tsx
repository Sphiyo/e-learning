import Link from "next/link";



export default function Header() {
    return (
        <header className="text-light bg-dark my-2 py-2">
            <div className="row align-items-center justify-content-center px-3">
                <Link
                    href="/back-office/"
                    className="col-4 text-light text-decoration-none"
                >
                    <span className="h2">E-Learning</span>
                </Link>

                <div className="col-7">

                </div>

                <div className="col-1">
                    <Link 
                        href="#"
                        className="text-light text-decoration-none mx-1"
                        >
                        Sign In 
                    </Link>
                    <Link 
                        href="#"
                        className="text-light text-decoration-none mx-1"
                        > 
                        Sign Up 
                    </Link>
                </div>
                
            </div>
        </header>
    );
}
