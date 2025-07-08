const mongodb = require('mongoose');

const CareerPathLevelSchema = mongodb.Schema({
    userId: { type: mongodb.Schema.Types.ObjectId, required: true, ref: "User" },
    completionStatus: {
      type: String,
      enum: ["not started", "in progress", "completed"],
      default: "not started",
    },
    level: String,
    lessons: [String],
    course_name: [String],
    udemy: [String],
    coursera: [String],
    professional_course: [String],
  });

  
  const careerpath_schema = mongodb.model(" CareerPath", CareerPathLevelSchema);
  module.exports = careerpath_schema;