# -*- coding: utf-8 -*-

import re
import time
import datetime
import tweepy

import keys #envファイルの方が良さそうだけどenvが何かわからない



consumer_key = keys.consumer_key
consumer_secret = keys.consumer_secret
access_token_key = keys.access_token_key
access_token_secret = keys.access_token_secret

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token_key, access_token_secret)
print('Auth Done!')

api = tweepy.API(auth, wait_on_rate_limit=True)



#これいらね
def postTweet():
    api.update_status(status='実行時刻は%s' % datetime.datetime.now())



honsen = 7
unyouNeatList = ['[1]', '[2]', '[3]', '[4]', '[5]', '[6]', '[7]']
yasumiNeat = ''
naueno = 0


def generateNeatList():
    global unyouNeatList
    global yasumiNeat
    global naueno
    unyouRoughList = ['1', '2', '3', '4', '5', '6', '7']

    searchResult = api.search(q='#江ノ電運用 from:enodenwiki', result_type='recent', tweet_mode='extended', count=10)
    #結果から今日のやつだけを抜き出してリストにする。検索は10件で十分？

    tweetsList = []
    jstDiff = datetime.timedelta(hours=9)
    def jstToday():
        return (datetime.datetime.utcnow() + jstDiff).day == (t.created_at + jstDiff).day
    for t in searchResult:
        if jstToday():
            tweetsList.append(t.full_text)
            if hasattr(t, 'retweeted_status'):
                tweetsList.append(t.retweeted_status.full_text)

    #tweetsList = [t.full_text for t in searchResult if (datetime.datetime.utcnow() + datetime.timedelta(hours=9)).day == (t.created_at + datetime.timedelta(hours=9)).day] + [t.retweeted_status.full_text for t in searchResult if (datetime.datetime.utcnow() + datetime.timedelta(hours=9)).day == (t.created_at + datetime.timedelta(hours=9)).day]

    # このforが完了すれば、Rough が完成する
    for tweet in tweetsList:
        if len(unyouRoughList[0]) or len(unyouRoughList[1]) or len(unyouRoughList[2]) or len(unyouRoughList[3]) or len(unyouRoughList[4]) or len(unyouRoughList[5]) < 2:
            lineList = tweet.split('\n')
            #[n]が一つの場合
            if len(re.findall('\[\d\]', tweet)) == 1:
                #最初に出てくる運用番号int
                startUnyouNumInt = int(re.search('\d', re.search('\[\d\]', tweet).group()).group())
                pmt = 1
                num = startUnyouNumInt
                for line in lineList:
                    if re.search('2019', line):
                        pass
                    elif re.search(':', line):
                        pass
                    elif len(re.findall('\d{2,}', line)) >= 1:
                        if 1 <= pmt <= honsen:
                            unyouRoughList[num-1] = line
                            pmt += 1
                            if num == honsen:
                                num = 1
                            else:
                                num += 1
            #[n]が運用の数だけある場合
            elif len(re.findall('\[\d\]', tweet)) > 1:
                for line in lineList:
                    if len(re.findall('\[\d\]', line)) == 1:
                        unyouNumInt = int(re.search('\d', re.search('\[\d\]',   line).group()).group())
                        if len(unyouRoughList[unyouNumInt-1]) < 2:
                            unyouRoughList[unyouNumInt-1] = line
    #Rough から Neatへ 整える変換をするためのコード
    unyouListList = [re.findall('\d{2,}', y) for y in unyouRoughList]
    for i,list in enumerate(unyouListList):
        otpt = ''
        if len(list) == 2:
            otpt = list[0] +'F+' +list[1] +'F'
        elif len(list) == 1:
            otpt = list[0] +'F'
        else:
            otpt = '[' +str(i+1) +']'
        unyouNeatList[i] = otpt


    #def generateYasumiList():
        #global yasumiNeat
    yasumiRoughTxt = ''
    for tweet in tweetsList:
        lineList = tweet.split('\n')
        for line in lineList:
            if len(yasumiRoughTxt) < 1 and re.search('休', line):
                yasumiRoughTxt = line
    yasumiList = re.findall('\d{2,}', yasumiRoughTxt)
    for h in yasumiList:
        yasumiNeat += str(h) + 'F' + ' '
    #generateNeatList()

    #なうえの
    for tweet in tweetsList:
        lineList = tweet.split('\n')
        for line in lineList:
            if naueno == 0 and re.search('\(\+\d+', line):
                naueno = int(re.search('\d+', re.search('\(\+\d+', line).group()).group())




#カキコ
def writeIntodayPy():
    lineListToday = []
    with open('today.py') as f:
        lineListToday = [line.replace('\n', '') for line in f.readlines()]
        pmt = 0
        for i,line in enumerate(lineListToday):
            if re.search('un\d', line) and pmt < honsen:
                d = int(re.search('\d', re.search('un\d', line).group()).group())
                lineListToday[i] = 'un' +str(d) +' = ' +'\'' +unyouNeatList[d-1] +'\''
                pmt += 1
            if re.search('yasumi', line):
                lineListToday[i] = 'yasumi = ' +'\'' +yasumiNeat +'\''
            if re.search('honsen', line):
                lineListToday[i] = 'honsen = ' +str(honsen)
            if re.search('naueno', line):
                lineListToday[i] = 'naueno = ' +str(naueno)
    with open('today.py', mode='w') as f:
        f.write('\n'.join(lineListToday))



generateNeatList()
writeIntodayPy()
