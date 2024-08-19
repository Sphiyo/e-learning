import Add from "./components/add";
import List from "./components/list";


export default async function LanguagePage(){
    let response = await fetch(
        "http://localhost:3000/api/languages/", {
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
            /> 
        </div>
    );
}
