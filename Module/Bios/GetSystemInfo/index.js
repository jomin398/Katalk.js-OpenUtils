module.exports = {
  Info: function() {
    /*Systeam Infos
      시스탬 정보 가져오기!
    
      Usage :
      replier.reply(require('GetSysteamInfo').Info());
    
      References : https://stackoverflow.com/questions/25552/get-os-level-system-information
      Re Made by jomin398*/

    var SysMemInfo = java.lang.Runtime.getRuntime();
    var SysDiskInfo = java.io.File.listRoots()[0];
    var array = [];
    array[0] = "기기에는 " + SysMemInfo.availableProcessors() + " 개의 코어가 장착되어있습니다.";
    array[1] = SysMemInfo.freeMemory() + " (bytes)";
    array[2] = "메모리 여유 가용량 : " + SysMemInfo.totalMemory() + " (bytes)";
    array[3] = "메모리 전체 용량 : " + SysMemInfo.maxMemory() + " (bytes)";
    array[4] = "디바이스 최대 저장 공간 : " + SysDiskInfo.getTotalSpace() + " (bytes)";
    array[5] = "디바이스 여유 저장 공간 : " + SysDiskInfo.getUsableSpace() + " (bytes)";
  
    return array.join("\n");
  }
}