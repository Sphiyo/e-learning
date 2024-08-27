"use client";
import $ from "jquery";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

import { Button, Modal } from "react-bootstrap";


function InitEditModal( props: any ){
    const router = useRouter();
    return (
        <Modal show={props.showEdit} onHide={props.handleEditClose}>
            <form action="#">

                <Modal.Header closeButton>
                    <Modal.Title>Edit Language</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label htmlFor="edit-modal-iso"> ISO </label> <br />
                    <input type="text" id="edit-modal-iso" readOnly={true} name="edit-modal-iso" defaultValue={props.language.iso} required /><br />
                    <label htmlFor="edit-modal-name"> Name </label> <br />
                    <input type="text" id="edit-modal-name" name="edit-modal-name" defaultValue={props.language.name} required /><br />
                    <label htmlFor="edit-modal-flag"> Flag </label> <br />
                    <input type="text" id="edit-modal-flag" name="edit-modal-flag" defaultValue={props.language.flag} required /><br />
                    <label htmlFor="edit-modal-published"> Published </label> <br />
                    <input type="checkbox" id="edit-modal-published" name="edit-modal-published" defaultChecked={props.language.published} /><br />
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={(e)=> editSend(e, router, props.handleEditClose)} variant="primary">Save changes</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
async function editSend(event: MouseEvent, router: AppRouterInstance, handleEditClose: any){
    const iso = $(`#edit-modal-iso`).val();
    const name = $(`#edit-modal-name`).val();
    const flag = $(`#edit-modal-flag`).val();
    const published = $(`#edit-modal-published`).is(':checked');
    
    const modifiedDate = new Date();
    
    const day = modifiedDate.getDate();
    const month = modifiedDate.getMonth() + 1;
    const year = modifiedDate.getFullYear();

    const dayStr =String(day).padStart(2, '0');
    const monthStr =String(month).padStart(2, '0');
    const yearStr =String(year).padStart(4, '0');
    const inpDate = `${yearStr}-${monthStr}-${dayStr}`;

    const data = {
        iso : iso,
        name : name,
        flag : flag,
        published : published? true : false,
        modifiedDate : inpDate,
    }
    await fetch(
        `http://localhost:3000/api/languages/`, {
            method: "PUT",
            cache: 'no-store',
            body: JSON.stringify(data)
        }
    );   
    handleEditClose();
    router.refresh();
}

export default function Edit(props: any) {
    return (
        <>
            <InitEditModal showEdit={props.showEdit} language={props.language}  handleEditClose={props.handleEditClose} />
        </>
    );
}
