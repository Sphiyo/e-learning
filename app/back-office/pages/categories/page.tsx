import Add from "./components/add";
import List from "./components/list";




export default async function CategoryPage(){
    let response = await fetch(
        "http://localhost:3000/api/categories/", {
            method: "GET",
            cache: 'no-store',
        }
    );
    let categories = (await response.json()).categories;



    return (
        <>
            <Add />
            <List 
                categories={categories}
            /> 
        </>
    );
}
