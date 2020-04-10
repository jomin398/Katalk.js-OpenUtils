module.exports = {
    day:new Date(),
    info: function(msg) {
        /* 본 소스는 jomin398의 OpenUtils 소스입니다.
        © 2020 jomin398, All rights reserved.
        본소스는 GPL 3.0이 적용되어있습니다.
        <one line to give the program's name and a brief idea of what it does.>
        OpenUtils Copyright (C) jomin398
        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.
        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.
        You should have received a copy of the GNU General Public License
        along with this program.  If not, see <https://www.gnu.org/licenses/>.
        */
        var getName = Object.getOwnPropertyNames(this);
        var text = [];
        text[0] = "이 모듈은 RTC( https://ko.wikipedia.org/wiki/실시간_시계 ) 모듈입니다<br>";
        text[1] = "모듈의 기능 목록은<br>\u300E" + Object.getOwnPropertyNames(this).join("()<br>") + "()\u300F<br>가 있습니다.";
        return {
            text: text.join("").replace(/<br>/gm, "\n"),
            cmdlist: getName
        };
        /* 사용예제
         * replier.reply(require("RTC").info());
         */
    },
    GetTime: function(presets) {
        // 현제시간 구하는 함수
        var tday = new Date(); //오늘
        //시간
        var hh = String(tday.getHours());
        var apmhh = (hh >= 13) ? hh - 12 : hh;
        var apm = (hh >= 13) ? '오후' : '오전';
        var mm = String(tday.getMinutes());
        var ss = String(tday.getSeconds());
        //유통기한 날짜와 같은 방식
        var YY = String(tday.getFullYear());
        var MM = String(tday.getMonth() + 1);
        var DD = String(tday.getDate());
        var day = String(tday.getDay()); //요일
        //편의를 위한 프리셋
        var dnday = (MM + "월" + DD + "일(" + ["일", "월", "화", "수", "목", "금", "토"][day] + ")").toString();
        var dnday2_1 = dnday.replace(/\(([가-힠])\)/, "( $1 )");
        var dnday2_2 = dnday.replace(/(\d{1,2}[가-힠])(\d{1,2}[가-힠])\(([가-힠])\)$/, "$1 $2 ( $3 )");
        var dnday3 = (((MM < 10) ? "0" + MM : MM) + "월" + ((DD < 10) ? "0" + DD : DD) + "일(" + ["일", "월", "화", "수", "목", "금", "토"][day] + ")");
        var dnday3_1 = dnday3.replace(/\(([가-힠])\)/, "( $1 )");
        var dnday3_2 = dnday3.replace(/(\d{1,2}[가-힠])(\d{1,2}[가-힠])\(([가-힠])\)$/, "$1 $2 ( $3 )");
        if (hh < 10) {
            hh = '0' + String(hh);
        }
        if (mm < 10) {
            mm = '0' + String(mm);
        }
        if (ss < 10) {
            ss = '0' + String(ss);
        }
        if (presets === undefined) {
            return {
                hh: hh,
                apmhh: apmhh,
                apm: apm,
                mm: mm,
                ss: ss,
                YY: YY,
                MM: MM,
                DD: DD,
                day: day,
                dnday: dnday,
                dndayWiths: dnday2_1,
                dndayAlls: dnday2_2,
                dndayWith0: dnday3,
                dndayWith0Ns: dnday3_1,
                dndayWith0NAlls: dnday3_2,
            };
        } else {
            /* presets 예시
            1. "yyyy년 M월 d일 오후 h시 m분"
            2. "지금은 h시 m분 s초 입니다."
            3. "지금은 오전 h시 m분 s초 입니다."
            */
            try {
                var result = java.text.SimpleDateFormat(presets).format(new Date());
                if (/오전|오후/.test(presets)) {
                    result = result.replace(/오전|오후/g, apm);
                }
                return result;
            } catch (e) {
                return e + " " + e.lineNumber + "\n\nGetTime(presets)\npreset setup Guide\n\n1. GetTime(\"yyyy년 M월 d일 오후 h시 m분\")\n2. GetTime(\"M월 d일 오후 h시 m분\")";
            }
        }
        /*사용법
        1. SimpleDateFormat 없이
            전역함수(this)추가후
            replier.reply(Gettime().dnday)
            하시면
            1월11일(토)
            이런 식으로 반환됩니다.
            프리셋은 맘대로 바꾸시고 호출하셔도되요
        
        2. SimpleDateFormat 사용
        java.text.SimpleDateFormat(presets).format(new Date());
            * presets 예시
                1. "yyyy년 M월 d일 오후 h시 m분"
                2. "지금은 h시 m분 s초 입니다."
                3. "지금은 오전 h시 m분 s초 입니다."
            *
        */
    },
    DoSaykorStrTime: function(preset) {
        var day = new Date(),
            min2kor = this.DoSayNum2kor;
        var H = day.getHours(),
            apm = (H >= 13) ? '오후' : '오전';
        var hr1 = ["한", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉"],
            hr10s = ["열", "스물"];
        if (H < 10) {
            result = hr1[H - 1];
        } else if (H => 10) {
            HH = Math.floor(H / 10);
            Hh = H % 10;
            if (HH == 1, Hh === 0) {
                result = hr10s[HH - 1];
            } else {
                result = hr10s[HH - 1] + "" + hr1[Hh - 1];
            }
        }
        if (preset === undefined) {
            return apm + " " + result + "시 " + min2kor(day.getMinutes()) + "분 " + min2kor(day.getSeconds()) + "초";
        } else {
            return preset.replace(/오전|오후/g, apm).replace(/h{1,2}/g, result).replace(/m{1,2}/g, min2kor(day.getMinutes())).replace(/s{1,2}/g, min2kor(day.getSeconds()));
        }
    },
    DoSayNum2kor: function(num) {
        /* return edited by jomin398;
        reference at https://sub0709.blogspot.com/2019/09/javascript.html */
        num = parseInt((num + '').replace(/[^0-9]/g, ''), 10) + ''; // 숫자/문자/돈 을 숫자만 있는 문자열로 변환
        if (num == '0') return '영';
        var number = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
        var unit = ['', '만', '억', '조'];
        var smallUnit = ['천', '백', '십', ''];
        var result = []; //변환된 값을 저장할 배열
        var unitCnt = Math.ceil(num.length / 4); //단위 갯수. 숫자 10000은 일단위와 만단위 2개이다.
        num = num.padStart(unitCnt * 4, '0'); //4자리 값이 되도록 0을 채운다
        var regexp = /[\w\W]{4}/g; //4자리 단위로 숫자 분리
        var array = num.match(regexp);
        //낮은 자릿수에서 높은 자릿수 순으로 값을 만든다(그래야 자릿수 계산이 편하다)
        for (var i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
            var hanValue = _makeHan(array[i]); //한글로 변환된 숫자
            if (hanValue === '') //값이 없을땐 해당 단위의 값이 모두 0이란 뜻. 
                continue;
            result.unshift(hanValue + unit[unitCnt]); //unshift는 항상 배열의 앞에 넣는다.
        }
        //여기로 들어오는 값은 무조건 네자리이다. 1234 -> 일천이백삼십사
        function _makeHan(text) {
            var str = '';
            for (var i = 0; i < text.length; i++) {
                var num = text[i];
                if (num == '0') //0은 읽지 않는다
                    continue;
                str += number[num] + smallUnit[i];
            }
            return str;
        }
        return (/^일/.test(result.join('').toString())) ? result.join('').toString().replace(/^일/, "") : result.join('').toString();
    },
    GetNextYearLeft: function(_year, _month, _day) {
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
    },
    get_time_difference: function(earlierDate, laterDate) {
        var oDiff = new Object();
        //  시간차 계산
        //  -------------------------------------------------------------------  //
        var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
        oDiff.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
        nTotalDiff -= oDiff.days * 1000 * 60 * 60 * 24;
        oDiff.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
        nTotalDiff -= oDiff.hours * 1000 * 60 * 60;
        oDiff.minutes = Math.floor(nTotalDiff / 1000 / 60);
        nTotalDiff -= oDiff.minutes * 1000 * 60;
        oDiff.seconds = Math.floor(nTotalDiff / 1000);
        //  -------------------------------------------------------------------  //
        //  비어있으면 0추가
        //  -------------------------------------------------------------------  //
        //  시간
        var hourtext = '00';
        if (oDiff.days > 0) {
            hourtext = String(oDiff.days);
        }
        if (hourtext.length == 1) {
            hourtext = '0' + hourtext
        };
        //  분
        var mintext = '00';
        if (oDiff.minutes > 0) {
            mintext = String(oDiff.minutes);
        }
        if (mintext.length == 1) {
            mintext = '0' + mintext
        };
        //  초
        var sectext = '00';
        if (oDiff.seconds > 0) {
            sectext = String(oDiff.seconds);
        }
        if (sectext.length == 1) {
            sectext = '0' + sectext
        };
        //  차이
        var sDuration = hourtext + ':' + mintext + ':' + sectext;
        oDiff.duration = sDuration;
        //  -------------------------------------------------------------------  //
        //예시
        /*
        var date1 = new Date("2020/04/08 00:00:00");
        var date2 = new Date("2020/04/09 09:28:00");
        (JSON.stringify(get_time_difference(date1,date2)))
        */
        return oDiff;
    },
    strTime2Ms: function(strTime) {
        /*자연어에서 밀리초 구하기*/
        /*사용법
         * replier.reply(strTime2Ms("1분"))
         * replier.reply(strTime2Ms("2분 42초"))
         */
        var regex = /동안 ?만|만|까지$/gm;
        strTime = strTime.replace(regex, "");
        /*분/초 뒤에 ~동안만 ~만 ~까지 라는 접속사를 넣어도 인식하게해줌*/
        var fullTreg = /(\d분 ?\d{1,2}초)/g;
        var minTreg = /\d분/g;
        var secRTreg = /\d초/g;
        if (Tstr.match(fullTreg)) {
            var min = parseInt(Tstr.split("분")[0]);
            var sec = parseInt(Tstr.split("분")[1].split("초")[0].trim());
            if (sec >= 60) {
                return "입력받은 \"sec\"의 값은 60초를 초과해"
            } else {
                return (min * 60) * 1000 + sec * 1000
            }
        } else if (Tstr.match(minTreg)) {
            var min = parseInt(Tstr.replace("분", ""));
            return (min * 60) * 1000
        } else if (Tstr.match(secTreg)) {
            var sec = parseInt(Tstr.replace("초", ""));
            return sec * 1000
        } else {
            return "입력받은 값은 알수가 없어", undefined;
        }
    }
};