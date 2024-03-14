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
    // console.log(Object.entries(data[0].response))
    // console.log(data)

    const dataMap = Object.entries(data).map((x, i) => {
        return <div key={i}>
            {x[1].response}
        </div>
    })

    return (
        <div>test view
            {data && dataMap}
        </div>
    )
}
