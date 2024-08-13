import Add from "./components/add";
import Delete from "./components/delete";
import Edit from "./components/edit";
import List from "./components/list";




export default async function LanguagePage(){
    let response = await fetch(
        "http://localhost:3000/api/languages/", {
            method: "GET",
            cache: 'no-store',
        }
    );
    let languages = await response.json();
    return (
        <>
            <Add />
            <List languages={languages.language} /> 
            <Edit />
            <Delete />
        </>
    );
}
