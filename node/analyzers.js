module.exports = {
    /*
        return a list of numbers representing words said per second.
    */
  analyze_words: function (words_time) {
    console.log("words_time:", words_time);
    var list_of_words = words_time.actions[0].result.document;
    if (list_of_words.length == 0) {
        console.warn("list_of_words.length == 0")
        return [];
    }
    var last_duration = list_of_words[list_of_words.length - 1].offset;
    if (last_duration < 1000 || last_duration == NaN || last_duration == undefined ) {
        console.warn("last_duration < 1000. ", list_of_words, 
                     "last_duration = ", last_duration,
                     "last word group", list_of_words[list_of_words.length - 1]);
        throw { name: 'wrong data' }
    }
    var total_sec = Math.ceil(last_duration / parseFloat(1000));
    console.log("Creating array with total_sec = ", total_sec, "last_duration = ", last_duration);
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

  analyze_full_text: function (words_time) {
    console.log("words_time:", words_time);
    var list_of_words = words_time.actions[0].result.document;

    var full_text = "";
    for (var i = 0; i < list_of_words.length; i++) {
        full_text += ' ' + list_of_words[i].content;
    }
    return full_text;
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
	    var confidence_counts = new Array(20);
        for (var i = 0; i < confidence_counts.length; i++) {
            confidence_counts[i] = 0;
        }
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
    analyze_word_durations: function(words_time) {
	var list_of_words = words_time.actions[0].result.document;
	    if (list_of_words.length == 0) {
	        console.warn("list_of_words.length == 0")
	        return [];
	    }else{
	    	pronunciation_speed = new Array(list_of_words.length);
	        for (var i = 0; i < pronunciation_speed.length; i++) {
                pronunciation_speed[i] = 0;
            }
	    	for (var i = 0; i < list_of_words.length; i++) {
	    		pronunciation_speed[i] = list_of_words[i].duration/list_of_words[i].content.length;
	    		
	    	}
	    	return pronunciation_speed;
	    }
	},


	/*
	Returns an object list of words with their counts to show the distribution of words
	*/

	analyze_word_distribution: function(words_time) {
		var list_of_words = words_time.actions[0].result.document;

		if (list_of_words.length == 0) {
	        console.warn("list_of_words.length == 0")
	        return [];
	    } else {
	    	var arr = new Object();
	    	var banned = ["and", "the", "a", "this", "is", "that","you","he","she","it","them","an","on","in","or","of","to","I"];
			for (var i = 0; i < list_of_words.length; i++) {
				// If word in arr increment
				// Else add word and set count to 1
				word = list_of_words[i].content;
				if (list_of_words[i].content in arr) {
					arr[word] += 1;
				} else if (banned.indexOf(word) == -1) {
					arr[word] = 1;
				}
			}
            // Create items array
            var items = Object.keys(arr).map(function(key) {
                return [key, arr[key]];
            });

            // Sort the array based on the second element
            items.sort(function(first, second) {
                return second[1] - first[1];
            });
            // console.log(">>items", items);
            // >>items [ [ 'experience', 4 ],
            //   [ 'everyone', 2 ],
            //   [ 'amazing', 2 ],
		    return items;
	    }
	},
	
    /*
        cluster words to buskets
    */
    
    analyze_words_baskets: function(words_time) {
    	var list_of_words = words_time.actions[0].result.document;
        var word;
        var basket = {bad_words:0,buzzwords:0, not_desireble:0, neutral:0}
        //Index 0
        var bad_list = ["fuck", "shit","asshole","whore","everyone"];
        //index 1
        var buzz_list = ["technology","machine","awesome","hack"];
        //index 2
        var not_list = ["weakness", "my topic is", "sorry for", "the next slide shows"];
        //index 3

        for (var i = 0; i < list_of_words.length; i++) {
				// If word in a basket then increment
				// Else add word to neautral and set count to +1

				word = list_of_words[i].content;
				if (bad_list.indexOf(word) > -1) {
					basket["bad_words"] += 1;
				} else if(buzz_list.indexOf(word) > -1) {
					basket["buzzwords"] += 1;
				}else if (not_list.indexOf(word) > -1) {
					basket["not_desirible"] += 1;
				}else{
					basket["neutral"] +=1;
				}
		}
		return basket;
    }
};
