import Link from "next/link";

function getFromLangTheSignUp(lang: string) : string{
    switch(lang){
        case "EN":
            return "Sign Up";
            break;
        case "FR":
            return "S'inscrire";
            break;
        case "DE":
            return "Anmelden";
            break;
        default:
            return "Sign Up";
    }
}
function getFromLangTheLogIn(lang: string) : string{
    switch(lang){
        case "EN":
            return "Sign in";
            break;
        case "FR":
            return "S'identifier";
            break;
        case "DE":
            return "Einloggen";
            break;
        default:
            return "Sign in";
    }
}

export default function Header(props: {lang: string}) {
    return (
        <header className="text-light bg-dark my-2 py-2">
            <div className="d-flex align-items-center justify-content-between px-3">
                <Link
                    href="/back-office/"
                    className="col-4 text-light text-decoration-none"
                >
                    <span className="h2">E-Learning</span>
                </Link>

               

                <div className="">
                    <Link 
                        href="#"
                        className="text-light text-decoration-none mx-1 text-nowrap"
                        >
                            {getFromLangTheLogIn(props.lang)}
                         
                    </Link>
                    <Link 
                        href="#"
                        className="text-light text-decoration-none mx-1 text-nowrap"
                        > 
                            {getFromLangTheSignUp(props.lang)}
                        
                    </Link>
                </div>
                
            </div>
        </header>
    );
}
