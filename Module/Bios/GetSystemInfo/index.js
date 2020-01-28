module.exports = {
  Info: function() {
    /*Systeam Infos
      시스탬 정보 가져오기!
    
      Usage :
      replier.reply(require('GetSysteamInfo').Info());
    
      References(출처) : https://stackoverflow.com/questions/25552/get-os-level-system-information
      
      이 소스는 이곳, 게인 카페에 동시에 개시되는 오픈소스이니 수정사용가능합니다.
      그치만 LGPL을 따르기에 사용시 저작자인 제 이름을 남겨주세요.
      Re Made by jomin398*/

    var SysMemInfo = java.lang.Runtime.getRuntime();
    var SysDiskInfo = java.io.File.listRoots()[0];
    var array = [];
    array[0] = "기기에는 " + SysMemInfo.availableProcessors() + " 개의 코어가 장착되어있습니다.";
    array[1] = "메모리 여유 가용량 : " + SysMemInfo.freeMemory() + " (bytes)";
    array[2] = "메모리 사용량 : " + SysMemInfo.totalMemory() + " (bytes)";
    array[3] = "메모리 전체 용량 : " + SysMemInfo.maxMemory() + " (bytes)";
    array[4] = "디바이스 최대 저장 공간 : " + SysDiskInfo.getTotalSpace() + " (bytes)";
    array[5] = "디바이스 여유 저장 공간 : " + SysDiskInfo.getFreeSpace();
    array[6] = "디바이스 가용 저장 공간 : " + SysDiskInfo.getUsableSpace() + " (bytes)";
  
    return array.join("\n");
  }
}
/* 소스 줄인것.
function info(){var e=java.lang.Runtime.getRuntime(),t=java.io.File.listRoots()[0],a=[];return a[0]="기기에는 "+e.availableProcessors()+" 개의 코어가 장착되어있습니다.",a[1]="메모리 여유 가용량 : "+e.freeMemory()+" (bytes)",a[2]="메모리 사용량 : "+e.totalMemory()+" (bytes)",a[3]="메모리 전체 용량 : "+e.maxMemory()+" (bytes)",a[4]="디바이스 최대 저장 공간 : "+t.getTotalSpace()+" (bytes)",a[5]="디바이스 여유 저장 공간 : "+t.getFreeSpace(),a[6]="디바이스 가용 저장 공간 : "+t.getUsableSpace()+" (bytes)",a.join("\n");};
info();
*/