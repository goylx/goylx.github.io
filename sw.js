/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","cebcd07220918efa82cf1179e3d34ff5"],["/HexoBlog/index.html","d5351c18b3274b3f66436db3d88d8d1b"],["/HexoOptimize/index.html","f4098ced080351267a6e39fec0777377"],["/HexoSeo/index.html","6a964fa8e964e6def85707a562f12d35"],["/about/index.html","e9e5cc4a1f7fffe81270605dfa40115a"],["/archives/2021/04/index.html","ba4f55b5c8370eb03d4733acd979d2c2"],["/archives/2021/05/index.html","610ec3fbc46911bb81d89f95720e9a36"],["/archives/2021/index.html","247772458067137a13a63dba4e6877c7"],["/archives/index.html","28b05de3a4c050cc33c30596042cf8dd"],["/categories/git/index.html","6e5959fc09f710593a7cc5c272b88aa7"],["/categories/hexo/index.html","86811be62d0e64a2360263bbab91e20d"],["/categories/index.html","5d9ebab75b9de095291d58968949a7b0"],["/css/first.css","a7052c22a7a033340b2bd34812200384"],["/css/message.css","b4293b50499c4097476e268f883f74c3"],["/css/oylx_style.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/style.css","1f028463fe3d23b9188890ce7927b546"],["/fonts/fontawesome/css/all.min.css","160c0d3d525127d6ea888bc695ebe398"],["/friends/index.html","d9be1a28763676a62bc54a939ee2b654"],["/git/concept/index.html","9b6da26de77c0452d9154cf6c1924520"],["/git/local/index.html","2fea5a6feca8469e04c75940951f5a57"],["/guide/index.html","7a0832ab7580efb3dee2f589d08049fa"],["/image/Devops/git/index.png","244bd8ce76f85b2393bd260d02669950"],["/image/Devops/git/lifeCycle.png","a8c8f7f2c9f7e0ba76e17672098cf614"],["/image/Devops/git/snapshots.png","35a0b6eff0167d0bc3719d6a2d6e385b"],["/image/Devops/git/versionControl.png","724056d0774ac9b2780c19dcfbc699c2"],["/image/Devops/git/zone.png","39b58e058a5e9bfc841cd98401375d0c"],["/image/hexo/aliCname.png","a6f8f4cf5f3259f6c2d54a3df275f12b"],["/image/hexo/baiduAdd.png","8220f9ad12750a6da8e888c9edf2f339"],["/image/hexo/baiduKey.png","75fa5d54a2fdffb4a32b50b096ad0fd5"],["/image/hexo/baiduSearchAdd.png","d6acee10c821e53d4192637fcd3cd340"],["/image/hexo/baiduSearchSitemap.png","f63c87529b42833358196ceebe7bc474"],["/image/hexo/baiduSearchToken.png","7c2b7e678883e490d03fd890909c88c9"],["/image/hexo/baiduSearchToken.png.png","2eafba8274a6ee96373a76bcc2b958a0"],["/image/hexo/baiduSearchUrl.png","f5f35211799f5a660248ac37993b8051"],["/image/hexo/baiduSearchcheck.png","f3da1b4e42808e69a60382a10d5dcfab"],["/image/hexo/googleAdd.png","1110ee92ad35c8f036056b60c1a7f9cb"],["/image/hexo/hexoGithub.png","36aa19ac18ddead310dff25539507e55"],["/image/hexo/leancloudClass.png","8368d8f5ab7a51274e38a50cf80ac86a"],["/image/hexo/leancloudCreate.png","00da7b44ca7f36f9b5c916579e320769"],["/image/hexo/leancloudKey.png","91eda93af981d30909ebaa21e6956c46"],["/image/hexo/leancloudResult.png","16e4a177623c5cf7b8ab96e76510c1c7"],["/image/logo.png","9c6a1d94186fb1175a76dff56e8a7266"],["/index.html","eacecda0a14972723c5cfc4bd3cacc87"],["/js/aplayer.js","f10ee7aff4ce278045da925ac6510d29"],["/js/app.js","5bb50a1bc71b56521fde3c3ae813ce03"],["/js/iconfont-emoji.js","88291a9a99a4cf7be24d11d190bbb3f3"],["/js/iconfont-inkss.js","283073d5c0d170c7d8b57b0303c4c850"],["/js/jquery.parallax.min.js","38cf4791e24aeaa8101bd2c816400718"],["/js/message.js","38da736cdf513c9a15a0a2a16a34eeae"],["/js/plugins/contributors.js","20e23ebc2e6bb87245094e650506a6bc"],["/js/plugins/friends.js","3a09e74a21f673a31f3b75cdae7e323c"],["/js/plugins/sites.js","aae019940c02d4c70335d808c420b881"],["/js/rightMenu.js","88d7bbb04275adbe5c397e4119aec0cc"],["/js/search/algolia.js","c4976b1ef48ec1c95fc7249630d26b76"],["/js/search/azure.js","e1b1635ba204401354f97102358cecea"],["/js/search/baidu.js","494f02972b577a5ffce6f602f5e81927"],["/js/search/google.js","680c85456690c52fc6b05c9a8b8c7da8"],["/js/search/hexo.js","9f5c288d24e19665204e358fb866c075"],["/js/valine.js","15d0f1f9d975de124ef5389385961992"],["/sw-register.js","6314738118582db75d1611ee4b9ec575"],["/tags/git/index.html","0b7626c49b3c7d5e41913e7acaff1d81"],["/tags/hexo/index.html","65465687407c430fadede7c2f6ae1c04"],["/tags/index.html","b1e7a51bda6621dd3028582787d4d914"],["/tags/volantis/index.html","29f91020c0827a87b9059f6dd00839c8"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
