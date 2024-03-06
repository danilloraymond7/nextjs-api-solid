import { type NextApiRequest, type NextApiResponse } from 'next'
import type Oauth from './dto'
import { ServiceUser } from './services'

async function OAuth (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const token = await ServiceUser.execute(req.body as Oauth)
  res.status(200).json({ token })
}

export default OAuth
