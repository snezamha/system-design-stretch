'use strict';

// Lesson 1: The Client and Server Model.
// Your standalone code and written observations for this lesson live here,
// as code and comments. The site work happens in the stretch-records folder.
//
// Step 4: how many requests did the single page load make? List three by name.
//
// Step 6: which files changed when you added the sixth artist, which did not,
// and why is that separation the point?
//
// Step 7: paste the console error the broken artists.json produced.
//
// Step 8: build one artist object, JSON.stringify() it, log the text,
// JSON.parse() it back, and log one property of the result.
//
// STRETCH, step 9: describe your page as a system. Name the client, name the
// server, and state what the request asked for and what the response carried.

// Step 4:
// A single page load made 16 requests.
// Three requests were:
// - artists.json
// - johnny-cash.jpg
// - miyagi-and-andy-panda.jpg

// Step 6:
// Changed files:
// - artists.json
// - script.js
//
// Unchanged files:
// - index.html
// - style.css
//
// Data can change without changing the code.

// Step 7:
// Console error after adding a trailing comma:
// SyntaxError: Unexpected token

// Step 8:
const artist = {
  name: 'Johnny Cash',
  genre: 'Country',
};

const text = JSON.stringify(artist);

console.log(text);

const parsedArtist = JSON.parse(text);

console.log(parsedArtist.name);

// STRETCH (Step 9):
// Client: the browser.
// Server: Live Server.
// Request: artists.json.
// Response: JSON data containing the artists.
