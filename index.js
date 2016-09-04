/**
 * @file
 * @example
 * import prll from 'prll';
 * prll({ a: () => new Promise(resolve => resolve(1)) }).then(data => console.log(data));
 * // --> {a:1}
 */

var _ = require('lodash');
var parallel = function(tasks) {

    var results = {},
        resultsCount = 0,
        tasksCount = _(tasks).size();

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
                    if (++resultsCount === tasksCount) resolve(results);
                });
                promise.catch(function(err) {
                    reject(err);
                });
            })
            .value();

    });

};

typeof window != 'undefined' && (window.parallel = parallel);
typeof module != 'undefined' &&  module.exports && (module.exports = parallel);
