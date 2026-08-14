'use strict';

// Lesson 3: Promises, async, and await.

// Step 3: Ordering puzzle.

// Prediction:
// 1. one
// 2. four
// 3. three
// 4. two

console.log('one');

setTimeout(() => {
  console.log('two');
}, 0);

Promise.resolve().then(() => {
  console.log('three');
});

console.log('four');

// Actual output:
// 1. one
// 2. four
// 3. three
// 4. two

// The Promise callback beat the timer because the microtask queue always runs
// before the task queue when the call stack becomes empty.

// Step 6: Final rethrown message.

// Artist page load failed while loading artists.
// Required data is missing name.
