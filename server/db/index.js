import pg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
 
const pool = new Pool({
  host: process.env.pg_host,
  user: process.env.pg_user,
  password: process.env.pg_pw,
  port: process.env.pg_port,
  database: process.env.pg_db,
  //max: 20,
  //idleTimeoutMillis: 30000,
  //connectionTimeoutMillis: 2000,
});

export const query = async (text, params) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
}
   
export const getClient = async () => {
    const client = await pool.connect()
    const query = client.query
    const release = client.release
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!')
      console.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000)
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      client.lastQuery = args
      return query.apply(client, args)
    }
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout)
      // set the methods back to their old un-monkey-patched version
      client.query = query
      client.release = release
      return release.apply(client)
    }
    return client
}

export const getRestrictedClient = async (tenant_id) => {
    if (!tenant_id) return { error: 'tenant_id is required'};

    const client = await pool.connect();

    await client.query(
        `SELECT set_config('app.current_tenant', $1, FALSE)`,
        [ tenant_id ]
    );
    
    const { rows } = await client.query(
        `SELECT id, name, status FROM tenants`,
        []
    );

    client.tenant = rows.length > 0 ? rows[0] : null;

    //SELECT set_config('app.current_tenant', 'test', FALSE)
    /*
    if (tenantRow?.length > 0) {
        client.tenant = tenantRow[0]; //current_tenant;
        const { id } = tenantRow[0];
        console.log('setting tenant id for RLS:', id);
        //`SELECT set_config('app.current_tenant', $1, FALSE)`,
        await client.query(
            `SELECT set_config('app.current_tenant', $1, FALSE)`,
            [ id ]
        );
    }
        */

    const query = client.query;
    const release = client.release;

    client.release = async () => {
        await client.query('DISCARD ALL', []);
        client.tenant = null;
        client.query = query;
        client.release = release;
        return release.apply(client);
    }

    return client;
}