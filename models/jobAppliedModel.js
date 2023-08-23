const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Second Schema
const JobsAppliedSchema = new Schema(
  {
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
      enum: ["Banking", "Retail"],
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Freelance", "Full-Time", "Internship"],
    },
    salary: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
      enum: ["/recruiter/dashboard Level", "Junior"],
    },
    qualification: {
      type: String,
      required: true,
      enum: ["Diploma", "Bachelor"],
    },
    deadline: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
      enum: ["Gauteng", "Limpopo"],
    },
    city: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "jobs_posted" }
);

module.exports = mongoose.model("JobApplied", JobsAppliedSchema);
