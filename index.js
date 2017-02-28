/**
 * @file
 * @example
 * import prll from 'prll';
 * prll({ a: () => new Promise(resolve => resolve(1)) }).then(data => console.log(data));
 * // --> {a:1}
 */

var mapValues = require('lodash.mapvalues');
var size = require('lodash.size');

var parallel = function(tasks) {

    var results = {},
        resultsCount = 0,
        tasksCount = size(tasks);

    return new Promise(function(resolve, reject) {

        var tasks_ = mapValues(tasks, function(task) {
            return typeof task === 'function' ? task() : task
        });

        mapValues(tasks_, function(promise, name) {

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

        });

    });

};

typeof window != 'undefined' && (window.parallel = parallel);
typeof module != 'undefined' &&  module.exports && (module.exports = parallel);
