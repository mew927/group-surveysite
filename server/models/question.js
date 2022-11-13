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
