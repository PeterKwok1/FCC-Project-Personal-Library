/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const mongoose = require('mongoose')
const bookModel = require('../models.js')

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      res.json(await bookModel.aggregate([
        { $match: {} }
      ]))
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(async (req, res) => {
      let title = req.body.title;
      if (!title) {
        res.send('missing required field title')
        return
      }
      const bookDoc = bookModel({
        'title': title
      })
      res.json(await bookDoc.save())
      //response will contain new book object including atleast _id and title
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      try {
        const bookDoc = await bookModel.findById(bookid)
        res.json(bookDoc)
      } catch (err) {
        res.send('no book exists')
      }
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });

};
