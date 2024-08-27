"use client";
import $ from "jquery";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

import { Button, Modal } from "react-bootstrap";

const languagesGlobal = ["EN", "FR", "DE"];

export default function Edit(props: any) {
    return (
        <>
            <InitEditModal 
                showEdit={props.showEdit} 
                category={props.category}  
                lang={props.lang} 
                handleEditClose={props.handleEditClose}
            />
        </>
    );
}

function InitEditModal( props: any ){
    const router = useRouter();
    return (
        <Modal show={props.showEdit} onHide={props.handleEditClose}>
            <form action="#">

                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label htmlFor="edit-modal-code"> Code </label> <br />
                    <input 
                        type="text" 
                        id="edit-modal-code" 
                        name="edit-modal-code" 
                        defaultValue={props.category.code} 
                        readOnly={true} 
                        required={true} 
                    />
                    <br />
                    <br />

                    Title <br />
                    {languagesGlobal.map(langGlob=>( 
                        <label key={langGlob}> {langGlob}: 
                            <input 
                                type="text" 
                                id={`edit-modal-title-${langGlob}`} 
                                name={`edit-modal-title-${langGlob}`} 
                                defaultValue={props.category?.title?.[langGlob]} 
                                required={true} 
                            /> 
                            <br /> 
                        </label> 
                    ))}
                    <br /> 
                    <br /> 

                    Description <br />
                    {languagesGlobal.map(langGlob=>( 
                        <label key={langGlob}> {langGlob}: 
                            <input 
                                type="text" 
                                id={`edit-modal-description-${langGlob}`} 
                                name={`edit-modal-description-${langGlob}`} 
                                defaultValue={props.category?.description?.[langGlob] || ""} 
                                required={true} 
                            /> 
                            <br /> 
                        </label> 
                    ))}


                    <br />
                    <br /> 
                    <label htmlFor="edit-modal-published"> Published </label> <br />
                    <input
                        type="checkbox" 
                        id="edit-modal-published" 
                        name="edit-modal-published" 
                        defaultChecked={props.category.published} 
                    />
                    <br />
                    <br /> 
                    <label htmlFor="edit-modal-displayAtHome"> Display At Home </label> <br />
                    <input 
                        type="checkbox" 
                        id="edit-modal-displayAtHome" 
                        name="edit-modal-displayAtHome" 
                        defaultChecked={props.category.displayAtHome} 
                    />
                    <br /> 
                    <br />
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={(e)=> editSend(e, router, props.handleEditClose)} variant="primary">Save changes</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
async function editSend(event: MouseEvent, router: AppRouterInstance, handleEditClose: any){
    const code = $(`#edit-modal-code`).val();
    const title: any = {}; 
    const description: any = {}; 
    for( let langGlob of languagesGlobal ) {
        title[langGlob] =  $(`#edit-modal-title-${langGlob}`).val();
        description[langGlob] =  $(`#edit-modal-description-${langGlob}`).val();
    }
    const published = $(`#edit-modal-published`).is(':checked');

    const displayAtHome =  $(`#edit-modal-displayAtHome`).is(':checked');

    const modifiedDate = new Date();
    
    const day = modifiedDate.getDate();
    const month = modifiedDate.getMonth() + 1;
    const year = modifiedDate.getFullYear();

    const dayStr =String(day).padStart(2, '0');
    const monthStr =String(month).padStart(2, '0');
    const yearStr =String(year).padStart(4, '0');
    const inpDate = `${yearStr}-${monthStr}-${dayStr}`;

    const data = {
        code : code,
        title : title,
        description : description,
        published : published ? true : false,
        modifiedDate : inpDate,
        displayAtHome: displayAtHome,
    }
    await fetch(
        `http://localhost:3000/api/categories/`, {
            method: "PUT",
            cache: 'no-store',
            body: JSON.stringify(data)
        }
    );   
    handleEditClose();
    router.refresh();
}
