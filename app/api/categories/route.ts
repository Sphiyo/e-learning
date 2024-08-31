
import { NextRequest, NextResponse } from "next/server";

import { CategoryType } from "@/app/[lang]/back-office/utils/types";






const data: { categories: CategoryType[] } = { categories: [
    {
        code: "0001",
        title: { "EN": "IT Field" , "FR": "Informatique", "DE": "Informatik" },
        description: { 
            "EN": "This category contains courses about it fields" , 
            "FR": "Cette catégorie contient des cours d'informatiques",
            "DE": "Diese Kategorie enthält Kurse zu IT-Bereichen"
        },
        published: true,
        createdDate: "2024-07-24",
        modifiedDate: "2024-08-01",
        displayAtHome: true,
    },
    {
        code: "0002",
        title: { "EN": "Economics" , "FR": "Economiques", "DE": "Ökonomie" },
        description: { 
            "EN": "This category contains courses about economics and managements" , 
            "FR": "Cette catégorie contient des cours sur l'économie et la gestion",
            "DE": "Diese Kategorie enthält Kurse über Wirtschaft und Management"
        },
        published: true,
        createdDate: "2024-08-02",
        modifiedDate: "2024-08-01",
        displayAtHome: true
    },
]};


export async function GET(req: NextRequest) {
    const header = req.nextUrl.searchParams;
    const code = header.get("code");
    if (!code){
        return NextResponse.json(data);
    }
    const queriedCategories: CategoryType[] = data.categories.filter(
        currentCategories => {
            return currentCategories.code == code;
        }
    );
    const queriedData: { category: CategoryType } = { category: queriedCategories[0]};
    return NextResponse.json(queriedData);
}

export async function POST(req: NextRequest) {
    const body: CategoryType = await req.json();
    let Found = false;
    for (const category of data.categories) {
        if ( category.code == body.code ) {
            Found = true;
        } 
    }
    if( Found ){
        return NextResponse.json({message: "Post Failed: Already in"});
    }
    const newCategorie: CategoryType = {
        code: body.code,
        title: body.title,
        description: body.description,
        published: body.published,
        createdDate: body.createdDate,
        modifiedDate: body.modifiedDate,
        displayAtHome: body.displayAtHome,
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
    const body: CategoryType = await req.json();
    data.categories = data.categories.map( (currentCategory: CategoryType )=> {
        if(currentCategory.code == body.code) {
            return {
                code: body.code,
                title: body.title,
                description: body.description,
                published: body.published,
                createdDate: currentCategory.createdDate,
                modifiedDate: body.modifiedDate,
                displayAtHome: body.displayAtHome,
            }
        }
        return currentCategory;
    })
    return NextResponse.json({message: "Put Success"});
}
