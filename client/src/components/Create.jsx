import { Form, redirect } from "react-router-dom";
import axios from "axios";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  const results = await axios.post("http://localhost:5500/form-responses", user);
  return redirect('/');
};

const Create = () => {
  return (
    <div>
      <h1>Create</h1>
      <Form method="post">
        <label htmlFor="name">Name </label>
        <input type="text" name="name" />
        <br />
        {/* <label htmlFor="todo">Add Todo </label>
        <input type="text" name="todo" />
        <br /> */}
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default Create;
