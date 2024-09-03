"use client";
import $ from "jquery";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

import { Button, Modal } from "react-bootstrap";
import { SectionType, VideoType } from "../../../../utils/types";
import Link from "next/link";
import { LabeledInput } from "../CourseModal";

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


function AddVideo(props: any){

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
          Add Video
      </Link>
      <AddVideoModal 
      />
  </>
  );
}
function AddVideoModal(){
  return (<></>);
}

function AddSection(props: any){
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
          Add Section
      </Link>
      <AddSectionModal 
        show={showAdd}
        handleAddClose={handleAddClose}
      />
  </>
  );
}

function AddSectionModal(props: any){
  return (
    <Modal 
      show={props.show} 
      onHide={props.handleAddClose}
      size="xl"
      centered
    >
      <form action="#">
        <Modal.Header closeButton>
          <Modal.Title>Add Section</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LabeledInput defaultValue="" inputName="add-section-title">
            Section Title:
          </LabeledInput>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            onClick={props.handleAddClose} 
            variant="primary"
          >
            Save changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

function EditSectionModal(props: any){
  return (
    <Modal 
      show={props.show} 
      onHide={props.onHide}
      size="xl"
      centered
    >
      <form action="#">
        <Modal.Header closeButton>
          <Modal.Title>Edit Section</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LabeledInput defaultValue="" inputName="edit-section-title">
            Section Title:
          </LabeledInput>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            onClick={props.onHide} 
            variant="primary"
          >
            Save changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default function SectionModal(props: {
    showSections: any, 
    sections: any, 
    handleSectionsClose: any, 
    lang: string,
  }
) 
{
  const [showEdit, setShowEdit] = useState(false);
  
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
          <AddVideo />
          <AddSection />
          
          <SectionTable
            sections={props.sections}
            lang={props.lang}
            setShowEdit={setShowEdit}
            showEdit={showEdit}
          />
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

function SectionTable({
  lang,
  sections,
  setSections,
  showEdit,
  setShowEdit,
  setCourse,
  setShowDelete,
}: 
{
  lang: string,
  sections: SectionType[],
  setSections: Dispatch<any>,
  showEdit: boolean,
  setShowEdit: Dispatch<SetStateAction<boolean>>,
  setCourse: Dispatch<any>,
  setShowDelete: Dispatch<SetStateAction<boolean>>,
})
{
  return (
  <>
    <EditSectionModal show={showEdit} onHide={()=>setShowEdit(false)} />
    <table className="table table-secondary text-center">
      <thead className="table-dark">
        <tr> 
          <th className="text-nowrap">Section Id</th>
          <th className="text-nowrap">Section Title</th>
          <th className="text-nowrap">Video Id</th>
          <th className="text-nowrap">Video Title</th>
          <th className="text-nowrap">Video URL</th>
          <th className="text-nowrap">{getFromLangTheActions(lang)}</th>
          <th className="text-nowrap">{getFromLangTheActions(lang)}</th>
        </tr>
      </thead>
      <tbody style={{verticalAlign: "middle"}}>
      {
        sections?.map?.((section: SectionType) => (  
          section.videos.map(((video: VideoType, index: number)=>(  
            <tr key={section.id}>
              {index == 0 && <td rowSpan={section.videos.length}>{section.id}</td>}
              {index == 0 && <td rowSpan={section.videos.length}>{section.title[lang] || section.title["EN"]}</td>}
              <td>{video.id}</td>
              <td>{video.title?.[lang] || video.title?.["EN"]}</td>
              <td>{video.url}</td>
              <td>
                <Button 
                  variant="primary" 
                  onClick={()=> {
                  // setSections(sections); 
                  // setShowEdit(true)
                  }}
                >
                    Edit
                </Button>
                {" "}
                <Button 
                  variant="primary" 
                  onClick={()=>{ 
                  // setCourse(course); 
                  // setShowDelete(true);
                  }}
                >
                  Delete
                </Button>
              </td>
              <td>
                <Button 
                  variant="primary" 
                  onClick={()=> {
                    // setSections(sections); 
                    setShowEdit(true);
                  }}
                >
                  Edit Section
                </Button>
              </td>
            </tr>
          )))
        ))
      }      
      </tbody>
    </table>
  </>
  );
}