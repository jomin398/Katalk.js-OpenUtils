module.exports = {
    /* 본소스는 DarkTonado 님의 DB 소스를 활용했습니다*/
    SaveData: function(savPath, msg) { //파일에 내용을 저장하는 함수
        try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
            var file = new java.io.File(savPath);
            if (!file.exists()) {
                file.mkdirs()
            }
            var fos = new java.io.FileOutputStream(file);
            var str = new java.lang.String(msg);
            fos.write(str.getBytes());
            fos.close();
            Log.info("파일 작성 성공");
        } catch (e) {
            Log.debug(e + ", " + e.lineNumber);
        }
    },
    CreateDir: function() { //배운 채팅들이 저장될 폴더를 만드는 함수
        var folder = new java.io.File(sdcard + "/" + SaveFilename + "/"); //File 인스턴스 생성
        folder.mkdirs(); //폴더 생성
    },
    ReadData: function(name) { //파일에 저장된 내용을 불러오는 함수
        try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
            var file = new java.io.File(sdcard + "/" + SaveFilename + "/" + name + ".txt");
            if (!file.exists()) return null;
            var fis = new java.io.FileInputStream(file);
            var isr = new java.io.InputStreamReader(fis);
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) !== null) {
                str += "\n" + line;
            }
            fis.close();
            isr.close();
            br.close();
            return str;
        } catch (e) {
            Log.debug(e + ", " + e.lineNumber);
        }
    }
}