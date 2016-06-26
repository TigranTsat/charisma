module.exports = {
    /*
        return a list of numbers representing words said per second.
    */
  analyze_words: function (words_time) {
    var list_of_words = words_time.actions[0].result.document;
    if (list_of_words.length == 0) {
        console.warn("list_of_words.length == 0")
        return [];
    }
    var last_duration = list_of_words[list_of_words.length - 1].offset;
    var total_sec = Math.ceil(last_duration / parseFloat(1000));
    var seconds_stats = new Array(total_sec);
    for (var i = 0; i < seconds_stats.length; i++) {
        seconds_stats[i] = 0;
    }
    console.log("at point 12331");
    for (var i = 0; i < list_of_words.length; i++) {
        sec = Math.floor(list_of_words[i].offset / 1000);
        seconds_stats[sec]++;
    }
    return seconds_stats;
  },
  /*
    return a list of numbers. len(return) = 20.
    each number correspond to a group of 5% from 0 till 100.
    value means number of confidences per each group.
  */
  
  analyze_clarity: function (words_time) {
    var list_of_words = words_time.actions[0].result.document;
    if (list_of_words.length == 0) {
        console.warn("list_of_words.length == 0")
        return [];
    }else{
    	// There are 20 baskets of 5% increments
	    var confidence_counts = new Array(20).fill(0);
	     for (var i = 0; i < list_of_words.length; i++) {
	     	++confidence_counts[Math.floor(list_of_words[i].confidence/5)];
	     }
	     return confidence_counts;
 	}
  },
  /*
    returns list of numbers. len(return) = 20.
    each number correspond to a group of 5% from 0 till 100.
    value mean - number of word prononciation speeds per group.
    word prononciation spead = word duration / number of characters
  */
 /* analyze_word_durations: function(words_time) {
	var list_of_words = words_time.actions[0].result.document;
	    if (list_of_words.length == 0) {
	        console.warn("list_of_words.length == 0")
	        return [];
	    }
  }*/
};