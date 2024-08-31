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
    <Modal 
        show={props.showDelete} 
        onHide={props.handleDeleteClose}
        size={undefined}
        centered
    >
        <form action="#">

            <Modal.Header closeButton>
                <Modal.Title>Delete Category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p> Confirm </p>
                <div hidden>
                    <label htmlFor="delete-modal-code"> Code </label> <br />
                    <input type="text" id="delete-modal-code" readOnly={true} name="delete-modal-code" defaultValue={props.category.code} required /><br />

                    <label htmlFor="delete-modal-title"> Title </label> <br />
                    <input type="text" id="delete-modal-title" name="delete-modal-title" defaultValue={props.category.title} required /><br />

                    <label htmlFor="delete-modal-description"> Description </label> <br />
                    <input type="text" id="delete-modal-description" name="delete-modal-description" defaultValue={props.category.description} required /><br />

                    <label htmlFor="delete-modal-published"> Published </label> <br />
                    <input type="checkbox" id="delete-modal-published" name="delete-modal-published" defaultChecked={props.category.published} /><br />

                    <label htmlFor="delete-modal-displayAtHome"> Display At Home </label> <br />
                    <input type="checkbox" id="delete-modal-displayAtHome" name="delete-modal-displayAtHome" defaultChecked={props.category.displayAtHome} /><br />
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
    await fetch(`http://localhost:3000/api/categories/`, {
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
            <InitDeleteModal showDelete={props.showDelete} category={props.category} handleDeleteClose={props.handleDeleteClose} /> 
        </>
    );
}
