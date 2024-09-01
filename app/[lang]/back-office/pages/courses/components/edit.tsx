"use client";
import $ from "jquery";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

import { Button, Modal } from "react-bootstrap";
import { CourseType, SectionType } from "../../../utils/types";

const languagesGlobal = ["EN", "FR", "DE"];

export default function Edit(props: any) {
    return (
        <>
            <InitEditModal 
                showEdit={props.showEdit} 
                category={props.category}  
                lang={props.lang} 
                handleEditClose={props.handleEditClose}
            />
        </>
    );
}

function InitEditModal( props: {
    showEdit: any, 
    course: CourseType,
    handleEditClose: any,
    lang: string 
  })
{
  const router = useRouter();
  return (
    <Modal 
        show={props.showEdit} 
        onHide={props.handleEditClose}
        size="xl"
        centered
    >
      <form action="#">

        <Modal.Header closeButton>
            <Modal.Title>Edit </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">


            <div className="col-4">
              <label htmlFor="edit-modal-code"> Code </label> <br />
              <input 
                  type="text" 
                  id="edit-modal-code" 
                  name="edit-modal-code" 
                  defaultValue={props.course?.code} 
                  readOnly={true} 
                  required={true} 
              />
            </div>


            <div className="col-4">
              <p>Title</p> 
              {languagesGlobal.map(langGlob=>( 
                  <label key={langGlob}> {langGlob}: 
                      <input 
                          type="text" 
                          id={`edit-modal-title-${langGlob}`} 
                          name={`edit-modal-title-${langGlob}`} 
                          defaultValue={props.course?.title?.[langGlob]} 
                          required={true} 
                      /> 
                      
                  </label> 
              ))}
            </div>


            <div className="col-4">
              <p>Description</p>
              {languagesGlobal.map(langGlob=>( 
                  <label key={langGlob}> {langGlob}: 
                      <input 
                          type="text" 
                          id={`edit-modal-description-${langGlob}`} 
                          name={`edit-modal-description-${langGlob}`} 
                          defaultValue={props.course?.description?.[langGlob] || ""} 
                          required={true} 
                      /> 
                  </label> 
              ))}
            </div>

          </div>
          <div className="row">

            <div className="col-4">
            
              <label htmlFor="edit-modal-published"> Total Item </label> <br />
              <input
                  type="number" 
                  id="edit-modal-published" 
                  name="edit-modal-published" 
                  defaultValue={props.course?.totalItem} 
              />
            </div>

            <div className="col-4">
              <label htmlFor="edit-modal-published"> Duration </label> <br />
              <input
                  type="text" 
                  id="edit-modal-published" 
                  name="edit-modal-published" 
                  defaultValue={props.course?.duration} 
              />
            </div>

            <div className="col-4">
              <label htmlFor="edit-modal-published"> Image </label> <br />
              <input
                  type="text" 
                  id="edit-modal-published" 
                  name="edit-modal-published" 
                  defaultValue={props.course?.image} 
              />
            </div>

          </div>

          
          <div className="row">
            
            <div className="col-4">
              <label htmlFor="edit-modal-published"> Video </label> <br />
              <input
                  type="text" 
                  id="edit-modal-published" 
                  name="edit-modal-published" 
                  defaultValue={props.course?.video} 
              />
            </div>  

              
            <div className="col-4">
              <label htmlFor="edit-modal-published"> Published </label> <br />
              <input
                  type="checkbox" 
                  id="edit-modal-published" 
                  name="edit-modal-published" 
                  defaultChecked={props.course?.published} 
              />
            </div>

            <div className="col-4">
              <label htmlFor="edit-modal-displayAtHome"> Display At Home </label> <br />
              <input 
                  type="checkbox" 
                  id="edit-modal-displayAtHome" 
                  name="edit-modal-displayAtHome" 
                  defaultChecked={props.course?.displayAtHome} 
              />
            </div>

          </div>


          <div className="row">
            <div className="col-4">
              <label htmlFor="edit-modal-displayAtHome"> Author </label> <br />
              <input 
                  type="text" 
                  id="edit-modal-displayAtHome" 
                  name="edit-modal-displayAtHome" 
                  defaultValue={props.course?.author} 
              />
            </div>
            
            <div className="col-4">
              <label htmlFor="edit-modal-displayAtHome"> Category </label> <br />
              <input 
                  type="text" 
                  id="edit-modal-displayAtHome" 
                  name="edit-modal-displayAtHome" 
                  defaultValue={props.course?.category} 
              />
            </div>

            <div className="col-4">
              <label htmlFor="edit-modal-displayAtHome"> tags </label> <br />
              <input 
                  type="text" 
                  id="edit-modal-displayAtHome" 
                  name="edit-modal-displayAtHome" 
                  defaultValue={props.course?.tags} 
              />
            </div>
            
          </div>


            <label htmlFor="edit-modal-displayAtHome"> Level </label> <br />
            <input 
                type="number" 
                min={0}
                max={2}
                id="edit-modal-displayAtHome" 
                name="edit-modal-displayAtHome" 
                defaultValue={props.course?.level} 
            />
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={(e)=> editSend(e, router, props.handleEditClose)} variant="primary">Save changes</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
async function editSend(event: MouseEvent, router: AppRouterInstance, handleEditClose: any){
    const code = $(`#edit-modal-code`).val();
    const title: any = {}; 
    const description: any = {}; 
    for( let langGlob of languagesGlobal ) {
        title[langGlob] =  $(`#edit-modal-title-${langGlob}`).val();
        description[langGlob] =  $(`#edit-modal-description-${langGlob}`).val();
    }
    const published = $(`#edit-modal-published`).is(':checked');

    const displayAtHome =  $(`#edit-modal-displayAtHome`).is(':checked');

    const modifiedDate = new Date();
    
    const day = modifiedDate.getDate();
    const month = modifiedDate.getMonth() + 1;
    const year = modifiedDate.getFullYear();

    const dayStr =String(day).padStart(2, '0');
    const monthStr =String(month).padStart(2, '0');
    const yearStr =String(year).padStart(4, '0');
    const inpDate = `${yearStr}-${monthStr}-${dayStr}`;

    const data = {
        code : code,
        title : title,
        description : description,
        published : published ? true : false,
        modifiedDate : inpDate,
        displayAtHome: displayAtHome,
    }
    await fetch(
        `http://localhost:3000/api/categories/`, {
            method: "PUT",
            cache: 'no-store',
            body: JSON.stringify(data)
        }
    );   
    handleEditClose();
    router.refresh();
}
