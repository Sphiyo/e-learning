import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";
import { NextRequest, NextResponse } from "next/server";


export interface BodyType {
    language: {
        iso: string;
        name: string;
        flag: string;
        published: boolean;
        createdDate: string;
        modifiedDate: string;
    }; 
}
export interface BodyTypeAll {
    languages: {
        iso: string;
        name: string;
        flag: string;
        published: boolean;
        createdDate: string;
        modifiedDate: string;
    }[];    
}

const data = { language: [
    {
        "iso": "FR",
        "name": "Francais",
        "flag": "url",
        "published": true,
        "createdDate": "2024-07-24",
        "modifiedDate": "2024-08-01"
    },
    {
        "iso": "EN",
        "name": "English",
        "flag": "url",
        "published": true,
        "createdDate": "2024-07-24",
        "modifiedDate": "2024-08-08"
    },
]};


export async function GET(req: NextRequest) {
    const header = req.nextUrl.searchParams;
    const iso = header.get("iso");
    if (!iso){
        return NextResponse.json(data);
    }
    const queriedLanguages = data.language.filter(
        currentLanguage => {
            return currentLanguage.iso == iso;
        }
    );
    const queriedData = { language: queriedLanguages[0]};
    return NextResponse.json(queriedData);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    let Found = false;
    for (const language of data.language){
        if ( language.iso == body.iso ){
            Found = true;
        } 
    }
    if( Found ){
        return NextResponse.json({message: "Post Failed: Already in"});
    }
    const newLanguage = {
        "iso": body["iso"],
        "name": body["name"],
        "flag": body["flag"],
        "published": body["published"] ? true: false,
        "createdDate": body["createdDate"],
        "modifiedDate": body["modifiedDate"]
    }
    data.language.push(newLanguage);
    
    return NextResponse.json({message: "Post Success"});
}



export async function DELETE(req: NextRequest) {
    const {iso}: {iso: string} = await req.json();
    data.language = data.language.filter( lang=> lang.iso != iso );
    
    return NextResponse.json({message: "Delete Success"});
}
export async function PUT(req: NextRequest) {
    const body = await req.json();
    data.language = data.language.map( lang=> {
        if(lang.iso == body.iso) {
            return {
                "iso": body.iso,
                "name": body.name,
                "flag": body.flag,
                "published": body.published? true: false,
                "createdDate": lang.createdDate,
                "modifiedDate": body.modifiedDate
            }
        }
        return lang;
    })
    return NextResponse.json({message: "Put Success"});
}
