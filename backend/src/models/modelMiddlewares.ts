import { Model } from "mongoose";
import { ID } from "../types/general/ID.interface.ts";

type Reference = {
  ref_id: ID;
  ref_key: ReferenceKey;
  isInsideArray: boolean;
};

type ReferenceKey =
  | "appointments"
  | "chief_complaints"
  | "sessions"
  | "reports";

interface NestedReference {
  [ref: string]: ID;
}

const RAW_REFERENCE = 4;
const ID_POSITION = 0;

const makeStringSingular = (string: string) => string.slice(-string.length, -1);

export abstract class ModelMiddlewares<Interface> {
  model: Model<Interface>;

  constructor(model: Model<Interface>) {
    this.model = model;
  }

  checkForNonExistingDocument = async (id: ID) => {
    const result = await this.model.findOne({ _id: id });

    if (!result)
      throw new Error(`Id '${id}' referenced in the document does not exist`);

    return result;
  };

  deleteNestedReferencesOffDatabase = async (
    nestedReferences: NestedReference[]
  ): Promise<void> => {
    for (let i = 0; i < nestedReferences.length; i++) {
      const rawReference = Object.values(nestedReferences[i])[RAW_REFERENCE];
      const referenceId = Object.values(rawReference)[ID_POSITION].toString();

      const result = await this.model.deleteOne({
        _id: referenceId,
      });
      if (result.deletedCount === 0)
        throw new Error(
          `Could not delete nested document (Id '${referenceId}')`
        );
    }
  };

  removeDeletedReferenceFromDocument = async (
    reference: Reference,
    document: ID
  ): Promise<void> => {
    const refToRemove = this.removeReference(reference) as any;

    const result = await this.model.updateOne({ _id: document }, refToRemove);

    if (result.modifiedCount === 0)
      throw new Error(
        `Could not remove reference from document (reference Id '${reference.ref_id}')`
      );
  };

  addReferenceToDocument = async (
    reference: Reference,
    document: ID
  ): Promise<void> => {
    const refToAdd = this.addReference(reference) as any;

    const result = await this.model.updateOne({ _id: document }, refToAdd);

    if (result.modifiedCount === 0)
      throw new Error(
        `Could not add reference to document (reference Id '${reference.ref_id}')`
      );
  };

  private addReference = (reference: Reference) => {
    const refKeyInSingular = makeStringSingular(reference.ref_key);

    let refToAdd;

    if (reference.isInsideArray) {
      refToAdd = {
        $addToSet: {
          [reference.ref_key]: { [refKeyInSingular]: reference.ref_id },
        },
      };
    } else {
      refToAdd = { $set: { [refKeyInSingular]: reference.ref_id } };
    }

    return refToAdd;
  };

  private removeReference = (reference: Reference) => {
    const refKeyInSingular = makeStringSingular(reference.ref_key);
    let refToRemove;

    if (reference.isInsideArray) {
      refToRemove = {
        $pull: {
          [reference.ref_key]: {
            [refKeyInSingular]: reference.ref_id.toString(),
          },
        },
      };
    } else {
      refToRemove = {
        $unset: { [refKeyInSingular]: reference.ref_id.toString() },
      };
    }

    return refToRemove;
  };
}
