import firebaseAdmin from "../../firebase/firebaseAdmin";
import { Request, Response, NextFunction } from "express";

import * as admin from "firebase-admin";

export async function protect(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: "Unauthorized" });

  if (!authorization.startsWith("Bearer"))
    return res.status(401).send({ message: "Unauthorized" });

  const split = authorization.split("Bearer ");
  if (split.length !== 2)
    return res.status(401).send({ message: "Unauthorized" });

  const token = split[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await firebaseAdmin
      .auth()
      .verifyIdToken(token);
    (<any>req).user = decodedToken.uid;
    return next();
  } catch (err) {
    console.error(`${err.code} -  ${err.message}`);
    return res.status(401).send({ message: "Unauthorized" });
  }
}
