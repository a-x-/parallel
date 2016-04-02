# parallel
Run object of functions of promises in parallel and return promise where all are done.

### Why not Promise.all?
Prll works with object instead of standart Promise.all, which support only arrays.

### Use cases?
```js
import 'prll' as parallel;

parallel(
    // { questions: Function, cv: Function }
    _.mapValues(
        {
            questions: '/data/questions.json',
            cv: '/data/user/_cv.json'
        },
        url => () => $.ajax(url)
    )
)
.then(/* do stuff */);
```

### Dependencies
* Promise
