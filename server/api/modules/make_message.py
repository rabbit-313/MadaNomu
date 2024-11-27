def make_message(correct: int) -> str:
    if correct == 0 or correct == 1:
        return "かなり酔ってきてるから、お酒を飲ませないで！"
    elif correct == 2 or correct == 3:
        return "酔ってきてるから、飲みすぎないように注意して！"
    elif correct == 4 or correct == 5:
        return "まだ飲んでも大丈夫だけど、飲みすぎないようにさせて！"
    elif correct == 6 or correct == 7:
        return "ほろ酔い！飲み会を楽しもう！"
    elif correct == 8 or correct == 9 or correct == 10:
        return "まだ大丈夫！飲み会を楽しもう！"

