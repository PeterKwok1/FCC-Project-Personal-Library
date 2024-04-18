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

    .delete(async (req, res) => {
      const result = bookModel.deleteMany({})
      res.send('complete delete successful')
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      try {
        const bookDoc = await bookModel.findById(bookid)
        res.json({ // fcc test wanted this order. 
          comments: bookDoc.comments,
          _id: bookDoc._id,
          title: bookDoc.title,
          commentcount: bookDoc.commentcount,
          __v: bookDoc.__v
        })
      } catch (err) {
        res.send('no book exists')
      }
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        res.send('missing required field comment')
        return
      }
      try {
        let bookDoc = await bookModel.findById(bookid)
        bookDoc.comments.push(comment)
        bookDoc = await bookDoc.save()
        res.json({
          comments: bookDoc.comments,
          _id: bookDoc._id,
          title: bookDoc.title,
          commentcount: bookDoc.commentcount,
          __v: bookDoc.__v
        })
      } catch (err) {
        res.send('no book exists')
      }
      //json res format same as .get
    })

    .delete(async (req, res) => {
      let bookid = req.params.id;
      try {
        const bookDoc = await bookModel.findByIdAndDelete(bookid)
        if (!bookDoc) {
          throw new Error('no book found') // findByIdAndDelete does not throw an error if nothing is found. 
        }
        res.send('delete successful')
      } catch (err) {
        res.send('no book exists')
      }
      //if successful response will be 'delete successful'
    });

};
