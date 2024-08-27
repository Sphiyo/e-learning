"use client";
import CustomModal from "@/app/components/custom-modal";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import $ from "jquery";
import { useRouter } from "next/navigation";
import { Button, Modal } from "react-bootstrap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const languagesGlobal = ["EN", "FR", "DE"];


async function addSend(event: MouseEvent, router: AppRouterInstance, handleEditClose: any){
    
    const code = $(`#add-modal-code`).val();
    const title: any = {};
    const description: any = {};

    for( let langGlob of languagesGlobal){
        title[langGlob] =  $(`#add-modal-title-${langGlob}`).val();
    }

    for( let langGlob of languagesGlobal){
        description[langGlob] =  $(`#add-modal-description-${langGlob}`).val();
    }
    
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
    if(!code || !title || !createdDate || !inpDate){
        return
    }
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
    handleEditClose();
    router.refresh();
}



function InitAddModal(props: {showAdd: any, handleAddClose: any}){
    const router = useRouter();
    return (
        <Modal show={props.showAdd} onHide={props.handleAddClose}>
            <form action="#">

                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>                        
                    <div className="modal-body">
                        <label htmlFor="add-modal-code"> Code </label> <br />
                        <input type="text" id="add-modal-code" name="add-modal-code" required />
                        <br /><br />

                        Title <br />
                        {languagesGlobal.map(langGlob=>(
                            <label key={langGlob + "-title"}> {langGlob}: 
                                <input 
                                    type="text" 
                                    id={`add-modal-title-${langGlob}`}
                                    name={`add-modal-title-${langGlob}`}
                                    required={true}
                                />
                                <br />
                            </label> 
                        ))}
                        <br /><br />

                        Description <br />
                        {languagesGlobal.map(langGlob=>(
                            <label key={langGlob + "-description"}> {langGlob}: 
                                <input 
                                    type="text" 
                                    id={`add-modal-description-${langGlob}`}
                                    name={`add-modal-description-${langGlob}`}
                                    required={true}
                                />
                                <br />
                            </label> 
                        ))}
                        <br /><br />

                        <label htmlFor="add-modal-flag"> Flag </label> <br />                        
                        <input type="text" id="add-modal-flag" name="add-modal-flag" required />

                        <br /><br />

                        <label htmlFor="add-modal-published"> Published </label> 
                        <br />
                        <input type="checkbox" id="add-modal-published" name="add-modal-published" />
                        <br />
                        
                        <label htmlFor="add-modal-displayAtHome"> Display At Home </label> <br />
                        <input type="checkbox" id="add-modal-displayAtHome" name="add-modal-displayAtHome" /><br />
                    </div> 
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={(e)=> addSend(e, router, props.handleAddClose)} variant="primary">Save changes</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}




function getFromLangAddCategory(lang: string){
    switch(lang){
        case "EN":
            return "Add category";
            break;
        case "FR":
            return "Ajouter une catégorie";
            break;
        case "DE":
            return "Kategorie hinzufügen";
            break;
        default:
            return "Add category";
    }
}


export default function Add(props: {lang: string}){

    const [showAdd, setShowAdd] = useState(false);
    const handleAddOpen = () => setShowAdd(true);
    const handleAddClose = () => setShowAdd(false);

    return (
    <>
        <Link 
            href="#" 
            onClick={handleAddOpen} 
            className="btn btn-primary"
        >
            {getFromLangAddCategory(props.lang)}
        </Link>
        <InitAddModal showAdd={showAdd} handleAddClose={handleAddClose} /> 
    </>
    );
}
