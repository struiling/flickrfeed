function getFeed(feed_req) {
    var feed_url;
    //var feed_options = { format: "json" };

    feed_url = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&callback=?";
    
    $.getJSON( feed_url, function(feed) {

        console.log("fetched " + feed_req + " feed");

        
        
    });
}

function jsonFlickrFeed(data) {
    console.log("data ", data);

    var firstPhoto = data.items[0].media.m;

    console.log(firstPhoto);
    $('.content').append('<img class="main-photo" src="' + firstPhoto +'" />');
//    display_stream(feed);
    
    for (var i = 0; i < data.items.length; i++) {
        $('.footer').append('<img class="thumb-photo" src="' + data.items[i].media.m +'" />');
    }
    
    $('.thumb-photo').on('click', function() {
        $('.main-photo').attr('src', $(this).attr('src'));

    });
}


function display_stream(feed) {
    //console.log("displaying stream");
    //var limitedTweets = feed.data.slice(0,3);
    //console.log(JSON.stringify(limitedTweets));
    var tweets = tweetBlock(feed.data, "below");
    
    $('#twitter-stream .loader').remove();
    $('#twitter-stream .tweet-stream').append(tweets);   
}


function tweetBlock(feed, mediaPos) {
    var output_html = '';

    if (typeof feed !== 'undefined') {

        for (var i = 0; i < feed.length; i++) {
            var item = feed[i];
//          console.log("in highlights_feed, media length: " + item.media.length + " " + JSON.stringify(item.media));

            output_html += '</div>';
        }

        //console.log(output_html);

    } else {
        // no highlights to be found
        output_html = '<p>No photos found.</p>';
    }
    return output_html;

}

$(document).ready(function() {

    getFeed();

});