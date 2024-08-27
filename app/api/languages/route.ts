
import { NextRequest, NextResponse } from "next/server";


export interface Localisation {
    language: {
        iso: string;
        name: {iso: string},
        flag: string;
        published: boolean;
        createdDate: string;
        modifiedDate: string;
    }; 
}

const data = { languages: [
    {
        "iso": "FR",
        "name": { "EN": "French" , "FR": "Français", "DE": "Französisch" },
        "flag": "https://link-to-a-language-flag/FR",
        "published": true,
        "createdDate": "2024-07-24",
        "modifiedDate": "2024-08-01"
    },
    {
        "iso": "EN",
        "name": { "EN": "English" , "FR": "Anglais", "DE": "Englisch" },
        "flag": "https://link-to-a-language-flag/EN",
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
    const queriedLanguages = data.languages.filter(
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
    for (const language of data.languages){
        if ( language.iso == body.iso ){
            Found = true;
        } 
    }
    if( Found ){
        return NextResponse.json({message: "Post Failed: Already in"});
    }
    const newLanguage = {
        iso: body["iso"],
        name: body["name"],
        flag: body["flag"],
        published: body["published"] ? true: false,
        createdDate: body["createdDate"],
        modifiedDate: body["modifiedDate"]
    }
    data.languages.push(newLanguage);
    
    return NextResponse.json({message: "Post Success"});
}



export async function DELETE(req: NextRequest) {
    const {iso}: {iso: string} = await req.json();
    data.languages = data.languages.filter( lang=> lang.iso != iso );
    
    return NextResponse.json({message: "Delete Success"});
}
export async function PUT(req: NextRequest) {
    const body = await req.json();
    data.languages = data.languages.map( lang=> {
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
