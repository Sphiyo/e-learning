"use client";
import { BodyType, BodyTypeAll } from "@/app/api/languages/route";
import CustomModal from "@/app/components/custom-modal";
import $ from "jquery";
import { MouseEvent } from "react";



function InitEditModal(){
    return (
        <CustomModal 
            id="edit-modal" 
            title="Edit Language" 
            btnTitle="Edit" 
            onSuccess={(e)=>{
                editSend(e);                
                setTimeout(()=>(window.location.reload()), 500);
                // closeEditModal();
            }
        }
        >
            <form action="#">
                <div className="modal-body">
                    <label htmlFor="edit-modal-iso"> ISO </label> <br />
                    <input type="text" id="edit-modal-iso" name="edit-modal-iso" readOnly required /><br />
                    <label htmlFor="edit-modal-name"> Name </label> <br />
                    <input type="text" id="edit-modal-name" name="edit-modal-name" required /><br />
                    <label htmlFor="edit-modal-flag"> Flag </label> <br />
                    <input type="text" id="edit-modal-flag" name="edit-modal-flag" required /><br />
                    <label htmlFor="edit-modal-published"> Published </label> <br />
                    <input type="checkbox" id="edit-modal-published" name="edit-modal-published" /><br />
                </div> 
            </form>
        </CustomModal>
    );
}
async function getLanguage(iso: string) : Promise<BodyType>{
    const response = await fetch(
        `http://localhost:3000/api/languages/?iso=${iso}`, {
            method: "GET",
            cache: 'no-store'
        }
    );
    return response.json();
}


async function editSend(event: MouseEvent){
    const iso = $(`#edit-modal-iso`).val();
    const name = $(`#edit-modal-name`).val();
    const flag = $(`#edit-modal-flag`).val();
    const published = $(`#edit-modal-published`).is(':checked');
    console.log(published);
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
    
}

export async function openEditModal(id: string){
    const isoInput = $(`#edit-modal-iso`);
    const nameInput = $(`#edit-modal-name`);
    const flagInput = $(`#edit-modal-flag`);
    const publishedInput = $(`#edit-modal-published`);

    const language = (await getLanguage(id)).language;
    
    isoInput.prop("value", language.iso);
    nameInput.prop("value", language.name);
    flagInput.prop("value", language.flag);
    publishedInput.prop("checked", language.published);

    const {Modal} = require("bootstrap");
    let modal = new Modal($("#edit-modal"));
    modal.show();

}

function closeEditModal() {    

    const {Modal} = require("bootstrap");
    let modal = new Modal($("#edit-modal"));
    modal.hide();
    
}

export default function Edit() {
    
    return (
        <>
            <InitEditModal /> 
            {/* <button onClick={()=>openEditModal("edit-modal")}> Show It </button> */}
        </>
    );
}
