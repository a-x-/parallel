Promise.all([
    require('.')({a:1}).then(a=>console.assert(a.a===1, 'then')),
    require('.')({a:1}).then(a=>console.assert(a.a!==5, 'not then')),
    require('.')({a:Promise.reject(1)}).then(()=>{},e=>console.assert(e===1, 'catch')),
    require('.')({a:Promise.reject(1)}).then(()=>{},e=>console.assert(e!==2, 'not catch'))
])
.then(()=>console.log('all tests passed'))
.catch((e)=>console.log('tests failed: ' + e))
