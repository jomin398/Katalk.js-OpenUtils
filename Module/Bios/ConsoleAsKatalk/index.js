module.exports = {
  /*이 소스는 깃헙, 이곳에 동시에 개시되는 오픈소스입니다.
  이소스의 기능은
  Console.log 를 카톡에서 쓸수있도록 했습니다.
  d, e, i 는 체팅방으로 메시지가 전송되지 않습니다.
  by jomin398 */
  clear: function() {
    Log.clear()
  },
  debug: function(data) {
    if (data === undefined) {
      throw new ReferenceError('str is undefined\nusage : debug(\"str\")', 'Console.module', 7);
    }
    if (typeof data !== "string") {
      data = data.toString()
    }
    try {
      Log.d(data);
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
      throw new ReferenceError('str is undefined\nusage : error(\"str\")', 'Console.module', 28);
    }
    try {
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
      throw new ReferenceError('str is undefined\nusage : info(\"str\")', 'Console.module', 45);
    }
    try {
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
      throw new ReferenceError('str is undefined\nusage : log(\"str\")', 'Console.module', 58);
    }
    if (typeof data !== "string") {
      data = data.toString()
    }
    try {
      Log.d(data);
      return data;
    } catch (error) {
      return error;
    }
  }
}