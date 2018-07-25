
var fs = require("fs"),
    request = require('request'),
    scraper = require('images-scraper');

function dl_img(url, filename, err_cb) {

}

function scrape(search_string, n, show_head) {
    google = new Scraper.Google();

    google.list({
        keyword: search_string,
        num: n,
        detail: true,
        nightmare: {
            show: show_head
        }
    })
    .then(function (res) {
        res.map( obj => fs.appendFileSync("./tmp/"+search_string+".txt", obj.url+"\n", function(err) {
            if(err) {
                return console.log(err);
            }
        })
        )
    }).catch(function(err) {
        console.log('err', err);
    });
}

// normalize args
var args = process.argv.slice(2);
var show_head = (args[2]) ? false : true;
var n = (args[1]) ? args[1] : 50;
scrape(args[0], n, show_head);
