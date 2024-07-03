// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file errors.proto (package errors, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage,
} from '@bufbuild/protobuf';
import { Message, proto3 } from '@bufbuild/protobuf';

/**
 * @generated from enum errors.ErrorTypes
 */
export enum ErrorTypes {
  /**
   * @generated from enum value: UNKNOWN = 0;
   */
  UNKNOWN = 0,

  /**
   * @generated from enum value: INVALID_ARGUMENT = 1;
   */
  INVALID_ARGUMENT = 1,

  /**
   * @generated from enum value: INVALID_PAYLOAD = 2;
   */
  INVALID_PAYLOAD = 2,

  /**
   * @generated from enum value: UNAUTHENTICATED = 3;
   */
  UNAUTHENTICATED = 3,

  /**
   * @generated from enum value: UNIMPLEMENTED = 4;
   */
  UNIMPLEMENTED = 4,

  /**
   * @generated from enum value: INTERNAL = 5;
   */
  INTERNAL = 5,
}
// Retrieve enum metadata with: proto3.getEnumType(ErrorTypes)
proto3.util.setEnumType(ErrorTypes, 'errors.ErrorTypes', [
  { no: 0, name: 'UNKNOWN' },
  { no: 1, name: 'INVALID_ARGUMENT' },
  { no: 2, name: 'INVALID_PAYLOAD' },
  { no: 3, name: 'UNAUTHENTICATED' },
  { no: 4, name: 'UNIMPLEMENTED' },
  { no: 5, name: 'INTERNAL' },
]);

/**
 * @generated from message errors.ApiError
 */
export class ApiError extends Message<ApiError> {
  /**
   * @generated from field: errors.ErrorTypes type = 1;
   */
  type = ErrorTypes.UNKNOWN;

  /**
   * @generated from field: string message = 2;
   */
  message = '';

  constructor(data?: PartialMessage<ApiError>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'errors.ApiError';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'type', kind: 'enum', T: proto3.getEnumType(ErrorTypes) },
    { no: 2, name: 'message', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): ApiError {
    return new ApiError().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): ApiError {
    return new ApiError().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): ApiError {
    return new ApiError().fromJsonString(jsonString, options);
  }

  static equals(
    a: ApiError | PlainMessage<ApiError> | undefined,
    b: ApiError | PlainMessage<ApiError> | undefined,
  ): boolean {
    return proto3.util.equals(ApiError, a, b);
  }
}
