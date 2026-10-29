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

## Reflection

For the previous assignment, I used vanilla JavaScript to create and update the show cards on the page. With React, I learned how components can split the page into smaller parts. Instead of manually updating the DOM, the page changes when the state changes. I found it helpful to have separate components for the search form, show list, cards, and detail page.
One part that took more thought was figuring out where the state should go. The search input, search term, results, and request status are stored in `app.jsx` because the search form and show list both need that information. Each show card manages its own cast request and loading state.
I also learned how React Router uses the show ID in the URL to load the correct detail page. I tested the search, the no-results message, and the detail page by refreshing it. Adding the poster images helped me practice handling missing data. The project gave me a better understanding of how React organizes an app compared with vanilla JavaScript.

## AI Assistance

## AI Assistance

I used ChatGPT mainly to help troubleshoot errors, understand how certain React features worked, and figure out issues with API requests and images not displaying. I also used it for suggestions on organizing my code and improving my README. I tested the project locally to make sure everything was working correctly.

## References

- [TVmaze API documentation](https://www.tvmaze.com/api)
- [React documentation](https://react.dev/)
- [React Router documentation](https://reactrouter.com/)

The code was generated with AI assistance rather than copied from a tutorial.

## Direct Detail Links and Hosting

Vite supports refreshing a detail URL locally. A production host must serve `index.html` for routes such as `/shows/1`. GitHub Pages needs additional fallback configuration for these routes.
