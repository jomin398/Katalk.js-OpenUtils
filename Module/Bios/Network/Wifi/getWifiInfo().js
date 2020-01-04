function getWifiInfo() {
/*출처남겨주세요 ㅎ
뭐이건 오픈소스이라 양심껏 부탁드려요.
와이파이 정보를 가져오는 기능입니다.
이 문서는 차후 수정됩니다.
*/
    var wifiManager = Api.getContext().getSystemService(android.content.Context.WIFI_SERVICE);
    Api.getContext().get
    var wifiInfo = wifiManager.getConnectionInfo();
    if (wifiInfo.getLinkSpeed() == -1) {
        return "Wifi_is_Not_Connected";
    } else if (wifiInfo != null) {
        return String(wifiInfo.toString()).replace(/ /g, "").replace(/[,]/g, "\n");
    }
}
//사용법!
replier.reply(getWifiInfo());
