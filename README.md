# Parallel
Runs a bunch of promises like `Promise.all` does, but takes an object instead of array.

Keep the differences:
```js
Promise.all([foo(), bar(), baz(), qux()])
  .then(arr => magic(arr[2], arr[0], arr[1]));
```
vs
```js
prll({foo: foo(), bar: bar(), baz: baz(), qux: qux()})
  .then(r => magic(r.baz, r.foo, r.bar, r.qux));
```

Or with es6:
```js
prll({a: foobar(), b: bazqux()})
  .then(({a, b}) => magic(a, b));
```

### Example
```js
import 'prll' as parallel;

parallel(_.mapValues({
  questions: '/data/questions.json',
  cv: '/data/user/_cv.json'
}, url => $.ajax(url)))
  .then(({questions, cv}) => console.log(questions, cv));
```

### Alternativies
* [bluebird](https://github.com/petkaantonov/bluebird) [Promise.props](http://bluebirdjs.com/docs/api/promise.props.html)
