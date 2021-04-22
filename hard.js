  $(function(){
  var quizArea = $('.quiz_area');
  var quiz_html = quizArea.html();
  var quiz_cnt = 0;
  var quiz_fin_cnt = 3;
  var quiz_success_cnt = 1;
  var aryQuiz = [];
  
  $(function(){
  var btn = $('.quiz_ans_area ul li');
   btn.click(function(){
    btn.removeClass('active');
    $(this).addClass('active');
   });
  });

let hl = window.location.search;
let hla = hl.slice(-2);

if(hla === 'ja'){
      aryQuiz.push(
    {
      question:'「案の定」はどれ？',
      answer:['아니나 다를까','아니 할 말로','알게 모르게','아니다 싶어서','아니면 말고']
    }
    ,{
      question:'「羽を伸ばす」はどれ？',
      answer:['기를 펴다','기를 쓰다','기를 껶다','기를 죽이다','기를 살리다']
    }
    ,{
      question:'「抜かりが無い、腕前が良い」はどれ？',
      answer:['손이 맵다','손이 나가다','손이 가다','손이 크다','손이 빠르다']
    }
    ,{
      question:'「約束をすっぽかされる」はどれ？',
      answer:['바람을 맞다','바람을 피다','바람을 쐬다','바람을 넣다','바람을 담다']
    }
    ,{
      question:'「影も形も無い」はどれ？',
      answer:['온데간데없다','오라 가라 하다','온다 간다 말없이','오도 가도 못하다','올 것이 오다']
    }
    );
}else if(hla === 'ko'){
    aryQuiz.push(
    {
      question:'`蒸し暑い`에 해당되는 한국어를 고르십시오.',
      answer:['무덥다','찌다','무겁다','끓이다','답답하다']
    }
    ,{
      question:'`입안`에 해당되는 일본어를 고르십시오.',
      answer:['立案','案件','立憲','安泰','立法']
    }
    ,{
      question:'`ふさわしい`에 해당되는 한국어를 고르십시오.',
      answer:['어울리다','두렵다','가깝다','그럴싸하다','안타깝다']
    }
    ,{
      question:'`조심스럽지 않다`를 뜻하는 일본어를 고르십시오.',
      answer:['不謹慎','不自由','不明','理不尽','不明確']
    }
    ,{
      question:'`상중`에 해당되는 일본어를 고르십시오.',
      answer:['喪中','懐中','渦中','作中','世中']
    }
    );
}
quizReset();
    
    //回答を選択した後の処理
    quizArea.on('click', '.quiz_ans_area ul li', function(){
        
        if($(this).data('true')){
            
            //正解数をカウント
            quiz_success_cnt++;
        }
        setTimeout(function(){
            //表示を元に戻す
            //問題のカウントを進める
            quiz_cnt++;
            if(quiz_fin_cnt > quiz_cnt){
                //次の問題を設定する
                
                quizShow();
            }else{
                //結果表示画面を表示
                quizResult();
            }
        });
    });
   //もう一度挑戦するを押した時の処理
    quizArea.on('click', '.quiz_restart', function(){
        quizReset();
    });
    //リセットを行う関数
    function quizReset(){
        quizArea.html(quiz_html); //表示を元に戻す
        quiz_cnt = 0;
        quiz_success_cnt = 0;
        aryQuiz = arrShuffle(aryQuiz); //毎回出題の順番をシャッフルしたい場合はここのコメントを消してね
        quizShow();
    }
    //問題を表示する関数
    function quizShow(){
        //何問目かを表示
        quizArea.find('.quiz_no').text((quiz_cnt + 1));
        //問題文を表示
        quizArea.find('.quiz_question').text(aryQuiz[quiz_cnt]['question']);
        //正解の回答を取得する
        var success = aryQuiz[quiz_cnt]['answer'][0];
        //現在の選択肢表示を削除する
        quizArea.find('.quiz_ans_area ul').empty();
        
        //問題文の選択肢をシャッフルさせる(自作関数) .concat()は参照渡し対策
        var aryHoge = arrShuffle(aryQuiz[quiz_cnt]['answer'].concat());
        //問題文の配列を繰り返し表示する
        $.each(aryHoge, function(key, value){
            var fuga = '<li>' + value + '</li>';
            //正解の場合はdata属性を付与する
            if(success === value){
                fuga = '<li data-true="1">' + value + '</li>';
            }
            quizArea.find('.quiz_ans_area ul').append(fuga);
        });
    }
    //結果を表示する関数
    function quizResult(){
        if(hla === 'ja'){
        quizArea.find('.quiz_set').hide();
        var text = quiz_fin_cnt + '問中' + quiz_success_cnt + '問正解！';
        if(quiz_fin_cnt === quiz_success_cnt){
            text += '<br>全問正解おめでとう！';
        }
        text += '<br><input type="button" value="もう一度挑戦する" class="quiz_restart p-10 ">';
        quizArea.find('.quiz_result').html(text);
        quizArea.find('.quiz_result').show();
        }else if(hla === 'ko'){
         quizArea.find('.quiz_set').hide();
        text = quiz_success_cnt + '/' + quiz_fin_cnt + '점' + '<br>자기가 일본어 잘한다고 까불었지???';
        if(quiz_fin_cnt === quiz_success_cnt){
            text = '<br>100점!대박!너 일본인이지!?';
        }
        text += '<br><input type="button" value="다시하기" class="quiz_restart p-10 ">';
        quizArea.find('.quiz_result').html(text);
        quizArea.find('.quiz_result').show();
        }
    }
     //配列をシャッフルする関数
    function arrShuffle(arr){
        for(i = arr.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    }
});
