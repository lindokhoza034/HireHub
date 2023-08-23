const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// Homepage
router.get("/", jobController.homepage);

// router.get("/candidate/jobs", jobController.candidateLogin);
router.get("/candidate/login", jobController.candidateLogin);

//recruiter Login
router.get("/recruiter/login", jobController.recruiterLogin);
//Candidate Find Jobs
router.get("/candidate/jobs", jobController.findJob);

//View single job
router.get("/jobs/view/:id", jobController.viewJob);

//Post A New Job
router.get("/recruiter/jobs/post", jobController.postNewJob);

//jobs applied
router.post("/candidate/jobs/applied/:id", jobController.jobsApplied);

//jobs applied
router.get("/candidate/jobs/applied/", jobController.viewAppliedJobs);

//manage job
router.get("/recruiter/dashboard/manage", jobController.manageJob);

//Candidate Dashboard
router.get("/candidate/dashboard", jobController.candidateDashboard);

//recruiter Dashboard
router.get("/recruiter/dashboard", jobController.recruiterDashboard);

//myprofile Dashboard
router.get("/candidate/profile", jobController.myprofile);

//myprofile Dashboard
router.get("/candidate/resume", jobController.myresume);

//manage job
// router.get("/filter", jobController.manageJob);

router.get("/add", jobController.addJob);
router.post("/add", jobController.postJob);
router.post("/candidate/jobs", jobController.searchJob);
router.get("/candidate/jobs/internship", jobController.filterIntern);
router.get("/candidate/jobs/freelance", jobController.filterFreelance);
router.get("/candidate/jobs/full-time", jobController.filterFullTime);
router.get("/candidate/jobs/part-time", jobController.filterPartTime);
router.get("/candidate/jobs/temporary", jobController.filterTemporary);

module.exports = router;
