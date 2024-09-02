"use client";
import { Button, Modal } from "react-bootstrap";

interface LabeledInputProps{
  children: React.ReactNode
  inputName: string; 
  defaultValue: string;
  type?: "text" | "number";
  min?: number;
  max?: number;
}
function LabeledInput(props: LabeledInputProps){
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
  Title?: string;
  Author?: string;
  TotalItems?: number;
  Duration?: number;
  Thumbnail?: string;
  DefaultVideo?: string;
  DisplayHome?: boolean;
  Category?: string;
  Description?: string;
  Tags?: string[];
  Level?: number;
  Published?: boolean;
}
function CourseForm(props: CourseFormProps) {

  return (
  <>
    <div className="row">
      <div className="col-3">
        <LabeledInput inputName="course-form-title" defaultValue={props.Title || ""}> Title </LabeledInput>
      </div>
      <div className="col-3">
        <LabeledInput inputName="course-form-author" defaultValue={props.Author || ""}> Author </LabeledInput>
      </div>
      <div className="col-3">
        <LabeledInput inputName="course-form-total-items" defaultValue={props.TotalItems?.toString() || ""}> Total Items </LabeledInput>
      </div>
      <div className="col-3">
        <LabeledInput inputName="course-form-duration" defaultValue={props.Duration?.toString() || ""}> Duration </LabeledInput>
      </div>
    </div>
    <div className="row">
      <div className="col-3">
        <LabeledInput inputName="course-form-thumbnail" defaultValue={props.Thumbnail || ""} > Thumbnail </LabeledInput>
      </div>
      <div className="col-3">
        <LabeledInput inputName="course-form-default-video" defaultValue={props.DefaultVideo || ""}> Default Video </LabeledInput>
      </div>
      <div className="col-3">
        <LabeledInput 
          inputName="course-form-level" 
          defaultValue={props.Level?.toString() || ""} 
          type="number"
          min={0}
          max={2} 
        > 
          Level 
        </LabeledInput>

  
      </div>
      <div className="col-3">
        <LabeledInput inputName="course-form-category" defaultValue={props.Category || ""}> Category </LabeledInput>
      </div>
    </div>
    <div className="row">
      <LabeledTextArea inputName="course-form-description" defaultValue={props.Description || ""} rows={3}> Description </LabeledTextArea>
    </div>
    <div className="row">
      <LabeledTextArea inputName="course-form-description" defaultValue={props.Tags?.join("   ") || ""} rows={1}> Tags </LabeledTextArea>
    </div>
    <div className="row">
      <div className="col-2">
        
        <label htmlFor="course-form-display-home"> 
          Display Home<input 
                        type="checkbox"
                        id="course-form-display-home"
                        name="course-form-display-home" 
                        defaultChecked={props.DisplayHome}
                      /> 
        </label>

      </div>
      <div className="col-2">
        <label htmlFor="course-form-published"> 
          Published <input 
                      type="checkbox"
                      id="course-form-published" 
                      name="course-form-published" 
                      defaultChecked={props.Published}
                    /> 
        </label>
      </div>
    </div>
  </>
  );
}
export default function CourseModal(props: {showAdd: boolean, handleAddClose: ()=>void, lang: string})
{
  return (
    <Modal show={props.showAdd} onHide={props.handleAddClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Test</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CourseForm />
      </Modal.Body>
      <Modal.Footer>
        <Button>Save Change</Button>
        <Button onClick={props.handleAddClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}