# aircall-phone-vue

Application ACPhone - Aircall Technical Exercice 
## About the project

ACPhone displays calls using Aircall API (GraphQL) and provides the following features:
- Pagination
- Group calls by date
- Archive call
- Add note to a call
- Calls update are handle on real time

![ACPhone Login Page][app-screenshot-1]
![ACPhone Home Page 1][app-screenshot-2]
![ACPhone Home Page 2][app-screenshot-3]
![ACPhone Home Page 3][app-screenshot-4]
![ACPhone Call Page][app-screenshot-5]

## Getting started

### Installation
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Built with 

The project was generated by Vue CLI 4. It uses: 
- Vue.js
- Vuex
- Vue Router
- Jest
- SASS
- GraphQL Apollo

The application is written in Typescript.

### Settings

Settings are define in the file `./src/constants/settings.ts`:
- `AUTH-TOKEN-NAME` define the token name store in localstorage
- `HTTP_TIMER_REFRESH_TOKEN` define the timer to refresh JWT token in milliseconds
- `HTTP_API_ENDPOINT_URI` define the GraphQL API endpoint
- `WS_API_ENDPOINT_URI` define the GraphQL API endpoint for WebSocket subscriptions
- `WS_KEEP_ALIVE_TIMEOUT` define keep alive timer
- `ITEMS_PER_PAGE` define number rows displayed by page on `ACList` component

## Technical details

Vuex Store is used to store JWT token and user informations (`id` and `username`).

Subscription to GraphQL `OnUpdateCall` to handle real time events is made on the Home page.

After log in, a timer is started to refresh every 30 seconds (`HTTP_TIMER_REFRESH_TOKEN`) the JWT token.

On the home page:
- we start by requesting the API `getPaginatedCalls` to get only the total number of calls (`totalCount` - `GET_CALLS_TOTAL_COUNT`)
- We retrieve all calls with minimum informations (`id`, `created_at`) using request `GET_CALLS_ID_CREATED_AT`
- We sort and group calls list by date (`created_at`)
- We finally can display the home page content

By clicking on a group calls section, we retrieve some calls informations (`id`, `creation`, `direction`, `from`, `to`, `is_archived`) of the selected date with 1 request using alias in the GraphQL request `GET_CALLS_BY_ID`.

On an update call event:
- We start looking with the date (`create_at`) to get the group calls
- Then we search on this group the call using the `id`

## In depth

```bash
├── node_modules
├── public
├── src
│   ├── assets
│   ├── components
│   │   └── **/*.vue
│   ├── filters
│   ├── graphql
│   ├── models
│   ├── router
│   ├── services
│   ├── store
│   ├── styles
│   │   └── **/*.scss
│   ├── utils
│   ├── views
│   │   └── **/*.scss
│   ├── App.vue
│   ├── main.ts
│   ├── shims-tsx.d.ts
│   └── shims-vue.d.ts
├── tests
│   └── unit
│       └── **/*.spec.ts
├── .browserslistrc
├── .eslintrc.js
├── .gitignore
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── vue.config.js
```

The application contains 3 pages:
- Login Page - `/login`
- Home Page - `/` - require JWT Token
- Call details Page - `/call/:id` - require JWT Token

This pages are defined in directory `./views`:
- `Login.vue`
- `Home.vue`
- `Call.vue`

The application use 6 components:
- `ACCall.vue` display call details
- `ACList.vue` a list component
- `ACListItem.vue` an item list component
- `ACLogin.vue` login form component
- `ACNote.vue` display a note
- `ACNotesList.vue` display a notes list

GraphQL queries (`query`, `mutation`, `subscription`) are located on directory `./graphlq` with one file by type:
- `mutations.ts`
- `queries.ts`
- `subscriptions.ts`

We define 2 services:
- `AircallService.ts` contains functions to request the Aircall API (GraphQL)
- `ApolloService.ts` initialize the GRaphQL Apollo Client (HTTP and WS)

Directory `./models` contains GraphQL types (interface) and custom interfaces / models.

Directory `./styles` contains 2 files which are automatically imported in the application in global (see `vue.config.js`):
- `_global.scss` contains common styles definitons 
- `_variables.scss` contains variables definitions

## Improvements

- Add a story book
- Don't store the token in localstorage: security breach (XSS)
- Create component for button
- Use UI Library for list (Vuetify, Buefy, etc...)
- Split ACList.vue component in smaller component:
  - pagination
  - header
- Add select element on pagination to change nb items displayed by page
- GraphQL client cache policies
- Add form validation on login inputs (`username` / `password`)
- Add more tests:
  - on Vue router navigation
  - on Vuex store mutations and getters


[app-screenshot-1]: _images/screenshot_1.png
[app-screenshot-2]: _images/screenshot_2.png
[app-screenshot-3]: _images/screenshot_3.png
[app-screenshot-4]: _images/screenshot_4.png
[app-screenshot-5]: _images/screenshot_5.png
