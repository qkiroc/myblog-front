import fetch from 'superagent';

export default function log(text, type) {
  //if (DEV) { //只有在开发的时候才会打印
    switch (type) {
      case "warn":
        console.log('%c '+ JSON.stringify(text), "background: yellow; color: white; display: block;");
        break;
      case "success":
        console.log('%c '+ JSON.stringify(text), "background: green; color: white; display: block; padding: 2px;");
        break;
      case "error":
        console.log('%c '+ JSON.stringify(text), "background: red; color: white; display: block;padding: 2px;");
        break;
      case "info":
        console.log('%c '+ JSON.stringify(text), "background: blue; color: white; display: block;padding: 2px;");
      default:
        break;
    }
  //}
}

export function get(url, param = {}) {
  return request(url, param, 'get', 10000);
}
export function post(url, param = {}) {
  return request(url, param, 'post', 10000);
}

export function put(url, param = {}) {
  return request(url, param, 'put', 10000);
}

export function request(url, param = {}, method = 'get', timeout = 10000) {
  return new Promise((resolve, reject) => {
    const requestStartTime = new Date();
    let options = {
    };
    const commonParam = computerCommonParam();
    param = { ...commonParam, ...param };
    let paramString = '';
    let agent;
    log(method + ' ' + url + ', param:' + JSON.stringify(param), 'info');
    if (method.toLowerCase() === 'get') {

      paramString = Object.keys(param).filter(v => param[v] !== null && (typeof param[v] !== 'undefined')).map(p => {
        const value = param[p];
        return `${p}=${encodeURIComponent(value)}`
      }).join('&');
      url = url.indexOf('?') > -1 ? url + '&' + paramString : url + '?' + paramString;
      agent = fetch.get(url).withCredentials();

    } else { //post,put
      agent = fetch.post(url).withCredentials().send(param).set('Accept', 'application/json')
    }
    agent
      .timeout({
        response: timeout,  // Wait 5 seconds for the server to start sending,
        deadline: 60000 // but allow 1 minute for the file to finish loading.
      }).then(res => {
        const requestEndTime = new Date();

        const delay = requestEndTime - requestStartTime;

        res = res && res.body || {};
        if (res.success) {
          resolve(res.data);
          log('req ' + url + 'success');
        }
        else {
          //wpo && wpo.error(url, false, delay, res.code, res.msg || res.errMsg || '网络超时，请稍后重试');

          /*if (res.code === 913) {
            window.location.href = redirectUrl;
            return;
          }*/
          reject(res.message || res.errMsg || '网络超时，请稍后重试');
          console.error(res.message || res.errMsg || '网络超时，请稍后重试');
        }
      })
      .catch((err) => {

        if (err.timeout) {
          err.message = '请求服务器超时！';
        }

        err = {
          errCode: err.status || err.errCode || err.code,
          errMsg: err.message || err.errMsg
        }
      //  wpo && wpo.error(url, false, timeout, err.errCode, err.errMsg);
        console.error(err.errMsg);

        log(url + ' ' + JSON.stringify(err), 'error');
        reject(err.errMsg);
      })
  })
}

/**
 * [computerCommonParam 获取请求公共参数]
 *
 * @return {objct} [description]
 */
function computerCommonParam() {
  //const token = document.getElementsByName('_tb_token_')[0].value;
  const timestamp = +new Date();
  return {
    'credentials': 'include',
   // '_tb_token_': token,
    '_timestamp_': timestamp,
  }
}
