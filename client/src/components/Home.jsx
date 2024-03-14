import axios from 'axios'
import {Link, useLoaderData} from 'react-router-dom'

export const loader = async () => {
    const result = await axios.get('http://localhost:5500/form-responses')
    console.log(result.data);
    return result.data
}


const Home = () =>{
    const users = useLoaderData()
    console.log(users)

    const userMap = users.map(x=>
        <div key={x._id}>
            <Link to={`/user/${x._id}`}>{x.name}</Link>
        </div>
    )

    return (
        <div>
            <h1>Home</h1>
            <div>
               {userMap}
            </div>
        </div>
    )
}

export default Home