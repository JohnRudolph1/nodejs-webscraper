const PORT = 4200;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const url = "https://www.eventbrite.com/d/mo--st-louis/all-article";

app.get("/", function (req, res) {
  res.json("This is my webscraper");
});

app.get("/results", (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(".eds-event-card-content__content", html).each(function () {
        //<-- cannot be a function expression
           
        const title = $(this).find(".eds-event-card__formatted-name--is-clamped-three")
        .text(); 
        const date = $(this).find(".eds-event-card-content__sub-title").text();
        const location = $(this).find(".eds-event-card-content__sub").text();
        const url = $(this).find("a").attr("href");

        articles.push({
          title,
          date,
          location,
          url,
        });
      });
   
    let articlesNew = articles.filter(function(d, i){ return i%2 == 0; })
    
      res.json(articlesNew);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));


//look into async await
//use puppeteer to navigate through pages 
//loop that iterates thrught the pages 
//i+1
//set up condition to break the loop if no results 
