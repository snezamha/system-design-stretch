'use strict';

// Lesson 4: HTTP and the Fetch API.
// Recorded observations go in this file as comments. The loader and form
// work happens in stretch-records/script.js, against the server you run
// with json-server.
//
// Step 2: both status codes and the response Content-Type.

// Observations:
// /artists status: 200 OK
// /nothing status: 404 Not Found
// Response body:
// {
//   "error": "Not Found"
// }
// Content-Type: application/json

// Step 3: ok, status, and one Access-Control-Allow header from the Network tab.

// Observations:
// response.ok = true
// response.status = 200
// Access-Control-Allow-Origin = *

// Step 4: show that the Promise fulfilled anyway on the wrong path.

// fetch('http://localhost:3000/nothing') returned a 404 response.
// The Promise was still fulfilled and entered the .then() block.
// fetch() does not reject on 404.
// An explicit response.ok check is required.
// if (!response.ok) {
//   throw new Error(`Request failed with status ${response.status}`);
// }

// Step 5: how did the refused connection differ from the 404?

// 404 returned a response from the server.
// A refused connection returned no response at all.
// 404 = the server answered.
// Failed to fetch = the server did not answer.

// Step 6:
// POST request sent to http://localhost:3000/artists
// Content-Type: application/json
// The request body was created with JSON.stringify().
// Response status: 201 Created
// The new artist remained after refreshing the page.
// The new artist was also visible in a second browser tab.
// The artist was stored in artists.json.

// Step 7:
// A second json-server was started on port 3001.
// Artists were fetched from http://localhost:3000/artists.
// Label information was fetched from http://localhost:3001/label.
// Promise.all() waited for both requests before rendering.

// Step 8 (MusicBrainz API):
// Endpoint address:
// https://musicbrainz.org/ws/2/
// Method:
// GET
// One parameter:
// query
// Response shape:
// JSON
// One stated limit:
// One request per second.

// STRETCH, step 8: the public API's endpoint address, the method, one
// parameter, the response shape you would code against, and one stated limit.
