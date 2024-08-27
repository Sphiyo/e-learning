"use client";
import Edit from "./edit";
import Delete from "./delete";
import {Button} from "react-bootstrap";
import {useState} from "react";

 interface Context {
    languages: {
        iso: string;
        name: string;
        flag: string;
        published: boolean;
        createdDate: string;
        modifiedDate: string;       
    }[];
    lang: string;
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
                        <th style={{minWidth: "060px"}}>ISO</th>
                        <th style={{minWidth: "125px"}}>Name</th>
                        <th style={{minWidth: "200px"}}>Flag</th>
                        <th style={{minWidth: "060px"}}>Published</th>
                        <th style={{minWidth: "090px"}}>Date Added</th>
                        <th style={{minWidth: "105px"}}>Date Updated</th>
                        <th style={{minWidth: "165px"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.languages.map(language => (                            
                        <tr key={language.iso}>
                            <td>{language.iso}</td>
                            <td>{language.name}</td>
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
                                <Button variant="primary" onClick={()=> {setLanguage(language); setShowEdit(true)}}>
                                    Edit
                                </Button>
                                {" "}
                                <Button variant="primary" onClick={()=>{ setLanguage(language); setShowDelete(true);
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
