# Lesson 5: The System Audit

The written audit of your running system. Every claim must be backed by
something you observed in the Network tab, the console, or the server's
terminal output.

## Single point of failure

I stopped json-server while the page was open and reloaded the page and I saw the message: We could not load the artists, because the server was no longer running.
A stopped server caused the entire system to fail.
Redundancy means running more than one server so that another server could continue responding if one failed.

## Latency

I enabled the Slow 3G preset in the DevTools Network tab and reloaded the page.
The page loaded in 4.22 seconds.
While waiting, the page displayed the loading message before the artist cards were rendered.
The delay between sending the request and receiving the response was latency.

## Caching

With the cache disabled, the page loaded more slowly.
With the cache enabled, the page loaded faster because the browser reused previously downloaded resources and this demonstrated caching.

## The layers

Presentation layer:
- The cards
- The form
- The browser page
Application layer:
- The JavaScript code
- The fetch requests
- Basic client-side logic
Data layer:
- artists.json
- label.json

## One request's full journey

The browser sent a GET request to: http://localhost:3000/artists
The request appeared in the Network tab with a 200 OK status.
The json-server terminal logged the request.
The server read the data from artists.json and returned a JSON response.
The fetch request received the response.
response.json() parsed the data.
renderCards() created the cards.
The cards were displayed in the browser.

## STRETCH: what a real system would need that json-server skipped

A real system would need:
- Validation
- Identity
- Business rules
Lesson 4 proved that validation cannot live only in the browser because client-side code can be edited, bypassed, or replaced.