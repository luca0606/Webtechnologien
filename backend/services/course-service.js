const BaseService = require("./base-service")
const CourseModel = require("../models/course")

class CourseService extends BaseService {

}

module.exports = new CourseService(CourseModel)