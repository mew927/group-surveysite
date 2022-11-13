let express = require("express");
let router = express.Router();

let mongoose = require("mongoose");
const passport = require("passport");

let Question = require("../models/question");
let Survey = require("../models/survey");
let Option = require("../models/option");
let result = require("../models/result");
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
              //remove results
              result.remove({SurveyId: id}, (err) => {
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

module.exports.displaySurveyDetailPage = async (req, res, next) => {
  let surveyID = req.params.id;
  const survey = await Survey.findById(surveyID).populate("QuestionIds");
  res.render("survey-detail", {
    title: "Survey Details",
    Survey: survey,
    currentDate: new Date().toISOString().slice(0,10),
    displayName: req.user ? req.user.displayName : ''
  });

};

/* POST Survey Detail page. */
module.exports.processSurveyDetailPage = async (req, res, next) => {
  let surveyID = req.params.id;

  Survey.findOneAndUpdate(
    {_id: surveyID},
    { $set: {
      Title: req.body.title,
      EndDate: req.body.endDate
    }},
    function (error, success) {
      if(error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );
  res.redirect(`/survey-detail/${surveyID}`);
};

module.exports.displayAddTFQuestionPage = async (req, res, next) => {
  let surveyID = req.params.id;
  const survey = await Survey.findById(surveyID);
  res.render("add-tfq", {
    title: "Add True/False Question",
    Survey: survey,
    displayName: req.user ? req.user.displayName : ''
  });
};

module.exports.processAddTFQuestionPage = async (req, res, next) => {
  let surveyID = req.params.id;
  let newTFQuestion = new Question({
    QuestionText: req.body.questionTxt,
    QuestionType: "TF",
    SurveyId: surveyID
  });

  await newTFQuestion.save();

  let option1 = new Option({
    OptionValue: "true",
    QuestionId: newTFQuestion.id,
    SurveyId: surveyID,
  });
  await option1.save();

  let option2 = new Option({
    OptionValue: "false",
    QuestionId: newTFQuestion.id,
    SurveyId: surveyID,
  });
  await option2.save();

  Question.findOneAndUpdate(
    { _id: newTFQuestion.id },
    { $set: { OptionIds: [option1.id, option2.id] } },
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(err);
      } else {
        console.log(success);
      }
    }
  );

  const survey = await Survey.findById(surveyID);
  Survey.findOneAndUpdate(
    { _id: surveyID },
    { $push: { QuestionIds: newTFQuestion.id } },
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(err);
      } else {
        console.log(success);
      }
    }
  );
  res.redirect(`/survey-detail/${survey._id}`);

};

module.exports.displayUpdateTFQuestionPage = async (req, res, next) => {
  let surveyID = req.params.id;
  let questionID = req.params.questionId;
  const survey = await Survey.findById(surveyID);
  const question = await Question.findById(questionID);
  res.render("update-tfq", {
    title: "Update True/False Question",
    Survey: survey,
    Question: question,
    displayName: req.user ? req.user.displayName : ''
  });
};

module.exports.processUpdateTFQuestionPage = async (req, res, next) => {
  let surveyID = req.params.id;
  let QtoUpdateID = req.params.questionId;

  Question.findOneAndUpdate(
    { _id: QtoUpdateID },
    { $set: { QuestionText: req.body.questionTxt } },
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(err);
      } else {
        console.log(success);
      }
    }
  )
  res.redirect(`/survey-detail/${surveyID}`);
};

module.exports.displayAddMCQuestionPage = async (req, res, next) => {
  let surveyID = req.params.id;
  const survey = await Survey.findById(surveyID);
  res.render("add-mcq", {
    title: "Add Multiple Choice Question",
    Survey: survey,
    displayName: req.user ? req.user.displayName : ''
  });
};

module.exports.processAddMCQuestionPage = async (req, res, next) => {
  let surveyID = req.params.id;
  let newMCQuestion = new Question({
    QuestionText: req.body.questionTxt,
    QuestionType: "MCQ",
    SurveyId: surveyID
  });

  await newMCQuestion.save();

  let option1 = new Option({
    OptionValue: req.body.option1Txt,
    QuestionId: newMCQuestion.id,
    SurveyId: surveyID,
  });
  await option1.save();

  let option2 = new Option({
    OptionValue: req.body.option2Txt,
    QuestionId: newMCQuestion.id,
    SurveyId: surveyID,
  });
  await option2.save();

  let option3 = new Option({
    OptionValue: req.body.option3Txt,
    QuestionId: newMCQuestion.id,
    SurveyId: surveyID,
  });
  await option3.save();

  let option4 = new Option({
    OptionValue: req.body.option4Txt,
    QuestionId: newMCQuestion.id,
    SurveyId: surveyID,
  });
  await option4.save();

  Question.findOneAndUpdate(
    { _id: newMCQuestion.id },
    { $set: { OptionIds: [option1.id, option2.id, option3.id, option4.id] } },
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(err);
      } else {
        console.log(success);
      }
    }
  );

  const survey = await Survey.findById(surveyID);
  Survey.findOneAndUpdate(
    { _id: surveyID },
    { $push: { QuestionIds: newMCQuestion.id } },
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(err);
      } else {
        console.log(success);
      }
    }
  );
  res.redirect(`/survey-detail/${survey._id}`);
};

module.exports.displayUpdateMCQuestionPage = async (req, res, next) => {
  let surveyID = req.params.id;
  let questionID = req.params.questionId;
  const survey = await Survey.findById(surveyID);
  const question = await Question.findById(questionID).populate("OptionIds");
  
  res.render("update-mcq", {
    title: "Update Multiple Choice Question",
    Survey: survey,
    Question: question,
    displayName: req.user ? req.user.displayName : ''
  });
};

module.exports.processUpdateMCQuestionPage = async (req, res, next) => {
  let surveyID = req.params.id;
  let QtoUpdateID = req.params.questionId;
  const options = await Option.find({QuestionId: QtoUpdateID});

  Option.findOneAndUpdate(
    {_id: options[0]},
    {$set: {
      OptionValue: req.body.option1Txt
    }},
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(err);
      } else {
        console.log(success);
      }
    }
  )
  Option.findOneAndUpdate(
    {_id: options[1]},
    {$set: {
      OptionValue: req.body.option2Txt
    }},
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(err);
      } else {
        console.log(success);
      }
    }
  )
  Option.findOneAndUpdate(
    {_id: options[2]},
    {$set: {
      OptionValue: req.body.option3Txt
    }},
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(err);
      } else {
        console.log(success);
      }
    }
  )
  Option.findOneAndUpdate(
    {_id: options[3]},
    {$set: {
      OptionValue: req.body.option4Txt
    }},
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(err);
      } else {
        console.log(success);
      }
    }
  )

  Question.findOneAndUpdate(
    { _id: QtoUpdateID },
    { $set: { QuestionText: req.body.questionTxt } },
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(err);
      } else {
        console.log(success);
      }
    }
  )
  res.redirect(`/survey-detail/${surveyID}`);
}

module.exports.performDeleteQuestion = (req, res, next) => {
  let surveyID = req.params.id;
  let questionID = req.params.questionId;
  console.log(surveyID);
  console.log(questionID);

  //delete qid from the survey's QuestionIds
  Survey.findOneAndUpdate(
    { _id: surveyID },
    { $pull: { QuestionIds: questionID } },
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(err);
      } else {
        console.log(success);
      }
    }
  );

  //delete question, options, and results 
  Question.remove({ _id: questionID }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      Option.remove({ QuestionId: questionID}, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          result.remove({QuestionId: questionID}, (err) => {
            if(err) {
              console.log(err);
              res.end(err);
            }
            else {
              res.redirect(`/survey-detail/${surveyID}`);
            }
          })
        }
      });
    }
  }); 
}

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
