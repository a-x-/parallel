var parallel = tasks => {return new Promise((resolve, reject) => {

    var results = {},
        resultsCount = 0,
        tasksCount = _(tasks).size(),
        cb = resolve;

    return new Promise((resolve, reject) => {

        _(tasks)
            .mapValues(task => task())
            .forEach((promise, name) => promise.then(val => {
                results[name] = val;
                if (++resultsCount === tasksCount) cb(results);
            }))
            .value();

    });

})};

window && (window.parallel = parallel);
module.exports && (module.exports = parallel);
