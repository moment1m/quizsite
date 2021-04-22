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
console.log(hla);

if (hla === 'ja'){
aryQuiz.push(
  {
      question:'「ずっと」はどれ？',
      answer:['계속','지속','접속','계절','계기']
    }
    ,{
      question:'「また」はどれ？',
      answer:['또','기','꿀','딱','띠']
    }
    ,{
      question:'「自転車」はどれ？',
      answer:['자전거','지하철','자동차','자식','반차']
    }
    ,{
      question:'「きれい」はどれ？',
      answer:['깨끗하다','더럽다','깨다','꾸미다','신겁다']
    }
    ,{
      question:'「失敗は成功のもと」はどれ？',
      answer:['실패는 성공의 어머니','그림의 떡','하늘의 별따기','옥에 티','자식 이기는 부모 없다']
    }
    );
}
else if(hla === 'ko'){
　aryQuiz.push(
    {
      question:'`금요일`에 해당되는 일본어를 고르십시오.',
      answer:['金曜日（きんようび）','月曜日（げつようび）','火曜日（かようび）','日曜日（にちようび）','水曜日（すいようび）']
    }
    ,{
      question:'`기쁘다`에 해당되는 일본어를 고르십시오.',
      answer:['うれしい','かなしい','あいたい','おもしろい','たのしい']
    }
    ,{
      question:'`꽃다발`에 해당되는 일본어를 고르십시오.',
      answer:['はなたば','かびん','はなやさん','おはなばたけ','はなかざり']
    }
    ,{
      question:'`꿈`에 해당되는 일본어를 고르십시오.',
      answer:['ゆめ','さめ','かめ','だめ','ゆみ']
    }
    ,{
      question:'`시청`에 해당되는 일본어를 고르십시오.',
      answer:['しやくしょ','しやく','けいさつしょ','しょうぼうしょ','がくしょ']
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
        }
        else if(hla == 'ko'){
        quizArea.find('.quiz_set').hide();
        text = quiz_success_cnt + '/' + quiz_fin_cnt + '점' + '<br>괜찮아,이거 틀렸다고 죽지는 않아.';
        if(quiz_fin_cnt === quiz_success_cnt){
            text = '<br>100점!오이구 잘했어용~';
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
