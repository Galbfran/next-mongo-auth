"use client"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { singIn } from "next-auth/react"


const RegistrerPage = () =>{
    const estilosInput = "bg-zinc-800 px-4 py-2 block mb-2"
    const estilosButton = "bg-indigo-500 px-4 py-2 rounded text-white"

    const [error , setError] = useState("")

    const handlerSubmit = async (e) =>{
        e.preventDefault()
        const fomrData = new FormData(e.currentTarget)
        const email = fomrData.get("email")
        const password = fomrData.get("password")
        const fullname = fomrData.get("fullname")
        try {
            console.log(email , password , fullname)
            const data = await axios.post("/api/auth/signup", {email, password, fullname})
            console.log(data , "data")
            const res = await singIn("credentials", {
                email: data.data.email,
                password: fomrData.get("password"),
                redirect:false
            })
            console.log(res , "res")
        } catch (error) {
            if(error instanceof AxiosError){
                error.response?.data.message && setError(error.response.data.message)
            }
            console.log(error)
        }
    }



    return(
        <div>
            <form  onSubmit={handlerSubmit}>
                {error && <p className="bg-red-500 p-2 m-2">{error}</p>}
                <h2>Sing Up</h2>
                <input type="text" name="fullname" placeholder="franco" className={estilosInput} autoComplete="off"/>
                <input type="email" name="email" placeholder="pepito@gmail.com" className={estilosInput} autoComplete="off"/>
                <input type="password" name="password" placeholder="*************" className={estilosInput} autoComplete="off"/>
                <button  className={estilosButton}>
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegistrerPage