const JobModel = require("../models/jobModel.js");
const JobAppliedModel = require("../models/jobAppliedModel.js");

const mongoose = require("mongoose");

//Candidate Register and Login

// GET || Homepage
exports.homepage = async (req, res) => {
  const messages = req.flash("success");
  const locals = {
    title: "Testing Backend!",
  };

  let perPage = 10;
  let page = req.query.page || 1;

  try {
    const jobs = await JobModel.aggregate([{ $sort: { updatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await JobModel.count();
    res.render("index", {
      locals,
      jobs,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

// Job List Page
exports.findJob = async (req, res) => {
  let perPage = 20;
  let page = req.query.page || 1;

  try {
    //counter
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const counter = await JobModel.countDocuments({
      createdAt: {
        $gte: oneHourAgo,
        $lt: now,
      },
    });

    //notification details
    const notifications = await JobModel.find({
      createdAt: { $gte: oneHourAgo, $lt: new Date() },
    });

    //display
    const jobs = await JobModel.aggregate([{ $sort: { updatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    //pagination
    const count = await JobModel.count();
    res.render("job/job-list", {
      counter,
      notifications,
      jobs,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

// Post A New Job
exports.postNewJob = async (req, res) => {
  res.render("recruiter/post-new-job");
};

// GET || Add New Job

exports.addJob = async (req, res) => {
  const locals = {
    title: "Add New Job",
  };
  res.render("recruiter/post-new-job");
};

// POST || Post New Job

exports.postJob = async (req, res) => {
  try {
    const newJob = new JobModel({
      jobTitle: req.body.jobTitle,
      company: req.body.company,
      description: req.body.description,
      category: req.body.category,
      jobType: req.body.jobType,
      salary: req.body.salary,
      experience: req.body.experience,
      qualification: req.body.qualification,
      deadline: req.body.deadline,
      province: req.body.province,
      city: req.body.city,
    });
    await JobModel.create(newJob);
    await req.flash("success", "New job added Successfully!");
    res.redirect("recruiter/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// Search for Job from input field
exports.searchJob = async (req, res) => {
  try {
    const fieldName = Array.isArray(req.body.field_name)
      ? req.body.field_name.join(",")
      : req.body.field_name;
    const job = await JobModel.find({
      $text: { $search: fieldName, $diacriticSensitive: true },
    });
    console.log(fieldName);
    res.render("job/search", { job });
  } catch (error) {
    console.log(error);
  }
};

// Search by Filter
exports.filterFreelance = async (req, res) => {
  try {
    const jobs = await JobModel.find({ jobType: "Freelance" });

    res.render("job/filter", { jobs });
  } catch (error) {
    console.log(error);
  }
};

exports.filterIntern = async (req, res) => {
  try {
    const jobs = await JobModel.find({ jobType: "Internship" });

    res.render("job/filter", { jobs });
  } catch (error) {
    console.log(error);
  }
};

exports.filterFullTime = async (req, res) => {
  try {
    const jobs = await JobModel.find({ jobType: "Full-Time" });

    res.render("job/filter", { jobs });
  } catch (error) {
    console.log(error);
  }
};
exports.filterPartTime = async (req, res) => {
  try {
    const jobs = await JobModel.find({ jobType: "Part-Time" });

    res.render("job/filter", { jobs });
  } catch (error) {
    console.log(error);
  }
};
exports.filterTemporary = async (req, res) => {
  try {
    const jobs = await JobModel.find({ jobType: "Temporary" });

    res.render("job/filter", { jobs });
  } catch (error) {
    console.log(error);
  }
};

//select item

// View job in detail
exports.viewJob = async (req, res) => {
  try {
    const job = await JobModel.findOne({ _id: req.params.id });
    res.render("job/job-single", { job });
  } catch (error) {
    console.log(error);
  }
};

//jobs applied
exports.jobsApplied = async (req, res) => {
  try {
    // const jobId = req.params.id;
    const job = await JobModel.findOne({ _id: req.params.id });
    const jobApplied = new JobAppliedModel({
      jobTitle: job.jobTitle,
      company: job.company,
      description: job.description,
      category: job.category,
      jobType: job.jobType,
      salary: job.salary,
      experience: job.experience,
      qualification: job.qualification,
      deadline: job.deadline,
      province: job.province,
      city: job.city,
    });

    await jobApplied.save();
    res.redirect("/candidate/jobs/applied/"); // or redirect to the job view page
  } catch (error) {
    console.log(error);
  }
};

//test applied
exports.testApplied = async (req, res) => {
  try {
    const job = await JobModel.findOne({ _id: req.params.id });
    res.render("job/job-single", { job });
  } catch (error) {
    console.log(error);
  }
};

// View job in detail
exports.manageJob = async (req, res) => {
  try {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const job = await JobModel.find({
      createdAt: { $gte: oneHourAgo, $lt: new Date() },
    });
    console.log(job);
  } catch (error) {
    console.log(error);
  }
};

//filter by job type
// exports.filterByJobType = async (req, res) => {
//   try {
//     const jobTypes = req.body.jobType;

//     const jobs = await JobModel.find({ jobType: { $in: jobTypes } });
//     res.json(jobs);
//     res.render("job/filter", { jobs });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.filterBy = async (req, res) => {
//   try {
//     res.render("job/filter");
//   } catch (error) {
//     console.log(error);
//   }
// };

//view applied jobs
exports.viewAppliedJobs = async (req, res) => {
  try {
    const job = await JobAppliedModel.find();
    res.render("candidate/jobs-applied", { job });
  } catch (error) {
    console.log(error);
  }
};

//candidate login
exports.candidateLogin = async (req, res) => {
  try {
    res.render("candidate/login-register");
  } catch (error) {
    console.log(error);
  }
};

//recruiter login
exports.recruiterLogin = async (req, res) => {
  try {
    res.render("recruiter/login-register");
  } catch (error) {
    console.log(error);
  }
};

//candidate dashboard
exports.candidateDashboard = async (req, res) => {
  try {
    res.render("candidate/dashboard");
  } catch (error) {
    console.log(error);
  }
};

//recruiter dashboard
exports.recruiterDashboard = async (req, res) => {
  try {
    res.render("recruiter/dashboard");
  } catch (error) {
    console.log(error);
  }
};

//My Profile dashboard
exports.myprofile = async (req, res) => {
  try {
    res.render("candidate/MyProfile");
  } catch (error) {
    console.log(error);
  }
};

//My Resume dashboard
exports.myresume = async (req, res) => {
  try {
    res.render("candidate/myResume");
  } catch (error) {
    console.log(error);
  }
};
