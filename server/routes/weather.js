import { Router } from 'express';
//import { prisma } from "../configs/db.js";
import { requireAuth } from '../middleware/requireAuth.js';
//import { findClosestAirport } from '@prisma/client/sql';
import axios from 'axios';

const avaiationWeatherCenter = axios.create({
    baseURL: 'https://aviationweather.gov/api',
    headers: { 'Content-Type': 'application/json' },
});

const weatherGovApi = axios.create({
    baseURL: 'https://api.weather.gov',
    headers: { 'Content-Type': 'application/json' },
});

weatherGovApi.interceptors.response.use(
    response => response, 
    (error) => {
        const { config } = error;
        const status = error?.response?.status || null;
        if (status === 500 && !config.__retry) {
            config.__retry = true;
            return weatherGovApi( config );
        }
        return Promise.reject({error: "unable to retrieve forecast"});
    }
);

const kpIndexAPI = axios.create({
    baseURL: 'https://services.swpc.noaa.gov',
    headers: { 'Content-Type': 'application/json' }
})


const WeatherRouter = Router();

//WeatherRouter.post('/', handleCreateUser);

WeatherRouter.get('/kpindex', async (req, res) => { 
    const { data } = await kpIndexAPI.get(`/products/noaa-planetary-k-index.json`);
    if (!data) return res.status(400).json({error:'failed to retrieve kp index'});
    res.status(200).json({data:data.slice(-1)});
});

WeatherRouter.post('/nearestAirports', async (req, res) => {
    const qty = 3;
    const { longitude, latitude } = req.body;

    /*
    const nearestAirports = await prisma.$queryRawTyped(
        findClosestAirport(Number(longitude),Number(latitude), qty)
    )
    */
   const nearestAirports = []

    if (nearestAirports && nearestAirports.length === 0) return res.status(200).json({error:"airports not found"})

    const icaos = nearestAirports.map(a => a.icao).join(',');
    //add metar and taf data to airports
    const {data:tafs, status:tStatus} = await avaiationWeatherCenter.get(`/data/taf?ids=${encodeURIComponent(icaos)}&format=json&time=valid`);
    const {data:metars, status:mStatus} = await avaiationWeatherCenter.get(`/data/metar?ids=${encodeURIComponent(icaos)}&format=json`);
    console.log({
        tStatus,
        mStatus,
    });
    
    for (const a of nearestAirports) {
            if (a.has_taf && tStatus === 200) {
                a.taf = tafs.find(t => t.icaoId === a.icao) || {error:"service down"};
            }
            if (a.has_metar && mStatus === 200) {
                a.metar = metars.find(m => m.icaoId === a.icao) || {error:"service down"};
            }   
    }

    if (nearestAirports) {
            res.status(200).json({data:nearestAirports});
    } else {
            res.sendStatus(404);
    }

});


WeatherRouter.post('/forecast', async (req, res) => {
    const { longitude, latitude } = req.body;
    if (!latitude || !longitude) return res.status(400).json({error: "Must include lat and lon coordinates"});

    const {
        data:{
            properties:{
                gridId,
                gridX,
                gridY,
                forecast,
                forecastHourly,
                forecastGridData,
                observationStations,
                county,
            },
        },
        data,
        status:ptStatus,
        } = await weatherGovApi.get(`/points/${latitude},${longitude}`);

        console.log('original points endpoint data:', data);

        try {
            //https://api.weather.gov/offices/{officeId} (EAX for your location) and view the list of approvedObservationStations in the response and pick among them.
            const res = await weatherGovApi.get(`/gridpoints/${gridId}/${gridX},${gridY}/stations`);
            console.log('nearest station:', res.data.features[0]);
        }catch(e){
            console.log(e)
        }
        
        console.log('data from points lookup:', ptStatus, gridId, gridX, gridY, JSON.stringify(forecastGridData));
        if (!forecast || ptStatus !== 200) return res.status(ptStatus).json({error:"Unable to retrieve wx forecast"});
        
        try {

            const {
                error,
                data: {
                    properties: {
                        periods
                    }
                },
                data,
                status:fcStatus,
            } = await weatherGovApi.get(`/gridpoints/${gridId}/${gridX},${gridY}/forecast`);

            if (error || !periods || fcStatus !== 200) return res.status(fcStatus).json({error:"Unable to retrieve wx forecast"});
            console.log('gridpoint data',  JSON.stringify(data.geometry));
            
            return res.json({data:periods})
            
        } catch (e) {
            return res.status(500).json({error:"Unable to retrieve wx forecast"});
        }
});



export default WeatherRouter;

//app.use('/api', [protect], apiRouter)