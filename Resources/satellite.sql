-- Database: satellite

-- DROP DATABASE satellite;

-- CREATE DATABASE satellite
--     WITH 
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'C'
--     LC_CTYPE = 'C'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;
	
CREATE TABLE country (
	country text,
	country_code text,
	number_of_satellites integer);
				
CREATE TABLE satellite_category (
	category text,
	total_satellites integer);
				
CREATE TABLE country_satellite (
	country_code text,
	satellite_name text,
	satellite_id integer,
	sat_intl_code text,
	sat_launch_date date,
	sat_period float);
	
	