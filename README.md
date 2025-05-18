# MovieHub

A React-based web application developed by Γιώργος Ατταλόγλου (2397) and Μάριος Ζαμπάρας (2435), bootstrapped with [Create React App](https://create-react-app.dev/).

## Table of Contents

- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Project Structure](#project-structure)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GeorgeAttaloglou/JS_App.git
   cd JS_App
   ```

2. **Install dependencies:**

   Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the project dependencies:

   ```bash
   npm install
   ```

3. **API integration**

   To run the app with full functionality:

   - **Create a TMDb account** and request an API key here: [TMDb API](https://www.themoviedb.org/settings/api).
   - **Create a `.env` file** in the project root and add your API key:

   ```
   REACT_APP_TMDB_API_KEY=your_api_key
   ```

 4. **Start the development server:**

   ```bash
   npm start
   ```

   The application will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

In the project directory, you can run:

* **`npm start`**: Runs the app in development mode.
* **`npm test`**: Launches the test runner in interactive watch mode.
* **`npm run build`**: Builds the app for production to the `build` folder.
* **`npm run eject`**: Removes the single build dependency from your project.

## API Documentation

MovieHub uses [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api) to fetch movie data including titles, posters, genres, ratings, and more.

### Authentication

All requests to the TMDb API require an API key. Store your key in the `.env` file as described above. The app uses this key to authenticate requests.

### Example API Request

To fetch popular movies:

```js
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
   .then(response => response.json())
   .then(data => console.log(data));
```

### Endpoints Used

- **Get Popular Movies:**  
   `GET /movie/popular`
- **Search Movies:**  
   `GET /search/movie?query={query}`
- **Get Movie Details:**  
   `GET /movie/{movie_id}`
- **Get Genres:**  
   `GET /genre/movie/list`

Refer to the [TMDb API documentation](https://developers.themoviedb.org/3) for more details on available endpoints and parameters.

### Rate Limiting

TMDb enforces rate limits. Avoid making excessive requests in a short period to prevent being blocked.

## Database

MovieHub uses [Supabase](https://supabase.com/) as its backend database solution. Supabase provides a hosted PostgreSQL database and authentication services, enabling features such as:

- **User Authentication:** Secure sign-up, login, and session management.
- **User Profiles:** Storing and retrieving user information.
- **Movie Logging:** Saving movies watched or added by users.
- **Custom Lists:** Creating and managing personalized movie lists.

### Database Setup

1. **Create a Supabase Project:**  
   Sign up at [Supabase](https://supabase.com/) and create a new project.

2. **Configure Environment Variables:**  
   Add your Supabase project URL and API key to your `.env` file:

   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Database Tables:**  
   The following tables are used:
   - `users`: Stores user profile data.
   - `logs`: Stores movie entries linked to users.
   - `lists`: Stores custom movie lists for each user.

Refer to the Supabase [documentation](https://supabase.com/docs) for details on schema design and API usage.

All database interactions are handled securely via Supabase's client libraries.

## Project Structure

The project's structure is as follows:

```
JS_App/
├── public/
│   ├── pictures
│   └── index.html
├── src/
│   ├── Components/
│   ├── Contexts/
│   ├── Pages/
│   ├── App.js
│   ├── index.js
│   ├── supabaseClient.js
│   └── ...
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

* **`public/`**: Contains the HTML file and images.
* **`src/`**: Contains the React components and JavaScript files.
* **`Contexts/`**: Contains context providers for state management.
* **`supabaseClient.js`**: Initializes the Supabase client for database interactions.
* **`package.json`**: Lists dependencies and project metadata.

## License

This project is licensed under the [MIT License](LICENSE).
