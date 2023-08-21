const mongoose = require("mongoose");

const CodingSchema = mongoose.Schema(
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
  { collection: "Coding_Type",
    timestamps: true }
);
CodingSchema.index({"question_topic":"text"});/////v imp

module.exports = mongoose.model("Coding", CodingSchema);
