import { NextApiRequest,NextApiResponse } from "next";
import prisma from "@/database";

export default async function Oauth (req: NextApiRequest, res: NextApiResponse)  {
  // Your code here
  const user = await prisma.user.findUnique({
    where: {
      email: 'test'
    }
  })
  console.log(user)
  res.status(200).json({ name: 'John Doe' })
}
