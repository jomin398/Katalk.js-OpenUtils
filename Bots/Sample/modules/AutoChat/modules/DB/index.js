module.exports={
    createDir:function(baseDir) { //배운 채팅들이 저장될 폴더를 만드는 함수
        var folder = new java.io.File(baseDir); //File 인스턴스 생성
        folder.mkdirs(); //폴더 생성
    },
    saveData:function(baseDir,name, msg) { //파일에 내용을 저장하는 함수
        try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
            var file = new java.io.File(baseDir+"/"+ name + ".txt");
            var fos = new java.io.FileOutputStream(file);
            var str = new java.lang.String(msg);
            fos.write(str.getBytes());
            fos.close();
        } catch (e) {
            Log.debug(e + ", " + e.lineNumber);
        }
    },
    readData:function(baseDir, name) { //파일에 저장된 내용을 불러오는 함수
        try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
            var file = new java.io.File(baseDir+"/" + name + ".txt");
            if (!file.exists()) return null;
            var fis = new java.io.FileInputStream(file);
            var isr = new java.io.InputStreamReader(fis);
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
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