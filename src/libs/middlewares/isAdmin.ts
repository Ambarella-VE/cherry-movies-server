import express from 'express';
import {
  testUser
} from '../../utils/index.js';

export default function isAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  if(testUser.isAdmin()) {
    next()
  } else {
    res.json({
      message: 'Error: User is not authorized'
    })
  }
} 
