# Fetch: PATCH & DELETE

### Objectives

- Make PATCH and DELETE requests using values submitted through Click events

- PATCH and DELETE objects using .fetch()

- Render new data to the DOM

### Using JSON Server

- Install JSON Server by running the following command in the terminal: `npm install -g json-server`
- For today's exercise, to start the JSON server, run `json-server --watch db.json --routes routes.json` while in the directory that contains the `db.json` file i.e. `SENG-LIVE-013122-phase-1/07-async-fetch`
- For this project, we will use the following endpoint: `http://localhost:3000/characters`

### Deliverables

1. Complete the POST request with a new comment and render to the DOM

   - Need to append the new comment to the DOM on the `commentsDiv`. Currently commentsDiv is out of scope to renderComment after the form is submitted.
   - Reset the form back to an empty field.

2. Make a POST request with a new character submitted with the `#new-poke-form`and render to the DOM

3. Make a PATCH request after the like button has been clicked to update the number of likes of the character.

4. Make a DELETE request after the delete button on a character card. 

### Resources

- [HTTP Verbs / JavaScript’s Fetch API](https://medium.com/@9cv9official/what-are-get-post-put-patch-delete-a-walkthrough-with-javascripts-fetch-api-17be31755d28)
