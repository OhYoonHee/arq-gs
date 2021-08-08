/**
 * 
 * @param  {...any} args 
 * @returns Response sih
 */
function fetch(...args) {
    return UrlFetchApp.fetch(...args);
}

/**
 * 
 * @param {any} input 
 * @returns boolean|error
 */
function is_string(input) {
    if (typeof input == "string") return true;
    throw new Error("Invalid type of param");
}

/**
 * 
 * @param {any} input 
 * @returns boolean|error
 */
function is_number(input) {
    if (typeof input == "number") return true;
    throw new Error("Invalid type of param");
}

/**
 * 
 * @param {object} obj 
 * @returns string
 */
function encode(obj) {
    var str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
}

class ARQ_async {

    /**
     * 
     * @param {string} api_url Api url in bio ARQBot
     * @param {string} api_key Api key get it from ARQBot
     */
    constructor(api_url, api_key) {
        if(typeof api_key != "string" || Boolean(api_key) == false){
            throw new Error("Need apikey");
        }
        if(typeof api_url != "string" || Boolean(api_url) == false){
            throw new Error("Need apikey");
        }
        this._api_url = api_url.endsWith('/') ? api_url : api_url + "/";
        this._api_key = api_key;
    }

    /**
     * 
     * @param {string} route Api route 
     * @param {object} query Query dalam bentuk object {}
     * @param {boolean} post true jika method route api menggunakan post method
     * @returns Promise<any>
     */
    request(route, query={}, post=false) {
        return new Promise((res, rej)=>{
            let response;

            if (post) {
                response = fetch(this._api_url + route, {
                    method : "POST",
                    headers : {
                        "x-api-key" : this._api_key
                    },
                    payload : JSON.stringify(query)
                });
            } else {
                response = fetch(this._api_url + route + "?" + encode(query), {
                    method : "GET",
                    headers : {
                        "x-api-key" : this._api_key
                    }
                });
            }

            let res_json = {};
            let res_status = response.getResponseCode();

            if (res_status == 403 || res_status == 401) {
                return rej(new Error('Invalid API key'));
            }

            try {

                res_json = JSON.parse(response.getContentText());

            } catch(e) {

                return rej(new Error("Invalid response!"));

            } finally {
                let { ok, result } = res_json;
                if (typeof ok === 'undefined' || typeof result == 'undefined') {
                    return rej(new Error('Invalid response'));
                }
                if(ok){
                    return res(result);
                } else {
                    return rej(result);
                }
            }
        });
    }

    /**
     * 
     * @param {string} query 
     * @returns Promise<any>
     */
    async torrent(query) {
        is_string(query);
        return await this.request('torrent', { query });
    }

    /**
     * 
     * @param {string} query 
     * @param {number} count 
     * @param {number} format 
     * @returns Promise<any>
     */
    async deezer(
        query,
        count=1,
        format=3
    ) {
        is_string(query) && is_number(count) && is_number(format);
        return await this.request('deezer', { query, count, format });
    }

    /**
     * 
     * @param {string} query 
     * @returns Promise<any>
     */
    async saavn(query) {
        is_string(query);
        return await this.request('saavn', { query });
    }

    /**
     * 
     * @param {string} url 
     * @returns Promise<any>
     */
    async saavnPlaylist(url) {
        is_string(url);
        return await this.request('saavnPlaylist', { url });
    }

    /**
     * 
     * @param {string} query 
     * @returns Promise<any>
     */
    async youtube(query) {
        is_string(query);
        return await this.request('youtube', { query });
    }

    /**
     * 
     * @param {string} query 
     * @returns Promise<any>
     */
    async wall(query) {
        is_string(query);
        return await this.request('wall', { query });
    }

    /**
     * 
     * @param {string} query 
     * @returns Promise<any>
     */
    async reddit(query) {
        is_string(query);
        return await this.request('reddit', { query });
    }

    /**
     * 
     * @param {string} query 
     * @returns Promise<any>
     */
     async ud(query) {
         is_string(query);
        return await this.request('ud', { query });
    }

    /**
     * 
     * @param {string} query 
     * @param {number} page 
     * @param {string} thumbSize 
     * @returns Promise<any>
     */
    async ph(
        query,
        page = 1,
        thumbSize = 'small',
    ) {
        is_string(query) && is_number(page) && is_string(thumbSize);
        return await this.request('ph', { query, page, thumbSize });
    }

    /**
     * 
     * @param {string} query 
     * @param {number} id 
     * @returns Promise<any>
     */
    async luna(query, id) {
        is_string(query) && is_number(id);
        return await this.request('luna', { query, id });
    }

    /**
     * 
     * @param {string} query 
     * @returns Promise<any>
     */
    async lyrics(query) {
        is_string(query);
        return await this.request('lyrics', { query });
    }

    /**
     * 
     * @param {string} query 
     * @returns Promise<any>
     */
    async wiki(query) {
        is_string(query);
        return await this.request('wiki', { query });
    }

    /**
     * 
     * @param {string} url 
     * @returns Promise<any>
     */
    async nsfwScan(url) {
        is_string(url);
        return await this.request('nsfw_scan', { url });
    }

    /**
     * 
     * @param {string} url 
     * @returns Promise<any>
     */
    async ocr(url) {
        is_string(url);
        return await this.request('ocr', { url });
    }

    /**
     * 
     * @returns Promise<any>
     */
    async stats() {
        return await this.request('stats');
    }

    /**
     * 
     * @returns Promise<any>
     */
    async proxy() {
        return await this.request('proxy');
    }

    /**
     * 
     * @param {string} query 
     * @param {number} tmdbID 
     * @returns Promise<any>
     */
    async tmdb(query, tmdbID = 0) {
        is_string(query) && is_number(tmdbID);
        return await this.request('tmdb', { query, tmdbID });
    }

    /**
     * 
     * @param {string} text 
     * @param {strings} destLangCode 
     * @returns Promise<any>
     */
    async translate(
        text,
        destLangCode = 'en',
    ) {
        is_string(text) && is_string(destLangCode);
        return await this.request('translate', { text, destLangCode });
    }

    /**
     * 
     * @param {string} query 
     * @returns Promise<any>
     */
    async pypi(query) {
        is_string(query);
        return await this.request('pypi', { query });
    }

    /**
     * 
     * @param {string} text 
     * @returns Promise<any>
     */
    async spellCheck(text) {
        is_string(text);
        return await this.request('spellcheck', { text });
    }

}

class ARQ_sync {

    /**
     * 
     * @param {string} api_url Api url in bio ARQBot
     * @param {string} api_key Api key get it from ARQBot
     */
    constructor(api_url, api_key) {
        if(typeof api_key != "string" || Boolean(api_key) == false){
            throw new Error("Need apikey");
        }
        if(typeof api_url != "string" || Boolean(api_url) == false){
            throw new Error("Need apikey");
        }
        this._api_url = api_url.endsWith('/') ? api_url : api_url + "/";
        this._api_key = api_key;
    }

    /**
     * 
     * @param {string} route Api route 
     * @param {object} query Query dalam bentuk object {}
     * @param {boolean} post true jika method route api menggunakan post method
     * @returns any
     */
    request(route, query={}, post=false) {
        let response;

        if (post) {
            response = fetch(this._api_url + route, {
                method : "POST",
                headers : {
                    "x-api-key" : this._api_key
                },
                payload : JSON.stringify(query)
            });
        } else {
            response = fetch(this._api_url + route + "?" + encode(query), {
                method : "GET",
                headers : {
                    "x-api-key" : this._api_key
                }
            });
        }

        let res_json = {};
        let res_status = response.getResponseCode();

        if (res_status == 403 || res_status == 401) {
            throw new Error('Invalid API key');
        }

        try {

            res_json = JSON.parse(response.getContentText());

        } catch(e) {

            throw new Error("Invalid response!");

        } finally {
            let { ok, result } = res_json;
            if (typeof ok === 'undefined' || typeof result == 'undefined') {
                throw new Error('Invalid response');
            }
            if(ok){
                return result;
            } else {
                throw result;
            }
        }
    }

    /**
     * 
     * @param {string} query 
     * @returns any
     */
    torrent(query) {
        is_string(query);
        return this.request('torrent', { query });
    }

    /**
     * 
     * @param {string} query 
     * @param {number} count 
     * @param {number} format 
     * @returns any
     */
    deezer(
        query,
        count=1,
        format=3
    ) {
        is_string(query) && is_number(count) && is_number(format);
        return this.request('deezer', { query, count, format });
    }

    /**
     * 
     * @param {string} query 
     * @returns any
     */
    saavn(query) {
        is_string(query);
        return this.request('saavn', { query });
    }

    /**
     * 
     * @param {string} url 
     * @returns any
     */
    saavnPlaylist(url) {
        is_string(url);
        return this.request('saavnPlaylist', { url });
    }

    /**
     * 
     * @param {string} query 
     * @returns any
     */
    youtube(query) {
        is_string(query);
        return this.request('youtube', { query });
    }

    /**
     * 
     * @param {string} query 
     * @returns any
     */
    wall(query) {
        is_string(query);
        return this.request('wall', { query });
    }

    /**
     * 
     * @param {string} query 
     * @returns any
     */
    reddit(query) {
        is_string(query);
        return this.request('reddit', { query });
    }

    /**
     * 
     * @param {string} query 
     * @returns any
     */
     ud(query) {
         is_string(query);
        return this.request('ud', { query });
    }

    /**
     * 
     * @param {string} query 
     * @param {number} page 
     * @param {string} thumbSize 
     * @returns any
     */
    ph(
        query,
        page = 1,
        thumbSize = 'small',
    ) {
        is_string(query) && is_number(page) && is_string(thumbSize);
        return this.request('ph', { query, page, thumbSize });
    }

    /**
     * 
     * @param {string} query 
     * @param {number} id 
     * @returns any
     */
    luna(query, id) {
        is_string(query) && is_number(id);
        return this.request('luna', { query, id });
    }

    /**
     * 
     * @param {string} query 
     * @returns any
     */
    lyrics(query) {
        is_string(query);
        return this.request('lyrics', { query });
    }

    /**
     * 
     * @param {string} query 
     * @returns any
     */
    wiki(query) {
        is_string(query);
        return this.request('wiki', { query });
    }

    /**
     * 
     * @param {string} url 
     * @returns any
     */
    nsfwScan(url) {
        is_string(url);
        return this.request('nsfw_scan', { url });
    }

    /**
     * 
     * @param {string} url 
     * @returns any
     */
    ocr(url) {
        is_string(url);
        return this.request('ocr', { url });
    }

    /**
     * 
     * @returns any
     */
    stats() {
        return this.request('stats');
    }

    /**
     * 
     * @returns any
     */
    proxy() {
        return this.request('proxy');
    }

    /**
     * 
     * @param {string} query 
     * @param {number} tmdbID 
     * @returns any
     */
    tmdb(query, tmdbID = 0) {
        is_string(query) && is_number(tmdbID);
        return this.request('tmdb', { query, tmdbID });
    }

    /**
     * 
     * @param {string} text 
     * @param {strings} destLangCode 
     * @returns any
     */
    translate(
        text,
        destLangCode = 'en',
    ) {
        is_string(text) && is_string(destLangCode);
        return this.request('translate', { text, destLangCode });
    }

    /**
     * 
     * @param {string} query 
     * @returns any
     */
    pypi(query) {
        is_string(query);
        return this.request('pypi', { query });
    }

    /**
     * 
     * @param {string} text 
     * @returns any
     */
    spellCheck(text) {
        is_string(text);
        return this.request('spellcheck', { text });
    }

}

var Async = ARQ_async;
var Sync = ARQ_sync;
