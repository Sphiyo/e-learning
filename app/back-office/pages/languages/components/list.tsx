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

}

export default function List(props: Context) {

    const [language, setLanguage] = useState('');


    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    return (
        <>
            <Edit showEdit={showEdit} language={language} handleEditClose={handleEditClose} />
            <Delete showDelete={showDelete} language={language} handleDeleteClose={handleDeleteClose} />

            <table className="table table-secondary text-center">
                <thead className="table-dark">
                    <tr>
                        <th className="col-1">ISO</th>
                        <th className="col-1">Name</th>
                        <th className="col-4">Flag</th>
                        <th className="col-1">Published</th>
                        <th className="col-1">Date Added</th>
                        <th className="col-1">Date Updated</th>
                        <th className="col-1">Actions</th>
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
