import React from 'react'
import axios from 'axios'
import { useLoaderData } from 'react-router-dom'

export const loader = async () => {
    const result = await axios.get('http://localhost:3000/form-responses/view')
    // console.log(result.data)
    return result.data
}

export default function ViewData() {
    const data = useLoaderData()
    console.log(Object.entries(data[0].response))

    const dataMap = data.map((x,i)=>{
        return <div key={i}>
            {Object.entries(x.response[0])}
        </div>
    })
    
    return (
        <div>{dataMap}</div>
    )
}
