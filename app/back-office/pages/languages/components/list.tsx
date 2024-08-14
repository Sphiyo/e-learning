"use client";
import { BodyTypeAll } from "@/app/api/languages/route";
import Link from "next/link";
import Edit, { openEditModal } from "./edit";
import Delete, { openDeleteModal } from "./delete";
import { Button } from "react-bootstrap";
import { useState } from "react";

export interface Context {
    languages: {
        iso: string;
        name: string;
        flag: string;
        published: boolean;
        createdDate: string;
        modifiedDate: string;       
    }[];
    // showEdit: any;
    // handleEditShow: any;
    // showDelete: any;
    // handleDeleteShow: any; 
}

export default function List(props: Context) {
    
    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    return (
        <>
            {showEdit && <Edit showEdit={showEdit} handleEditClose={handleEditClose} />}
            {showDelete && <Delete showDelete={showDelete} handleDeleteClose={handleDeleteClose} />}

            <table className="table table-secondary">
                <thead className="table-dark">
                    <tr>
                        <th>ISO</th>
                        <th>Name</th>
                        <th>Flag</th>
                        <th>Published</th>
                        <th>Date Added</th>
                        <th>Date Updated</th>
                        <th>Actions</th>
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
                                    disabled 
                                />
                            </td>
                            <td>{language.createdDate}</td>
                            <td>{language.modifiedDate}</td>
                            <td> 
                                <Button variant="primary" onClick={()=>{
                                        openEditModal(language.iso);
                                        handleEditShow();
                                    }
                                }>
                                    Edit
                                </Button>
                                {" "}
                                <Button variant="primary" onClick={()=>{
                                        openDeleteModal(language.iso);
                                        handleDeleteShow();
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
