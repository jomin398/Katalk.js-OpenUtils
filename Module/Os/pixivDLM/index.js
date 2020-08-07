module.exports={
    thisDLpath:"sdcard/katalkbot/Bots/"+scriptName+"/PixivDL",
    DL:function(pixivArtNum){
        /**
        * 픽시브 다운로더
        * H 한것도 번호만 있으면 가능
        * @author jomin398
        * @requires module:Bios/DLM
        * @param {Number} pixivArtNum artworks/49178241 의 49178241 이 받는 값
        * @throws {RefereceError} 모듈 Bios/DLM 이 로딩이 안될때
        * @throws {RefereceError} PixivArtNum 가 undefind 일때
        * helpers
        * 1. 칼님 : 파싱에 도움줌
        */
        //페키지 로딩
        importPackage(java.io,org.jsoup);
        //PixivArtNum 앞에 붙일 주소
        let prefixUrl = "https://www.pixiv.net/artworks/";
        /*우리가 보는 페이지를 정의
        예시로는 https://www.pixiv.net/artworks/49178241 ; 
        prefixUrl + pixivArtNum 의 형태가된다.
        */
        let refererUrl = null;
        //다운할 사진의 Url을 가져오는 필터
        let targetReg = /\"original\":\"(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\"$/gm;
        let isModuleLoadAble = false;
        let myModule = null;
        try {
            myModule = require("../../Bios/DLM");
            isModuleLoadAble = true;
        } catch (error) {
            isModuleLoadAble = false;
        }
        //다운로드 폴더 생성
        if(!new File(this.thisDLpath).exists()){
            Log.i(new IOException(this.thisDLpath,this.thisDLpath+" is not exist."));
            java.lang.Thread.sleep(1000);
            Log.i("making dir....");
            new File(this.thisDLpath).mkdir();
        };
        //번호 확인
        if(pixivArtNum == undefined){
            return NaN;
        };
        //모듈확인
        if(!isModuleLoadAble){
            throw new InternalError("\"sdcard/katalkbot/Bots/"+scriptName+"/modules/Bios/DLM\" Module hasn't Loadable.");
        }
        let jso = Jsoup.connect(prefixUrl + pixivArtNum)

    }
}