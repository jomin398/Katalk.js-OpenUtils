module.exports = {
    Time: {
        Millisecond2time: function(milliseconds) {
            var sec = Math.floor((milliseconds / 1e3) % 60);
            var min = Math.floor((milliseconds / (1e3 * 60)) % 60);
            var hr = Math.floor((milliseconds / (1e3 * 60 * 60)) % 24);
            return {
                sec: sec,
                min: min,
                hr: hr
            };
        }
    },
    Power: function(params) {
        /*배터리가 설정된 Persent 이하이면 sw가 활성화 되는기능 */
        //안드로이드 컨택
        var ctx = Api.getContext();
        //배터리 메니져
        var bM = ctx.getSystemService(ctx.BATTERY_SERVICE);
        var ifilter = new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED);
        var bS = ctx.registerReceiver(null, ifilter);
        
        /*배터리 관련 변수 목록 */
        //배터리상태 정보
        /* 배터리 상태리스트
        ["알수없음","충전 중","방전 중","충전이 완료되었고 충전 중이 아님","충전 완료"];
        */
        var bsInt = parseInt(bS.getIntExtra(bM.EXTRA_STATUS, -1) || 0);
        //배터리 전압
        var batvoltage = parseInt(bS.getIntExtra(bM.EXTRA_VOLTAGE, -1) || 0);
        //전류
        var current = String(bM.getLongProperty(bM.BATTERY_PROPERTY_CURRENT_AVERAGE) || 0);
        
        //퍼센트관련
        // 현재 충전 레벨
        var batlevel = parseInt(bS.getIntExtra(bM.EXTRA_LEVEL, -1) || 0);
        //배터리 레벨 최대량
        var batscale = parseInt(bS.getIntExtra(bM.EXTRA_SCALE, -1) || 0);
        //배터리 퍼샌트
        var persent = Number(Math.floor(batlevel / batscale * 100));
        
        //온도
        var battemp = parseInt(bS.getIntExtra(bM.EXTRA_TEMPERATURE, -1) || 0);
        //연결상태
        var chargePlug = parseInt(bS.getIntExtra(bM.EXTRA_PLUGGED, -1) || 0);
        
        
        //배터리 시간관련
        //밀리초동안 기록된 배터리 축전용량
        var chargecount = parseInt(bM.getLongProperty(bM.BATTERY_PROPERTY_CHARGE_COUNTER) || 0);
        var ChargetimeRemain = parseInt(bM.computeChargeTimeRemaining() || 0);
        //충전여부
        var isCharging = Boolean(bsInt == bM.BATTERY_STATUS_CHARGING);
       
        //배터리 축전용량
        var PowerProfile = java.lang.Class.forName("com.android.internal.os.PowerProfile");
        var batprofile = PowerProfile.getConstructor(android.content.Context).newInstance(Api.getContext());
        var capacity = parseInt(PowerProfile.getMethod("getBatteryCapacity").invoke(batprofile).toFixed(4).replace(/(0+$)/, "").replace("\.", "") || 0);
        
        //배터리 충전 연결상태
        var chargePlugtype = null;
        if (chargePlug == bM.BATTERY_PLUGGED_AC) {
            chargePlugtype = "전기를";
        } else if (chargePlug == bM.BATTERY_PLUGGED_USB) {
            chargePlugtype = "주인님의 간식(보조전원)을";
        } else if (chargePlug == bM.BATTERY_PLUGGED_WIRELESS) {
            chargePlugtype = "마법진에 있는 마력을";
        }
        /*배터리 관련 변수 목록 끝, 출력 설정*/
        return {
            bsInt: bsInt,
            isCharging: isCharging,
            volt: batvoltage,
            current: current,
            temp: battemp,
            per: persent,
            cap: capacity,
            chargePlug: chargePlug,
            chargePlugtype: chargePlugtype,
            chargecount: chargecount,
            ChargetimeRemain: ChargetimeRemain,
        }
        //배터리 코드 끝
    },
    isCharging: function() {
        return this.Power().isCharging;
    },
    getStatInfo: function() {
        //배터리 상태
        var batState = null;
        var ChargetimeRemain = this.Power().ChargetimeRemain;
        var times = this.Time.Millisecond2time(ChargetimeRemain);
        var sec = times.sec;
        var min = times.min;
        var hr = times.hr;
        var displaytimeRemain = (hr + "시간 " + min + "분 하고 " + sec + "초");
        let persent = this.Power().per;
        let volt = this.Power().volt;
        let temp = this.Power().temp;
        let current = this.Power().current;
        let bsInt = this.Power().bsInt;
        let chargePlug = this.Power().chargePlug;
        let chargePlugtype = this.Power().chargePlugtype;
        let isCharging = this.Power().isCharging;
        /*var batStateAns=["알수없음이","충전 중이","방전 중이","충전이 완료되었고 충전 중이 아니","충전 완료"];*/
        var batStateAns = ["알수가 없", "먹고 있", "주인님께서 먹여주신 애너지로\n활동하고 있", "다먹고 쉬고있", "배불러서 더는 못먹"];
        var isChargingAns = "지금은 밥 먹는 " + ((isCharging || false) ? "중이라" : "중이 아니라");
        if (hr == 0) {
            displaytimeRemain = displaytimeRemain.replace(/0시간 /g, "");
        };
        if (min == 0) {
            displaytimeRemain = displaytimeRemain.replace(/0분 /g, "");
        };
        if (sec == 0) {
            displaytimeRemain = displaytimeRemain.replace(/0초/g, "");
        };
        if (isCharging && ChargetimeRemain != -1) {
            batState = [chargePlugtype + " " + batStateAns[bsInt - 1] + "어요.",
                isChargingAns,"다먹을때까지 남은시간은", ChargetimeRemain + "ms 이므로", displaytimeRemain + "가 남았어요."
            ];
        } else {
            batState = [batStateAns[bsInt - 1] + "어요."];
        }
        return ["루시의 전력은 " + persent + "%이고요.",
            batState.join("\n"), "전압은 " + (volt / 1000).toFixed(1) + "V(" + volt + "mV) 이고", "온도는 " + Math.round(temp) / 10 + "°C 에요.", "현제 전류는 " + current + "mAh(밀리 암페어 hr) 입니다."
        ].join("\n");
    },
    getPerInfo: function() {
        let persent = this.Power().per;
        let volt = this.Power().volt;
        let isCharging = this.Power().isCharging;
        var isChargingAns = "지금은 밥 먹는 " + ((isCharging || false) ? "중이라" : "중이 아니라");
        return ["루시의 전력은 " + persent + "%에요.", isChargingAns, "전압은 " + (volt / 1000).toFixed(1) + "V(" + volt + "mV) 이에요."].join("\n");
    },
};