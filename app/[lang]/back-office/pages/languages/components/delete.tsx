"use client";

import $ from "jquery";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { Button, Modal } from "react-bootstrap";

// async function getLanguage(iso: string) : Promise<BodyType>{
//     const response = await fetch(
//         `http://localhost:3000/api/languages/?iso=${iso}`, {
//             method: "GET",
//             cache: 'no-store'
//         }
//     );
//     return response.json();
// }

  


 

function InitDeleteModal(props: any){
    const router = useRouter();
    return (
    <Modal show={props.showDelete} onHide={props.handleDeleteClose}>
        <form action="#">

            <Modal.Header closeButton>
                <Modal.Title>Delete Language</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p> Confirm </p>
                <div hidden>
                    <label htmlFor="delete-modal-iso"> ISO </label> <br />
                    <input type="text" id="delete-modal-iso" readOnly={true} name="delete-modal-iso" defaultValue={props.language.iso} required /><br />
                    <label htmlFor="delete-modal-name"> Name </label> <br />
                    <input type="text" id="delete-modal-name" name="delete-modal-name" defaultValue={props.language.name} required /><br />
                    <label htmlFor="delete-modal-flag"> Flag </label> <br />
                    <input type="text" id="delete-modal-flag" name="delete-modal-flag" defaultValue={props.language.flag} required /><br />
                    <label htmlFor="delete-modal-published"> Published </label> <br />
                    <input type="checkbox" id="delete-modal-published" name="delete-modal-published" defaultChecked={props.language.published} /><br />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={(e)=> deleteSend(e, router, props.handleDeleteClose)} variant="primary">Save changes</Button>
            </Modal.Footer>
        </form>
    </Modal>
    
    );
}

async function deleteSend(event: MouseEvent, router: AppRouterInstance, handleDeleteClose: any){
    const iso = $(`#delete-modal-iso`).val();
    await fetch(`http://localhost:3000/api/languages/`, {
        method: "DELETE",
        cache: 'no-store',
        body: JSON.stringify({
          iso: iso
        })
    }); 
    handleDeleteClose();
    router.refresh();
}

export default function Delete(props: any) {
    
    return (
        <>
            <InitDeleteModal showDelete={props.showDelete} language={props.language} handleDeleteClose={props.handleDeleteClose} /> 
        </>
    );
}
