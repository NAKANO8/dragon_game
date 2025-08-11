# dragon_game
## JSのお勉強に簡単なプログラムを組んでいます。
## ゲームのフローチャート

```mermaid
flowchart TD
    Start[開始]
    Start --> InitHP[勇者・ドラゴンのHPを20にセット]
    InitHP --> TurnStart[ターン開始]
    
    TurnStart --> HeroAction{自分の行動は？}
    
    HeroAction -->|アタック| CheckDragonActionA
    HeroAction -->|ディフェンス| CheckDragonActionD
    
    %% 自分がアタックの時の相手の分岐
    subgraph アタック時の分岐
        CheckDragonActionA{相手の行動は？}
        CheckDragonActionA -->|アタック| BothAttack
        CheckDragonActionA -->|ディフェンス| HeroAttackBlocked
    end
    
    %% 自分がディフェンスの時の相手の分岐
    subgraph ディフェンス時の分岐
        CheckDragonActionD{相手の行動は？}
        CheckDragonActionD -->|アタック| DragonAttackBlocked
        CheckDragonActionD -->|ディフェンス| BothDefense
    end
    
    %% 各分岐先
    BothAttack["両方アタック<br>ダイス勝負へ"]
    HeroAttackBlocked["自分の攻撃が防がれた！<br>ダメージなし"] --> CheckHP
    DragonAttackBlocked["相手の攻撃が防がれた！<br>ダメージなし"] --> CheckHP
    BothDefense["両方ディフェンス<br>双方HPが2回復"] --> CheckHP
    
    %% ダイス勝負フロー
    BothAttack --> InitCounter[振り直し回数を0にセット]
    InitCounter --> DiceRoll[サイコロを振る<br>勇者とドラゴンの目を比較]
    DiceRoll --> CheckDiceEqual
    
    CheckDiceEqual{サイコロの目は同じ？}
    CheckDiceEqual -->|はい| IncrementCounter
    CheckDiceEqual -->|いいえ| CompareDice
    
    IncrementCounter --> IncreaseCount[カウンター+1]
    IncreaseCount --> CheckCounter
    
    CheckCounter{振り直し回数 >= 5 ?}
    CheckCounter -->|はい| ForceHeroAttack
    CheckCounter -->|いいえ| DiceRoll
    
    ForceHeroAttack["振り直し5回以上！<br>勇者の攻撃ターン！<br>ドラゴンのHP -5"] --> CheckHP
    
    CompareDice{勇者の目 > ドラゴンの目？}
    CompareDice -->|はい| HeroAttack
    CompareDice -->|いいえ| DragonAttack
    
    HeroAttack["勇者の攻撃！<br>ドラゴンのHP -5"] --> CheckHP
    DragonAttack["ドラゴンの攻撃！<br>勇者のHP -5"] --> CheckHP
    
    %% HPチェック・ゲーム終了判定
    CheckHP{勇者とドラゴンのHPは0以下？}
    CheckHP -->|勇者HP <= 0 & ドラゴンHP > 0| GameOver
    CheckHP -->|ドラゴンHP <= 0 & 勇者HP > 0| GameClear
    CheckHP -->|両方HP <= 0| BothDead
    CheckHP -->|両方HP > 0| TurnStart
    
    GameClear["ドラゴンが倒れた！<br>ゲームクリア！"]
    GameOver["勇者が倒れた！<br>ゲームオーバー！"]
    BothDead["勇者とドラゴンが同時に倒れた！<br>世界には誰もいなくなった..."]

