let mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create a model class
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

//option model to create new option
module.exports = mongoose.model("Option", OptionModel);