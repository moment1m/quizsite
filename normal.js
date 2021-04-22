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
    
if (hla === 'ja'){    
  aryQuiz.push(
    {
      question:'「別々に」はどれ？',
      answer:['따로','따라서','때로','떄떄로','따위']
    }
    ,{
      question:'「うっかり」はどれ？',
      answer:['깜빡','깜짝','새탁','감격','짝짝']
    }
    ,{
      question:'「～さえ」はどれ？',
      answer:['조차','처럼','차고','에다가','만큼']
    }
    ,{
      question:'「～するも同然だ」はどれ？',
      answer:['한 셈이다','했을 뿐이다','할 걸 그랬다','할 모양이다','할 것 같다']
    }
    ,{
      question:'「ちょうど」はどれ？',
      answer:['마침','뜻밖에','마침내','드디어','마치']
    }
    );
}else if(hla === 'ko'){
    aryQuiz.push(
    {
      question:'`각오`에 해당되는 일본어를 고르십시오.',
      answer:['覚悟','錯覚','各語','覚誤','確実']
    }
    ,{
      question:'`슬슬`에 해당되는 일본어를 고르십시오.',
      answer:['そろそろ','さらさら','すらすら','せかせか','すりすり']
    }
    ,{
      question:'`그리고`에 해당되는 일본어를 고르십시오.',
      answer:['それと','それに','そこに','そこと','そこの']
    }
    ,{
      question:'`납입하다`에 해당되는 일본어를 고르십시오.',
      answer:['振り込む','振り回す','振りかぶる','振る','回り込む']
    }
    ,{
      question:'`여전히/변합없이`에 해당되는 일본어를 고르십시오.',
      answer:['相変わらず','特に変わらず','愛変わらず','相代わらず','変わらず']
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
        text = quiz_success_cnt + '/' + quiz_fin_cnt + '점' + '<br>야,너!공부좀 해라!';
        if(quiz_fin_cnt === quiz_success_cnt){
            text = '<br>100점!멋있다앙~!';
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
