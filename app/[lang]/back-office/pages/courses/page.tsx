import Add from "./components/add";
import List from "./components/list";

import {CourseType} from "@/app/[lang]/back-office/utils/types";



export default async function CategoryPage({params, searchParams}: {params: {lang: string}, searchParams: any}){
    const langFound = ["EN", "FR", "DE"].includes(params.lang);
    let langToQuery = params.lang;
    if(!langFound){
        langToQuery = "EN";
    }

    // let response = await fetch(
    //     `http://localhost:3000/api/categories?lang=${langToQuery}`, {
    //         method: "GET",
    //         cache: 'no-store',
    //     }
    // );
    // let categories = (await response.json()).categories;

    let courses: CourseType[] = [
    {
        code: "1",
        title: {"EN": "Java Intermediate Level", "FR": "Java pour intermédiaire", "DE": "Java German"},
        description: {"EN": "Java Desc in english", "FR": "Java Desc in francais", "DE": "Java German"},
        totalItem: 5,
        duration: 120,
        image: "thumbnail",
        video: "default video",
        published: true,
        createdDate: "2020-08-20",
        modifiedDate: "2020-08-20",
        displayAtHome: true,
        author: ["Anwar"],
        category: ["0001"],
        tags: [ "java", "swing" ],
        level: 0,
        sections: [
            {
                id: "01",
                title: {"EN": "Introduction in Java", "FR": "Introduction à Java", "DE": "Einführung in Java"},
                videos: [
                    {
                        id: "01",
                        title: {"EN": "Java 01 English", "FR": "Java 01 French", "DE": "Java 01 German"},
                        url: "Url Vid 1",
                    },
                    {
                        id: "02",
                        title: {"EN": "Java 02 English", "FR": "Java 02 French", "DE": "Java 02 German"},
                        url: "Url Vid 2",
                    },
                    {
                        id: "03",
                        title: {"EN": "Java 03 English", "FR": "Java 03 French", "DE": "Java 03 German"},
                        url: "Url Vid 3",
                    }
                ]
            },
            {
                id: "02",
                title: {"EN": "Concurrency in Java", "FR": "Concurrence en Java", "DE": "Parallelität in C++"},
                videos: [
                    {
                        id: "01",
                        title: {"EN": "Java 11 English", "FR": "Java 11 French", "DE": "Java 11 German"},
                        url: "Url Vid 1",
                    },
                    {
                        id: "02",
                        title: {"EN": "Java 12 English", "FR": "Java 12 French", "DE": "Java 12 German"},
                        url: "Url Vid 2",
                    }
                ]
            },
        ]
    },
    {
        code: "2",
        title: {"EN": "C++ Intermediate Level", "FR": "C++ pour intermédiaire", "DE": "C++ German"},
        description: {"EN": "C++ Desc in english", "FR": "C++ Desc in francais", "DE": "C++ German"},
        totalItem: 5,
        duration: 120,
        image: "thumbnail",
        video: "default video",
        published: true,
        createdDate: "2020-08-20",
        modifiedDate: "2020-08-20",
        displayAtHome: true,
        author: ["Anwar"],
        category: ["0001"],
        tags: [ "c++", "opengl" ],
        level: 0,
        sections: [
            {
                id: "01",
                title: {"EN": "Introduction in C++", "FR": "Introduction à C++", "DE": "Einführung in C++"},
                videos: [
                    {
                        id: "01",
                        title: {"EN": "C++ 01 English", "FR": "C++ 01 French", "DE": "C++ 01 German"},
                        url: "Url Vid 1",
                    },
                    {
                        id: "02",
                        title: {"EN": "C++ 02 English", "FR": "C++ 02 French", "DE": "C++ 02 German"},
                        url: "Url Vid 2",
                    },
                    {
                        id: "03",
                        title: {"EN": "C++ 03 English", "FR": "C++ 03 French", "DE": "C++ 03 German"},
                        url: "Url Vid 3",
                    }
                ]
            },
            {
                id: "02",
                title: {"EN": "Concurrency in C++", "FR": "Concurrence en C++", "DE": "Parallelität in C++"},
                videos: [
                    {
                        id: "01",
                        title: {"EN": "C++ 11 English", "FR": "C++ 11 French", "DE": "C++ 11 German"},
                        url: "Url Vid 1",
                    },
                    {
                        id: "02",
                        title: {"EN": "C++ 12 English", "FR": "C++ 12 French", "DE": "C++ 12 German"},
                        url: "Url Vid 2",
                    }
                ]
            },
        ]
    },
    ];

    return (
        <div className="d-flex flex-column align-items-end">
            <Add lang={langToQuery} />
            <List 
                courses={courses}
                lang={langToQuery}
            /> 
        </div>
    );
}
