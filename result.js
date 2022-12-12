let mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create a model class
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

//result model to create new option
module.exports = mongoose.model("result", resultModel);