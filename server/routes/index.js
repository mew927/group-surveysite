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

/* GET Delete question - Delete Opreation */
router.get(
  "/survey-detail/:id/:questionId/delete", requireAuth, 
  indexController.performDeleteQuestion
);

/* GET Route for displaying Login page*/
router.get("/login", indexController.displayLoginPage);

/* POST Route for processing Login page*/
router.post("/login", indexController.processLoginPage);

/* GET to perform userLogout*/
router.get("/logout", indexController.performLogout);

module.exports = router;
