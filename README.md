#### 1. **Import Modules and Set Up App**
**note**: Before viewing live open this url to wake up the api server https://car-blog-rest-api.onrender.com/ its should show **Cannot GET /** 
then proceed to the car blog.
**View live**: https://car-blog-rest-api-node.onrender.com/

```javascript
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://car-blog-rest-api.onrender.com";
```
- **API Explaination**: The api is explained here: https://github.com/iamrahul-l/car-blog-REST-API
- **express**: Framework to handle HTTP requests and routing.
- **body-parser**: Middleware to parse request bodies, especially for form submissions.
- **axios**: HTTP client used to send requests to the external API.

Here, `API_URL` is set to the base URL of the car blog API server, and `port` can be set in the environment or defaults to `3000`.

#### 2. **Middleware Setup**
```javascript
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```
- **`express.static`**: Serves static files from the `public` directory.
- **body-parser**: Parses incoming requests as either URL-encoded data (like from HTML forms) or JSON.

#### 3. **Route Definitions**

##### Home Route
```javascript
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});
```
This **GET** route for `/` fetches all posts from the API, logs them, and renders an `index.ejs` template with `posts` data. If an error occurs, it sends a `500` status and error message.

##### New Post Form
```javascript
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});
```
This **GET** route renders a form for creating a new post using `modify.ejs`, with `heading` and `submit` button text set for creating a new post.

##### Edit Post Form
```javascript
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});
```
This **GET** route fetches a specific post by `id` for editing. The post data is passed to `modify.ejs` for pre-filling the form fields. An error response is sent if the fetch fails.

##### Create Post
```javascript
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});
```
This **POST** route sends the form data in `req.body` to the API to create a new post. Upon success, it redirects to the homepage. If there’s an error, a `500` status is returned.

##### Update Post
```javascript
app.post("/api/posts/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});
```
This **POST** route updates a specific post using the `id` parameter. After updating, it redirects to the homepage. In case of failure, it returns a `500` error status.

##### Delete Post
```javascript
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});
```
This **GET** route deletes a post by `id` and redirects to the homepage afterward. If deletion fails, it returns a `500` error.

#### 4. **Server Start**
```javascript
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
```
The server starts and listens on the specified port, logging a message to the console.

### Documentation for GitHub

#### Project Structure
```
/public            # Static files (CSS, images, etc.)
/views             # EJS templates
app.js             # Main application file
package.json       # Project dependencies and scripts
```

#### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Server**
   ```bash
   npm start
   ```
   By default, the server runs on `http://localhost:3000`.

#### Environment Variables

- **PORT**: (Optional) Port for the server. Defaults to `3000` if not set.
- **API_URL**: The base URL for the car blog REST API, defaulting to `https://car-blog-rest-api.onrender.com`.

#### Routes Documentation

| Route                | Method | Description                        |
|----------------------|--------|------------------------------------|
| `/`                  | GET    | Fetch and display all blog posts.  |
| `/new`               | GET    | Render form to create a new post.  |
| `/edit/:id`          | GET    | Render form to edit a specific post. |
| `/api/posts`         | POST   | Create a new post.                 |
| `/api/posts/:id`     | POST   | Update a specific post by ID.      |
| `/api/posts/delete/:id` | GET | Delete a specific post by ID.      |

#### EJS Views

- **index.ejs**: Displays the list of posts.
- **modify.ejs**: Shared template for creating and editing posts.

#### Error Handling

The application responds with a `500` status and an error message JSON if any API call fails. Each route also logs relevant response or error data for debugging.

#### Example Usage

To add a new post:
- Go to `http://localhost:3000/new`.
- Fill out the form and submit.
- The new post appears on the homepage.

### Example GitHub README

```markdown
# Car Blog Express Server

This Express server provides routes for creating, reading, updating, and deleting car blog posts through an external REST API.

## Installation

Clone the repository:
```bash
git clone https://github.com/yourusername/car-blog-express.git
cd car-blog-express
```

Install dependencies:
```bash
npm install
```

## Usage

To start the server:
```bash
npm start
```
