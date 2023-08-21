const mongoose = require("mongoose");

const SubSchema = mongoose.Schema(
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
  { collection: "Sub_Type",
    timestamps: true }
);

const Sub=mongoose.model("Sub",SubSchema);

module.exports = Sub;