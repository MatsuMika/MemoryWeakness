$(function(){

  const card = ["A","2","3","4","5","6","7","8","9","10","J","Q","K",
  "A","2","3","4","5","6","7","8","9","10","J","Q","K",
  "A","2","3","4","5","6","7","8","9","10","J","Q","K",
  "A","2","3","4","5","6","7","8","9","10","J","Q","K"]

  const image_list = ["../images/spades_A.png", "../images/spades_2.png", "../images/spades_3.png", "../images/spades_4.png", "../images/spades_5.png", "../images/spades_6.png", "../images/spades_7.png", "../images/spades_8.png", "../images/spades_9.png", "../images/spades_10.png", "../images/spades_J.png", "../images/spades_Q.png", "../images/spades_K.png", "../images/heart_A.png", "../images/heart_2.png", "../images/heart_3.png", "../images/heart_4.png", "../images/heart_5.png", "../images/heart_6.png", "../images/heart_7.png", "../images/heart_8.png", "../images/heart_9.png", "../images/heart_10.png", "../images/heart_J.png", "../images/heart_Q.png", "../images/heart_K.png", "../images/club_A.png", "../images/club_2.png", "../images/club_3.png", "../images/club_4.png", "../images/club_5.png", "../images/club_6.png", "../images/club_7.png", "../images/club_8.png", "../images/club_9.png", "../images/club_10.png", "../images/club_J.png", "../images/club_Q.png", "../images/club_K.png", "../images/diamond_A.png", "../images/diamond_2.png", "../images/diamond_3.png", "../images/diamond_4.png", "../images/diamond_5.png", "../images/diamond_6.png", "../images/diamond_7.png", "../images/diamond_8.png", "../images/diamond_9.png", "../images/diamond_10.png", "../images/diamond_J.png", "../images/diamond_Q.png", "../images/diamond_K.png"];

  const backImage = "../images/Back.jpg"
    
  //カード数分の数字(0〜)を作成
  const array = [0]
  let  array_num = [];
  for(let num = 0; num < image_list.length - 1 ; num++){
    array_num[num] = num + 1;
  }
  //0が入った配列とカード数-1(0を追加後にカード数と例数の数を等しくするため)の配列を結合
  array_num = array.concat(array_num);
//ランダムに出力する関数(Fisher–Yatesアルゴリズム)
  //用途：cardとimage_listを連動させるため
  for(let n = array_num.length - 1; n > 0; n--) { //配列の後ろから順にループする
    const ran = Math.floor(Math.random() * (n + 1));  //入れ替えの要素をランダムに取得
    const tmp = array_num[n];  //要素の入れ替え
    array_num[n] = array_num[ran];  //要素の入れ替え
    array_num[ran] = tmp;  //要素の入れ替え
  }

  let i;  //0〜カード数分のランダムな整数を入れる変数（配列要素番号として使用）
  console.log(array_num);
  for(let x = 0; x < array_num.length; x++){
    i = array_num[x]; //上記で作成したランダムな整数

    let image = backImage
    console.log(image);
    let elemImage = $("<img>").attr("src", backImage).attr('id', i);
    $("#field").append(elemImage.addClass('card'));
    console.log(elemImage);
  }

  let first = null;  //１回目の情報が空(クリックされていない)
  let second = null;  //2回目の情報が空(クリックされていない)
  let timerid = null; //timeridの情報が空
  let join_array = [];  //引いた2枚のカードのid取得

  // プレイヤーは２枚ずつカードを選択する。
  $('.card').on('click',function(event){ 
    elem = event.target;
    cardNum = String(elem.id)  //id(ランダム整数「i」を文字列化)
    
      if(timerid){  //クリック時にタイマーが起動していた場合
        clearTimeout(timerid);  //タイマーを終了
        secondAction();  //secondAction関数を実行
      }

        //クリックされたカードのDOM要素を取得
      $(elem).attr("src", image_list[cardNum]) //裏から表画像に上書きし、画面に出力する   

      //1回目：クリックした時
      if( !first ){ //１回目のクリックがされていなかったら
        first = cardNum; //firstに(クリックされたカード情報)を入れる
        firstEvent = event.target;
        join_array.push(elem.id);
      }else if( first === cardNum ){  //１回目のカードを再びクリックしたら、何もしない(表向きのまま)
        return;
      }else{  //2回目：1回目と異なるカードをクリックした時（1回目にカードが入っている場合）
        second = cardNum;
        console.log(second);
        join_array.push(elem.id);
        timerid = setTimeout(secondAction,1000);
      }
    });

  function secondAction() {
    if( card[first] === card[second]){//クリックしたカード番号が等しい数字の場合
      //クリックされたカード2枚を画面から見えない状態にする
      console.log(join_array[0]);
      $("#" + join_array[0]).css('visibility', 'hidden');
      $("#" + join_array[1]).css('visibility', 'hidden');
    }else if(card[first] !== card[second]){ //カード番号が異なる場合
      $("#" + join_array[0]).attr("src", backImage)
      $("#" + join_array[1]).attr("src", backImage)
    }
    //初期値に戻す
    first = null;
    second = null;
    timerid = null;
    join_array = [];
  }
  
});
