DROP DATABASE IF EXISTS droneops2;
CREATE DATABASE droneops2;
\connect droneops2

CREATE EXTENSION IF NOT EXISTS postgis;

DROP TABLE IF EXISTS airports;
CREATE TABLE airports (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  country   VARCHAR ( 2 ) NOT NULL,
  state     VARCHAR ( 2 ) NOT NULL,
  iata      VARCHAR ( 4 ) UNIQUE,
  icao      VARCHAR ( 4 ) UNIQUE,
  name      VARCHAR ( 255 ) UNIQUE NOT NULL,
  has_metar BOOLEAN,
  has_taf   BOOLEAN,
  magdec    VARCHAR ( 4 ),
  lat       FLOAT,
  lon       FLOAT,
  meta      JSONB,
  coords    geometry(Point, 4326)
);

CREATE INDEX idx_airports_coords_geom
    ON airports USING gist(coords);