import NextAuth from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import connectDB from "../../../../libs/mongodb"
import User from "../../../../models/User"
import bcrypt from "bcryptjs"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email", type:"email", placeholder:"Email"},
                password:{label:"Password", type:"password", placeholder:"Password"},
                
            },
            async authorize(credentials , req){
                await connectDB()   
                console.log(credentials, "credentials")

                const user = await User.findOne({email:credentials.email})
                if(!user){
                    throw new Error("User not found")
                }
                const passwordMatch = await bcrypt.compare(credentials.password, user.password)
                if(!passwordMatch){
                    throw new Error("Invalid password")
                }


                return user
            }
        })],
        callbacks:{
            jwt({  token , user} ){
                if(user){
                    token.user = user
                }
                return token
            },
            session({session , token}){
                session.user = token.user
                console.log(session)
                return session
            }
        }
})

export { handler as GET, handler as POST }