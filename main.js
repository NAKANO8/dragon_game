const readline = require("readline");

class Character {
  constructor(name,hp) {
    this.name = name;
    this.hp = hp;
  }
}
// 体力を設定
const hp = 20;
// 攻撃するダメージ量を設定する
const attackDamage = 10;
// 回復する量を設定する
const recoveryHp = 2;

// 標準入出力
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// サイコロを振る関数（1〜6）
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// 勇者とドラゴンのインスタンス
const hero = new Character("勇者",20);
const dragon = new Character("ドラゴン",20);


// 勇者の行動（アタック or ディフェンス）を決める（例としてランダム）
function heroAction(input) {
  if (input === "1") return "attack";
  else if (input === "2") return "defense";
  else return null; 
}

// ドラゴンの行動はランダム
function dragonAction() {
  return Math.random() < 0.5 ? "attack" : "defense";
}

// ゲームの1ターンを処理する関数
function gameTurn(hAction, dAction) {
  console.log(`\n--- 新しいターン ---`);
  console.log(`勇者HP: ${hero.hp}, ドラゴンHP: ${dragon.hp}`);
  
  if (hAction === "attack" && dAction === "defense") {
    console.log("自分の攻撃が防がれた！ダメージなし");
  } else if (hAction === "defense" && dAction === "attack") {
    console.log("相手の攻撃が防がれた！ダメージなし");
  } else if (hAction === "attack" && dAction === "attack") {
    let retryCount = 0;
    let hRoll, dRoll;
    do {
      hRoll = rollDice();
      dRoll = rollDice();
      console.log(`勇者の出目: ${hRoll}, ドラゴンの出目: ${dRoll}`);
      retryCount++;
      if (retryCount >= 5) {
        console.log("振り直し5回以上！勇者の攻撃ターン！");
        dragon.hp -= attackDamage;
        console.log(`ドラゴンのHPが${attackDamage}減った！現在HP: ${dragon.hp}`);
        return;
      }
    } while (hRoll === dRoll);
    
    if (hRoll > dRoll) {
      console.log(`勇者の攻撃！ドラゴンのHPが${attackDamage}減った！`);
      dragon.hp -= attackDamage;
    } else {
      console.log(`ドラゴンの攻撃！勇者のHPが${attackDamage}減った！`);
      hero.hp -= attackDamage;
    }
  } else if (hAction === "defense" && dAction === "defense") {
    hero.hp += recoveryHp;
    dragon.hp += recoveryHp;
    console.log(`両者防御！双方HPが${recoveryHp}回復！`);
    console.log(`勇者HP: ${hero.hp}, ドラゴンHP: ${dragon.hp}`);
  }
  
  // HPチェック
  if (hero.hp <= 0 && dragon.hp <= 0) {
    console.log("勇者とドラゴンが同時に倒れた！世界には誰もいなくなった...");
    return "end";
  } else if (dragon.hp <= 0) {
    console.log("ドラゴンが倒れた！ゲームクリア！");
    return "end";
  } else if (hero.hp <= 0) {
    console.log("勇者が倒れた！ゲームオーバー！");
    return "end";
  }
}

// メインループ（ゲーム開始）
function gameLoop() {
  // ここで値を入力してもらってその後判断してもらう。
  rl.question('1:アタック,2:ディフェンスのどちらかを選んでください:', (answer) => {
    const hAction = heroAction(answer);
    if(!hAction) {
      console.log('無効な入力です。1か2を入力してください');
      rl.close();
      return;
    }

    const dAction = dragonAction();
    console.log(dAction);
    const result = gameTurn(hAction, dAction);

    if (result === "end") {
      console.log("ゲーム終了");
      rl.close();
    } else {
      gameLoop(); // 次のターンへ
    }
  });
}1

// ゲームスタート
gameLoop();
