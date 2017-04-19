# 爬虫程序Python
# 示例网站 url = 'https://www.udacity.com/cs101x/index.html'

import urllib2
url = 'https://www.udacity.com/cs101x/index.html'

# 定义下载网页的函数
def downloadPage(url, num_retries):
    # num_retries重新下载的尝试次数
    print 'Downloading:', url
    try:
        html = urllib2.urlopen(url).read()
    except urllib2.URLError as e:
        print 'Download error:', e.reason
        html = None
        if num_retries > 0:
            if hasattr(e, 'code') and 500 <= e.code < 600:
                # 如果返回的是5xx错误，则重新尝试下载
                return downloadPage(url, num_retries - 1)
    return html

# 找到下一个链接
def getNextLink(page):
    first_link = page.find('<a href=')
    if first_link == -1:
        return None, 0
    start_quote = page.find('"', first_link)
    end_quote = page.find('"', start_quote + 1)
    url = page[start_quote + 1 : end_quote]
    return url, end_quote

def union(p, q):
    for e in q:
        if e not in p:
            p.append(e)

# 从页面中找到所有链接
def getAllLinks(page):
    urls = []
    while True:
        url, end_quote = getNextLink(page)
        if url:
            urls.append(url)
            page = page[end_quote:]
        else:
            break
    return urls

# 判定url是否已被爬取
def crawlWeb(seed):
    toCrawl = [seed]
    crawled = []
    while toCrawl:
        page = toCrawl.pop()
        if page not in crawled:
            newUrls = getAllLinks(page)
            union(toCrawl, newUrls)
            crawled.append(page)

html = downloadPage(url, 2)
getAllLinks(html)
