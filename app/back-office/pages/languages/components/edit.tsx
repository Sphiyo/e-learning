"use client";
import { BodyType, BodyTypeAll } from "@/app/api/languages/route";
import CustomModal from "@/app/components/custom-modal";
import $ from "jquery";
import { MouseEvent } from "react";


function InitEditModal(){
    return (
        <CustomModal id="edit-modal" title="Edit Language" btnTitle="Edit" onSuccess={editSend}> 
            <form action="#">
                <div className="modal-body">
                    <label htmlFor="edit-modal-iso"> ISO </label> <br />
                    <input type="text" id="edit-modal-iso" name="edit-modal-iso" readOnly required /><br />
                    <label htmlFor="edit-modal-name"> Name </label> <br />
                    <input type="text" id="edit-modal-name" name="edit-modal-name" required /><br />
                    <label htmlFor="edit-modal-flag"> Flag </label> <br />
                    <input type="text" id="edit-modal-flag" name="edit-modal-flag" required /><br />
                    <label htmlFor="edit-modal-published"> Published </label> <br />
                    <input type="text" id="edit-modal-published" name="edit-modal-published" /><br />
                    <label htmlFor="edit-modal-modified-date"> Modified At </label> <br />
                    <input type="date" id="edit-modal-modified-date" name="edit-modal-modified-date"  required /><br />
                    <label htmlFor="edit-modal-created-date"> Created At </label> <br />
                    <input type="date" id="edit-modal-created-date" name="edit-modal-created-date" readOnly required /><br />
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
    const published = $(`#edit-modal-published`).val();
    const modifiedDate = new Date(`${$(`#edit-modal-modified-date`).val()}`);
    
    const day = modifiedDate.getDate();
    const month = modifiedDate.getMonth() + 1;
    const year = modifiedDate.getFullYear();

    const dayStr =String(day).padStart(2, '0');
    const monthStr =String(month).padStart(2, '0');
    const yearStr =String(year).padStart(4, '0');
    const inpDate = `${yearStr}-${monthStr}-${dayStr}`;
    console.log(inpDate);

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
    const modifiedInput = $(`#edit-modal-modified-date`);
    const createdInput = $(`#edit-modal-created-date`);

    const language = (await getLanguage(id)).language;
    // .toISOString().slice(0, 10)
    const modifiedDate = new Date(language.modifiedDate);
    
    console.log(modifiedDate);
    const day = modifiedDate.getDate();
    const month = modifiedDate.getMonth() + 1;
    const year = modifiedDate.getFullYear();

    const dayStr =String(day).padStart(2, '0');
    const monthStr =String(month).padStart(2, '0');
    const yearStr =String(year).padStart(4, '0');
    const inpDate = `${yearStr}-${monthStr}-${dayStr}`;
    console.log(inpDate);
    isoInput.prop("value", language.iso);
    nameInput.prop("value", language.name);
    flagInput.prop("value", language.flag);
    publishedInput.prop("value", language.published);
    modifiedInput.prop("value", inpDate);
    createdInput.prop("value", language.createdDate);

    const {Modal} = require("bootstrap");
    let modal = new Modal("#edit-modal");
    modal.show();
}

export default function Edit() {
    
    return (
        <>
            <InitEditModal /> 
            {/* <button onClick={()=>openEditModal("edit-modal")}> Show It </button> */}
        </>
    );
}
