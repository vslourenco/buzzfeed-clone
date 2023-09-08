import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quizz_questions.json';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  title: string = '';

  quizData!: Quiz;
  questions: Question[] = [];
  questionSelected!: Question;

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionSize: number = 0;

  finished: boolean = false;

  ngOnInit(): void {
    if (quiz_questions) {
      this.quizData = quiz_questions;
      this.finished = false;
      this.title = quiz_questions.title;

      this.questions = this.quizData.questions;
      this.questionSize = this.questions.length;
      this.questionIndex = 0;
      this.questionSelected = this.questions[this.questionIndex];
    }
  }

  playerChoice(answer: string) {
    this.answers.push(answer);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex++;

    if (this.questionSize > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;

      this.answerSelected =
        quiz_questions.results[
          finalAnswer as keyof typeof quiz_questions.results
        ];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
    return result;
  }
}
