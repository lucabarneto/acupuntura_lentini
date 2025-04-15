import { ZodErrorMap, ZodIssueCode } from "zod";

export const customZodError: ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      return issue.received === "undefined"
        ? {
            message: `${issue.path[issue.path.length - 1]} is required!`,
          }
        : {
            message: `${
              issue.path[issue.path.length - 1]
            } is typed incorrectly! Expected '${issue.expected}', received '${
              issue.received
            }'.`,
          };
    case ZodIssueCode.unrecognized_keys:
      return {
        message: `Unrecognized key in ${issue.path[0]}: '${issue.keys[0]}'`,
      };
    case ZodIssueCode.invalid_string:
      return {
        message: `Invalid ${issue.validation} format in ${issue.path[0]}`,
      };
    case ZodIssueCode.invalid_enum_value:
      return {
        message: `Invalid value for '${
          issue.path[0]
        }'. Expected values: ${issue.options.join(", ")}; received '${
          issue.received
        }'`,
      };
  }

  return { message: ctx.defaultError };
};
