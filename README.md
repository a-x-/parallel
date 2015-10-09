# parallel
Run object of functions of promises in parallel and return promise where all are done.

### Why not Promise.all?
Prll works with object instead of standart Promise.all, which support only arrays.

### Use cases?
```js
parallel(_.mapValues(
    { questions: '/data/questions.json', cv: '/data/user/_cv.json' },
    url => () => $.ajax(url)
))
.then(this.storeData)
.then(this.chooseCar)
```

```js
/**
 * @param {Object} data
 * @param {Object[]} data.questions
 */
chooseCar(data) {
  return data.questions[Math.floor(Math.random() * data.questions.length)];
}
```

So, are you see that `Promise.all` is useles?

### Dependencies
* Promise
