"use client";
import Edit from "./edit";
import Delete from "./delete";
import {Button} from "react-bootstrap";
import {useState} from "react";

interface Context {
    languages: {
        code: string;
        name: Object;
        flag: string;
        published: boolean;
        createdDate: string;
        modifiedDate: string;       
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
function getFromLangTheFlag(lang: string){
    switch(lang){
        case "EN":
            return "Flag";
            break;
        case "FR":
            return "Drapeau";
            break;
        case "DE":
            return "Flagge";
            break;
        default:
            return "Flag";
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
    const [language, setLanguage] = useState<any>('');


    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    return (
    <>
        <Edit showEdit={showEdit} language={language} handleEditClose={handleEditClose} lang={props.lang} />
        <Delete showDelete={showDelete} language={language} handleDeleteClose={handleDeleteClose} lang={props.lang} />

        <table className="table table-secondary text-center">
            <thead className="table-dark">
                <tr> 
                    <th className="text-nowrap" style={{minWidth: "060px"}}>Code</th>
                    <th className="text-nowrap" style={{minWidth: "125px"}}>{getFromLangTheTitle(props.lang)}</th>
                    <th className="text-nowrap" style={{minWidth: "200px"}}>{getFromLangTheFlag(props.lang)}</th>
                    <th className="text-nowrap" style={{minWidth: "060px"}}>{getFromLangThePublished(props.lang)}</th>
                    <th className="text-nowrap" style={{minWidth: "090px"}}>{getFromLangTheDateAdded(props.lang)}</th>
                    <th className="text-nowrap" style={{minWidth: "105px"}}>{getFromLangTheDateUpdated(props.lang)}</th>
                    <th className="text-nowrap" style={{minWidth: "165px"}}>{getFromLangTheActions(props.lang)}</th>
                </tr>
            </thead>
            <tbody>
            {
                props.languages.map(language => (                            
                    <tr key={language.code}>
                        <td>{language.code}</td>
                        <td>{language.name[props.lang]}</td>
                        <td>{language.flag}</td>
                        <td>
                            <input
                                title="published"
                                type="checkbox"
                                checked={language.published? true:false}
                                readOnly={true}
                                disabled={true}
                            />
                        </td>
                        <td>{language.createdDate}</td>
                        <td>{language.modifiedDate}</td>
                        <td>
                            <Button variant="primary" onClick={()=> {
                                    setLanguage(language); 
                                    setShowEdit(true)
                                }
                            }>
                                Edit
                            </Button>
                            {" "}
                            <Button variant="primary" onClick={()=>{ 
                                    setLanguage(language);
                                    setShowDelete(true);
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
