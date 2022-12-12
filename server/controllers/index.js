/* ******************************************************** 
* Controllers
* File name: index.js 
* Author: Explorers Team (Group 1)
* Course: Web Application Development 
* Section: COMP229 - 009
* Date: Dec 11, 2022
* ******************************************************** */

let express = require("express");
let router = express.Router();

let mongoose = require("mongoose");
const passport = require("passport");

// create Models instance
let Question = require("../models/question");
let Survey = require("../models/survey");
let Option = require("../models/option");
let Result = require("../models/result");
let User = require('../models/user');

/* Landing page. */
module.exports.displayHomePage = (req, res, next) => {
  Survey.find((err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("index", {
        title: "Explorers Survey",
        SurveyList: surveyList,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
};
/* All survey page. */
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
/* take survey page. */
module.exports.displayTakesurveyPage = async (req, res, next) => {
  let surveyID = req.params.id;
  const survey = await Survey.findById(surveyID).populate("QuestionIds");
  const questionList = await Question.find({ SurveyId: surveyID });
  
  for (count = 0; count < questionList.length; count++) {
    await questionList[count].populate("OptionIds");
  }
  res.render("takesurvey", {
    title: "Take Survey",
    Survey: survey,
    QuestionList: questionList,
    displayName: req.user ? req.user.displayName : ''
  });

};

module.exports.processTakesurveyPage = async (req, res, next) => {
  let surveyID = req.params.id;
  let survey = await Survey.findById(surveyID).populate("QuestionIds");

  for(let c = 0; c < survey.QuestionIds.length; c++){
    let optionVal = req.body["options"+c.toString()];
    let questionID = survey.QuestionIds[c].id;
    let selectedOp = await Option.findOne({ QuestionId: questionID, OptionValue: optionVal});

    let newResult = new Result({
      SurveyId: surveyID,
      QuestionId: questionID,
      OptionId: selectedOp.id
    })

    await newResult.save();
  }

  res.redirect('/');

};
/* add survey page. */
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

/* delete survey */
module.exports.performDeleteSurvey = (req, res, next) => {
  let id = req.params.id;
  //delete a survey ==> remove everything of it: survey/questions/options/results
  Survey.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      Question.remove({ SurveyId: id }, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          Option.remove({ SurveyId: id }, (err) => {
            if (err) {
              console.log(err);
              res.end(err);
            } else {
              Result.remove({SurveyId: id}, (err) => {
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
/* Page for showing all survey list for a logined user */
//survey list of a selected user
module.exports.displayMySurveyPage = async (req, res, next) => {
  let userID = req.user.id;
  const surveyList = await Survey.find({UserId: userID});
  
  console.log(userID);
  res.render("mysurvey", {
    title:"My Survey List",
    SurveyList: surveyList,
    displayName: req.user ? req.user.displayName : ''
  });
};

/*  Page for adding survey questions or update survey questions. */
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
/*  Add yes or no (true or false) question Page  */
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
/*  Page for updating T/F questions for a seleted survey  */
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
/*  Add multiple question Page for a seleted survey  */
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
/*  Page for updating multiple questions for a seleted survey  */
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
/*  delete questions for a seleted survey  */
module.exports.performDeleteQuestion = (req, res, next) => {
  let surveyID = req.params.id;
  let questionID = req.params.questionId;
  console.log(surveyID);
  console.log(questionID);
  //delete question id from the selected model survey's QuestionIds
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
  //then delete the question and options/responses of the question
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
          Result.remove({QuestionId: questionID}, (err) => {
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
/*  Login page  */
module.exports.displayLoginPage = (req, res, next) => {
  // check if the user logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : '' // to check if the user exists
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
    // user login error
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
/*  register page  */
module.exports.displayRegisterPage = (req, res, next) => {
  
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : ''
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  
  let newUser = new User({
    username: req.body.username,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User:");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error, User Already Exists!"
        );
        console.log("Error: User Already Exists.");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : ''
      });
    } else {

      return passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  });
};
/*  for logout  */
module.exports.performLogout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};

/*  Page for showing summary report for a selected survey */
module.exports.displayReportPage = async (req, res, next) => {
  let surveyID = req.params.id;
  const survey = await Survey.findById(surveyID).populate("QuestionIds");
  const questionList = await Question.find({ SurveyId: surveyID });
  
  for (count = 0; count < questionList.length; count++) {
    await questionList[count].populate("OptionIds");
  }
  //create arrays for storing the number of different options of different questions
  //arrays for TF question options
  let resultTFCountListOp1 = [];
  let resultTFCountListOp2 = [];
  //arrays for MCQ question options
  let resultMCQCountListOp1 = [];
  let resultMCQCountListOp2 = [];
  let resultMCQCountListOp3 = [];
  let resultMCQCountListOp4 = [];
  //loop and traverse each question in the given survey
  for (i = 0; i < survey.QuestionIds.length; i++){
    if(survey.QuestionIds[i].QuestionType==="TF"){
      resultTFCountListOp1[i] = await Result.countDocuments({OptionId: survey.QuestionIds[i].OptionIds[0]});
      resultTFCountListOp2[i] = await Result.countDocuments({OptionId: survey.QuestionIds[i].OptionIds[1]});
    }
    if(survey.QuestionIds[i].QuestionType==="MCQ"){
      resultMCQCountListOp1[i] = await Result.countDocuments({OptionId: survey.QuestionIds[i].OptionIds[0]});
      resultMCQCountListOp2[i] = await Result.countDocuments({OptionId: survey.QuestionIds[i].OptionIds[1]});
      resultMCQCountListOp3[i] = await Result.countDocuments({OptionId: survey.QuestionIds[i].OptionIds[2]});
      resultMCQCountListOp4[i] = await Result.countDocuments({OptionId: survey.QuestionIds[i].OptionIds[3]});
    }
  }

  res.render("report", {
    title: "report",
    Survey: survey,
    Question: questionList,
    TFresultListOp1: resultTFCountListOp1,
    TFresultListOp2: resultTFCountListOp2,
    MCQresultListOp1: resultMCQCountListOp1,
    MCQresultListOp2: resultMCQCountListOp2,
    MCQresultListOp3: resultMCQCountListOp3,
    MCQresultListOp4: resultMCQCountListOp4,
    displayName: req.user ? req.user.displayName : ''
  });
};
/* Display Profile Page */
module.exports.displayProfilePage = async (req, res, next) => {
  let userID = req.user.id;
  const surveyList = await Survey.find({UserId: userID});
  console.log(req.user.password);
  res.render("auth/profile", {
    title:"Profile",
    messages: req.flash("profileMessage"), 
    username: req.user? req.user.username: '',
    displayName: req.user ? req.user.displayName : ''
  });
};
/* Update Profile Page */
module.exports.processUpdateProfilePage = (req, res, next) => {
  
  User.findOneAndUpdate(
    {_id: req.user.id},
    {$set: {
      displayName: req.body.displayName
    }},
    function (error, success) {
      if (error) {
        console.log(error);
        res.end(error);
      } else {
        console.log(success);
      }
    }
  )

  req.user.changePassword(req.body.oldpassword, req.body.newpassword, (error)=> {
    if (error) {
      req.flash(
        "profileMessage",
        "Profile Error: The current password is not correct."
      );
      res.render("auth/profile", {
        title:"Profile",
        messages: req.flash("profileMessage"), 
        username: req.user? req.user.username: '',
        displayName: req.user ? req.user.displayName : ''
      });
    }
    else{
      res.redirect("/");
    }
  })
};