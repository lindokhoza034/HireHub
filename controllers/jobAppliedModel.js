const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobAppliedSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

// JobSchema.index({ jobTitle: "text", city: "text", province: "text" });
// JobSchema.index({ "$**": "text" });

module.exports = mongoose.model("JobApplied", JobAppliedSchema);
