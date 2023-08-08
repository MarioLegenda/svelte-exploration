import { PUBLIC_FAUNADB_SECRET } from '$env/static/public';
import faunadb from 'faunadb';
export class Client {
    private client: faunadb.Client;
    constructor() {
        this.client = new faunadb.Client({
            secret: PUBLIC_FAUNADB_SECRET,
            domain: 'db.fauna.com',
            port: 443,
            scheme: 'https',
            keepAlive: true,
        });
    }
    async ping() {
        try {
            await this.client.query(
                faunadb.query.ToDate('2018-06-06')
            )
        } catch (e) {
            console.log(e);
        }
    }

    async query<T>(collection: CollectionType, data: T) {
        try {
            const response = await this.client.query(
                faunadb.query.Create(
                    faunadb.query.Collection(collection),
                    { data: data }
                )
            );

            return {
                response: response,
                error: null,
            }
        } catch (e) {
            return {
                response: null,
                error: e,
            }
        }
    }

    async paginate(collection: CollectionType) {
        const q = faunadb.query;
        const {data}: FaunaQueryPagination<Task> = await this.client.query(
            q.Map(q.Paginate(q.Documents(q.Collection(collection)), { size: 3 }), q.Lambda("X", q.Get(q.Var("X")))),
        );

        return data.map(item => item.data);
    }
}

const c = new Client();
await c.ping();
export const client = c;