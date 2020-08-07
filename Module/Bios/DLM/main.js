module.exports={
    /**
    * Made by jomin398
    */
    getgdDlLink:function(url) {
    /* 구글 드라이브 링크를 변환 해주는 기능입니다.
    Url을 입력 해주면 원클릭으로 다운 을 할수있는 링크를 최종적으로 반환해줍니다.
    단, 해당 문서, Url이 비공개일경우 작동이 되지 않습니다.
    */
    let preUrl1 = "https://drive.google.com/uc?export=download&id=";
    let preUrl2 = "https://docs.google.com/document/d/";
    let preUrlend = "/export?format=txt";
    let FileID = url.split("/d/")[1].split("/")[0];
        if (url.search("document") == -1) {
            /* 만약 Url이 text 문서일때 */
            return preUrl1 +FileID;
        } else {
            /* 만약 Url이 file일때 */
            return preUrl2 +FileID + preUrlend;
        }
    },
    DLreq:function(path,url,setupArr){
        importPackage(java.io,android.net,android.webkit);
        var ctx = Api.getContext();
        var DownloadManager = ctx.getSystemService(ctx.DOWNLOAD_SERVICE);
        var uri = Uri.parse(url);
        var name = uri.getPath().substring(uri.getPath().lastIndexOf('/') + 1);
        var mime = String(MimeTypeMap.getFileExtensionFromUrl(url)||undefined);
        if(setupArr == undefined){
            setupArr=[0,false,false,false];
        };
        var aD = [
            DownloadManager.Request.VISIBILITY_VISIBLE,
            DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED,
            DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_ONLY_COMPLETION,
            DownloadManager.Request.VISIBILITY_HIDDEN
        ];
        var req = DownloadManager.Request(uri);
        req.setTitle("Downloading a" + mime);
        req.setDescription("Downloading "+ name);
        req.setNotificationVisibility(aD[setupArr[0]||0]);
        req.setDestinationUri(Uri.fromFile(new File(path)));
        req.setRequiresCharging(setupArr[1]||false);
        req.setAllowedOverMetered(setupArr[2]||false);
        req.setAllowedOverRoaming(setupArr[3]||false);
        return {ifo:{path:path,url:url,name:name,mime:mime,setup:setupArr},req:req};
    },
    DLstart:function(path,url,setupArr){
        importPackage(java.io,android.net);
        var ctx = Api.getContext();
        var DownloadManager = ctx.getSystemService(ctx.DOWNLOAD_SERVICE);
        downloadId = downloadManager.enqueue(this.DLreq(path,url,setupArr))
        Log.d("path : " + new File(path).path);
        Log.d("DLPID = "+ downloadId);
        return true;
    }
}
