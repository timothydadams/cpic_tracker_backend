//import { hashPassword } from '../server/utils/auth.js';
//import { insertAirport } from '@prisma/client/sql';
import axios from 'axios';
import fs from 'fs';
import rateLimit from 'axios-rate-limit';
import { icaos } from './icaosList.js';
import { query } from '../index.js';
import { join } from 'path';

const outputDir = join(process.cwd(), "server", "db", "output");

const http = rateLimit(axios.create(), { maxRequests: 3, perMilliseconds: 1000, maxRPS: 3 })

const writer = fs.createWriteStream(
    join(outputDir,'airport_errors.txt'), 
    {
        flags: 'w',
        encoding: 'utf8',
    }
);

const testICAO = ["KAUG"];

const addAirports = async () => {
    await Promise.all(
        icaos.map(async (a) => {
            //get airport data
            const result = await http.get(`https://aviationweather.gov/api/data/airport?ids=${a}&format=json`);
            const {data, status } = result;

            try {
                if (data.length === 0) {
                    throw "failed to retrieve airport data";
                }
                const {
                    magdec = null,
                    lat,
                    lon,
                    name,
                    country = "US",
                    state,
                    icaoId:icao,
                    iataId:iata = null,
                    ...rest
                } = data[0];

                const {data:siteData} = await axios.get(`https://aviationweather.gov/api/data/stationinfo?ids=${a}`);
                
                const rEx = /METAR|TAF/g;
                const found = siteData.match(rEx);
                let hasMetar = null;
                let hasTAF = null;
                if (found) {
                    hasMetar = found.includes("METAR");
                    hasTAF = found.includes('TAF');
                }
                
                //add to db
                /*
                const newAirport = await prisma.$queryRawTyped(
                    insertAirport(country,state,iata,icao,name.trim(),hasMetar,hasTAF,magdec,Number(lon),Number(lat))
                )
                */

                const {rows} = await query(`
                INSERT INTO airports 
                (country,state,iata,icao,name,has_metar,has_taf,magdec,lon,lat,meta,coords)
                VALUES 
                ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,ST_POINT($9,$10,4326))
                RETURNING icao    
                `,[
                    country,
                    state,
                    iata,
                    icao,
                    name.trim(),
                    hasMetar,
                    hasTAF,
                    magdec,
                    Number(lon),
                    Number(lat),
                    JSON.stringify(rest)
                ]);
                
                console.log(rows);

                return true;
            } catch(e) {
                console.log(`${a}: ${e}`);
                writer.write(`${a}: ${e}\n`);
                return true;
            }
            
            
        })
    );

    
    return true;
}


async function main() {
    await query(`TRUNCATE airports CASCADE`);
    const result = await addAirports();
    if (result) {
        const {rows: airportRows }= await query(`SELECT * FROM airports WHERE icao = $1`,["KAUG"]);
        console.log('airports built!', airportRows);
    } else {

    }
}


main()
  .then(async () => {
    //await prisma.$disconnect();
    writer.end('\n---EOF---');
  })
  .catch(async (e) => {
    console.error(e)
    //await prisma.$disconnect()
    writer.end(`\n${e}`);
    process.exit(1)
  })