module.exports = {
    isConected:function(){
        try {
            this.getRawDB(Url, "head > title");
            return true;
        } catch (e) {
            return false;
        }
    },
    getRawDB: function(Url, selector) {
        importPackage(java.net);
        importPackage(java.io);
        importClass(java.io.File); //파일 입출력 관련
        importClass(org.jsoup.Jsoup); //jsoup 사용가능하게하는것
        var UA = "Mozilla/5.0";
        if(Url == undefined){
            return null;
        }
        try {
            if (selector == undefined) {
                return String(org.jsoup.Jsoup.connect(Url).userAgent(UA).get().html());
            } else {
                return String(org.jsoup.Jsoup.connect(Url).userAgent(UA).get().select(selector).html());
            }
        } catch (e) {
            return e + " " + e.lineNumber;
        }
    },
    getCOData: function(replier) {
        var url = "http://ncov.mohw.go.kr/";
        var preselect1 = "body > div > div.mainlive_container > div.container > div > div.liveboard_layout > div.liveNumOuter >";
        var preselect2 = "body > div > div.mainlive_container > div.container > div > div.liveboard_layout > div.liveToggleOuter >";
        
        var selects = [
            preselect1 + "h2 > a > span.livedate",
            preselect1 + "ul > li:nth-child(1) > span.data1",
            preselect1 + "ul > li:nth-child(2) > span.data2",
            /*실시간 집계현황*/
            preselect1 + "div > ul > li:nth-child(1) > span.num",
            preselect1 + "div > ul > li:nth-child(1) > span.before",
            preselect1 + "div > ul > li:nth-child(2) > span.num",
            preselect1 + "div > ul > li:nth-child(2) > span.before",
            preselect1 + "div > ul > li:nth-child(3) > span.num",
            preselect1 + "div > ul > li:nth-child(3) > span.before",
            preselect1 + "div > ul > li:nth-child(4) > span.num",
            preselect1 + "div > ul > li:nth-child(4) > span.before",
            /*누적검사수*/
            preselect2 + "div > div.live_left > div.liveTest.main_box_toggle > div.info_core > ul > li:nth-child(1) > span.num",
            preselect2 + "div > div.live_left > div.liveTest.main_box_toggle > div.info_core > ul > li:nth-child(2) > span.num",
            preselect2 + "div > div.live_left > div.liveTest.main_box_toggle > div.info_core > ul > li:nth-child(3) > span.num",
            /*누적검사그레프*/
            preselect2 = "div > div.live_left > div.liveTest.main_box_toggle > div.chart_d > div > div.cc_figure > p.numinfo1 > span.num_rnum",
            preselect2 = "div > div.live_left > div.liveTest.main_box_toggle > div.chart_d > div > div.cc_figure > p.numinfo1 > span.num_percentage",
            preselect2 = "div > div.live_left > div.liveTest.main_box_toggle > div.chart_d > div > div.cc_figure > p.numinfo2 > span.num_rnum",
            preselect2 = "div > div.live_left > div.liveTest.main_box_toggle > div.chart_d > div > div.cc_figure > p.numinfo2 > span.num_percentage",
            preselect2 = "div > div.live_left > div.liveTest.main_box_toggle > div.chart_d > div > div.cc_figure > p.numinfo3 > span.num_rnum",
            preselect2 = "div > div.live_left > div.liveTest.main_box_toggle > div.chart_d > div > div.cc_figure > p.numinfo3 > span.num_percentage",
        ];
        //대이터업댓날짜
        /*body > div > div.mainlive_container > div.container > div > div.liveboard_layout > div.liveNumOuter > h2 > a > span.livedate*/
        let UPdateDate = this.getRawDB(url, selects[0]);
        /*일일 집계현황*/
        //일일확진자
        let DayConfirmed = this.getRawDB(url, selects[1]);
        //일일완치자
        let DayReleased = this.getRawDB(url, selects[2]);
        /*실시간 집계현황*/
        //확진자
        let LiveConfirmed = (this.getRawDB(url, selects[3])).replace(/[^0-9\,]/g,"");
        //전날대비확진자
        let LiveConfirmedDff = (this.getRawDB(url, selects[4])).replace(/[가-힣\(\)]/g,"").trim();
        //완치자
        let LiveReleased = this.getRawDB(url, selects[5]);
        //전날대비완치자
        let LiveReleasedDff = (this.getRawDB(url, selects[6])).replace(/[가-힣\(\)]/g,"").trim();
        //치료중(격리중)
        let LiveIsolated = this.getRawDB(url, selects[7]);
        //전날대비치료중(격리중)인원
        let LiveIsolatedDff = (this.getRawDB(url, selects[8])).replace(/[가-힣\(\)]/g,"").trim();
        //사망자
        let LiveDead = this.getRawDB(url, selects[9]);
        //전날대비사망자
        let LiveDeadDff = (this.getRawDB(url, selects[10])).replace(/[가-힣\(\)]/g,"").trim();
        /*누적 검사수*/
        //검사수
        let TotalTestsPerformed = this.getRawDB(url, selects[11]);
        //검사완료수
        let TotalTestsConcluded = this.getRawDB(url, selects[12]);
        //확진률(결과양성 / 총 검사완료수 * 100%)
        let TotalPositivityRate = this.getRawDB(url, selects[13]);
        
        /*누적검사그레프*/
        //검사중
        let GrfTotalTest = this.getRawDB(url, selects[14]);
        //검사중퍼센트
        let GrfTotalTestRate = this.getRawDB(url, selects[15]);
        //결과확진자(양성)
        let GrfTotalConfirmed = this.getRawDB(url, selects[16]);
        //결과확진자(양성)퍼센트
        let GrfTotalConfirmedRate = this.getRawDB(url, selects[17]);
        //결과음성
        let GrfTotalTestNegative = this.getRawDB(url, selects[18]);
        //결과음성퍼센트
        let GrfTotalTestNegativeRate = this.getRawDB(url, selects[19]);
        
        return {
            Date: UPdateDate,
            DayConfirmed: DayConfirmed,
            DayReleased: DayReleased,
            LiveConfirmed: LiveConfirmed,
            LiveConfirmedDff: LiveConfirmedDff,
            LiveReleased: LiveReleased,
            LiveReleasedDff: LiveReleasedDff,
            LiveIsolated: LiveIsolated,
            LiveIsolatedDff: LiveIsolatedDff,
            LiveDead:LiveDead,
            LiveDeadDff:LiveDeadDff,
            TotalTestsPerformed: TotalTestsPerformed,
            TotalTestsConcluded: TotalTestsConcluded,
            TotalPositivityRate: TotalPositivityRate,
            GrfTotalTest: GrfTotalTest,
            GrfTotalTestRate: GrfTotalTestRate,
            GrfTotalConfirmed: GrfTotalConfirmed,
            GrfTotalConfirmedRate: GrfTotalConfirmedRate,
            GrfTotalTestNegative: GrfTotalTestNegative,
            GrfTotalTestNegativeRate: GrfTotalTestNegativeRate
        }
    },
    getCoronaText:function(){
        var result = null;
        var RTC = null;
        try {
            var RTC = require("Bios/RTC");
        } catch (e) {
            Log.d("RTC 모듈로드에러\n\n" + e + " " + e.lineNumber);
            throw new InternalError("RTC 모듈로드에러\n\n" + e, "RTC Load Module", e.lineNumber);
        }
        var today = RTC.day;
    }
}
