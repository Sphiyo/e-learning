"use client";
import $ from "jquery";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

import { Button, Modal } from "react-bootstrap";


export default function Edit(props: any) {
    return (
        <>
            <InitEditModal 
                showEdit={props.showEdit} 
                category={props.category}  
                handleEditClose={props.handleEditClose}
                lang={props.lang} 
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
                    <input type="text" id="edit-modal-code" readOnly={true} name="edit-modal-code" defaultValue={props.category.code} required /><br />
                    <label htmlFor="edit-modal-title"> Title </label> <br />
                    <input type="text" id="edit-modal-title" name="edit-modal-title" defaultValue={props.category?.title?.[props.lang]} required /><br />
                    <label htmlFor="edit-modal-description"> Description </label> <br />
                    <input type="text" id="edit-modal-description" name="edit-modal-description" defaultValue={props.category?.description?.[props.lang] || ""} required /><br />
                    <label htmlFor="edit-modal-published"> Published </label> <br />
                    <input type="checkbox" id="edit-modal-published" name="edit-modal-published" defaultChecked={props.category.published} /><br />
                    <label htmlFor="edit-modal-displayAtHome"> Display At Home </label> <br />
                    <input type="checkbox" id="edit-modal-displayAtHome" name="edit-modal-displayAtHome" defaultChecked={props.category.displayAtHome} /><br />
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
    const title = $(`#edit-modal-title`).val();
    const description = $(`#edit-modal-description`).val();
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
        published : published? true : false,
        modifiedDate : inpDate,
        displayAtHome: displayAtHome
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
