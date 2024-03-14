import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLoaderData, Form, redirect } from 'react-router-dom'


export const loader = async () => {
    const result = await axios.get('http://localhost:3000/form-responses')
    // console.log(result.data)
    return result.data
}

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    // console.log(formData.getAll);
//     formData.forEach(x=>{
//         console.log(x)
//     })
const userArr = []
   formData.entries().forEach(x=>
    userArr.push(x)
    )
// console.log(userArr);

    const results = await axios.post("http://localhost:3000/form-responses", userArr);
    return user
    // return redirect('/');
  };
  


const Home = () => {
    const questions = useLoaderData()
    const [questionSet, setQuestionSet] = useState()

    useEffect(() => {
        setQuestionSet(getRandom(questions, 2))
    }, [])

    function getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length - 1,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }


    return (
        <div>
            <h1>Home</h1>
            <Form method='post'>
                <div>
                    {questionSet && questionSet.map((x, i) =>
                        <div key={i}>
                            <fieldset><legend>{x.Question}</legend>
                                <input type="radio" id={x.Option_A} value={x.Option_A} name={x.Question} />
                                <label htmlFor={x.Option_A}>{x.Option_A}</label>
                                <input type="radio" id={x.Option_B} value={x.Option_B} name={x.Question} />
                                <label htmlFor={x.Option_B}>{x.Option_B}</label>
                            </fieldset>
                        </div>
                    )}
                </div>
                <button type="submit" >Submit</button>
            </Form>
        </div>
    )
}

export default Home