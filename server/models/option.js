let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OptionModel = mongoose.Schema(
  {
    OptionValue: String,
    QuestionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    SurveyId: {
      type: Schema.Types.ObjectId,
      ref: "Survey",
    },
  },
  {
    collection: "options",
  }
);

module.exports = mongoose.model("Option", OptionModel);