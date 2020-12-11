from splinter import Browser
from bs4 import BeautifulSoup as bs
import time


def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
   # executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
   # return Browser("chrome", **executable_path, headless=False)
    executable_path = {'executable_path': 'chromedriver.exe'}
    return Browser('chrome', **executable_path, headless=False)

def scrape_mars_data():
    browser = init_browser()

    # Visit https://space-facts.com/mars
    url = "https://space-facts.com/mars"
    browser.visit(url)

    time.sleep(1)

    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")

  
    avg_temps = soup.find_all("div", class_="textwidget")


    mars_data_list=[]
    data_symbol={}
    paragraphs = avg_temps[1].find_all('tr')

    data_symbol["equatorial_diameter"] = paragraphs[0].find_all('td')[1].text
    data_symbol["polar_diameter"] = paragraphs[1].find_all('td')[1].text
    data_symbol["mass"] = paragraphs[2].find_all('td')[1].text
    data_symbol["moons"] = paragraphs[3].find_all('td')[1].text
    data_symbol["orbit_distance"] = paragraphs[4].find_all('td')[1].text
    data_symbol["orbit_period"] = paragraphs[5].find_all('td')[1].text
    data_symbol["surface_temperature"] = paragraphs[6].find_all('td')[1].text
    data_symbol["first_recorded"] = paragraphs[7].find_all('td')[1].text
    data_symbol["recorded_by"] = paragraphs[8].find_all('td')[1].text


    mars_data_list.append(data_symbol)
    

    # Quite the browser after scraping
    browser.quit()

    # Return results
    return data_symbol

def scrape_mars_hemisphere_data():
    browser = init_browser()

    # Visit https://space-facts.com/mars
    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    url_base = "https://astrogeology.usgs.gov"
    browser.visit(url)
    #https://www.jpl.nasa.gov/spaceimages/images/wallpaper/PIA23341-1920x1200.jpg
    #https://astrogeology.usgs.gov/cache/images/39d3266553462198bd2fbc4d18fbed17_cerberus_enhanced.tif_thumb.png
    time.sleep(1)
    #images/wallpaper/PIA23341-1920x1200.jpg
    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")

    #avg_temps = soup.find_all("div", class_="collapsible results")


    hemisphere_img_list=[]
    data_symbol={}
    paragraphs = soup.find_all("div", class_="item")
    for para in paragraphs:
        data_symbol={}
        try:
            data_symbol["img_src"] = url_base+para.find('img')["src"]
            data_symbol["title"] = para.find('h3').text
            data_symbol["description"] = para.find('p').text
            hemisphere_img_list.append(data_symbol)
        except:
            pass

    # Quite the browser after scraping
    browser.quit()

    #hemisphere_img_list
    # Return results
    return hemisphere_img_list

def scrape_mars_imglink_data():
    browser = init_browser()

    # Visit https://space-facts.com/mars
    url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    url_base = "https://www.jpl.nasa.gov/"
    browser.visit(url)
    #https://www.jpl.nasa.gov/spaceimages/images/wallpaper/PIA23341-1920x1200.jpg
    time.sleep(1)
    #images/wallpaper/PIA23341-1920x1200.jpg
    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")
    #style="background-image: url('/spaceimages/images/wallpaper/PIA23431-1920x1200.jpg')

    avg_temps = soup.find("div", class_="carousel_container")

    #a_all = avg_temps.find_all('a')[1].text
    #td_all = avg_temps.find_all('td')[3].text

    avg_vol_str_data = ''

    browser.find_by_css('li[bid=18663145091]')
    mkt_vol_str_data = ''
    img_list=[]
    img_link = {}
    paragraphs = avg_temps.find_all('div', class_="carousel_items")
    for para in paragraphs:
        data_symbol={}
        try:
            avg_vol_str_data = para.find('article')
            data_symbol["img_url"] = avg_vol_str_data["style"]
            img_list.append(data_symbol)
        except:
            pass

    mkt_vol_str_data=img_list[0]["img_url"]
    mkt_vol_str_data=mkt_vol_str_data.replace('background-image: url(','')
    mkt_vol_str_data=mkt_vol_str_data=mkt_vol_str_data.replace(');','')
    mkt_vol_str_data =url_base+mkt_vol_str_data
    mkt_vol_str_data= mkt_vol_str_data.replace("'",'')
    img_link['img_link'] = mkt_vol_str_data
    #mkt_vol_str_data

    # Quite the browser after scraping
    browser.quit()

    # Return results
    return img_link

def scrape_mars_title_para():
    browser = init_browser()

    # Visit https://space-facts.com/mars
    url = "https://mars.nasa.gov/news/"
    browser.visit(url)

    time.sleep(1)

    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")


    avg_temps = soup.find("ul", class_="item_list")

    #a_all = avg_temps.find_all('a')[1].text
    #td_all = avg_temps.find_all('td')[3].text

    title_list=[]
    paragraphs = avg_temps.find_all('div', class_="list_text")
    for para in paragraphs:
        data_symbol={}
        try:
            data_symbol["title"] = para.find('div', class_="content_title").get_text()
            data_symbol["paragraph"] = para.find('div', class_="article_teaser_body").get_text()
            title_list.append(data_symbol)
        except:
            pass
    title_list

    # Quite the browser after scraping
    browser.quit()

    # Return results
    return title_list


