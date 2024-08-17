"use client";
import Edit from "./edit";
import Delete from "./delete";
import {Button} from "react-bootstrap";
import {useState} from "react";

interface Context {
    categories: {
        code: string,
        title: string,
        description: string,
        published: boolean,
        createdDate: string,
        displayAtHome: boolean      
    }[];

}
        
export default function List(props: Context) {

    const [category, setCategory] = useState('');


    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    return (
        <>
            <Edit showEdit={showEdit} category={category} handleEditClose={handleEditClose} />
            <Delete showDelete={showDelete} category={category} handleDeleteClose={handleDeleteClose} />

            <table className="table table-secondary text-center">
                <thead className="table-dark">
                    <tr> 
                        <th className="col-1">Code</th>
                        <th className="col-1">Title</th>
                        <th className="col-4">Description</th>
                        <th className="col-1">Published</th>
                        <th className="col-1">Date Added</th>
                        <th className="col-1">Display At Home</th>
                        <th className="col-1">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.categories.map(category => (    
                        <tr key={category.code}>
                            <td>{category.code}</td>
                            <td>{category.title}</td>
                            <td>{category.description}</td>
                            <td>
                                <input 
                                    title="published" 
                                    type="checkbox" 
                                    checked={category.published? true:false} 
                                    readOnly={true}
                                />
                            </td>
                            <td>{category.createdDate}</td>
                            <td>
                                <input 
                                    title="displayAtHome" 
                                    type="checkbox" 
                                    checked={category.displayAtHome? true:false} 
                                    readOnly={true}
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
