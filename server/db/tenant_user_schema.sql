\connect droneops2

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants (id) ON DELETE RESTRICT,
    created_at TIMESTAMP NOT NULL DEFAULT (now() at time zone 'utc'),
    updated_at TIMESTAMP NOT NULL DEFAULT (now() at time zone 'utc'),
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL CHECK (first_name <> ''),
    last_name VARCHAR(255) NOT NULL CHECK (last_name <> ''),
    username  VARCHAR( 100 ) NOT NULL CHECK (username <> ''),
    password  VARCHAR( 100 ) NOT NULL CHECK (password <> ''),
    disabled  BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS tenants CASCADE;
CREATE TABLE tenants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    status VARCHAR(64) CHECK (status IN ('active', 'suspended', 'disabled')) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (now() at time zone 'utc')
);

DROP POLICY IF EXISTS tenant_isolation_policy ON tenants;
CREATE POLICY tenant_isolation_policy 
    ON tenants
    FOR ALL
    USING (id = NULLIF(current_setting('app.current_tenant',true), '')::uuid);

DROP POLICY IF EXISTS user_isolation_policy ON users;
CREATE POLICY user_isolation_policy 
    ON users
    FOR SELECT
    USING (true);

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

INSERT INTO tenants (name, status)
VALUES
('AIR INTEL','active'),
('BOEING','active');

INSERT INTO users (username,password,email, first_name, last_name, tenant_id)
VALUES
('test1','test','test@ai.com', 'Test','AI', (SELECT id FROM tenants WHERE name = 'AIR INTEL')),
('test2','test','test@b.com', 'Test','B', (SELECT id FROM tenants WHERE name = 'BOEING'));

-- Permissions --
--CREATE USER app_user WITH PASSWORD 'some_password_here';
GRANT CONNECT ON DATABASE droneops2 TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO app_user;
ALTER ROLE app_user WITH NOBYPASSRLS;