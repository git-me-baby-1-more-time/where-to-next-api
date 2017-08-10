# :palm_tree: :airplane: Where To Next? :airplane: :palm_tree:
## What is this?
Where To Next is like an online travel bucket list. We provide a list of cities from around the world, and allow you, the user, to choose what activities, landmarks, and food you would visit on your dream trip! The site includes a hopefully enticing photo of the city of your choice as well as a map, where the user can click around and find what area they would like to visit, as well as businesses to visit and adventures you can take while on the trip.

## Links
[Front End Repo](https://github.com/git-me-baby-1-more-time/where-to-next-front)

[Front End Deployed](https://git-me-baby-1-more-time.github.io/where-to-next-front/)

[Back End Deployed](https://aqueous-spire-71565.herokuapp.com/)

## Endpoints
### Authorization
Verb | URI Pattern | Action
--- | --- | ---
POST | `/sign-up` | `users#signup`
POST | `/sign-in` | `users#signin`
DELETE | `/sign-out/:id` | `users#signout`
PATCH | `/change-password/:id` | `users#changepw`

### Authorization (requires token)
Verb | URI Pattern | Action
--- | --- | ---
GET | `/users` | `users#index`
GET | `/users/:id` | `users#show`

### Locations (requires token)
Verb | URI Pattern | Action
--- | --- | ---
GET | `/locations` | `locations#index`
GET | `/locations/:id` | `locations#show`
PATCH | `/locations/:id` | `locations#update`
POST | `/locations` | `locations#create`
DELETE | `/locations/:id` | `locations#destroy`

### Location elements (requires token)
Verb | URI Pattern | Action
--- | --- | ---
GET | `/activities/:location_id` | `locations#addActivity`
DELETE | `/activities/:location_id` | `locations#removeActivity`
GET | `/landmarks/:location_id` | `locations#addLandmark`
DELETE | `/landmarks/:location_id` | `locations#removeLandmark`
GET | `/food/:location_id` | `locations#addFood`
DELETE | `/food/:location_id` | `locations#removeFood`
GET | `/comments/:location_id` | `locations#addComment`
DELETE | `/comments/:location_id` | `locations#removeComment`
