
import { NextRequest, NextResponse } from "next/server";


export interface Localisation {
    language: {
        code: string;
        name: {code: string},
        flag: string;
        published: boolean;
        createdDate: string;
        modifiedDate: string;
    }; 
}

const data = { languages: [
    {
        "code": "FR",
        "name": { "EN": "French" , "FR": "Français", "DE": "Französisch" },
        "flag": "https://link-to-a-language-flag/FR",
        "published": true,
        "createdDate": "2024-07-24",
        "modifiedDate": "2024-08-01"
    },
    {
        "code": "EN",
        "name": { "EN": "English" , "FR": "Anglais", "DE": "Englisch" },
        "flag": "https://link-to-a-language-flag/EN",
        "published": true,
        "createdDate": "2024-07-24",
        "modifiedDate": "2024-08-08"
    },
    {
        "code": "DE",
        "name": { "EN": "Germany" , "FR": "Allemagne", "DE": "Deutschland" },
        "flag": "https://link-to-a-language-flag/DE",
        "published": true,
        "createdDate": "2024-07-24",
        "modifiedDate": "2024-08-27"
    },
]};


export async function GET(req: NextRequest) {
    const header = req.nextUrl.searchParams;
    const code = header.get("code");
    if (!code){
        return NextResponse.json(data);
    }
    const queriedLanguages = data.languages.filter(
        currentLanguage => {
            return currentLanguage.code == code;
        }
    );
    const queriedData = { language: queriedLanguages[0]};
    return NextResponse.json(queriedData);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    
    let Found = false;
    for (const language of data.languages){
        if ( language.code == body.code ){
            Found = true;
        } 
    }
    if( Found ){
        return NextResponse.json({message: "Post Failed: Already in"});
    }
    const newLanguage = {
        code: body["code"],
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
    const {code}: {code: string} = await req.json();
    data.languages = data.languages.filter( lang=> lang.code != code );
    
    return NextResponse.json({message: "Delete Success"});
}
export async function PUT(req: NextRequest) {
    const body = await req.json();
    data.languages = data.languages.map( lang=> {
        if(lang.code == body.code) {
            return {
                "code": body.code,
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
