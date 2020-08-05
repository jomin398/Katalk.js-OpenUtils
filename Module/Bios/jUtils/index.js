modules.exports = {
    errorMsg: {
        10: "환경이 올바르지 않습니다."
    },
    B64:{
        Encode: function(str){
            //base 64로 인코딩
            return android.util.Base64.encodeToString(java.lang.String(str).getBytes("UTF-8"),android.util.Base64.DEFAULT).trim();
        },
        Decode: function(str){
            //base64 디코딩, 해독
            return java.lang.String(android.util.Base64.decode(str, android.util.Base64.DEFAULT), "UTF-8");
        }
    },
    sysLang: {
        /**
         * @this {sysLang} 시스탬 언어 관련객체
         * @method j {String} 자바소스로 get() 랑 같은거 반환, get()의 대체소스
         * @function get
         */
        j: java.lang.System.getProperty('user.language'),
        get: function() {
            /** 
             * @example 활용법
             * replier.reply(sysLang.get());
             * @returns {String} ko,en 등등 언어코드
             * @returns {null} 안드로이드 소스 실행후 오류가 발생하면 반환
             * @see {hrefString} 안드로이드 소스 참고 : https://developer.android.com/reference/android/content/res/Configuration#getLocales()
             */
            /* result, 결과를 저장하는 변수, 초기값으로 null을 지정.
             * 이는 전체코드가 실패해도 null로 반환한다. */
            var result = null;
            try {
                //안드로이드 소스에 꼭필요한것
                /* ctx, Context는 어플리케이션과 관련된 정보에 접근하고자 하거나
                어플리케이션과 연관된 시스템 레벨의 함수를 호출하고자 할 때 사용됩니다.
                */
                if (Api != undefined) {
                    let ctx = Api.getContext();
                    //앱의 리소스의 설정에서 지역을 가져온다.
                    let systemLocate = ctx.getResources().getConfiguration().locale;
                    //설정된 지역 언어를 가져오고 이를 결과에 저장한다.
                    result = String(systemLocale.getLanguage());
                } else {
                    result = this.j;
                }
            } catch (e) {
                result = null;
            }
            //리턴을 이용해 호출된곳으로 반환한다.
            return result
        },
    },
    isLang: function(str) {
        /**
         * 언어 비교 함수
         * @parm {String} 비교할 타깃 언어코드
         * @returns {Boolean}
         * @borrows sysLang
         * @example 활용법
         * Log.d(this.isLang("ko")?"":"not yet supported Language.")
         */
        return Boolean(this.sysLang.get() == "ko");
    },
    memoryIfo:function(){
        var SMI = java.lang.Runtime.getRuntime();
        var a = [];
        a.push("기기에는 " +SMI.availableProcessors() + " 개의 코어가 장착되어있습니다.");
        a.push("메모리 여유 가용량 : " +SMI.freeMemory() + " (bytes)");
        a.push("메모리 사용량 : " +SMI.totalMemory() + " (bytes)");
        a.push("메모리 전체 용량 : " +SMI.maxMemory() + " (bytes)");
        return a;
    },
    diskIfo:function(){
        var SDI = java.io.File.listRoots()[0];
        var a = [];
        a.push("디바이스 최대 저장 공간 : " + SDI.getTotalSpace() + " (bytes)");
        a.push("디바이스 여유 저장 공간 : " + SDI.getFreeSpace());
        a.push("디바이스 가용 저장 공간 : " + SDI.getUsableSpace() + " (bytes)");
        return a;
    }
}
