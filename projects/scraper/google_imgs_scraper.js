
const   Scraper = require('images-scraper'),
        download = require('image-downloader');

// keeps track of number assigned to each image
var i = 0;

// filename:string, uri: string -> null
function dl_img (filename, uri){
    const options =  {
        url: uri,
        dest: filename 
    }
    download.image(options)
    .then(({ filename, image }) => {
      console.log('File saved to', filename)
    })
    .catch((err) => {
      console.error(err)
    })
}

function scrape_aux(search_string, url, n) {
    // put the first 20% into the validation set, rest into training
    let validation_n = Math.floor(n * .20);
    let dir = (i > validation_n) ? "train" : "valid";
    let file_name = `./data/${dir}/${search_string}/${search_string}.${i++}.jpg`
    dl_img(file_name, url)
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
        res.map (obj => scrape_aux(search_string, obj.url, n))
    }).catch(function(err) {
        console.log('err', err);
    });
}

// normalize args
var args = process.argv.slice(2);
var show_head = (args[2]) ? true : false;
var n = (args[1]) ? args[1] : 50;
scrape(args[0], n, show_head);
