function isUserApp(AppInfo) {
    //주어진 앱 정보가 시스탬 어플인가 판단.
    return Boolean((AppInfo.flags & AppInfo.FLAG_SYSTEM) == 0);
}

function getVisualName(packageName) {
  /**
   * 주어진 패키지명이 시스탬 앱인지 판단하고
   * 맞다면 시스탬 앱,
   * 아닐때 어플의 레이블명을 반환.
   * getVisualName("com.xfl.msgbot");
   * experts: 메신저봇
   * @param String packageName 어플의 패키지명.
   * @return String system App || Name
   * @author jomin398
   */
  var ctx = Api.getContext();
  let pkgm = ctx.getPackageManager();
  let info = pkgm.getApplicationInfo(packageName, pkgm.GET_META_DATA);
  if(isUserApp(info)) {
    return String(pkgm.getApplicationLabel(info));
  } else {
    return "system App";
  }
}
