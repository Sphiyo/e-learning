"use client";
import $ from "jquery";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

import { Button, Modal } from "react-bootstrap";
import { SectionType, VideoType } from "../../../../utils/types";

const languagesGlobal = ["EN", "FR", "DE"];


function getFromLangTheActions(lang: string){
  switch(lang){
      case "EN":
          return "Actions";
          break;
      case "FR":
          return "Actions";
          break;
      case "DE":
          return "Aktionen";
          break;
      default:
          return "Actions";
  }
}


export default function ShowSection(props: {
      showSections: any, 
      sections: any, 
      handleSectionsClose: any, 
      lang: string,
    }
  ) 
  {

    const router = useRouter();


  return (
    <Modal 
      show={props.showSections} 
      onHide={props.handleSectionsClose}
      size="xl"
      centered
    >
      <form action="#">

        <Modal.Header closeButton>
            <Modal.Title>Sections</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <table className="table table-secondary text-center">
            <thead className="table-dark">
              <tr> 
                <th className="text-nowrap">Section Id</th>
                <th className="text-nowrap">Section Title</th>
                <th className="text-nowrap">Video Id</th>
                <th className="text-nowrap">Video Title</th>
                <th className="text-nowrap">Video URL</th>
                <th className="text-nowrap">{getFromLangTheActions(props.lang)}</th>
              </tr>
            </thead>
            <tbody style={{verticalAlign: "middle"}}>
            {
              props.sections?.map?.((section: SectionType) => (  
                section.videos.map(((video: VideoType, index: number)=>(  
                  <tr key={section.id}>
                    {index == 0 && <td rowSpan={section.videos.length}>{section.id}</td>}
                    {index == 0 && <td rowSpan={section.videos.length}>{section.title[props.lang] || section.title["EN"]}</td>}

                    <td>{video.id}</td>
                    <td>{video.title[props.lang] || video.title["EN"]}</td>
                    <td>{video.url}</td>
                    <td>
                    <Button 
                                variant="primary" 
                                onClick={()=> {
                                    props.setSections(props.sections); 
                                    setShowEdit(true)
                                }}
                            >
                                Edit
                            </Button>
                            {" "}
                            <Button 
                                variant="primary" 
                                onClick={()=>{ 
                                    set(course); 
                                    setShowDelete(true);
                                }}
                            >
                                Delete
                            </Button>
                    </td>
                  </tr>
                )))
              ))
            }
            
            </tbody>
          </table>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            onClick={(e)=> editSend(e, router, props.handleSectionsClose)} 
            variant="primary"
          >
            Save changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}


// async function editSend(event: MouseEvent, router: AppRouterInstance, handleEditClose: any){
//     const code = $(`#edit-modal-code`).val();
//     const title: any = {}; 
//     const description: any = {}; 
//     for( let langGlob of languagesGlobal ) {
//         title[langGlob] =  $(`#edit-modal-title-${langGlob}`).val();
//         description[langGlob] =  $(`#edit-modal-description-${langGlob}`).val();
//     }
//     const published = $(`#edit-modal-published`).is(':checked');

//     const displayAtHome =  $(`#edit-modal-displayAtHome`).is(':checked');

//     const modifiedDate = new Date();
    
//     const day = modifiedDate.getDate();
//     const month = modifiedDate.getMonth() + 1;
//     const year = modifiedDate.getFullYear();

//     const dayStr =String(day).padStart(2, '0');
//     const monthStr =String(month).padStart(2, '0');
//     const yearStr =String(year).padStart(4, '0');
//     const inpDate = `${yearStr}-${monthStr}-${dayStr}`;

//     const data = {
//         code : code,
//         title : title,
//         description : description,
//         published : published ? true : false,
//         modifiedDate : inpDate,
//         displayAtHome: displayAtHome,
//     }
//     await fetch(
//         `http://localhost:3000/api/categories/`, {
//             method: "PUT",
//             cache: 'no-store',
//             body: JSON.stringify(data)
//         }
//     );   
//     handleEditClose();
//     router.refresh();
// }
