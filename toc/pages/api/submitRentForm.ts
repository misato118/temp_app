import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const formInput = req.body;
    // TODO: Change the query here after adding prisma models
    // so that renters can request a rent
    const { data } = await fetch(`${process.env.GRAPHQL_API_URL}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        query: `
            query {
                item {
                id
                name
                category
                fee
                feeType
                maxDuration
                maxDurationType
                imageURL
                }
            }
        `,
        }),
        next: { revalidate: 10 }
    })
    .then((res) => res.json());

    const items = data?.item;
    res.status(200).json({ items })
}