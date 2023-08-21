const mongoose = require("mongoose");

const MCQSchema = mongoose.Schema(
  {
    question_type: {
      type: String,

    },
    question_topic: {
      type: String,

    },
    problem_statement: {
      type: String,
    },
    concepts: {
      type: Array,
    },
    difficulty: {
      type: String,
    },
    solution: {
      type: String,
    },
  },
  { collection: "MCQ_Type",
    timestamps: true }
);

const Mcq=mongoose.model("Mcq", MCQSchema);
module.exports = Mcq;
