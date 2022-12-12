/* ******************************************************** 
* Routes
* File name: index.js
* Author: Explorers Team (Group 1)
* Date: Dec 11, 2022
* ******************************************************** */

let express = require("express");
let router = express.Router();

let indexController = require("../controllers/index");

//helper func for guard
function requireAuth(req, res, next){
  //check login status
  if(!req.isAuthenticated()){
      return res.redirect('/login');
  }
  next();
}

/* GET Home page. */
router.get("/", indexController.displayHomePage);

/* GET home page. */
router.get("/home", indexController.displayHomePage);

/* GET home page. */
router.get("/allsurvey", indexController.displayAllSurvey);

/* GET Delete Survey - Delete Opreation */
router.get("/home/delete/:id", requireAuth, indexController.performDeleteSurvey);

/* GET My Survey page. */
router.get("/mysurvey", requireAuth, indexController.displayMySurveyPage);

/* GET Takesurvey page. */
router.get("/takesurvey/:id", indexController.displayTakesurveyPage);

/* POST Takesurvey page. */
router.post("/takesurvey/:id", indexController.processTakesurveyPage);

/* GET Add page. */
router.get("/create-survey", requireAuth, indexController.displayAddSurveyPage);

/* POST Add page. */
router.post("/create-survey", requireAuth, indexController.processAddSurveyPage);

/* GET Survey Detail page. */
router.get("/survey-detail/:id", requireAuth, indexController.displaySurveyDetailPage);

/* POST Survey Detail page. */
router.post("/survey-detail/:id", requireAuth, indexController.processSurveyDetailPage);

/* GET Add TF question page. */
router.get(
  "/survey-detail/:id/add-tfq", requireAuth, 
  indexController.displayAddTFQuestionPage
);

/* POST Add TF question page. */
router.post(
  "/survey-detail/:id/add-tfq", requireAuth,
  indexController.processAddTFQuestionPage
);

/* GET Update TF question page. */
router.get(
  "/survey-detail/:id/:questionId/update-tfq", requireAuth,
  indexController.displayUpdateTFQuestionPage
);

/* POST Update TF question page */
router.post(
  "/survey-detail/:id/:questionId/update-tfq", requireAuth,
  indexController.processUpdateTFQuestionPage
)

/* GET Add MC question page. */
router.get(
  "/survey-detail/:id/add-mcq", requireAuth,
  indexController.displayAddMCQuestionPage
);

/* POST Add MC question page. */
router.post(
  "/survey-detail/:id/add-mcq", requireAuth,
  indexController.processAddMCQuestionPage
);

/* GET Update MC question page. */
router.get(
  "/survey-detail/:id/:questionId/update-mcq", requireAuth,
  indexController.displayUpdateMCQuestionPage
);

/* POST Update MC question page. */
router.post(
  "/survey-detail/:id/:questionId/update-mcq", requireAuth,
  indexController.processUpdateMCQuestionPage
);

/* GET Report page  */
router.get("/report/:id", requireAuth, indexController.displayReportPage);

/* GET Delete question - Delete Opreation */
router.get(
  "/survey-detail/:id/:questionId/delete", requireAuth, 
  indexController.performDeleteQuestion
);

/* GET Route for displaying Login page*/
router.get("/login", indexController.displayLoginPage);

/* POST Route for processing Login page*/
router.post("/login", indexController.processLoginPage);

/* GET Route for displaying Register page*/
router.get("/register", indexController.displayRegisterPage);

/* POST Route for processing Register page*/
router.post("/register", indexController.processRegisterPage);

/* GET to perform userLogout*/
router.get("/logout", indexController.performLogout);

/* GET Route for displaying user profile*/
router.get("/profile", requireAuth, indexController.displayProfilePage);

/* POST Route for processing edit user profile*/
router.post("/profile", requireAuth, indexController.processUpdateProfilePage);

module.exports = router;
