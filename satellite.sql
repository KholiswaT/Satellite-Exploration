create table country (
				country text,
				country_code text,
				number_of_satellites integer)
				
				create table satellite_category (
				category text,
				total_satellites integer)
				
				create table country_satellite (
					country_code text,
					satellite_name text,
					satellite_id integer,
					sat_intl_code text,
					sat_launch_date date,
					sat_period float)