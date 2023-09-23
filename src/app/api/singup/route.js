import { NextResponse } from "next/server";
import User  from "../../../models/user";
import {connectDB} from "../../../libs/mongodb";
import bcryprt from "bcryptjs";

export async function POST(req){
    const {fullname, email, password} = await req.json()
    
    if( !password ||password.length < 6 ) return NextResponse.json({message:"password must be at least 6 characters"},{status:400}) 
    try {
        await connectDB()
        const user =  await User.findOne({email})
        if(user) {
            return NextResponse.json({message:"user already exists"},{status:400})
        }else{
            const hashedPassword = await bcryprt.hash(password, 12)
            const newUser = new User({fullname, email, password:hashedPassword})
            const userSave = await newUser.save()
            return NextResponse.json(userSave,{status:201})
        }
        
    } catch (error) {
        return NextResponse.json({message:error.message},{status:400})
    }
}