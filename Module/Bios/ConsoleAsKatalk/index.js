module.exports = {
        /*이 소스는 이곳, 게인 카페에 동시에 개시되는 오픈소스입니다.
        그치만 LGPL을 따르기에 사용시 저작자인 제 이름을 남겨주세요.
        이소스의 기능은
        Console.log 를 카톡에서 쓸수있도록 했습니다.
        by jomin398 */
        clear: function() {
          Log.clear()
        },
        debug: function(data) {
          if (data === undefined) {
            throw new ReferenceError('str is undefined\nusage : debug(\"str\")', 'console.module', 10);
          }
          if (typeof data !== "string") {
            data = data.toString()
          }
          try {
            return data;
            throw Log.d(data);
          } catch (error) {
            return error;
          }
        },
        d: function(data) {
          return this.debug(data)
        },
        /*dir(value?: any, ...optionalParams: any[]): void;
        dirxml(value: any): void;*/
        error: function(data) {
          if (data === undefined) {
            throw new ReferenceError('str is undefined\nusage : error(\"str\")', 'console.module', 29);
          }
          try {
            return data;
            throw Log.e(data);
          } catch (error) {
            return error;
          }
        },
        e: function(data) {
          return this.error(data)
        },
        /*exception(message?: string, ...optionalParams: any[]): void;
          group(groupTitle?: string, ...optionalParams: any[]): void;
          groupCollapsed(groupTitle?: string, ...optionalParams: any[]): void;
          groupEnd(): void;*/
        info: function(data) {
          if (data === undefined) {
            throw new ReferenceError('str is undefined\nusage : info(\"str\")', 'console.module', 47);
          }
          try {
            return data;
            throw Log.i(data);
          } catch (error) {
            return error;
          }
        },
        i: function(data) {
          return this.info(data)
        },
        log: function(data) {
          if (data === undefined) {
            throw new ReferenceError('str is undefined\nusage : log(\"str\")', 'console.module', 61);
          }
          if (typeof data !== "string") {
            data = data.toString()
          }
          try {
            return data;
          } catch (error) {
            return error;
          }
        }
      /*markTimeline(label?: string): void;
      profile(reportName?: string): void;
      profileEnd(reportName?: string): void;
      table(...tabularData: any[]): void;
      time(label?: string): void;
      timeEnd(label?: string): void;
      timeStamp(label?: string): void;
      timeline(label?: string): void;
      timelineEnd(label?: string): void;
      trace(message?: any, ...optionalParams: any[]): void;
      warn(message?: any, ...optionalParams: any[]): void;*/
    }
