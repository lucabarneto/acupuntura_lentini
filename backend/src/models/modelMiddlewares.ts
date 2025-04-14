import { Model } from "mongoose";
import { ID } from "..//types/general/ID.interface";

type Reference = {
  ref_id: ID;
  ref_key: ReferenceKey;
  isInsideArray: boolean;
  aditional_value?: string | number;
};

type ReferenceKey =
  | "appointments"
  | "chief_complaints"
  | "consultations"
  | "reports"
  | "resources";

const makeStringSingular = (string: string) => string.slice(-string.length, -1);

export abstract class ModelMiddlewares<Interface> {
  model: Model<Interface>;

  constructor(model: Model<Interface>) {
    this.model = model;
  }

  checkForNonExistingDocument = async (id: ID): Promise<Interface> => {
    const result = (await this.model.findOne({ _id: id })) as Interface;

    if (!result)
      throw new Error(`Id '${id}' referenced in the document does not exist`);

    return result;
  };

  deleteNestedReferencesOffDatabase = async (
    nestedReferences: any[],
    reference_key: ReferenceKey
  ): Promise<void> => {
    const refKeyInSingular = makeStringSingular(reference_key);

    for (let i = 0; i < nestedReferences.length; i++) {
      const result = await this.model.deleteOne({
        _id: nestedReferences[i][refKeyInSingular]._id,
      });
      if (result.deletedCount === 0)
        throw new Error(
          `Could not delete nested document (Id '${nestedReferences[i][reference_key]._id}')`
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

    if (reference.isInsideArray) {
      return reference.aditional_value &&
        (reference.ref_key === "appointments" ||
          reference.ref_key === "resources")
        ? this.addReferenceWithAditionalValue(reference)
        : {
            $addToSet: {
              [reference.ref_key]: { [refKeyInSingular]: reference.ref_id },
            },
          };
    } else {
      return { $set: { [refKeyInSingular]: reference.ref_id } };
    }
  };

  private removeReference = (reference: Reference) => {
    const refKeyInSingular = makeStringSingular(reference.ref_key);

    if (reference.isInsideArray) {
      return {
        $pull: {
          [reference.ref_key]: {
            [refKeyInSingular]: reference.ref_id.toString(),
          },
        },
      };
    } else {
      return {
        $unset: { [refKeyInSingular]: reference.ref_id.toString() },
      };
    }
  };

  private addReferenceWithAditionalValue = (reference: Reference) => {
    const refKeyInSingular = makeStringSingular(reference.ref_key);

    if (reference.ref_key === "appointments") {
      return {
        $addToSet: {
          [reference.ref_key]: {
            [refKeyInSingular]: reference.ref_id,
            date: reference.aditional_value,
          },
        },
      };
    }

    if (reference.ref_key === "resources") {
      return {
        $addToSet: {
          [reference.ref_key]: {
            [refKeyInSingular]: reference.ref_id,
            selected_input: reference.aditional_value,
          },
        },
      };
    }
  };
}
