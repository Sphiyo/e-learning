import Add from "./components/add";
import List from "./components/list";




export default async function CategoryPage({params, searchParams}: {params: {lang: string}, searchParams: any}){
    const langFound = ["EN", "FR", "DE"].includes(params.lang);
    let langToQuery = params.lang;
    if(!langFound){
        langToQuery = "EN";
    }

    let response = await fetch(
        `http://localhost:3000/api/categories?lang=${langToQuery}`, {
            method: "GET",
            cache: 'no-store',
        }
    );
    let categories = (await response.json()).categories;



    return (
        <div className="d-flex flex-column align-items-end">
            <Add lang={langToQuery} />
            <List 
                categories={categories}
                lang={langToQuery}
            /> 
        </div>
    );
}
