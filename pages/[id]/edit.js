import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Button, Form, Loader, loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const EditNote = ({ note }) => {
  // set initial states
  const [form, setForm] = useState({ title: note.title, description: note.description });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // initialization
  const router = useRouter();

  // submit form if no errors
  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  // create a new note
  const updateNote = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // triger on form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // check for errors
    let errs = validate();

    setErrors(errs);
    setIsSubmitting(true);
  };

  // triger as the form fields content changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // check if form fields are empty
  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = "Title is required";
    }

    if (!form.description) {
      err.description = "Description is required";
    }

    return err;
  };

  return (
    <div className="form-container">
      <h1>Update Note</h1>

      <div>
        {isSubmitting ? (
          <Loader active inline="center" />
        ) : (
          <Form onSubmit={handleSubmit}>
            {/* title field */}
            <Form.Input
              fluid
              error={
                errors.title
                  ? { content: "please enter a title", pointing: "below" }
                  : null
              }
              label="Title"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            {/* description field */}
            <Form.TextArea
              fluid
              error={
                errors.description
                  ? { content: "please enter a description", pointing: "below" }
                  : null
              }
              label="Description"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />

            <Button type="submit">Update</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

EditNote.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  
    const data = await res.json();
  
    return { note: data.date };
  };

export default EditNote;