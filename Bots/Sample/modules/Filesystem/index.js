module.exports = {
    isModuleInstalled: function(FolderUrl) {
        if (FolderUrl !== undefined) {
            if (typeof FolderUrl === "string") {
                if (FolderUrl.length !== 0) {
                    try {
                        return Boolean(require.resolve(String(FolderUrl)).length !== 0);
                    } catch (e) {
                        return false;
                    }
                } else {
                    throw new ReferenceError('\"FolderUrl\" Length_0', 'isModuleInstalled', 4);
                }
            } else {
                throw new ReferenceError('\"FolderUrl\" is Not String', 'isModuleInstalled', 3);
            }
        }
    },
    isAllModuleInstalled: function(ModuleList) {
        if (ModuleList !== undefined) {
            if (typeof ModuleList == "object") {
                try {
                    var results = [];
                    for (var i in ModuleList) {
                        results.push(this.isModuleInstalled(ModuleList[i]))
                    }

                    function cker(arr) {
                        return arr == true;
                    }
                    return (results.every(cker) == true) ? true : module.exports.ModulecheckErrorViewer(ModuleList, results);
                    /*module.exports.ModulecheckErrorViewer(ModuleList, result)*/
                } catch (e) {
                    throw e;
                }
            } else {
                Log.d('property \"ModuleList\" is Not object from ModuleChacker', 3);
                return false
            }
        } else {
            Log.d('property \"ModuleList\" is undefined from ModuleChacker', 2);
            return false
        }
    },
    ModulecheckErrorViewer: function(ModuleList, ModuleChackResultArr) {
        var arr = [];
        arr.push("===== Error Report =====");
        for (var i in ModuleList) {
            var ModuleName = (ModuleList[i]).substring(ModuleList[i].lastIndexOf('/') + 1);
            var pathErrmsg = "Error == Given Path \u300E" + ModuleList[i] + "\u300F is NOT_EXIST. from \'ModuleList\'";
            arr.push(ModuleName + " : " + (Boolean(ModuleChackResultArr[i] == true) ? "installed" : (module.exports.isPC()) ? (
                /*Pc에서 실행할때 */
                fs.existsSync(ModuleList[i]) ? "falt to read files" : pathErrmsg) : (
                /*Home에서 실행할때 */
                new java.io.File(ModuleList[i]).exists() ? "falt to read files" : pathErrmsg)))
        }
        return arr.join("\n");
    },
    isPC: function() {
        try {
            var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
            Log.i(sdcard);
            return sdcard;
        } catch (e) {
            return String(process.cwd());
            /*C:\Users\USER\Documents\GitHub\*/
        }
    },
    Savefile: function(savPath, msg) { //파일에 내용을 저장하는 함수
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
    SaveData:function(savPath, msg) { //파일에 내용을 저장하는 함수
    try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
        var file = new java.io.File(savPath);
        var fos = new java.io.FileOutputStream(file);
        var str = new java.lang.String(msg);
        fos.write(str.getBytes());
        fos.close();
    } catch (e) {
        Log.debug(e + ", " + e.lineNumber);
    }
},
    CreateDir: function(savPath) { //배운 채팅들이 저장될 폴더를 만드는 함수
        var folder = new java.io.File(savPath); //File 인스턴스 생성
        folder.mkdirs(); //폴더 생성
    },
    ReadData: function(savPath) { //파일에 저장된 내용을 불러오는 함수
        try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
        var file = new java.io.File(savPath);
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