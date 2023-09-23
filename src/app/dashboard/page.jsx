"use client"
import {useSession } from "next-auth/react";

const DashboardPage = () =>{
    const {data , status } = useSession()
    console.log(data , status)

    return(
        <div>
            <h2>Dashboard</h2>
        </div>
    )
}

export default DashboardPage