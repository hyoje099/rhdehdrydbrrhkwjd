// 문제 객체(생성자 함수)
function Question(text, choice, answer) {
    this.text = text; // 질문 텍스트
    this.choice = choice; // 선택할 답들(배열)
    this.answer = answer; // 정답 정보
 }
 
 // 퀴즈 정보 객체
 function Quiz(questions) {
    this.score = 0; // 점수
    this.questions = questions; // 문제
    this.questionIndex = 0; // 문제 번호
 }
 
 // 정답 확인 메서드
 Quiz.prototype.correctAnswer = function(answer) {
    return answer == this.questions[this.questionIndex].answer;
 }
 
 var questions = [
    new Question('"C언어로 구현된 성능 비교에서, 10,000개의 랜덤 수열을 정렬할 때 어느 정렬 방식이 더 빠르게 완료되었나요?', ['퀵 정렬','롱 정렬','기본정렬','하이퍼정렬'], '퀵 정렬'),
    new Question('병합 정렬과 퀵 정렬은 어떤 기법을 사용하는 정렬 알고리즘인가요?', ['단일 정복 기법', '다중 정복 기법', '분할 정복 기법', '초코 복합 기법'], '분할 정복 기법'),
    new Question('병합 정렬의 시간 복잡도와 공간 복잡도는 각각 얼마인가요?', ['시간 복잡도: O(n log n), 공간 복잡도: O(n)', '시간 복잡도: /O/, 공간 복잡도: x', '시간 복잡도: 131, 공간 복잡도: O(9)', '시간 복잡도: (n), 공간 복잡도: log(n)'], '시간 복잡도: O(n log n), 공간 복잡도: O(n)'),
    new Question('병합 정렬과 퀵 정렬 중 어느 것이 안정 정렬 알고리즘(Stable Sort)인가요?', ['퀵정렬', '초코 주스', '병합 정렬', '복합 정렬'], '병합 정렬'),
    new Question('이미 정렬된 데이터나 역순으로 정렬된 데이터의 경우, 어느 정렬 알고리즘의 성능이 저하되나요?', ['퀵 정렬','롱 정렬','기본정렬','하이퍼정렬'], '퀵 정렬'),
];
 
 // 퀴즈 객체 생성
 var quiz = new Quiz(questions);
 
 // 문제 출력 함수
 function updateQuiz() {
    var question = document.getElementById('question');
    var idx = quiz.questionIndex + 1;
    var choice = document.querySelectorAll('.btn');
 
    // 문제 출력
    question.innerHTML = '문제' + idx + ') ' + quiz.questions[quiz.questionIndex].text;
 
    // 선택 출력
    for (var i = 0; i < 4; i++) {
       choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
    }
 
    progress();
 }
 
 function progress() {
    var progress = document.getElementById('progress');
    progress.innerHTML = '문제 ' + (quiz.questionIndex + 1) + '/ ' + quiz.questions.length;
 }
 
 var btn = document.querySelectorAll('.btn');
 
 // 입력 및 정답 확인 함수
 function checkAnswer(i) {
    btn[i].addEventListener('click', function() {
       var answer = btn[i].innerText;
 
       if (quiz.correctAnswer(answer)) {
          alert('정답입니다!');
          quiz.score++;
       } else {
          alert('틀렸습니다!');
       }
 
       if (quiz.questionIndex < quiz.questions.length - 1) {
          quiz.questionIndex++;
          updateQuiz();
       } else {
          result();
       }
    });
 }
 
 function result() {
    var quizDiv = document.getElementById('quiz');
    var per = parseInt((quiz.score * 100) / quiz.questions.length);
    var txt = '<h1>퀴즈</h1>' + '<h2 id="score">당신의 점수: ' + quiz.score + '/' + quiz.questions.length + '<br><br>' + per + '점' + '</h2>';
 
    quizDiv.innerHTML = txt;
 
    // 점수별 결과 텍스트
    if (per < 60) {
       txt += '<h2>발표 집중해서 봐주세요</h2>';
       quizDiv.innerHTML = txt;
    } else if (per >= 60 && per < 80) {
       txt += '<h2>화이팅 보통입니다.</h2>'
       quizDiv.innerHTML = txt;
    } else if (per >= 80) {
       txt += '<h2>감사합니다.^^</h2>'
       quizDiv.innerHTML = txt;
    }
 }
 
 for (var i = 0; i < btn.length; i++) {
    checkAnswer(i);
 }
 
 updateQuiz();
 