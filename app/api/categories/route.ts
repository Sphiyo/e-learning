
import { NextRequest, NextResponse } from "next/server";




export interface CategoryType {
    categories: {
        code: string,
        title: {iso: string},
        description: {iso: string},
        published: boolean,
        createdDate: string,
        modifiedDate: string,
        displayAtHome: boolean
    };    
}

const data = { categories: [
    {
        code: "0001",
        title: { "EN": "IT Field" , "FR": "Informatique"},
        description: { "EN": "This category contains courses about it fields" , "FR": "Cette categorie contient des cours d'informatiques"},
        published: true,
        createdDate: "2024-07-24",
        modifiedDate: "2024-08-01",
        displayAtHome: true
    },
    {
        code: "0002",
        title: { "EN": "Economics" , "FR": "Economiques"},
        description: { "EN": "This category contains courses about economics and managments" , "FR": "Cette categorie contient des cours d'economie and gestion"},
        published: true,
        createdDate: "2024-08-02",
        modifiedDate: "2024-08-01",
        displayAtHome: true
    },
]};


export async function GET(req: NextRequest) {
    const header = req.nextUrl.searchParams;
    const lang = header.get("lang");
    const code = header.get("code");
    if (!code){
        return NextResponse.json(data);
    }
    const queriedCategories = data.categories.filter(
        currentCategories => {
            return currentCategories.code == code;
        }
    );
    const queriedData = { category: queriedCategories[0]};
    return NextResponse.json(queriedData);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    let Found = false;
    for (const category of data.categories){
        if ( category.code == body.code ){
            Found = true;
        } 
    }
    if( Found ){
        return NextResponse.json({message: "Post Failed: Already in"});
    }
    const newCategorie = {
        code: body["code"],
        title: body["title"],
        description: body["description"],
        published: body["published"] ? true: false,
        createdDate: body["createdDate"],
        modifiedDate: body["modifiedDate"],
        displayAtHome: body["displayAtHome"]? true : false,
    }
    data.categories.push(newCategorie);
    
    return NextResponse.json({message: "Post Success"});
}



export async function DELETE(req: NextRequest) {
    const {code}: {code: string} = await req.json();
    data.categories = data.categories.filter( cat=> cat.code != code );
    
    return NextResponse.json({message: "Delete Success"});
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    data.categories = data.categories.map( currentCategory=> {
        if(currentCategory.code == body.code) {
            return {
                code: body["code"],
                title: body["title"],
                description: body["description"],
                published: body["published"] ? true: false,
                createdDate: currentCategory["createdDate"],
                modifiedDate: body["modifiedDate"],
                displayAtHome: body["displayAtHome"] ? true: false,
            }
        }
        return currentCategory;
    })
    return NextResponse.json({message: "Put Success"});
}
