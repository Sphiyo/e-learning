"use client";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import $ from "jquery";
import { Button, Modal } from "react-bootstrap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

const languagesGlobal = ["EN", "FR", "DE"];

async function addSend(event: MouseEvent, router: AppRouterInstance, handleEditClose: any){
    
    const code = $(`#add-modal-code`).val();
    let titleValid = false;
    const name: any = {};
    for( let langGlob of languagesGlobal){
        const tempName = $(`#add-modal-name-${langGlob}`).val();
        if(tempName){
            titleValid = true;
        }
        name[langGlob] =  tempName;
        
    }
    if (!name["EN"]) {
        return
    }
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
    if(!code || !name || !createdDate || !inpDate){
        return
    }
    const data = {
        code : code,
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
    handleEditClose();
    router.refresh();
}



function InitAddModal(props: {showAdd: any, handleAddClose: any}){
    const router = useRouter();
    return (
        <Modal 
            show={props.showAdd} 
            onHide={props.handleAddClose}
            size={undefined}
            centered
        >
            <form action="#">
                <Modal.Header closeButton>
                    <Modal.Title>Add Language</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="modal-body">
                        <label htmlFor="add-modal-code"> Code </label> <br />
                        <input type="text" id="add-modal-code" name="add-modal-code" required={true} />

                        <br />
                        <br />

                        Name <br />
                        {languagesGlobal.map(langGlob=>(
                            <label key={langGlob + "-add-name"}> {langGlob}: 
                                <input 
                                    type="text" 
                                    id={`add-modal-name-${langGlob}`}
                                    name={`add-modal-name-${langGlob}`}
                                    required={true}
                                />
                                <br />
                            </label> 
                        ))}

                        <br />
                        <br />

                        <label htmlFor="add-modal-flag"> Flag </label> <br />
                        <input type="text" id="add-modal-flag" name="add-modal-flag" required />

                        <br />
                        <br />
                        <label htmlFor="add-modal-published"> Published </label> 
                        <br />
                        <input type="checkbox" id="add-modal-published" name="add-modal-published" />
                        <br />
                    </div> 
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={(e)=> addSend(e, router, props.handleAddClose)} variant="primary">Save changes</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}




function getFromLangAddLanguage(lang: string){
    switch(lang){
        case "EN":
            return "Add language";
            break;
        case "FR":
            return "Ajouter une langue";
            break;
        case "DE":
            return "Sprache hinzufügen";
            break;
        default:
            return "Add language";
    }
}

export default function Add(props: {lang: string}){

    const [showAdd, setShowAdd] = useState(false);
    const handleAddOpen = ()=>setShowAdd(true);
    const handleAddClose = ()=>setShowAdd(false);
    return (
    <div>
        <Link 
            href="#" 
            onClick={handleAddOpen} 
            className="btn btn-primary"
        >
            {getFromLangAddLanguage(props.lang)}
        </Link>
        <InitAddModal showAdd={showAdd} handleAddClose={handleAddClose}/> 
    </div>
    );
}
