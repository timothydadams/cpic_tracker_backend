-- Revoke privileges from 'public' role
--REVOKE CREATE ON SCHEMA public FROM PUBLIC;
--REVOKE ALL ON DATABASE droneops FROM PUBLIC;

--CREATE SCHEMA dops;

-- Read-only role
--CREATE ROLE readonly;
--GRANT CONNECT ON DATABASE droneops TO readonly;
--GRANT USAGE ON SCHEMA dops TO readonly;
--GRANT SELECT ON ALL TABLES IN SCHEMA dops TO readonly;
--ALTER DEFAULT PRIVILEGES IN SCHEMA dops GRANT SELECT ON TABLES TO readonly;

-- Read/write role
--CREATE ROLE readwrite;
--GRANT CONNECT ON DATABASE droneops TO readwrite;
--GRANT USAGE, CREATE ON SCHEMA dops TO readwrite;
--GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA dops TO readwrite;
--ALTER DEFAULT PRIVILEGES IN SCHEMA dops GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO readwrite;
--GRANT USAGE ON ALL SEQUENCES IN SCHEMA dops TO readwrite;
--ALTER DEFAULT PRIVILEGES IN SCHEMA dops GRANT USAGE ON SEQUENCES TO readwrite;

-- Users creation
--CREATE USER reporting_user WITH PASSWORD 'some_secret_passwd';
--CREATE USER app_user WITH PASSWORD 'some_secret_passwd';

-- Grant privileges to users
--GRANT readonly TO reporting_user;
--GRANT readwrite TO app_user1;

-- Permissions --
--CREATE USER app_user WITH PASSWORD 'some_password_here';
GRANT CONNECT ON DATABASE droneops2 TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO app_user;
ALTER ROLE app_user WITH NOBYPASSRLS;