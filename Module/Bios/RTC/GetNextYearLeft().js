const scriptName = "GetNextYearLeft().js";
function GetNextYearLeft()(_year, _month, _day) {
    birth = new Date(_year, _month, _day);
    today = new Date();
    tyear = today.getFullYear();
    tmonth = today.getMonth();
    tday = today.getDate();
    time = today.getTime() - birth.getTime();
    sec = parseFloat(time / 1000).toFixed(2);
    min = parseFloat(sec / 60).toFixed(2);
    hour = parseFloat(min / 60).toFixed(2);
    day = parseFloat(hour / 24).toFixed(2);
    year = Math.floor(day / 365);
    result = "당신은 만 " + year + "세 입니다.\n\n살아온 달수 : " + Math.floor(day / 30) + "달\n살아온 일수 : " + Math.floor(day) + "일"
    return result;
}

function response(room, msg, sender, _, replier) {
    if (msg.startsWith("/나이 ")) {
        arr = []
        birth = msg.substr(4)
        if (birth.length == 8) {
            birth.replace(/([0-9]{2})/g, x => arr.push(x))
            if (Number(arr[0] + arr[1]) < 2020) {
                replier.reply(GetNextYearLeft(Number(arr[0] + arr[1]), Number(arr[2]), Number(arr[3])))
            } else replier.reply("• 2019년도부터 확인이 가능합니다!")
        } else replier.reply("• 입력 방식이 잘못되었습니다!\nYYYYMMDD 형식으로 써주세요.")
    }
}
