var data = require('./data.js')
var analyzers = require('./analyzers.js')
//console.log(JSON.stringify(data.get_words_time()))

word_times = data.get_words_time()
var res = analyzers.analyze_words(word_times)
console.log(res)

var clarity = analyzers.analyze_clarity(word_times)
console.log(clarity)


var word_duration = analyzers.analyze_word_durations(word_times)
console.log(word_duration)

var word_distribution = analyzers.analyze_word_distribution(word_times)
console.log(word_distribution)