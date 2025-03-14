const Test = require("../models/Test.js");
const Student = require("../models/Student.js");
const Passed = require("../models/Passed.js");
const Question = require("../models/Question.js");

exports.getAllTest = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 }).lean();
    return res.json({ data: tests });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getByTeacher = async (req, res) => {
  try {
    const tests = await Test.find({ teacher: req.teacher.id }).sort({
      createdAt: -1,
    });
    return res.json({ data: tests });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getTestQuestions = async (req, res) => {
  try {
    const findTest = await Test.findById(req.params.id).lean();
    if (!findTest) return res.status(404).json({ message: "Test not found" });
    const questions = await Question.find({ test: req.params.id }).lean();
    const localizedTest = {
      _id: findTest._id,
      name: findTest.name,
      admin: findTest.admin,
      createdAt: findTest.createdAt,
      questions: questions.map((q) => ({
        _id: q._id,
        title: q.title,
        type: q.type,
        photoUrl: q.photoUrl,
        answers: q.answers.map((a) => ({
          _id: a._id,
          answer: a.answer,
          isCorrect: a.isCorrect,
        })),
      })),
    };
    return res.json({ data: localizedTest });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createTest = async (req, res) => {
  try {
    const adminId = req.admin?.id;
    const teacherId = req.teacher?.id;
    if (adminId) req.body.admin = adminId;
    if (teacherId) req.body.teacher = teacherId;
    const test = await Test.create(req.body);
    if (req.body.questions && req.body.questions.length > 0) {
      await Question.insertMany(
        req.body.questions.map((q) => ({ ...q, test: test._id }))
      );
    }
    return res.status(201).json({ data: test });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.checkAnswers = async (req, res) => {
  try {
    const findTest = await Test.findById(req.params.id);
    if (!findTest) return res.status(404).json({ message: "Test not found" });
    const findStudent = await Student.findById(req.userId);
    if (!findStudent)
      return res.status(404).json({ message: "Student not found" });
    const questions = await Question.find({ test: req.params.id });
    let correctAnswers = 0;
    let totalTestQuestions = questions.length;
    const studentAnswers = req.body.answers
      .map((answer) => {
        const question = questions.find(
          (q) => q._id.toString() === answer.question
        );
        if (!question) return null;
        let isCorrect = false;
        let correctAnswer = null;
        let selectedAnswer = null;
        let description = null;
        if (question.type === 1) {
          correctAnswer = question.answers.find((i) => i.isCorrect);
          selectedAnswer = question.answers.find(
            (i) => i._id.toString() === answer.answer
          );
          isCorrect =
            correctAnswer &&
            selectedAnswer &&
            correctAnswer._id.toString() === selectedAnswer._id.toString();
        } else if (question.type === 2) {
          description = answer.answer?.trim() || "";
        }
        if (isCorrect) correctAnswers++;
        return {
          question: question._id,
          selectedAnswer: question.type === 1 ? selectedAnswer : null,
          correctAnswer: question.type === 1 ? correctAnswer : null,
          description,
        };
      })
      .filter((ans) => ans !== null);
    const percentage = (correctAnswers / totalTestQuestions) * 100;
    let earnedPoints = 0;
    if (percentage >= 75) {
      findStudent.balance += findTest.point;
      await findStudent.save();
      earnedPoints = findTest.point;
    }
    const passedTest = await Passed.create({
      student: req.userId,
      test: req.params.id,
      answers: studentAnswers,
    });
    return res.json({
      message:
        percentage >= 75
          ? "Congratulations! You passed the test"
          : "Sorry! You failed the test",
      percentage,
      correctAnswers,
      totalQuestions: totalTestQuestions,
      earnedPoints,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const updateBody = { ...req.body };
    delete updateBody.questions;
    const test = await Test.findByIdAndUpdate(testId, updateBody, {
      new: true,
    });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    const existingQuestions = await Question.find({ test: test._id });
    const existingQuestionIds = existingQuestions.map((q) => q._id.toString());
    const submittedQuestionIds = (req.body.questions || [])
      .map((q) => q._id)
      .filter(Boolean);
    const updatedQuestions = [];
    if (req.body.questions && req.body.questions.length > 0) {
      for (const question of req.body.questions) {
        if (question._id) {
          const updatedQuestion = await Question.findByIdAndUpdate(
            question._id,
            {
              title: question.title,
              photoUrl: question.photoUrl,
              answers: question.answers,
              test: test._id,
            },
            { new: true }
          );
          if (updatedQuestion) {
            updatedQuestions.push(updatedQuestion);
          }
        } else {
          const newQuestion = await Question.create({
            title: question.title,
            photoUrl: question.photoUrl,
            answers: question.answers,
            test: test._id,
          });
          updatedQuestions.push(newQuestion);
        }
      }
    }
    const questionsToDelete = existingQuestionIds.filter(
      (id) => !submittedQuestionIds.includes(id)
    );
    if (questionsToDelete.length > 0) {
      await Question.deleteMany({
        _id: { $in: questionsToDelete },
        test: test._id,
      });
    }
    const allQuestions = await Question.find({ test: test._id });
    return res.json({
      data: {
        ...test.toObject(),
        questions: allQuestions,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    await Question.deleteMany({ test: test._id });
    return res.json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
