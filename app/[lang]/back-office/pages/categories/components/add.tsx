"use client";
import CustomModal from "@/app/components/custom-modal";
import Link from "next/link";
import { useState } from "react";
import $ from "jquery";



async function addSend(){
    const code = $(`#add-modal-code`).val();
    const title = $(`#add-modal-title`).val();
    const description = $(`#add-modal-description`).val();
    const published = $(`#add-modal-published`).is(':checked');
    const createdDate = new Date();
    const displayAtHome = $(`#add-modal-displayAtHome`).is(':checked');
    
    const day = createdDate.getDate();
    const month = createdDate.getMonth() + 1;
    const year = createdDate.getFullYear();

    const dayStr =String(day).padStart(2, '0');
    const monthStr =String(month).padStart(2, '0');
    const yearStr =String(year).padStart(4, '0');
    const inpDate = `${yearStr}-${monthStr}-${dayStr}`;

    const data = {
        code : code,
        title : title,
        description : description,
        published : published? true : false,
        createdDate : inpDate,
        modifiedDate : inpDate,
        displayAtHome: displayAtHome? true : false,
    }
    await fetch(
        `http://localhost:3000/api/categories/`, {
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
            title="Add a Category" 
            btnTitle="Add" 
            onSuccess={()=>{
                addSend();
                setTimeout(()=>(window.location.reload()), 500);
            }
        }
        > 
            <form action="#">
                <div className="modal-body">
                    <label htmlFor="add-modal-code"> Code </label> <br />
                    <input type="text" id="add-modal-code" name="add-modal-code" required /><br />
                    <label htmlFor="add-modal-title"> Title </label> <br />
                    <input type="text" id="add-modal-title" name="add-modal-title" required /><br />
                    <label htmlFor="add-modal-description"> Description </label> <br />
                    <input type="text" id="add-modal-description" name="add-modal-description" required /><br />
                    <label htmlFor="add-modal-published"> Published </label> <br />
                    <input type="checkbox" id="add-modal-published" name="add-modal-published" /><br />
                    <label htmlFor="add-modal-displayAtHome"> Display At Home </label> <br />
                    <input type="checkbox" id="add-modal-displayAtHome" name="add-modal-displayAtHome" /><br />
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
    <>
        <Link href="#" onClick={openAddModal} className="btn btn-primary">Add Category</Link>
        <InitAddModal /> 
            {/* <button onClick={()=>openEditModal("edit-modal")}> Show It </button> */}
    </>
    );
}
