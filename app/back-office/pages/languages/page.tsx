import Edit from "./components/edit";
import List from "./components/list";







async function getLanguages(){
    let languages = await fetch("http://localhost:3000/api/languages/",
        {
            method: "GET",
            cache: 'no-store',
        }
    );
    // console.log(await languages.json());
    return await languages.json();
}

export default async function LanguagePage(){
    let response = await fetch(
        "http://localhost:3000/api/languages/", {
            method: "GET",
            cache: 'no-store',
        }
    );
    let languages = await response.json();
    console.log(languages);
    return (
        <>
            <List languages={languages.language} /> 
            <Edit />
        </>
    );
}
