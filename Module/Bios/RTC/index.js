module.exports = {
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
    info: function(msg) {
        var getName = Object.getOwnPropertyNames(this)
        var text = [];
        text[0] = "이 모듈은 RTC( https://ko.wikipedia.org/wiki/실시간_시계 ) 모듈입니다<br>";
        text[1] = "명령어리스트는<br>\u300E"+Object.getOwnPropertyNames(this).join("<br>")+"\u300F<br>가 있습니다.";
        return text.join("").replace(/<br>/gm,"\n");
        /*
        사용예제
        replier.reply(require("RTC").info());
        */
    },
    GetTime: function(presets) {
        
        // 현제시간 구하는 함수
        var tday = new Date(); //오늘
        //시간
        var hh = String(tday.getHours());
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
            hh = '0' + String(hh)
        }
        if (mm < 10) {
            mm = '0' + String(mm)
        }
        if (ss < 10) {
            ss = '0' + String(ss)
        }
        
        if(presets === undefined){
            return {
                hh: hh,
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
            }
        }else{
            /* presets 예시
            1. "yyyy년 M월 d일 오후 h시 m분"
            2. "지금은 h시 m분 s초 입니다."
            3. "지금은 오전 h시 m분 s초 입니다."
            */
            try {
                var result = java.text.SimpleDateFormat(presets).format(new Date());
                var apm = (new Date().getHours() >= 12)? '오후' : '오전';
                if(/오전|오후/.test(presets)){
                result = result.replace(/오전|오후/g,apm)
                }
                return result;
            } catch (e) {
                return e+"\n\nGetTime(presets)\npreset setup Guide\n\n1. GetTime(\"yyyy년 M월 d일 오후 h시 m분\")\n2. GetTime(\"M월 d일 오후 h시 m분\")";
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
        num = num.padStart(unitCnt * 4, '0') //4자리 값이 되도록 0을 채운다
        var regexp = /[\w\W]{4}/g; //4자리 단위로 숫자 분리
        var array = num.match(regexp);
        //낮은 자릿수에서 높은 자릿수 순으로 값을 만든다(그래야 자릿수 계산이 편하다)
        for (var i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
            var hanValue = _makeHan(array[i]); //한글로 변환된 숫자
            if (hanValue == '') //값이 없을땐 해당 단위의 값이 모두 0이란 뜻. 
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
    }
}
