'use strict';

// Lesson 2: Asynchronous JavaScript and the Event Loop.
// Standalone programs and observations go in this file as code and comments.

// ===== Provided program (task step 2): predict before you run =====
// Write your predicted output order as a comment BELOW, before running this
// file with node. Then run it, mark each line of your prediction right or
// wrong, and correct the wrong ones with one sentence each explaining why.

console.log('doors open');
setTimeout(() => console.log('encore'), 1000);
setTimeout(() => console.log('soundcheck'), 0);
console.log('main act');
setTimeout(() => console.log('intermission'), 500);
console.log('lights down');

// Your prediction:
// 1. doors open
// 2. encore
// 3. soundcheck
// 4. main act
// 5. intermission
// 6. lights down

// Correct order:
//
// 1. doors open
// 2. main act
// 3. lights down
// 4. soundcheck
// 5. intermission
// 6. encore

// ===== Provided program (task step 4): trace the call stack =====
// Trace this as a written call stack diagram in comments, listing every push
// and pop in order. Then cause an error inside the innermost function and
// confirm the stack trace in the console matches your diagram, innermost
// first. Keep it commented out while you work on step 2.

// Call stack:
//
// Push Global
// Push prepare()
// Push format()
//
// Pop format()
// Pop prepare()
//
// Global remains

let count = 10;

const timer = setInterval(() => {
  console.log(count);

  count--;

  if (count < 0) {
    clearInterval(timer);

    console.log('Countdown finished.');
  }
}, 1000);

// function prepare(artist) {
//   return "Now playing " + format(artist);
// }
// function format(artist) {
//   return artist.name.toUpperCase();
// }
// console.log(prepare({ name: "Asake" }));
