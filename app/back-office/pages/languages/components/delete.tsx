"use client";

import { BodyType } from "@/app/api/languages/route";
import CustomModal, { hideModal } from "@/app/components/custom-modal";
import $ from "jquery";
import { useRouter } from "next/navigation";

async function getLanguage(iso: string) : Promise<BodyType>{
    const response = await fetch(
        `http://localhost:3000/api/languages/?iso=${iso}`, {
            method: "GET",
            cache: 'no-store'
        }
    );
    return response.json();
}

export async function openDeleteModal(id: string){
    const isoInput = $(`#delete-modal-iso`);
    const nameInput = $(`#delete-modal-name`);
    const flagInput = $(`#delete-modal-flag`);
    const publishedInput = $(`#delete-modal-published`);

    const language = (await getLanguage(id)).language;
    
    isoInput.prop("value", language.iso);
    nameInput.prop("value", language.name);
    flagInput.prop("value", language.flag);
    publishedInput.prop("checked", language.published);
    console.log(language);
    const {Modal} = require("bootstrap");
    let modal = new Modal($("#delete-modal"));
    modal.show();
}
export function closeDeleteModal(){    
    const {Modal} = require("bootstrap");
    let modal = new Modal($("#delete-modal"));
    modal.hide();
  }
  

async function deleteSend(){
    const iso = $(`#delete-modal-iso`).val();
    await fetch(`http://localhost:3000/api/languages/`, {
        method: "DELETE",
        cache: 'no-store',
        body: JSON.stringify({
          iso: iso
        })
    }); 
    
}
function InitDeleteModal(){
    return (
        <CustomModal 
            id="delete-modal" 
            title="Delete Language" 
            btnTitle="Delete" 
            onSuccess={(e)=>{ 
                deleteSend();
                setTimeout(()=>(window.location.reload()), 500);
                }
            }> 
            <form action="#">
                <div className="modal-body">
                    <label htmlFor="delete-modal-iso"> ISO </label> <br />
                    <input type="text" id="delete-modal-iso" name="delete-modal-iso" readOnly required /><br />
                    <label htmlFor="delete-modal-name"> Name </label> <br />
                    <input type="text" id="delete-modal-name" name="delete-modal-name" readOnly required /><br />
                    <label htmlFor="delete-modal-flag"> Flag </label> <br />
                    <input type="text" id="delete-modal-flag" name="delete-modal-flag" readOnly required /><br />
                    <label htmlFor="delete-modal-published"> Published </label> <br />
                    <input type="checkbox" id="delete-modal-published" name="delete-modal-published" readOnly /><br />
                </div> 
            </form>
        </CustomModal>
    );
}


export default function Delete() {
    
    return (
        <>
            <InitDeleteModal /> 
        </>
    );
}
