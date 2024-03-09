const ApplicationModel = require("../models/application")
const BaseService = require("./base-service")

class ApplicationService extends BaseService {

}

module.exports = new ApplicationService(ApplicationModel)