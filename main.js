class Character {
  constructor(name) {
    this.name = name;
    this.hp = 20;
  }
  isAlive() {
    return this.hp > 0;
  }
}

// サイコロを振る関数（1〜6）
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// 勇者とドラゴンのインスタンス
const hero = new Character("勇者");
const dragon = new Character("ドラゴン");

// 勇者の行動（アタック or ディフェンス）を決める（例としてランダム）
function heroAction() {
  return Math.random() < 0.5 ? "attack" : "defense";
}

// ドラゴンの行動はランダム
function dragonAction() {
  return Math.random() < 0.5 ? "attack" : "defense";
}

// ゲームの1ターンを処理する関数
function gameTurn() {
  console.log(`\n--- 新しいターン ---`);
  console.log(`勇者HP: ${hero.hp}, ドラゴンHP: ${dragon.hp}`);

  const hAction = heroAction();
  const dAction = dragonAction();
  console.log(`勇者は${hAction}、ドラゴンは${dAction}`);

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
        dragon.hp -= 5;
        console.log(`ドラゴンのHPが5減った！現在HP: ${dragon.hp}`);
        return;
      }
    } while (hRoll === dRoll);

    if (hRoll > dRoll) {
      console.log("勇者の攻撃！ドラゴンのHPが5減った！");
      dragon.hp -= 5;
    } else {
      console.log("ドラゴンの攻撃！勇者のHPが5減った！");
      hero.hp -= 5;
    }
  } else if (hAction === "defense" && dAction === "defense") {
    hero.hp += 2;
    dragon.hp += 2;
    console.log("両者防御！双方HPが2回復！");
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
  while (true) {
    const result = gameTurn();
    if (result === "end") break;
  }
  console.log("ゲーム終了");
}

// ゲームスタート
gameLoop();
