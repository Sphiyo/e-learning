"use client";
import {Button, Modal} from "react-bootstrap";
import {Dispatch, ReactNode, SetStateAction, useState} from "react";
import {CourseType, SectionType, VideoType} from "@/app/[lang]/back-office/utils/types";
import SectionModal from "./sections/list";
import Edit from "./edit";
import CourseModal from "./CourseModal";

interface Context {
    courses: CourseType[];
    lang: string;
}

function getFromLangTheTitle(lang: string){
    switch(lang){
        case "EN":
            return "Title";
            break;
        case "FR":
            return "Titre";
            break;
        case "DE":
            return "Titel";
            break;
        default:
            return "Title";
    }
}
function getFromLangTheDescription(lang: string){
    switch(lang){
        case "EN":
            return "Description";
            break;
        case "FR":
            return "Désignation";
            break;
        case "DE":
            return "Beschreibung";
            break;
        default:
            return "Description";
    }
}
function getFromLangThePublished(lang: string){
    switch(lang){
        case "EN":
            return "Published";
            break;
        case "FR":
            return "Publié";
            break;
        case "DE":
            return "Publiziert";
            break;
        default:
            return "Published";
    }
}
function getFromLangTheDateAdded(lang: string){
    switch(lang){
        case "EN":
            return "Date Added";
            break;
        case "FR":
            return "Date d'ajout";
            break;
        case "DE":
            return "Datum hinzugefügt";
            break;
        default:
            return "Date Added";
    }
}
function getFromLangTheDateUpdated(lang: string){
    switch(lang){
        case "EN":
            return "Date Updated";
            break;
        case "FR":
            return "Date de mise à jour";
            break;
        case "DE":
            return "Datum der Aktualisierung";
            break;
        default:
            return "Date Updated";
    }
}
function getFromLangTheDisplayHome(lang: string){
    switch(lang){
        case "EN":
            return "Display Home";
            break;
        case "FR":
            return "Afficher la page d'accueil";
            break;
        case "DE":
            return "Startseite";
            break;
        default:
            return "Display Home";
    }
}
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
function getFromLangTheTotalItem(lang: string){
    switch(lang){
        case "EN":
            return "Total Items";
            break;
        case "FR":
            return "Articles au total";
            break;
        case "DE":
            return "Gesamtposten";
            break;
        default:
            return "Total Items";
    }
}
function getFromLangTheDuration(lang: string){
    switch(lang){
        case "EN":
            return "Duration";
            break;
        case "FR":
            return "Durée";
            break;
        case "DE":
            return "Dauer";
            break;
        default:
            return "Duration";
    }
}
function getFromLangTheImage(lang: string){
    switch(lang){
        case "EN":
            return "Image";
            break;
        case "FR":
            return "Image";
            break;
        case "DE":
            return "Image";
            break;
        default:
            return "Image";
    }
}
function getFromLangTheVideo(lang: string){
    switch(lang){
        case "EN":
            return "Video";
            break;
        case "FR":
            return "Vidéo";
            break;
        case "DE":
            return "Video";
            break;
        default:
            return "Video";
    }
}
function getFromLangTheAuthor(lang: string){
    switch(lang){
        case "EN":
            return "Author";
            break;
        case "FR":
            return "Auteur";
            break;
        case "DE":
            return "Autor";
            break;
        default:
            return "Author";
    }
}
function getFromLangTheCategory(lang: string){
    switch(lang){
        case "EN":
            return "Category";
            break;
        case "FR":
            return "Catégorie";
            break;
        case "DE":
            return "Kategorie";
            break;
        default:
            return "Category";
    }
}
function getFromLangTheTags(lang: string){
    switch(lang){
        case "EN":
            return "Tags";
            break;
        case "FR":
            return "Mots clés";
            break;
        case "DE":
            return "Schlagwörter";
            break;
        default:
            return "Tags";
    }
}
function getFromLangTheLevel(lang: string){
    switch(lang){
        case "EN":
            return "Level";
            break;
        case "FR":
            return "Niveau";
            break;
        case "DE":
            return "Ebene";
            break;
        default:
            return "Level";
    }
}
function getFromLangTheSections(lang: string){
    switch(lang){
        case "EN":
            return "Sections";
            break;
        case "FR":
            return "Sections";
            break;
        case "DE":
            return "Abschnitte";
            break;
        default:
            return "Sections";
    }
}
        
export default function List(props: Context) {
    const [course, setCourse] = useState<any>('');
    const [sections, setSections] = useState<any>('');

    const [showSections, setShowSections] = useState(false);
    const handleSectionsClose = () => setShowSections(false);
    const handleSectionsShow = () => setShowSections(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);


    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    return (
    <>
        {/* <CourseModal /> */}
        <SectionModal 
            showSections={showSections} 
            sections={sections} 
            handleSectionsClose={handleSectionsClose} 
            lang={props.lang} 
        />
        <CourseModal 
            show={showEdit} 
            handleAddClose={handleEditClose} 
            lang={props.lang}
            title="Edit"
            course={course}
        />
        {/* 
        <Delete showDelete={showDelete} course={course} handleDeleteClose={handleDeleteClose} lang={props.lang} /> */}
        
        
        <CourseTable 
            courses={props.courses} 
            lang={props.lang} 
            setCourse={setCourse} 
            setSections={setSections} 
            setShowEdit={setShowEdit}
            setShowDelete={setShowDelete}
            setShowSections={setShowSections}
        /> 
    </>
    );
}


function CourseTable({ 
    lang, 
    courses, 
    setSections,
    setShowSections,
    setCourse,
    setShowEdit,
    setShowDelete
} :
{
    lang: string, 
    courses: CourseType[], 
    setSections: Dispatch<any>,
    setShowSections: Dispatch<SetStateAction<boolean>>,
    setCourse: Dispatch<any>,
    setShowEdit: Dispatch<SetStateAction<boolean>>,
    setShowDelete: Dispatch<SetStateAction<boolean>>,
}){
    return (
        <table className="table table-secondary text-center">
            <thead className="table-dark">
                <tr> 
                    <th className="text-nowrap">Code</th>
                    <th className="text-nowrap">{getFromLangTheTitle(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheDescription(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheTotalItem(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheDuration(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheImage(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheVideo(lang)}</th>
                    <th className="text-nowrap">{getFromLangThePublished(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheDateAdded(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheDateUpdated(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheDisplayHome(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheAuthor(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheCategory(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheTags(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheLevel(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheSections(lang)}</th>
                    <th className="text-nowrap">{getFromLangTheActions(lang)}</th>
                </tr>
            </thead>
            <tbody>
            {
                courses.map((course: CourseType) => (
                <>
                    <tr key={course.code}>
                        <td>{course.code}</td>
                        <td>{course.title?.[lang] || course.title?.["EN"]}</td>
                        <td>{course.description?.[lang] || course.description?.["EN"]}</td>
                        <td>{course.totalItem}</td>
                        <td>{course.duration}</td>
                        <td>{course.image}</td>
                        <td>{course.video}</td>
                        <td>
                            <input 
                                title="published" 
                                type="checkbox" 
                                checked={course.published} 
                                readOnly={true}
                                disabled={true}
                            />
                        </td>
                        <td>{course.createdDate}</td>
                        <td>{course.modifiedDate}</td>
                        <td>
                            <input 
                                title="displayAtHome" 
                                type="checkbox" 
                                checked={course.displayAtHome} 
                                readOnly={true}
                                disabled={true}
                                />
                        </td>
                        <td>{course.author}</td>
                        <td>{course.category}</td>
                        <td>{course.tags}</td>
                        <td>{course.level}</td>
                        <td> 
                            <Button 
                                variant="primary" 
                                onClick={()=> {
                                    setSections(course.sections); 
                                    setShowSections(true)
                                }}
                            >
                                Show
                            </Button></td>
                        <td>
                            <Button 
                                variant="primary" 
                                onClick={()=> {
                                    setCourse(course); 
                                    setShowEdit(true)
                                }}
                            >
                                Edit
                            </Button>
                            {" "}
                            <Button 
                                variant="primary" 
                                onClick={()=>{ 
                                    setCourse(course); 
                                    setShowDelete(true);
                                }}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                </>
                ))
            }
            </tbody>
        </table>
    );
}