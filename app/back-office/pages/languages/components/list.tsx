"use client";
import { BodyTypeAll } from "@/app/api/languages/route";
import Link from "next/link";
import { openEditModal } from "./edit";



export default function List(props: BodyTypeAll) {    
    return (
        <>
            <table className="table table-striped">
                <thead>
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
                {
                    props.languages.map(
                        language => (
                            <tbody key={language.iso}>
                                <tr>
                                    <td>{language.iso}</td>
                                    <td>{language.name}</td>
                                    <td>{language.flag}</td>
                                    <td>{language.published? "true":"false"}</td>
                                    <td>{language.createdDate}</td>
                                    <td>{language.modifiedDate}</td>
                                    <td>
                                        <Link href="#" onClick={()=>openEditModal(language.iso)}>Edit</Link>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    )
                }
                
            </table>
        </>
    );
}
