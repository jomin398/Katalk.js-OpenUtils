function getWifiInfo() {
/*출처남겨주세요 ㅎ
* 뭐이건 오픈소스이라 양심껏 부탁드려요.
* 와이파이 정보를 가져오는 기능입니다.
* 참고로 이 문서는 차후 수정됩니다.
* Api는 메신저봇 레거시 Api코드입니다.
* 또한 이문서의 안드로이드 소스는 우리의 친구인
* 개발자도우미 누리집에서 참고하였습니다.
* reference Link = https://developer.android.com/reference/android/net/wifi/WifiManager
*/

    /*안드로이드 context/정보 가져오기*/
    var wifiManager = Api.getContext().getSystemService(android.content.Context.WIFI_SERVICE);
    var wifiInfo = wifiManager.getConnectionInfo();
    /*접속상태, 접속여부 실험하기*/
    if (!wifiManager.isWifiEnabled) {
        /*접속 되어있지 않다면*/
        return "Wifi_is_Not_Connected";
    } else if (wifiInfo != null) {
        /*접속 되어있다면.*/
        return String(wifiInfo.toString()).replace(/ /g, "").replace(/[,]/g, "\n");
    }
}
//사용법!
replier.reply/*console.log*/(getWifiInfo());
