modules.exports={
    itemSeller:function(str){
        /* 광산 게임을 위해
        실험을 위해 수신된 str로 msg를 시뮬.
        나중에 str을 msg로 바꿔서 사용하시길*/
        //let str = "판메 루비 3 다이아 7 철 64";
        /*하단부터 유용한소스
        정규식으로 명령어 감지.
        메시지의 시작이 판매 또는 판메 일때만 감지!
        */
        if (/^판(매|메)?\s/gm.test(str)) {
        //정보 처리를 위한 정규식 필터.
        let filterReg = /(([가-힣]+)\s([0-9]{1,3}))/gm;
        //명령어 삭제...
        let data = str.replace(/판(매|메)?\s/gm, "");
        /*사실 let data = str.substr(3) 해도됨.*/

        //디버깅을 위한 출력준비.
        let fullData = data.replace(filterReg, "[$2]($3)");
        //입력된 str 에서 광석의 이름만 가져와서 목록에 넣기
        let ores = data.replace(filterReg, "$2").split(" ");
        //str 에서 광석의 판매 숫자만 가져와서 목록에 넣기
        let nums = data.replace(filterReg, "$3").split(" ");
        /*태스팅된 스샷 참고*/
        return (fullData + "\n판매될 광석들\n\n" + ores + "\n" + nums + "\n\n"
        /*판매됨 출력 예시.*/
        + ores[0] + " " + nums[0] + "개 판매됨.");
        }
    }
}