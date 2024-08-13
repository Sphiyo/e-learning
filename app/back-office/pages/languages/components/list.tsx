"use client";
import { BodyTypeAll } from "@/app/api/languages/route";
import Link from "next/link";
import { openEditModal } from "./edit";
import { openDeleteModal } from "./delete";



export default function List(props: BodyTypeAll) {    
    return (
        <>
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
                    props.languages.map(
                        language => (
                            
                                <tr key={language.iso}>
                                    <td>{language.iso}</td>
                                    <td>{language.name}</td>
                                    <td>{language.flag}</td>
                                    <td>
                                        <input title="published" type="checkbox" checked={language.published? true:false} disabled />
                                    </td>
                                    <td>{language.createdDate}</td>
                                    <td>{language.modifiedDate}</td>
                                    <td>
                                        <Link href="#" onClick={()=>openEditModal(language.iso)}>Edit</Link>
                                        |
                                        <Link href="#" onClick={()=>openDeleteModal(language.iso)}>Delete</Link>
                                    </td>
                                </tr>
                            
                        )
                    )
                }
                </tbody>
            </table>
        </>
    );
}
