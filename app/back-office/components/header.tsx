import Link from "next/link";



export default function Header() {
    return (
        <header className="text-light bg-dark my-2 py-2">
            <div className="row align-items-center justify-content-center">
                <Link
                    href="/back-office/"
                    className="col-9 text-light text-decoration-none"
                >
                    <span className="h2">E-Learning</span>
                </Link>


                <Link 
                    href="#"
                    className="col-1 text-light text-decoration-none"
                    >
                    Sign In 
                </Link>
                <Link 
                    href="#"
                    className="col-1 text-light text-decoration-none"
                    > 
                    Sign Up 
                </Link>
            </div>
        </header>
    );
}
