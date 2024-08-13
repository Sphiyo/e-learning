"use client";
import { MouseEventHandler } from "react";


export function showModal(id: string){    
  const {Modal} = require("bootstrap");
  let modal = new Modal(`#${id}`);
  modal.show();
}

export function hideModal(id: string){    
  const {Modal} = require("bootstrap");
  let modal = new Modal(`#${id}`);
  modal.hide();
}

export function toggleModal(id: string){    
  const {Modal} = require("bootstrap");
  let modal = new Modal(`#${id}`);
  modal.toggle();
}

interface Context{
    children: React.ReactNode;
    id: string;
    title: string;
    btnTitle?: string;
    onSuccess?: MouseEventHandler<HTMLButtonElement> 
}

export default function CustomModal({children, ...props} : Context ) {  
    // let {id, title, btnTitle, onSuccess} = props;
    props.btnTitle = props.btnTitle || props.title;
    return (
      <>
        <div className="modal fade" id={props.id} 
              tabIndex={-1} aria-labelledby={`${props.id}Label`} aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`${props.id}Label`}>{props.title}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" 
                        aria-label="Close"
                >                  
                </button>
              </div>
              <div className="modal-body">
                { children }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={props.onSuccess} >
                  {props.btnTitle}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
  );
  }
  