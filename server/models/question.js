/* ******************************************************** 
* Model for Survey Questions
* File name: question.js 
* Author: Explorers Team (Group 1)
* Date: Dec 11, 2022
* ******************************************************** */
let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let QuestionModel = mongoose.Schema(
  {
    QuestionText: String,
    OptionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Option",
      },
    ], 
    QuestionType: {
      type: String,
      enum: ["MCQ", "TF"],
    },
    SurveyId: {
      type: Schema.Types.ObjectId,
      ref: "Survey",
    },
  },
  {
    collection: "questions",
  }
);

module.exports = mongoose.model("Question", QuestionModel);
