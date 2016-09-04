/**
 * @file
 * @example
 * import prll from 'prll';
 * prll({ a: () => new Promise(resolve => resolve(1)) }).then(data => console.log(data));
 * // --> {a:1}
 */

var _ = require('lodash');
var parallel = function(tasks) {return new Promise(function(resolve, reject) {

    var results = {},
        resultsCount = 0,
        tasksCount = _(tasks).size(),
        cb = resolve;

    return new Promise(function(resolve, reject) {

        _(tasks)
            .mapValues(function(task) {
                return typeof task === 'function' ? task() : task
            })
            .forEach(function(promise, name) {
                if (!(promise instanceof Promise)) {
                    promise = Promise.resolve(promise)
                }
                promise.then(function(val) {
                    results[name] = val;
                    if (++resultsCount === tasksCount) cb(results);
                });
            })
            .value();

    });

})};

typeof window != 'undefined' && (window.parallel = parallel);
module.exports && (module.exports = parallel);
