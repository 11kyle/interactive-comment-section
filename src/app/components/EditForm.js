"use client"

import { useState } from "react";
import Button from "./Button";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function EditForm(props) {
  const [text, setText] = useState(props.text)

  const handleSubmit = (event) => {
    event.preventDefault()
    props.updateComment(text)
    // clear textarea
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment" className="sr-only">
        Add your comment
      </label>
      <textarea
        rows={4}
        name="comment"
        id="comment"
        placeholder="Add a comment..."
        value={text}
        onChange={e => setText(e.target.value)}
        className="block w-full rounded-lg border-none px-2.5 py-1.5 text-dark-blue body-md ring-1 ring-inset ring-light-gray placeholder:text-grayish-blue focus:ring-1 focus:ring-inset focus:ring-moderate-blue focus-visible:outline-none resize-none"
        // defaultValue={''}
      />
      <div className="w-full inline-flex justify-end items-center mt-4">
        <Button type="submit" disabled={text.length < 1}>Update</Button>
      </div>
    </form>
  )
}
