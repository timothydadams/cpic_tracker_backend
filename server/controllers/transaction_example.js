/*
import { getRestrictedClient } from "../db/index.js";

export const someHandler = async (req, res, next) => {
    const { tenant_id } = req.body;

    const client = await getRestrictedClient(tenant_id);

    try {
        await client.query('BEGIN');
        const current_tenant = client.tenant;
        if (!current_tenant) {
            await client.query(`ROLLBACK`);
            return res.json({ error: { message: 'Not Authorized'}})
        }

        // EXECUTE ADDITIONAL TASKS AS NEEDED FOR TRANSACTION 
        const { rows } = await client.query('', []);



        await client.query('COMMIT');

        return res.json({ rows });

    } catch (e) {
        await client.query('ROLLBACK');
        next(e);
    } finally {
        client.release()
    }

}
*/