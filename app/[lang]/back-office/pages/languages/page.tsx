import Add from "./components/add";
import List from "./components/list";


export default async function LanguagePage({params, searchParams}: {params: {lang: string}, searchParams: any}){
    const langFound = ["EN", "FR", "DE"].includes(params.lang);
    let langToQuery = params.lang;
    if(!langFound){
        langToQuery = "EN";
    }
    let response = await fetch(
        `http://localhost:3000/api/languages?lang=${langToQuery}`, {
            method: "GET",
            cache: 'no-store',
        }
    );
    let languages = (await response.json()).languages;



    return (
        <div className="d-flex flex-column align-items-end">
            <Add />
            <List 
                languages={languages} 
                lang={langToQuery}
            /> 
        </div>
    );
}
