"use client";
import Edit from "./edit";
import Delete from "./delete";
import {Button} from "react-bootstrap";
import {useState} from "react";

interface Context {
    categories: {
        code: string,
        title: Object,
        description: Object,
        published: boolean,
        createdDate: string,
        modifiedDate: string,
        displayAtHome: boolean      
    }[];
    lang: string;
}

function getFromLangTheTitle(lang: string){
    switch(lang){
        case "EN":
            return "Title";
            break;
        case "FR":
            return "Titre";
            break;
        case "DE":
            return "Titel";
            break;
        default:
            return "Title";
    }
}
function getFromLangTheDescription(lang: string){
    switch(lang){
        case "EN":
            return "Description";
            break;
        case "FR":
            return "Désignation";
            break;
        case "DE":
            return "Beschreibung";
            break;
        default:
            return "Description";
    }
}
function getFromLangThePublished(lang: string){
    switch(lang){
        case "EN":
            return "Published";
            break;
        case "FR":
            return "Publié";
            break;
        case "DE":
            return "Publiziert";
            break;
        default:
            return "Published";
    }
}
function getFromLangTheDateAdded(lang: string){
    switch(lang){
        case "EN":
            return "Date Added";
            break;
        case "FR":
            return "Date d'ajout";
            break;
        case "DE":
            return "Datum hinzugefügt";
            break;
        default:
            return "Date Added";
    }
}
function getFromLangTheDateUpdated(lang: string){
    switch(lang){
        case "EN":
            return "Date Updated";
            break;
        case "FR":
            return "Date de mise à jour";
            break;
        case "DE":
            return "Datum der Aktualisierung";
            break;
        default:
            return "Date Updated";
    }
}
function getFromLangTheDisplayHome(lang: string){
    switch(lang){
        case "EN":
            return "Display Home";
            break;
        case "FR":
            return "Afficher la page d'accueil";
            break;
        case "DE":
            return "Startseite";
            break;
        default:
            return "Display Home";
    }
}
function getFromLangTheActions(lang: string){
    switch(lang){
        case "EN":
            return "Actions";
            break;
        case "FR":
            return "Actions";
            break;
        case "DE":
            return "Aktionen";
            break;
        default:
            return "Actions";
    }
}
        
export default function List(props: Context) {
    const [category, setCategory] = useState<any>('');


    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    return (
    <>
        <Edit showEdit={showEdit} category={category} handleEditClose={handleEditClose} lang={props.lang} />
        <Delete showDelete={showDelete} category={category} handleDeleteClose={handleDeleteClose} lang={props.lang} />

        <table className="table table-secondary text-center">
            <thead className="table-dark">
                <tr> 
                    <th className="text-nowrap" style={{minWidth: "060px"}}>Code</th>
                    <th className="text-nowrap" style={{minWidth: "125px"}}>{getFromLangTheTitle(props.lang)}</th>
                    <th className="text-nowrap" style={{minWidth: "200px"}}>{getFromLangTheDescription(props.lang)}</th>
                    <th className="text-nowrap" style={{minWidth: "060px"}}>{getFromLangThePublished(props.lang)}</th>
                    <th className="text-nowrap" style={{minWidth: "090px"}}>{getFromLangTheDateAdded(props.lang)}</th>
                    <th className="text-nowrap" style={{minWidth: "105px"}}>{getFromLangTheDateUpdated(props.lang)}</th>
                    <th className="text-nowrap" style={{minWidth: "125px"}}>{getFromLangTheDisplayHome(props.lang)}</th>
                    <th className="text-nowrap" style={{minWidth: "165px"}}>{getFromLangTheActions(props.lang)}</th>
                </tr>
            </thead>
            <tbody>
            {
                props.categories.map(category => (    
                    <tr key={category.code}>
                        <td>{category.code}</td>
                        <td>{category.title[props.lang] || category.title["EN"]}</td>
                        <td>{category.description[props.lang] || category.description["EN"]}</td>
                        <td>
                            <input 
                                title="published" 
                                type="checkbox" 
                                checked={category.published? true:false} 
                                readOnly={true}
                                disabled={true}
                            />
                        </td>
                        <td>{category.createdDate}</td>
                        <td>{category.modifiedDate}</td>
                        <td>
                            <input 
                                title="displayAtHome" 
                                type="checkbox" 
                                checked={category.displayAtHome? true:false} 
                                readOnly={true}
                                disabled={true}
                            />
                        </td>
                        <td>
                            <Button variant="primary" onClick={()=> {setCategory(category); setShowEdit(true)}}>
                                Edit
                            </Button>
                            {" "}
                            <Button variant="primary" onClick={()=>{ setCategory(category); setShowDelete(true);
                                }
                            }>
                                Delete
                            </Button>
                        </td>
                    </tr>                            
                ))
            }
            </tbody>
        </table>
    </>
    );
}
