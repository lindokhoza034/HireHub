const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({
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
    enum: [
      "Finance",
      "Automotive",
      "Banking",
      "Customer",
      "Design",
      "Health",
      "IT",
      "Markerting",
      "Project Management",
      "Retail",
      "Human Resources",
    ],
  },
  jobType: {
    type: String,
    required: true,
    enum: [
      "Contract",
      "Freelance",
      "Full-Time",
      "Internship",
      "Part-Time",
      "Temporary",
      "Remote",
      "Permanent",
    ],
  },
  salary: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
    enum: ["Associate", "Entry", "Junior", "Mid", "Senior"],
  },
  qualification: {
    type: String,
    required: true,
    enum: [
      "Matric",
      "Higher Certificate",
      "Diploma",
      "Bachelor",
      "Honours",
      "Masters",
      "Doctorate",
    ],
  },
  deadline: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
    enum: [
      "Eastern Cape",
      "Free State",
      "Gauteng",
      "KwaZulu-Natal",
      "Limpopo",
      "Mpumalanga",
      "Northern Cape",
      "North West",
      "Western Cape",
    ],
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
});

JobSchema.index({ jobTitle: "text", city: "text", province: "text" });

module.exports = mongoose.model("Job", JobSchema);
