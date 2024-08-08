import React from "react";

function Notes() {
  return (
    <div>
      <h1>To Upload Image on mongoDB</h1>
      <hr />
      <div>
        <form action="/" method="POST" enctype="multipart/form-data">
          <div>
            <label for="name">Image Title</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value=""
              name="name"
              required
            />
          </div>
          <div>
            <label for="desc">Image Description</label>
            <textarea
              id="desc"
              name="desc"
              value=""
              rows="2"
              placeholder="Description"
              required
            ></textarea>
          </div>
          <div>
            <label for="image">Upload Image</label>
            <input type="file" id="image" name="image" value="" required />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <hr />
      <h1>Uploaded Images</h1>
      <div></div>
    </div>
  );
}

export default Notes;
