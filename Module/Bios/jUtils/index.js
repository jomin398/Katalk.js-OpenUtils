modules.exports = {
    errorMsg: {
        10: "환경이 올바르지 않습니다."
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
}
