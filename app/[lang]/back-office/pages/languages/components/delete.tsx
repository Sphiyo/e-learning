"use client";

import $ from "jquery";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { Button, Modal } from "react-bootstrap";

// async function getLanguage(code: string) : Promise<BodyType>{
//     const response = await fetch(
//         `http://localhost:3000/api/languages/?code=${code}`, {
//             method: "GET",
//             cache: 'no-store'
//         }
//     );
//     return response.json();
// }

  


 

function InitDeleteModal(props: any){
    const router = useRouter();
    return (
    <Modal 
        show={props.showDelete} 
        onHide={props.handleDeleteClose}
        size={undefined}
        centered
    >
        <form action="#">

            <Modal.Header closeButton>
                <Modal.Title>Delete Language</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p> Confirm </p>
                <div hidden>
                    <label htmlFor="delete-modal-code"> Code </label> <br />
                    <input type="text" id="delete-modal-code" readOnly={true} name="delete-modal-code" defaultValue={props.language.code} required /><br />
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
    const code = $(`#delete-modal-code`).val();
    await fetch(`http://localhost:3000/api/languages/`, {
        method: "DELETE",
        cache: 'no-store',
        body: JSON.stringify({
          code: code
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
