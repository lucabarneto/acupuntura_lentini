import { Model } from "mongoose";
import { ID } from "../types/general/ID.interface.ts";

interface NestedReference {
  [ref: string]: ID;
}

type ReferenceKey = "appointments" | "chief_complaints" | "patient_evolution";

const RAW_REFERENCE = 4;
const ID_POSITION = 0;

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
  ) => {
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
    reference: { id: ID; key: ReferenceKey },
    document_id: ID
  ) => {
    const referenceToPull = this.createPullOrPushObject("pull", reference);

    const result = await this.model.updateOne(
      { _id: document_id },
      {
        $pull: referenceToPull,
      }
    );

    if (result.modifiedCount === 0)
      throw new Error(
        `Could not remove reference from document (reference Id '${reference.id}')`
      );
  };

  addReferenceToDocument = async (
    reference: { id: ID; key: ReferenceKey },
    document: any
  ) => {
    const referenceToPush = this.createPullOrPushObject("push", reference);

    document[reference.key].push(referenceToPush);

    const result = await this.model.replaceOne(
      { _id: document._id },
      document!
    );

    if (result.modifiedCount === 0)
      throw new Error(
        `Could not add reference to document (reference Id '${reference.id}')`
      );
  };

  private createPullOrPushObject = (
    type: "pull" | "push",
    reference: { id: ID; key: ReferenceKey }
  ) => {
    let pullOrPushObject: any;

    switch (reference.key) {
      case "chief_complaints":
        if (type === "pull") {
          pullOrPushObject = {
            chief_complaints: { chief_complaint: reference.id.toString() },
          };
        } else {
          pullOrPushObject = { chief_complaint: reference.id.toString() };
        }
        break;
      case "patient_evolution":
        if (type === "pull") {
          pullOrPushObject = {
            patient_evolution: { session: reference.id.toString() },
          };
        } else {
          pullOrPushObject = { session: reference.id.toString() };
        }
        break;
      case "appointments":
        if (type === "pull") {
          pullOrPushObject = {
            appointments: { appointment: reference.id.toString() },
          };
        } else {
          pullOrPushObject = { appointment: reference.id.toString() };
        }
        break;
      default:
        const _exhaustiveCheck: never = reference.key;
        return _exhaustiveCheck;
    }

    return pullOrPushObject;
  };
}
