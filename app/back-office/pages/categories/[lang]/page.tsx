import Add from "../components/add";
import List from "../components/list";




export default async function CategoryPage({params, searchParams}: any){
    let response = await fetch(
        `http://localhost:3000/api/categories?lang=${params.lang}`, {
            method: "GET",
            cache: 'no-store',
        }
    );
    let categories = (await response.json()).categories;



    return (
        <div className="d-flex flex-column align-items-end">
            <Add />
            <List 
                categories={categories}
                lang={params.lang}
            /> 
        </div>
    );
}
