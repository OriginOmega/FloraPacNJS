#!/usr/bin/env node

/**
 * @type {exports} a wrapped fiber function wait to run performance test
 */

module.exports = performanceTest;

function performanceTest() {
    return require('./Fiber').applyWith(runPerformanceTest, null, arguments);
}

// command line mode
if (process.mainModule === module) {
    var filename = require('yargs')["argv"]._[0];
    var repeat = require('yargs')["argv"]._[1];

    // noinspection JSUnusedGlobalSymbols
    var FindProxyForURL = require("./pacTest")(filename, {
        // use a random dns resolver to avoid dns lookup
        dnsResolve : function () {
            function rnd() {
                // random to return 0 ~ 255
                return Math.floor(Math.random() * 256);
            }

            return rnd() + '.' + rnd() + '.' + rnd() + '.' + rnd();
        },

        // Dummy function for testing switchysharp pac.
        shExpMatch : function (test, exp) {
            // Any shExpMatch implementation could not be faster than this,
            // which results in overestimated switchysharp pac performance.
            return test == exp;
        }
    });

    FindProxyForURL.filename = filename;
    // wrap the test in setTimeout to make leaving urls definition at the end of file possible
    setTimeout(function () {
        performanceTest(FindProxyForURL, repeat).run();
    }, 0);
}


function runPerformanceTest(FindProxyForURL, repeat) {
    repeat = parseInt(repeat) || 100;

    console.log('   size: %d bytes', require("fs").statSync(FindProxyForURL.filename).size);
    var time = process.hrtime();

    for (var j = 0; j < repeat; j++) {
        urls.forEach(function (url) {
            FindProxyForURL(url, url);
        });
    }

    var diff = process.hrtime(time);
    console.log('  total: %d ms', (diff[0] * 1e3 + diff[1] * 1e-6));
    console.log('average: %d ns', (diff[0] * 1e6 + diff[1] * 1e-3) / (repeat * urls.length));
}


// noinspection SpellCheckingInspection
var urls = [
    'plus.google.com',
    'ssl.gstatic.com',
    'www.google.com',
    'id.google.com',
    'clients1.google.com',
    'api.twitter.com',
    'lh3.googleusercontent.com',
    'encrypted-tbn3.gstatic.com',
    'encrypted-tbn2.gstatic.com',
    'encrypted-tbn1.gstatic.com',
    'encrypted-tbn2.gstatic.com',
    'encrypted-tbn2.gstatic.com',
    'encrypted-tbn2.gstatic.com',
    'encrypted-tbn0.gstatic.com',
    'encrypted-tbn0.gstatic.com',
    'encrypted-tbn2.gstatic.com',
    'encrypted-tbn0.gstatic.com',
    'encrypted-tbn3.gstatic.com',
    'encrypted-tbn3.gstatic.com',
    'encrypted-tbn0.gstatic.com',
    'encrypted-tbn1.gstatic.com',
    'encrypted-tbn2.gstatic.com',
    'encrypted-tbn1.gstatic.com',
    'encrypted-tbn3.gstatic.com',
    'encrypted-tbn0.gstatic.com',
    'encrypted-tbn3.gstatic.com',
    'www.taobao.com',
    'www.taobao.com',
    'www.taobao.com',
    'www.taobao.com',
    'g.tbcdn.com',
    'g.tbcdn.com',
    'g.tbcdn.com',
    'gtms01.alicdn.com',
    'gtms02.alicdn.com',
    'gtms03.alicdn.com',
    'gtms04.alicdn.com',
    'msg.taobao.com',
    'www.taobao.com',
    'i.mmcdn.cn',
    'img.taobaocdn.com',
    'img.taobaocdn.com',
    'img.taobaocdn.com',
    'img.taobaocdn.com',
    'img.taobaocdn.com',
    'img.taobaocdn.com',
    'img.taobaocdn.com',
    'img.taobaocdn.com',
    'img02.taobaocdn.com',
    'img02.taobaocdn.com',
    'img02.taobaocdn.com',
    'img02.taobaocdn.com',
    'img03.taobaocdn.com',
    'img04.taobaocdn.com',
    'img04.taobaocdn.com',
    'www.baidu.com',
    's1.bdstatic.com',
    's1.bdstatic.com',
    's1.bdstatic.com',
    's1.bdstatic.com',
    's1.bdstatic.com',
    's1.bdstatic.com',
    'passport.baidu.com',
    's1.bdstatic.com',
    's1.bdstatic.com',
    's1.bdstatic.com',
    's1.bdstatic.com',
    'suggestion.baidu.com',
    'clients1.google.com',
    'clients1.google.com',
    'clients1.google.com',
    'clients1.google.com',
    'clients1.google.com',
    'clients1.google.com',
    'apis.google.com',
    'id.google.com',
    'ssl.gstatic.com',
    'www.gstatic.com',
    'clients1.google.com',
    'clients4.google.com',
    'www.google.com',
    't3.gstatic.com',
    'calendar.google.com',
    'calendar.google.com',
    'calendar.google.com',
    'calendar.google.com',
    'calendar.google.com',
    'calendar.google.com',
    'twitter.com',
    'docs.google.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'clients1.google.com',
    'twitter.com',
    'pbs.twimg.com',
    'twitter.com',
    'accounts.google.com',
    'clients2.google.com',
    '0.client-channel.google.com',
    'safebrowsing.google.com',
    'safebrowsing-cache.google.com',
    'client24.dropbox.com',
    'ssl.gstatic.com',
    'www.weibo.com',
    'www.weibo.com',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    '0.docs.google.com',
    '0.talkgadget.google.com',
    '0.docs.google.com',
    '0.talkgadget.google.com',
    '0.talkgadget.google.com',
    '0.docs.google.com',
    '0.talkgadget.google.com',
    '0.docs.google.com',
    'api.twitter.com',
    'twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'www.google.com',
    'graph.facebook.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'notify1.dropbox.com',
    'pbs.twimg.com',
    'twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'pbs.twimg.com',
    'pbs.twimg.com',
    'pbs.twimg.com',
    'twitter.com',
    'pbs.twimg.com',
    'twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'pbs.twimg.com',
    'pbs.twimg.com',
    't.co',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    's.tbcdn.cn',
    'twitter.com',
    'twitter.com',
    'twitter.com',
    'pbs.twimg.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'twitter.com',
    'proxy.googlezip.net',
    'clients4.google.com',
    'clients6.google.com',
    'talkgadget.google.com',
    'plus.google.com',
    'www.blogger.com',
    'www.blogger.com',
    'www.blogger.com',
    'www.blogger.com',
    'apis.google.com',
    'lh3.googleusercontent.com',
    'apis.google.com',
    'apis.google.com',
    'apis.google.com',
    'program-think.blogspot.com',
    '2.bp.blogspot.com',
    'program-think.blogspot.com',
    '1.bp.blogspot.com',
    'program-think.blogspot.com',
    'www.google-analytics.com',
    'twitter.com',
    'www.youku.com',
    'www.youku.com',
    'html.atm.youku.com',
    'html.atm.youku.com',
    'html.atm.youku.com',
    'html.atm.youku.com',
    'www.youku.com',
    'html.atm.youku.com',
    'html.atm.youku.com',
    'www.youku.com',
    'www.youku.com',
    'www.youku.com',
    'r4.yiimg.com',
    'www.youku.com',
    'r2.yiimg.com',
    'www.youku.com',
    'r3.yiimg.com',
    'www.youku.com',
    'r3.yiimg.com',
    'html.atm.youku.com',
    'www.youku.com',
    'r2.yiimg.com',
    'www.youku.com',
    'static.atm.youku.com',
    'static.atm.youku.com',
    'static.atm.youku.com',
    'static.atm.youku.com',
    'static.atm.youku.com',
    'static.atm.youku.com',
    'static.atm.youku.com',
    'r4.yiimg.com',
    'lh6.googleusercontent.com',
    'accounts.google.com',
    'lh4.googleusercontent.com',
    'oauth.googleusercontent.com',
    'csi.gstatic.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    't.co',
    'twitter.com',
    'github-camo.global.ssl.fastly.net',
    'clients1.google.com',
    'pbs.twimg.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'suggestqueries.google.com',
    'suggestqueries.google.com',
    'suggestqueries.google.com',
    'suggestqueries.google.com',
    'www.google.com',
    'www.google.com',
    'id.google.com',
    'plus.google.com',
    'clients4.google.com',
    'pbs.twimg.com',
    'twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'accounts.google.com',
    'talk.google.com',
    'notify1.dropbox.com',
    'notify1.dropbox.com',
    'calendar.google.com',
    'calendar.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'twitter.com',
    'clients4.google.com',
    'init.itunes.apple.com',
    'upp.itunes.apple.com',
    'suggestqueries.google.com',
    'suggestqueries.google.com',
    'suggestqueries.google.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'd.dropbox.com',
    'notify1.dropbox.com',
    'calendar.google.com',
    'www.google.com',
    'calendar.google.com',
    'www.google.com',
    'calendar.google.com',
    'talk.google.com',
    'www.google.com',
    'google.com',
    'google.com',
    'google.com',
    'google.com',
    'google.com',
    'google.com',
    'userstream.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'userstream.twitter.com',
    'userstream.twitter.com',
    'mobile.twitter.com',
    'mobile.twitter.com',
    'mobile.twitter.com',
    'mobile.twitter.com',
    'mobile.twitter.com',
    'mobile.twitter.com',
    'pbs.twimg.com',
    'pbs.twimg.com',
    'pbs.twimg.com',
    'pbs.twimg.com',
    'pbs.twimg.com',
    'mobile.twitter.com',
    'www.gstatic.com',
    'csi.gstatic.com',
    'notify1.dropbox.com',
    'calendar.google.com',
    'www.google.com',
    'calendar.google.com',
    'talk.google.com',
    'www.google.com',
    'accounts.google.com',
    'www.google.com',
    'google.com',
    'calendar.google.com',
    'google.com',
    'google.com',
    'google.com',
    'google.com',
    'google.com',
    'talk.google.com',
    'userstream.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'userstream.twitter.com',
    'userstream.twitter.com',
    'api.twitter.com',
    'init.itunes.apple.com',
    'su.itunes.apple.com',
    'p35-buy.itunes.apple.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'd.dropbox.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'talk.google.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'clients2.google.com',
    'client45.dropbox.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'talkx.l.google.com',
    'userstream.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'ssl.gstatic.com',
    'clients6.google.com',
    'ssl.gstatic.com',
    'ssl.gstatic.com',
    'ssl.gstatic.com',
    'ssl.gstatic.com',
    '0.docs.google.com',
    'docs.google.com',
    '0.docs.google.com',
    'ssl.gstatic.com',
    '0.drive.google.com',
    '0.talkgadget.google.com',
    '0.talkgadget.google.com',
    'talkgadget.google.com',
    'talk.google.com',
    'accounts.google.com',
    'mail.google.com',
    'chatenabled.mail.google.com',
    'csi.gstatic.com',
    'clients4.google.com',
    'talk.google.com',
    'gg.google.com',
    'apis.google.com',
    'plus.google.com',
    'userstream.twitter.com',
    'lh4.googleusercontent.com',
    'lh6.googleusercontent.com',
    'lh3.googleusercontent.com',
    'lh4.googleusercontent.com',
    'lh5.googleusercontent.com',
    'lh4.googleusercontent.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    't3.gstatic.com',
    't3.gstatic.com',
    't3.gstatic.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'docs.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'ssl.gstatic.com',
    'talk.google.com',
    'ssl.gstatic.com',
    'docs.google.com',
    'ssl.gstatic.com',
    'clients4.google.com',
    'ssl.gstatic.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'www.google.com',
    'clients4.google.com',
    'safebrowsing.google.com',
    'ssl.gstatic.com',
    'www.google.com',
    'docs.google.com',
    'clients4.google.com',
    'ssl.gstatic.com',
    'd.dropbox.com',
    'userstream.twitter.com',
    'notify1.dropbox.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'userstream.twitter.com',
    'talk.google.com',
    'calendar.google.com',
    'www.google.com',
    'calendar.google.com',
    'www.google.com',
    'accounts.google.com',
    'calendar.google.com',
    'www.google.com',
    'google.com',
    'google.com',
    'google.com',
    'google.com',
    'google.com',
    'google.com',
    'talk.google.com',
    'pbs.twimg.com',
    'twitter.com',
    'pbs.twimg.com',
    'pbs.twimg.com',
    'pbs.twimg.com',
    'talkx.l.google.com',
    'api.twitter.com',
    'twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'chart.apis.google.com',
    'clients4.google.com',
    'userstream.twitter.com',
    'suggestqueries.google.com',
    'suggestqueries.google.com',
    'plus.google.com',
    'lh3.googleusercontent.com',
    'lh3.googleusercontent.com',
    'lh3.googleusercontent.com',
    'talkgadget.google.com',
    'talkgadget.google.com',
    'apis.google.com',
    'oauth.googleusercontent.com',
    'clients6.google.com',
    'clients6.google.com',
    'clients6.google.com',
    'clients6.google.com',
    'clients6.google.com',
    'clients6.google.com',
    'clients1.google.com',
    'encrypted-tbn0.gstatic.com',
    'encrypted-tbn2.gstatic.com',
    'id.google.com',
    'encrypted-tbn3.gstatic.com',
    'www.gstatic.com',
    'lh4.googleusercontent.com',
    'lh4.googleusercontent.com',
    'lh4.googleusercontent.com',
    'lh4.googleusercontent.com',
    'lh5.googleusercontent.com',
    'ssl.gstatic.com',
    'csi.gstatic.com',
    'clients4.google.com',
    'encrypted-tbn1.gstatic.com',
    'lh4.googleusercontent.com',
    'lh4.googleusercontent.com',
    'www.google.com',
    'twitter.com',
    'clients1.google.com',
    'encrypted-tbn0.gstatic.com',
    'encrypted-tbn1.gstatic.com',
    'encrypted-tbn2.gstatic.com',
    'encrypted-tbn3.gstatic.com',
    'www.gstatic.com',
    'id.google.com',
    'beacon.sina.com.cn',
    'plus.google.com',
    'plus.google.com',
    'd.dropbox.com',
    'www.v2ex.com',
    'cdn.v2ex.com',
    'ssl.google-analytics.com',
    'api.twitter.com',
    'twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'api.twitter.com',
    'pbs.twimg.com',
    'pbs.twimg.com',
    'ssl.gstatic.com',
    'www.v2ex.com',
    'cdn.v2ex.com',
    'cdn.v2ex.com',
    '9429127371.a.uxengine.net',
    '9429127371.a.uxengine.net',
    '9429127371.a.uxengine.net',
    '9429127371.a.uxengine.net',
    'cdn.v2ex.com',
    'cdn.v2ex.com',
    'suggestqueries.google.com',
    'suggestqueries.google.com',
    'suggestqueries.google.com',
    'clients4.google.com',
    'twitter.com',
    'suggestqueries.google.com',
    'suggestqueries.google.com',
    'github.com',
    'avatars3.githubusercontent.com',
    'raw.github.com',
    'github-camo.global.ssl.fastly.net',
    'raw.github.com',
    'collector.githubapp.com',
    'suggestqueries.google.com',
    'suggestqueries.google.com',
    'nodejs.org',
    'nodejs.org',
    'nodejs.org',
    'nodejs.org',
    'nodejs.org',
    'nodejs.org',
    'www.google-analytics.com',
    'clients2.google.com',
    'lh3.googleusercontent.com',
    'www.gstatic.com',
    'accounts.google.com',
    'mail.google.com',
    'mail-attachment.googleusercontent.com',
    'clients2.google.com',
    'plus.google.com',
    'www.google.com',
    'plus.google.com',
    'oauth.googleusercontent.com',
    'accounts.google.com',
    'www.gstatic.com'];

