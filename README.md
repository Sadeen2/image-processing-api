# Image Processing API

## Project Description
Image Processing API is a Node.js and Express service written in TypeScript that resizes images using URL query parameters.  
To improve performance, resized images are cached in a local thumbnail directory so repeated requests for the same dimensions are served faster.

## Features
- Resize images dynamically via HTTP query parameters.
- Cache processed images to avoid repeated expensive image operations.
- Serve images through a simple REST-style endpoint.
- Strong typing and maintainability with TypeScript.
- Test coverage for API behavior and image utility logic using Jasmine and Supertest.
- Code quality tooling with ESLint and Prettier.

## Project Structure
```text
image-processing-api
|
|-- images
|   |-- full        (original images)
|   `-- thumb       (resized cached images)
|
|-- src
|   |-- routes
|   |-- utilities
|   |-- tests
|   `-- index.ts
|
|-- build
|-- package.json
`-- tsconfig.json
```

## Installation
Install dependencies:

```bash
npm install
```
## Requirements

- Node.js (v16 or higher)
- npm

## Running the Server

Start the development server:

```bash
npm start
```
## The server will run on:
http://localhost:3000


## Available Scripts
| Script | Description |
|---|---|
| `npm start` | Start the API server in development mode. |
| `npm run build` | Compile TypeScript source files into JavaScript (`build/`). |
| `npm test` | Build the project and run Jasmine test suites. |
| `npm run lint` | Run ESLint checks on TypeScript files. |
| `npm run format` | Format project files using Prettier. |

## API Endpoint Documentation
### `GET /api/images`
Resizes a source image from `images/full` and returns the processed result.

#### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `filename` | `string` | Yes | Name of the source image file (without extension). |
| `width` | `number` | Yes | Target image width in pixels. |
| `height` | `number` | Yes | Target image height in pixels. |

#### Behavior
- If a matching resized image already exists in `images/thumb`, the cached version is returned.
- If not cached, the API uses `sharp` to resize the original image and stores it in `images/thumb`.

## Example Request URL
```text
http://localhost:3000/api/images?filename=rose&width=200&height=200
```
When visiting this URL in the browser, the API will return the resized image.
If the image was already generated previously, the cached version stored in `images/thumb` will be served instead.

## Technologies Used
| Category | Technologies |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Language | TypeScript |
| Image Processing | Sharp |
| Testing | Jasmine, Supertest |
| Code Quality | ESLint, Prettier |

## Notes
- **Caching:** Resized images are saved in `images/thumb` using filename and dimensions. This reduces response time for repeated requests.
- **JPG support:** Source images are expected to be available as `.jpg` files in `images/full`. Ensure files exist and names match the `filename` query value.
