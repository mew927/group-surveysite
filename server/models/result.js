let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let resultModel = mongoose.Schema(
  {
    QuestionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    OptionId: {
      type: Schema.Types.ObjectId,
      ref: "Option",
    },
    SurveyId: {
      type: Schema.Types.ObjectId,
      ref: "Survey",
    }
  },
  {
    collection: "results",
  }
);

module.exports = mongoose.model("result", resultModel);