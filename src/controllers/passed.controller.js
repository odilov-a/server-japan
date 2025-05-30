const Passed = require("../models/Passed.js");

exports.getMyPassed = async (req, res) => {
  try {
    const studentId = req.student?.id;
    if (!studentId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const passedTests = await Passed.find({ student: studentId })
      .populate("student")
      .populate("test")
      .sort({ createdAt: -1 });
    const formattedData = passedTests.map((item) => {
      const totalQuestions = item.answers.length;
      const correctAnswers = item.answers.filter(
        (answer) => answer.selectedAnswer === answer.correctAnswer
      ).length;
      const incorrectAnswers = totalQuestions - correctAnswers;
      return {
        id: item._id,
        test: {
          name: item.test.name,
        },
        stats: {
          totalQuestions,
          correctAnswers,
          incorrectAnswers,
        },
        createdAt: item.createdAt,
      };
    });
    return res.json({ data: formattedData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPassed = async (req, res) => {
  try {
    const data = await Passed.find().populate("student").populate("test");
    const formattedData = data.map((item) => {
      const totalQuestions = item.answers.length;
      const correctAnswers = item.answers.filter(
        (answer) => answer.selectedAnswer === answer.correctAnswer
      ).length;
      const incorrectAnswers = totalQuestions - correctAnswers;
      return {
        id: item._id,
        student: {
          name: `${item.student.firstName} ${item.student.lastName}`,
        },
        test: {
          name: item.test.name,
        },
        stats: {
          totalQuestions,
          correctAnswers,
          incorrectAnswers,
        },
        createdAt: item.createdAt,
      };
    });
    return res.json({ data: formattedData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
