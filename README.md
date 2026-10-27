# TV Show Gallery

This is a React version of my TV show search assignment. It uses the TVmaze API to search for shows and display their details, posters, and cast members.

## Run the Project

Open a terminal in the project folder and run:

```bash
npm install
npm run dev
```

Open the localhost link shown in the terminal.

To check the production build, run:

```bash
npm run build
npm run preview
```

The main component file is `src/app.jsx`. The import in `main.jsx` uses the same lowercase spelling.

## Required React Concepts

| Requirement | File and Example |
| --- | --- |
| 1. Components and props | `src/app.jsx` passes props to `SearchForm` and `ShowList`. Components are in separate files inside `src/components`. |
| 2. Lists and stable keys | `ShowList.jsx` maps shows using `show.id`. `CastList.jsx` maps cast members using person and character IDs. |
| 3. Conditional rendering | `ShowList.jsx` displays loading, error, empty search, no-results, and results messages. |
| 4. Controlled form | `SearchForm.jsx` uses `value` and `onChange`. The `searchShows` function in `app.jsx` calls `preventDefault()`. |
| 5. State | `app.jsx` uses `useState` for the search input, submitted term, shows, and request status. |
| 6. Effects and fetch | `app.jsx` loads the default search. Each `ShowCard.jsx` loads its cast using `useEffect`. Requests use `fetch()` and check `response.ok` before reading JSON. |
| 7. Lifted state | `app.jsx` shares search state with `SearchForm` and `ShowList`. `ShowList` displays the number of results and the search term. |
| 8. Routing | `main.jsx` sets up `BrowserRouter`. `app.jsx` defines the gallery and detail routes. `ShowDetail.jsx` uses `useParams` to read the show ID. |

## Features

- Searches for **friends** when the app first loads.
- Displays up to 10 shows.
- Shows a poster, summary, premiere date, last update, genres, rating, and main cast on each card.
- Displays a fallback message when an image or other information is unavailable.
- Provides a detail page with the show's status, network or streaming channel, and up to 15 cast members with their characters.
- Uses Flexbox to wrap cards on different screen sizes.
- Shows messages for empty searches, no results, failed requests, and HTTP 429 errors.
- Credits TVmaze in the footer.
- Uses React Router to navigate between the gallery and detail pages.

## Reflection Draft

Edit this section so it reflects your own experience before submitting.

The vanilla JavaScript version required me to find elements in the DOM, create cards, add text and links, and remove old results by hand. In React, I describe what each part should look like using components, and React updates the page when state changes. Breaking the interface into a search form, show list, cards, and detail page makes it easier to see what each part is responsible for. The controlled input also keeps the value in React state, so submitting a search can use that value directly. One harder part was deciding where each piece of state belongs and understanding when effects run, especially when Strict Mode runs effects twice during development. The query, submitted search term, results, and search status live in App because both the form and the gallery need them, and App remains mounted while navigating. Each card owns its cast state because it makes a separate request for its show. The detail page reads the ID from the URL and loads its own data, so it can work when opened directly. Testing the page helped me see how the components and API requests work together.

## AI Assistance

I used ChatGPT to help generate and simplify the components, API handling, CSS, and README. It also helped troubleshoot the Vite setup and update the app to use `fetch()` directly. I ran the app locally and tested the search, detail page, and images.

## References

- [TVmaze API documentation](https://www.tvmaze.com/api)
- [React documentation](https://react.dev/)
- [React Router documentation](https://reactrouter.com/)

The code was generated with AI assistance rather than copied from a tutorial.

## Direct Detail Links and Hosting

Vite supports refreshing a detail URL locally. A production host must serve `index.html` for routes such as `/shows/1`. GitHub Pages needs additional fallback configuration for these routes.