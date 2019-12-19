const scriptName = "출석봇.js";
const botName = "myAttendanceBot"
var attendance = {};
var attendanceMsgList = ["출석", "ㅊㅅ", "ㅊㅊ", "cc", "cx"];
FS = FileStream;
var path = "/sdcard/katalkbot/Database/"+botName+"/attendance.json";
var attendanceinfo = "information";
var todayString = GetDayString(new Date());

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    //출석조회
    if (msg == "/출석조회") {
        replier.reply(PrintAttendance(room, sender));
    }
    // 출석
    else if (attendanceMsgList.includes(msg)) {
        if (!FS.read(path)) {
            //replier.reply("FS.read()");
            FS.write(path, "{}");
        }
        attendance = JSON.parse(FS.read(path));
        if (undefined == attendance[room]) {
            //replier.reply("attendance[room] undefined");
            attendance[room] = {};
        }
        if (undefined == attendance[room][attendanceinfo]) {
            attendance[room][attendanceinfo] = {
                roomName: room,
                isGroupChat: isGroupChat,
                TodayAttendanceDay: todayString,
                TotalTodayAttendanceNum: 0
            };
        }
        if (undefined == attendance[room][sender]) {
            //replier.reply("attendance[room][sender] undefined");
            attendance[room][sender] = {
                LastAttendanceDay: '2019-12-09',
                ContinuedAttendanceDayCount: 1,
                TotalAttendanceDayCount: 0,
                TodayAttendanceDayOrder: 0
            };
        }
    };
    var LastAttendanceDayString = GetDayString(attendance[room][sender].LastAttendanceDay);
    var Lastday = GetDayString(attendance[room][attendanceinfo].TodayAttendanceDay);
    //replier.reply("last : " + LastAttendanceDayString);
    var diffDay = GetDiffDay(LastAttendanceDayString, todayString);
    //replier.reply("diffDay : " + diffDay);
    var needreset = isNeedReset(Lastday, todayString);
    //출석일수를 판단하여 출석등수 초기화여부 판단.
    if (needreset == true) {
        //리셋필요시 출석부의 등수기록부 초기화.
        attendance[room][attendanceinfo].TodayAttendanceDay = todayString;
        attendance[room][attendanceinfo].TotalTodayAttendanceNum = 0;
        attendance[room][sender].TodayAttendanceDayOrder = 0;
    } else {
        attendance[room][attendanceinfo].TotalTodayAttendanceNum++;
        attendance[room][sender].TodayAttendanceDayOrder = attendance[room][attendanceinfo].TotalTodayAttendanceNum;
    };
    // 출석 일 수가 다르다
    if (diffDay >= 1) {
        attendance[room][sender].LastAttendanceDay = todayString;
        attendance[room][sender].TotalAttendanceDayCount++;
        // 출석일 비교 값이 1이면 연속 출석
        if (1 == diffDay) {
            //replier.reply("diffDay == 1");
            attendance[room][sender].ContinuedAttendanceDayCount++;
        } else {
            //replier.reply("diffDay != 1");
            attendance[room][sender].ContinuedAttendanceDayCount = 0;
        }
        replier.reply(ReportAttendance(room, sender));
        FS.write(path, JSON.stringify(attendance));
    } else {
        replier.reply(sender + "님은 오늘 출석 하셨습니다.");
    }
}

function ReportAttendance(room, sender) {
    if (undefined == attendance[room]) {
        return (sender + "님은 출석 기록이 없습니다.");
    } else if (undefined == attendance[room][sender]) {
        return (sender + "님은 출석 기록이 없습니다.");
    } else {
        if (attendance[room][sender].ContinuedAttendanceDayCount != 0) {
            return (sender + "님 출석하셨습니다.\n" + "최근 출석 일은 " + attendance[room][sender].LastAttendanceDay + "일이며\n" + attendance[room][sender].ContinuedAttendanceDayCount + "일 째 연속 출석 하셨습니다.\n" + "총 출석 일 수는 " + attendance[room][sender].TotalAttendanceDayCount + "일 입니다.\n" + (attendance[room][attendanceinfo].TotalTodayAttendanceNum + 1) + "등으로 출석하셨습니다.");
        } else {
            return (sender + "님이 오늘 첫 출석을 하셨습니다.\n" + "최근 출석 일은 " + attendance[room][sender].LastAttendanceDay + "일이며\n오늘 처음 출석 하셨습니다.\n" + "총 출석 일 수는 " + attendance[room][sender].TotalAttendanceDayCount + "일 입니다.\n" + attendance[room][attendanceinfo].TotalTodayAttendanceNum + "등으로 출석하셨습니다.");
        }
    }
}

function PrintAttendance(room, sender) {
    if (undefined == attendance[room]) {
        return (sender + "님은 출석 기록이 없습니다.");
    } else if (undefined == attendance[room][sender]) {
        return (sender + "님은 출석 기록이 없습니다.");
    } else {
        return (sender + "님 의 출석현황입니다.\n" + "최근 출석 일은 " + attendance[room][sender].LastAttendanceDay + " 일이며\n" + attendance[room][sender].ContinuedAttendanceDayCount + "일째 연속 출석 하셨습니다.\n" + "총 출석 일 수는 " + attendance[room][sender].TotalAttendanceDayCount + "일 입니다.\n오늘은 " + (attendance[room][sender].TodayAttendanceDayOrder - 1) + "등으로 출석하셨습니다.");
    }
}

function GetDayString(day) {
    var inputDay = day instanceof Date ? day : new Date(day);
    // 2019-12-14
    var today = inputDay.getFullYear() + "-" + ('0' + (inputDay.getMonth() + 1)).slice(-2) + "-" + ('0' + inputDay.getDate()).slice(-2);
    return today;
}

function GetDiffDay(_date1, _date2) {
    var date1 = _date1 instanceof Date ? _date1 : new Date(_date1);
    var date2 = _date2 instanceof Date ? _date2 : new Date(_date2);
    date1 = new Date(date1.getFullYear(), date1.getMonth() + 1, date1.getDate());
    date2 = new Date(date2.getFullYear(), date2.getMonth() + 1, date2.getDate());
    var diff = Math.abs(date2.getTime() - date1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));
    return diff;
}

function isNeedReset(_date1, _date2) {
    let diff = GetDiffDay(_date1, _date2);
    return Boolean(diff >= 1);
}

function onStartCompile() {
    /*컴파일 또는 Api.reload호출시, 컴파일 되기 이전에 호출되는 함수입니다.
     *제안하는 용도: 리로드시 자동 백업*/
}
//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
    var layout = new android.widget.LinearLayout(activity);
    layout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
    var txt = new android.widget.TextView(activity);
    txt.setText("액티비티 사용 예시입니다.");
    layout.addView(txt);
    activity.setContentView(layout);
}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}
