module.exports = {
      "log": {
        /*memory: any;
        assert(condition?: boolean, message?: string, ...data: any[]): void;*/
        clear: function() {
          Log.clear()
        },
        /*count(label?: string): void;*/
        debug: function(data) {
          if (data === undefined) {
            throw new ReferenceError('str is undefined\nusage : log.d(\"str\")', 'console.log.module', 9);
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
            throw new ReferenceError('str is undefined\nusage : log.e(\"str\")', 'console.log.module', 28);
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
            throw new ReferenceError('str is undefined\nusage : log.i(\"str\")', 'console.log.module', 46);
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
