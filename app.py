from flask import Flask, render_template, redirect
from sql_keys import username, password
from sqlalchemy import create_engine
from splinter import Browser
from bs4 import BeautifulSoup as bs
import time
import csv
import datetime, time
import requests
from scipy import stats

# Create an instance of Flask
app = Flask(__name__)


# Create engine connection
engine = create_engine(f'postgresql://{username}:{password}@localhost:5432/satellite')

# App Route for Home Page
@app.route("/")
def home():

    # 
    country = engine.execute("select * from country ", con=engine)
    data_cat = engine.execute("select * from satellite_category", con=engine)
    sat_ids = engine.execute("select satellite_id from country_satellite order by 1", con=engine)
    sat_names = engine.execute("select satellite_name from country_satellite order by 1", con=engine)
    # Return template and data
  
    resdata = [{
  
    }
    ]

    responsedata = { 'respdata': resdata
    }
    return render_template("index.html", country=country, category=data_cat, responsedata=responsedata, 
            init_page="initpage", sat_ids=sat_ids, sat_names=sat_names)



# App Route for selected satellite(s) based on country and satellite number 
@app.route("/getSatellite/<cntry>/<numSat>")
def satellite_country(cntry,numSat):

    # 
    sat_cnt_cnt = engine.execute("select * from country_satellite where country_code='"+cntry+"'", con=engine)
    country = engine.execute("select * from country ", con=engine)
    data_cat = engine.execute("select * from satellite_category", con=engine)
    sat_ids = engine.execute("select satellite_id from country_satellite order by 1", con=engine)
    sat_names = engine.execute("select satellite_name from country_satellite order by 1", con=engine)
    # Return template and data

    incrd =0
    coordinatesjson = {}
    resdata = [{
  
    }
    ]

    responsedata = { 'respdata': resdata
    }

    incdata = 0
    
    for record in sat_cnt_cnt:
        coordinatesjson = {}
        if (incrd >int(numSat)):
            break
        try: 
            url = "https://api.n2yo.com/rest/v1/satellite/positions/"+str(record['satellite_id'])+"/41.702/-76.014/0/2/&apiKey=J3H9EJ-Z2GE6Y-BC2E6G-4LOF"
            response = requests.get(url).json()            
            print(url)

            tt = time.strftime("%D %H:%M", time.localtime(int(response['positions'][0]['timestamp'])))
            tt2 = time.strftime("%D %H:%M", time.localtime(int(response['positions'][1]['timestamp'])))
            
      
            coordinatesjson['latitude'] = response['positions'][1]['satlatitude']            
            coordinatesjson['longitude'] = response['positions'][1]['satlongitude']                      
            coordinatesjson['azimuth'] = response['positions'][1]['azimuth']            
            coordinatesjson['elevation'] = response['positions'][1]['elevation']            
            coordinatesjson['altitude'] = response['positions'][1]['sataltitude']            
            coordinatesjson['satname'] = response['info']['satname']            
            coordinatesjson['satid'] = response['info']['satid'] 
            coordinatesjson['datetime'] = tt2  
            resdata.append(coordinatesjson)
            incrd = incrd+1
            incdata = incdata+1
        except:
            pass

        responsedata['respdata'] = resdata
    

    # Build partial query URL
   
    return render_template("index.html", country=country, category=data_cat, sat_country=sat_cnt_cnt,responsedata=responsedata,
     init_page="notinitpage" , sat_ids=sat_ids, sat_names=sat_names, sel_cnt=cntry)

# App route for satellites(s) by ID number
@app.route("/getSatelliteById/<satid>/<numSat>")
def satellite_byid(satid,numSat):

    #
    sat_cnt_cnt = engine.execute("select * from country_satellite where satellite_id='"+satid+"'", con=engine)
    country = engine.execute("select * from country ", con=engine)
    data_cat = engine.execute("select * from satellite_category", con=engine)
    sat_ids = engine.execute("select satellite_id from country_satellite order by 1", con=engine)
    sat_names = engine.execute("select satellite_name from country_satellite order by 1", con=engine)
    # Return template and data

    incrd =0
    coordinatesjson = {}
    resdata = [{
  
    }
    ]

    responsedata = { 'respdata': resdata
    }

    incdata = 0
    
    for record in sat_cnt_cnt:
        coordinatesjson = {}
        if (incrd >int(numSat)):
            break
        try: 
            url = "https://api.n2yo.com/rest/v1/satellite/positions/"+str(record['satellite_id'])+"/41.702/-76.014/0/2/&apiKey=J3H9EJ-Z2GE6Y-BC2E6G-4LOF"
            response = requests.get(url).json()            
          
            tt = time.strftime("%D %H:%M", time.localtime(int(response['positions'][0]['timestamp'])))
            tt2 = time.strftime("%D %H:%M", time.localtime(int(response['positions'][1]['timestamp'])))
        
            coordinatesjson['latitude'] = response['positions'][1]['satlatitude']            
            coordinatesjson['longitude'] = response['positions'][1]['satlongitude']                      
            coordinatesjson['azimuth'] = response['positions'][1]['azimuth']            
            coordinatesjson['elevation'] = response['positions'][1]['elevation']            
            coordinatesjson['altitude'] = response['positions'][1]['sataltitude']            
            coordinatesjson['satname'] = response['info']['satname']            
            coordinatesjson['satid'] = response['info']['satid'] 
            coordinatesjson['datetime'] = tt2  
            resdata.append(coordinatesjson)
            incrd = incrd+1
            incdata = incdata+1
        except:
            pass

        responsedata['respdata'] = resdata
    

    # Build partial query URL
   
    return render_template("index.html", country=country, category=data_cat, sat_country=sat_cnt_cnt,responsedata=responsedata,  
    init_page="notinitpage" , sat_ids=sat_ids, sat_names=sat_names, sat_sel_id=satid)

# App route for satellites(s) by satellite name
@app.route("/getSatelliteByName/<satName>/<numSat>")
def satellite_byname(satName,numSat):

    # 
    sat_cnt_cnt = engine.execute("select * from country_satellite where satellite_name='"+satName+"'", con=engine)
    country = engine.execute("select * from country ", con=engine)
    data_cat = engine.execute("select * from satellite_category", con=engine)
    sat_ids = engine.execute("select satellite_id from country_satellite order by 1", con=engine)
    sat_names = engine.execute("select satellite_name from country_satellite order by 1", con=engine)
    # Return template and data

    incrd =0
    coordinatesjson = {}
    resdata = [{
  
    }
    ]

    responsedata = { 'respdata': resdata
    }

    incdata = 0
    
    for record in sat_cnt_cnt:
        coordinatesjson = {}
        if (incrd >int(numSat)):
            break
        try: 
            url = "https://api.n2yo.com/rest/v1/satellite/positions/"+str(record['satellite_id'])+"/41.702/-76.014/0/2/&apiKey=J3H9EJ-Z2GE6Y-BC2E6G-4LOF"
            response = requests.get(url).json()            
        
            tt = time.strftime("%D %H:%M", time.localtime(int(response['positions'][0]['timestamp'])))
            tt2 = time.strftime("%D %H:%M", time.localtime(int(response['positions'][1]['timestamp'])))
   
            coordinatesjson['latitude'] = response['positions'][1]['satlatitude']            
            coordinatesjson['longitude'] = response['positions'][1]['satlongitude']                      
            coordinatesjson['azimuth'] = response['positions'][1]['azimuth']            
            coordinatesjson['elevation'] = response['positions'][1]['elevation']            
            coordinatesjson['altitude'] = response['positions'][1]['sataltitude']            
            coordinatesjson['satname'] = response['info']['satname']            
            coordinatesjson['satid'] = response['info']['satid'] 
            coordinatesjson['datetime'] = tt2  
            resdata.append(coordinatesjson)
            incrd = incrd+1
            incdata = incdata+1
        except:
            pass

        responsedata['respdata'] = resdata
    

    # Build partial query URL
   
    return render_template("index.html", country=country, category=data_cat, sat_country=sat_cnt_cnt,responsedata=responsedata,
      init_page="notinitpage", sat_ids=sat_ids, sat_names=sat_names,sel_name=satName)


# Route to satellite chart and altitude map
@app.route("/indexplots")
def indexplots():
   
    return render_template("index_plots.html")


# Route to Earth Resources satellites map
@app.route("/minimapindex")
def minimapindex():
   
    return render_template("minimap_index.html")


# Route to Earth Resources satellites on 3D globe
@app.route("/satglobe")
def satglobe():

    return render_template("satGlobe.html")


# Route to satellite launch sites cluster map
@app.route("/cluster")
def cluster():
   
    return render_template("cluster.html")

if __name__ == "__main__":
    app.run(debug=True)
