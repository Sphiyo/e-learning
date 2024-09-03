"use client";
import { Button, Modal } from "react-bootstrap";
import { CourseType, LanguageType } from "../../../utils/types";

interface LabeledInputProps{
  children: React.ReactNode
  inputName: string; 
  defaultValue: string;
  type?: "text" | "number";
  min?: number;
  max?: number;
}
export function LabeledInput(props: LabeledInputProps){
  return (
  <>
    <div>
      <label htmlFor={props.inputName}>{props.children}</label>
    </div>
    <div>
      <input 
        type={props.type || "text"} 
        id={props.inputName}
        name={props.inputName} 
        defaultValue={props.defaultValue}
        className="w-100"
        min={props.min}
        max={props.max}
      />
    </div>
  </>
  )
}
interface LabeledTextAreaProps{
  children: React.ReactNode
  inputName: string; 
  defaultValue: string;
  rows?: number;
}
function LabeledTextArea(props: LabeledTextAreaProps){
  return (
  <>
    <div>
      <label htmlFor={props.inputName}>{props.children}</label>
    </div>
    <div>
      <textarea
        id={props.inputName}
        name={props.inputName} 
        defaultValue={props.defaultValue}
        className="w-100"
        style={{resize: "none"}}
        rows={props.rows || 2}
        draggable={false} 
      />
    </div>
  </>
  )
}
interface CourseFormProps{
  course?: CourseType | undefined;
  lang: string;
}
function CourseForm(props: CourseFormProps) {
  
  return (
  <>
    <div className="row">
      <div className="col-3">
        <LabeledInput 
          inputName="course-form-title" 
          defaultValue={props.course?.title?.[props.lang] || props.course?.title?.EN}
        > 
          Title 
        </LabeledInput>
      </div>
      <div className="col-3">
        <LabeledInput 
          inputName="course-form-author" 
          defaultValue={props.course?.author.join(" ") || ""}
        > 
          Author 
        </LabeledInput>
      </div>
      <div className="col-3">
        <LabeledInput 
          inputName="course-form-total-items" 
          defaultValue={props.course?.totalItem?.toString() || ""}
        > 
          Total Items 
        </LabeledInput>
      </div>
      <div className="col-3">
        <LabeledInput 
          inputName="course-form-duration" 
          defaultValue={props.course?.duration?.toString() || ""}
        > 
          Duration
        </LabeledInput>
      </div>
    </div>
    <div className="row">
      <div className="col-3">
        <LabeledInput 
          inputName="course-form-thumbnail" 
          defaultValue={props.course?.image || ""} 
        >
          Thumbnail 
        </LabeledInput>
      </div>
      <div className="col-3">
        <LabeledInput 
          inputName="course-form-default-video" 
          defaultValue={props.course?.video || ""}
        > 
          Default Video 
        </LabeledInput>
      </div>
      <div className="col-3">
        <LabeledInput 
          inputName="course-form-level" 
          defaultValue={props.course?.level?.toString() || ""} 
          type="number"
          min={0}
          max={2} 
        > 
          Level 
        </LabeledInput>
      </div>
      <div className="col-3">
        <LabeledInput inputName="course-form-category" defaultValue={props.course?.category.join(" ") || ""}> Category </LabeledInput>
      </div>
    </div>
    <div className="row">
      <LabeledTextArea inputName="course-form-description" defaultValue={props.course?.description[props.lang] || props.course?.description.EN} rows={3}> Description </LabeledTextArea>
    </div>
    <div className="row">
      <LabeledTextArea inputName="course-form-description" defaultValue={props.course?.tags?.join("   ") || ""} rows={1}> Tags </LabeledTextArea>
    </div>
    <div className="row">
      <div className="col-2">        
        <label 
          htmlFor="course-form-display-home"
        >
          Display Home
          <input 
            type="checkbox"
            id="course-form-display-home"
            name="course-form-display-home" 
            defaultChecked={props.course?.displayAtHome}
          /> 
        </label>
      </div>
      <div className="col-2">
        <label
          htmlFor="course-form-published"
        >
          Published
          <input
            type="checkbox"
            id="course-form-published"
            name="course-form-published"
            defaultChecked={props.course?.published}
          />
        </label>
      </div>
    </div>
  </>
  );
}
export default function CourseModal(props: {
  show: boolean,
  handleAddClose: ()=>void,
  lang: string,
  title: "Add Course" | "Edit",
  course?: CourseType | undefined,
})
{
  return (
    <Modal
      show={props.show}
      onHide={props.handleAddClose}
      size="xl"
      centered={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CourseForm course={props.course} lang={props.lang} />
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={props.handleAddClose}
        >
          Save Change
        </Button>
        <Button
          onClick={props.handleAddClose}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}