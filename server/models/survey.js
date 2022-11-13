let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SurveyModel = mongoose.Schema(
  {
    Title: String,
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    QuestionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ], 
    IsActive: Boolean,
    StartDate: {
      type: Date,
      default: Date.now(),
    },
    EndDate: Date,
  },
  {
    collection: "surveys",
  }
);

module.exports = mongoose.model("Survey", SurveyModel);