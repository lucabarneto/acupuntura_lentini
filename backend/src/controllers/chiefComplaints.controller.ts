import { Request, Response, NextFunction } from "express";
import { IChiefComplaint } from "../types/mongo/IChiefComplaint";
import { chiefComplaintService } from "../services/chiefComplaints.service";
import { RequestParams } from "../types/express/RequestParams";
import { logger } from "../utils/logger";
import { SuccessResponse } from "../types/express/Response";

export class ChiefComplaintController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      req.chief_complaint = await chiefComplaintService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllChiefComplaints = async (
    req: Request,
    res: Response<SuccessResponse<IChiefComplaint[]>>,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaintService.getAll();

      logger.http(`Chief Complaints found succesfully`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };

  getChiefComplaintById = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<IChiefComplaint>>,
    next: NextFunction
  ) => {
    try {
      logger.http(`Chief Complaint found succesfully (ID: ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: req.chief_complaint! });
    } catch (err) {
      next(err);
    }
  };

  createChiefComplaint = async (
    req: Request<{}, SuccessResponse<IChiefComplaint>, IChiefComplaint>,
    res: Response<SuccessResponse<IChiefComplaint>>,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaintService.create(req.body);
      logger.http(`Chief Complaint created succesfully`);
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  updateChiefComplaint = async (
    req: Request<
      RequestParams,
      SuccessResponse<IChiefComplaint>,
      IChiefComplaint
    >,
    res: Response<SuccessResponse<IChiefComplaint>>,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaintService.update(
        req.params.id,
        req.body
      );
      logger.http(
        `Chief complaint updated successfully (ID: ${req.params.id})`
      );
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  deleteChiefComplaint = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<{}>>,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaintService.delete(req.params.id);
      logger.http(
        `Chief complaint deleted successfully (ID was ${req.params.id})`
      );
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };
}
