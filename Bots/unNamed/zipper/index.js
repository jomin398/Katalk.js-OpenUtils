module.exports = {
    /**
    * MatSoGeum 님의 파일 압축관련 소스
    * @function {extract} 압축해제
    * @function {compress} 압축하기
    */
    extract: function(zip, path) {
        /**
        * @param {zip} 압축 파일 경로
        * @param {path} 압축 해제 후 저장될 경로
        */
        var path = path ? path : "/sdcard/tempFolder";
        if (!new java.io.File(path).exists()) {
            new java.io.File(path).mkdirs();
        }
        try {
            fis = new java.io.FileInputStream(zip)
            zis = new java.util.zip.ZipInputStream(fis);
            while ((zipEntry = zis.getNextEntry()) != null) {
                //path concat
                fos = new java.io.FileOutputStream(path + zipEntry.getName())
                var len = 0;
                var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 512)
                while ((len = zis.read(buf)) > 0) {
                    fos.write(buf, 0, len)
                }
                zis.closeEntry()
                fos.flush()
                fos.close()
            }
            zis.close()
        } catch (e) {
            throw e
        }
    },
    compress: function(zip, files) {
        /**
        * @param {zip} 압축 파일을 저장할 경로
        * @param {path} 압축 해제 후 저장될 경로
        */
        try {
            fos = new java.io.FileOutputStream(zip)
            zos = new java.util.zip.ZipOutputStream(fos)
            for (file of files) {
                fis = new java.io.FileInputStream(file.getName())
                zos.putNextEntry(new java.util.zip.ZipEntry(file.getName()))
                var len = 0;
                var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 512)
                while ((len = fis.read(buf)) > 0) {
                    os.write(buf, 0, len)
                }
                zos.closeEntry()
                fis.close()
            }
            zos.close()
        } catch (e) {
            throw e
        }
    }
}