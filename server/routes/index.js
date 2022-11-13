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

/* GET Route for displaying Login page*/
router.get("/login", indexController.displayLoginPage);

/* POST Route for processing Login page*/
router.post("/login", indexController.processLoginPage);

/* GET to perform userLogout*/
router.get("/logout", indexController.performLogout);

module.exports = router;
