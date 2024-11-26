def make_message(correct: int) -> str:
    if correct == 0 or correct == 1:
        return "ベロベロだから絶対にお酒を飲んじゃだめ！失敗するよ、マジで"
    elif correct == 2 or correct == 3:
        return "かなり酔っているから、お酒を飲まないほうがいいよ"
    elif correct == 4 or correct == 5:
        return "まだ飲んでも大丈夫だけど、飲みすぎには気をつけてね！"
    elif correct == 6 or correct == 7:
        return "ほろ酔いだから、飲み会を楽しもう！"
    elif correct == 8 or correct == 9 or correct == 10:
        return "まだまだシラフ！"

