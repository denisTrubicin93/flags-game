import { Question } from './models';

const getRandomQuestions = (questions: Question[], count: number) => {
  const mapped = questions
    ? questions
        .filter(function (elem) {
          return elem.url;
        })
        .map((item) => ({
          value: item,
          sort: Math.random(),
        }))
    : [];
  mapped.sort((a, b) => a.sort - b.sort);
  return mapped.map((item) => item.value).slice(0, count);
};

export { getRandomQuestions };
