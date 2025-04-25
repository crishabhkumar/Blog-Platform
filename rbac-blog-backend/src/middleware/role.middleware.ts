// Role-based access control middleware for Express.js
// This middleware checks if the user has the required role to access a specific route.
import { Request, Response, NextFunction } from "express";

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource." });
    }
    next();
  };
};
