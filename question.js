let mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create a model class
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

//question model to create new option
module.exports = mongoose.model("Question", QuestionModel);
