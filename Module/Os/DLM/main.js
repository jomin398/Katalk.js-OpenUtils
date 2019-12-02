function getgdDlLink(url){
    /* 구글 드라이브 링크를 변환 해주는 기능입니다.
    Url을 입력 해주면 원클릭으로 다운 을 할수있는 링크를 최종적으로 반환해줍니다.
    단, 해당 문서, Url이 비공개일경우 작동이 되지 않습니다.
    */
let preUrl1 ="https://drive.google.com/uc?export=download&id=";
let preUrl2 ="https://docs.google.com/document/d/";
let preUrlend="/export?format=txt";
function gdGetFileId(url){
    /*받은 Url에서 파일 ID만 반환*/
let FileID = url.split("/d/")[1].split("/")[0];
return FileID
}
if(url.search("document") == -1){
    /* 만약 Url이 text 문서일때 */
return preUrl1+gdGetFileId(url);
}else{
    /* 만약 Url이 file일때 */
return preUrl2+gdGetFileId(url)+preUrlend;
}
/*Made by jomin398 */
};
