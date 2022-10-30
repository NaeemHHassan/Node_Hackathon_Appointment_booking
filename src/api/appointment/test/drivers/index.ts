import moment = require("moment");

const add = (value: any, unit: any): any => moment().add(value, unit);

export default { add };