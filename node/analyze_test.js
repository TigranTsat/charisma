var data = require('./data.js')
var analyzers = require('./analyzers.js')
//console.log(JSON.stringify(data.get_words_time()))

word_times = data.get_words_time()
var res = analyzers.analyze_words(word_times)
console.log(res)