import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { getAssessmentBySubDomain, Question } from "@/data/assessmentData";
import { getSubDomainById } from "@/data/careerData";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { Progress } from "@/app/components/ui/progress";
import { Badge } from "@/app/components/ui/badge";

export function AssessmentPage() {
  const { branchId, domainId, subDomainId } = useParams();
  const navigate = useNavigate();
  const { addAssessmentResult, isLoggedIn } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!branchId || !domainId || !subDomainId) {
      navigate("/branches");
    }
  }, [branchId, domainId, subDomainId, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  if (!branchId || !domainId || !subDomainId) {
    return null;
  }

  const subDomain = getSubDomainById(branchId, domainId, subDomainId);
  const assessment = getAssessmentBySubDomain(subDomainId);

  useEffect(() => {
    if (!subDomain || !assessment) {
      navigate("/branches");
    }
  }, [subDomain, assessment, navigate]);

  if (!subDomain || !assessment) {
    return null;
  }

  useEffect(() => {
    if (isStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isStarted, timeRemaining]);

  const startAssessment = () => {
    setIsStarted(true);
    setTimeRemaining(assessment.duration * 60);
    setAnswers(new Array(assessment.questions.length).fill(-1));
  };

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessment.totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestionIndex < assessment.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleSubmit(newAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
    }
  };

  const handleSubmit = (finalAnswers?: number[]) => {
    const submittedAnswers = finalAnswers || answers;
    let correctCount = 0;
    const topicPerformance: { [key: string]: { correct: number; total: number } } = {};

    assessment.questions.forEach((q, idx) => {
      if (submittedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }

      if (!topicPerformance[q.topicTag]) {
        topicPerformance[q.topicTag] = { correct: 0, total: 0 };
      }
      topicPerformance[q.topicTag].total++;
      if (submittedAnswers[idx] === q.correctAnswer) {
        topicPerformance[q.topicTag].correct++;
      }
    });

    const score = Math.round((correctCount / assessment.totalQuestions) * 100);
    
    // Identify strengths and weaknesses based on topic performance
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const interests: string[] = [];

    Object.entries(topicPerformance).forEach(([topic, performance]) => {
      const percentage = (performance.correct / performance.total) * 100;
      if (percentage >= 70) {
        strengths.push(topic);
      } else if (percentage < 50) {
        weaknesses.push(topic);
      }
      if (performance.total >= 2) {
        interests.push(topic);
      }
    });

    const result = {
      id: `result-${Date.now()}`,
      domain: domainId,
      subDomain: subDomain.name,
      score,
      strengths: strengths.length > 0 ? strengths : ["Problem Solving"],
      weaknesses: weaknesses.length > 0 ? weaknesses : ["Time Management"],
      interests: interests.length > 0 ? interests : [subDomain.name],
      completedAt: new Date().toISOString(),
    };

    addAssessmentResult(result);
    setIsCompleted(true);

    // Navigate to results page
    setTimeout(() => {
      navigate(`/branches/${branchId}/domains/${domainId}/subdomains/${subDomainId}/results/${result.id}`);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="text-3xl">{assessment.title}</CardTitle>
                <CardDescription className="text-base">{assessment.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Questions</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {assessment.totalQuestions}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {assessment.duration} min
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Career Path</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 truncate">
                      {subDomain.name.split(" ")[0]}
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
                      <p className="font-semibold">Before you start:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Make sure you have a stable internet connection</li>
                        <li>The timer will start as soon as you begin</li>
                        <li>You can navigate between questions</li>
                        <li>Your assessment will auto-submit when time runs out</li>
                        <li>Your results will be used to generate personalized career recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={startAssessment}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  size="lg"
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Assessment Completed!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Generating your AI-powered career report...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {assessment.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {assessment.totalQuestions}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border-2 border-purple-200 dark:border-purple-800">
            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-purple-200 dark:border-purple-800 mb-6">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <CardTitle className="text-xl flex-1">{currentQuestion.question}</CardTitle>
                <Badge
                  variant="outline"
                  className={
                    currentQuestion.difficulty === "Easy"
                      ? "border-green-500 text-green-700 dark:text-green-400"
                      : currentQuestion.difficulty === "Medium"
                      ? "border-yellow-500 text-yellow-700 dark:text-yellow-400"
                      : "border-red-500 text-red-700 dark:text-red-400"
                  }
                >
                  {currentQuestion.difficulty}
                </Badge>
              </div>
              <Badge variant="secondary">{currentQuestion.topicTag}</Badge>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedAnswer === index
                        ? "border-purple-400 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            size="lg"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            size="lg"
          >
            {currentQuestionIndex === assessment.questions.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}