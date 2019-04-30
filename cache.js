var reviewThreshold = 65;
const https = require('https');
const cheerio = require('cheerio');
const apikey = 'FED0454572CB5A53E4CD81A2E2B05CBF';
const gamelist_API_URL = 'https://api.steampowered.com/IStoreService/GetAppList/v1/?key=' + apikey + '&include_games=1';
const fs = require('fs');
const cacheWriteDelay = 1000 //milliseconds between writing each game to a cache file.


function updateGameCache() {
    var gameList = new Promise((resolve, reject) => {
        https.get(gamelist_API_URL, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                //var games = JSON.parse(data).applist.apps;
                var games = JSON.parse(data).response.apps;
                console.log("before resolve.")
                resolve(games);
            });
        }).on("error", (err) => {
            console.log("updateGameCache Error: " + err.message);
            reject();
        });
    }).then((games) => {
        console.log("Steam game API called successfully, writing to file");
        var gameWriteLoop = setInterval(function() {
            if (games.length > 0) {
                var game = games.pop();
                webscrapeGame(game).then( (gameJSON) => {
                    writeCacheFile(gameJSON);
                })
            } else {
                console.log("game list empty, ending write loop");
                clearInterval(gameWriteLoop);
            }
        }, cacheWriteDelay)
    })
}



function webscrapeGame(gameJSON) {
    return promise = new Promise((resolve, reject) => {
        let appid = gameJSON.appid;
        url = 'https://store.steampowered.com/app/' + appid;
        tags = [];
        reviewScore = 0;
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                const $ = cheerio.load(data);
                $("a.app_tag").each((i, elem) => {
                    tag = $(elem).text().trim();
                    tags.push(tag);
                });
                var reviewRatio = 0;
                $("div.user_reviews_summary_row[data-tooltip-html]").each((i, elem) => {
                    var reviewString = $(elem).attr("data-tooltip-html").match(/\d+/);
                    if (reviewString != null) {
                        var reviewNum = parseInt(reviewString[0]);
                        if (reviewNum > reviewRatio) {
                            reviewRatio = reviewNum;
                        }
                    }
                });
                gameJSON.reviewRatio = reviewRatio;
                gameJSON.tags = tags;
                resolve(gameJSON);
            });
        }).on("error", (err) => {
            console.log("Error webscraping: " + gameJSON.name + "\n" + err.message);
            reject();
        });
    });
}

//gameCache();
//getReviewData({appid: 3350});