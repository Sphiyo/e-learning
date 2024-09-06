
export interface LanguageEnum {
    "EN": string;
    "FR": string;
    "DE": string;
}

export interface CategoryType {
    code: string;
    title: LanguageEnum;
    description: LanguageEnum;
    published: boolean;
    createdDate: string;
    modifiedDate: string;
    displayAtHome: boolean;
}

export interface LanguageType {
    code: string;
    name: LanguageEnum;
    flag: string;
    published: boolean;
    createdDate: string;
    modifiedDate: string;
}


export interface CourseType {
    code: string,
    title: LanguageEnum,
    description: LanguageEnum,
    totalItem: number,
    duration: number,
    image: string,
    video: string,
    published: boolean,
    createdDate: string,
    modifiedDate: string,
    displayAtHome: boolean,
    author: Array<string>,
    category: Array<string>,
    tags: Array<string>,
    level: number,
    sections: SectionType[]
}


export interface SectionType {
    id: string,
    title: LanguageEnum,
    videos: VideoType[]
}

export interface VideoType {
    id: string,
    title: LanguageEnum,
    url: string,
}