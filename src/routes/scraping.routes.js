const PORT = 8000;
const connection = require("../db-config");
const router = require("express").Router();

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const newspapers = [
  {
    name: "reporterre",
    address: "https://reporterre.net/Climat-18",
    base: "https://reporterre.net/",
  },
];

const articles = [];

newspapers.forEach((newspaper) => {
  axios.get(newspaper.address).then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);

    $(
      'a:contains("climat"), a:contains("environnement"), a:contains("nature"), a:contains("canicule"), a:contains("sécheresse"), a:contains("océan")',
      html
    ).each(function () {
      const desc = $(this).text();
      const url = $(this).attr("href");
      const title = $(this).find("p").text();

      articles.push({
        title,
        url: url,
        source: newspaper.base + url,
        desc,
      });
    });
  });
});

router.get("/", (req, res) => {
  res.json(articles);
});

// router.get('/news:newspaperID', async (req, res) => {
//     const newspaperID = req.param.newspaperID

//     const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperID)[0].address
//     const newspaperBase =  newspapers.filter(newspaper => newspaper.name == newspaperID[0].base)

//     axios.get(newspaperAddress)
//             .then(res => {
//                 const html = res.data
//                 const $ = cheerio.load(html)
//                 const specificArticles = []

//                 $('a:contains("climatique")', html).each(function () {
//                     const title = $(this).text()
//                     const url = $(this).attr('href')
//                     specificArticles.push({
//                         title,
//                         url: newspaperBase + url,
//                         source: newspaperID

//                     })
//             })
//             res.json(specificArticles)
//             }).catch (err => console.log(err))
// })

module.exports = router;
