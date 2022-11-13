let express = require("express");
let router = express.Router();

let mongoose = require("mongoose");
const passport = require("passport");

let Survey = require("../models/survey");
// create the User Model instance
let User = require('../models/user');


module.exports.displayHomePage = (req, res, next) => {
  Survey.find((err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("index", {
        title: "Explorer Survey",
        SurveyList: surveyList,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
};

module.exports.displayAllSurvey = (req, res, next) => {
  Survey.find((err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("allsurvey", {
        title: "Survey List",
        SurveyList: surveyList,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
};

module.exports.performDeleteSurvey = (req, res, next) => {
  let id = req.params.id;

  //remove survey
  Survey.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //remove questions
      Question.remove({ SurveyId: id }, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          //remove options
          Option.remove({ SurveyId: id }, (err) => {
            if (err) {
              console.log(err);
              res.end(err);
            } else {
              //remove responses
              Response.remove({SurveyId: id}, (err) => {
                if(err){
                  console.log(err);
                  res.end(err);
                }
                else{
                  res.redirect("/mysurvey");
                }
              })
            }
          });
        }
      });
    }
  });
};

//mysurveypage
module.exports.displayMySurveyPage = async (req, res, next) => {
  let userID = req.user.id;
  const surveyList = await Survey.find({UserId: userID});
  //console.log(surveyList);
  console.log(userID);
  res.render("mysurvey", {
    title:"My Survey List",
    SurveyList: surveyList,
    displayName: req.user ? req.user.displayName : ''
  });
};



module.exports.displayAddSurveyPage = (req, res, next) => {
  res.render("create-survey", {
    title: "Create a New Survey",
    currentDate: new Date().toISOString().slice(0,10),
    displayName: req.user ? req.user.displayName : ''
  });
};

module.exports.processAddSurveyPage = (req, res, next) => {
  let newSurvey = new Survey({
    Title: req.body.title,
    EndDate: req.body.endDate,
    UserId: req.user._id
  });

  Survey.create(newSurvey, (err, Survey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect(`/survey-detail/${newSurvey._id}`);
    }
  });
};




module.exports.displayLoginPage = (req, res, next) => {
  // check if the user if already logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : '' // to check if the user is there
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server error
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      // server error
      if (err) {
        return next(err);
      }

      return res.redirect("/mysurvey");
    });
  })(req, res, next);
};




module.exports.performLogout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};

