"use client";
import CustomModal from "@/app/components/custom-modal";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import $ from "jquery";



async function addSend(){
    const iso = $(`#add-modal-iso`).val();
    const name = $(`#add-modal-name`).val();
    const flag = $(`#add-modal-flag`).val();
    const published = $(`#add-modal-published`).is(':checked');
    const createdDate = new Date();
    
    const day = createdDate.getDate();
    const month = createdDate.getMonth() + 1;
    const year = createdDate.getFullYear();

    const dayStr =String(day).padStart(2, '0');
    const monthStr =String(month).padStart(2, '0');
    const yearStr =String(year).padStart(4, '0');
    const inpDate = `${yearStr}-${monthStr}-${dayStr}`;

    const data = {
        iso : iso,
        name : name,
        flag : flag,
        published : published? true : false,
        createdDate : inpDate,
        modifiedDate : inpDate,
    }
    await fetch(
        `http://localhost:3000/api/languages/`, {
            method: "POST",
            cache: 'no-store',
            body: JSON.stringify(data)
        }
    );
    
}



function InitAddModal(){
    return (
        <CustomModal 
            id="add-modal" 
            title="Add a Language" 
            btnTitle="Add" 
            onSuccess={()=>{
                addSend();
                setTimeout(()=>(window.location.reload()), 500);
            }
        }
        > 
            <form action="#">
                <div className="modal-body">
                    <label htmlFor="add-modal-iso"> ISO </label> <br />
                    <input type="text" id="add-modal-iso" name="add-modal-iso" required /><br />
                    <label htmlFor="add-modal-name"> Name </label> <br />
                    <input type="text" id="add-modal-name" name="add-modal-name" required /><br />
                    <label htmlFor="add-modal-flag"> Flag </label> <br />
                    <input type="text" id="add-modal-flag" name="add-modal-flag" required /><br />
                    <label htmlFor="add-modal-published"> Published </label> <br />
                    <input type="checkbox" id="add-modal-published" name="add-modal-published" /><br />
                </div> 
            </form>
        </CustomModal>
    );
}


export async function openAddModal(){
    const {Modal} = require("bootstrap");
    let modal = new Modal("#add-modal");
    modal.show();
}


export default function Add(props: any){

    const [showAdd, setShowAdd] = useState(false);
    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);

    return (
    <div>
        <Link href="#" onClick={openAddModal} className="btn btn-primary">Add Language</Link>
        <InitAddModal /> 
            {/* <button onClick={()=>openEditModal("edit-modal")}> Show It </button> */}
    </div>
    );
}
