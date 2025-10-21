
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model UserRole
 * 
 */
export type UserRole = $Result.DefaultSelection<Prisma.$UserRolePayload>
/**
 * Model FocusArea
 * 
 */
export type FocusArea = $Result.DefaultSelection<Prisma.$FocusAreaPayload>
/**
 * Model Policies
 * 
 */
export type Policies = $Result.DefaultSelection<Prisma.$PoliciesPayload>
/**
 * Model TimelineOptions
 * 
 */
export type TimelineOptions = $Result.DefaultSelection<Prisma.$TimelineOptionsPayload>
/**
 * Model StatusOptions
 * 
 */
export type StatusOptions = $Result.DefaultSelection<Prisma.$StatusOptionsPayload>
/**
 * Model Strategy
 * 
 */
export type Strategy = $Result.DefaultSelection<Prisma.$StrategyPayload>
/**
 * Model Implementer
 * 
 */
export type Implementer = $Result.DefaultSelection<Prisma.$ImplementerPayload>
/**
 * Model Stakeholder
 * 
 */
export type Stakeholder = $Result.DefaultSelection<Prisma.$StakeholderPayload>
/**
 * Model StrategyImplementer
 * 
 */
export type StrategyImplementer = $Result.DefaultSelection<Prisma.$StrategyImplementerPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoles
    * const userRoles = await prisma.userRole.findMany()
    * ```
    */
  get userRole(): Prisma.UserRoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.focusArea`: Exposes CRUD operations for the **FocusArea** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FocusAreas
    * const focusAreas = await prisma.focusArea.findMany()
    * ```
    */
  get focusArea(): Prisma.FocusAreaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.policies`: Exposes CRUD operations for the **Policies** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Policies
    * const policies = await prisma.policies.findMany()
    * ```
    */
  get policies(): Prisma.PoliciesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timelineOptions`: Exposes CRUD operations for the **TimelineOptions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimelineOptions
    * const timelineOptions = await prisma.timelineOptions.findMany()
    * ```
    */
  get timelineOptions(): Prisma.TimelineOptionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.statusOptions`: Exposes CRUD operations for the **StatusOptions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StatusOptions
    * const statusOptions = await prisma.statusOptions.findMany()
    * ```
    */
  get statusOptions(): Prisma.StatusOptionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.strategy`: Exposes CRUD operations for the **Strategy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Strategies
    * const strategies = await prisma.strategy.findMany()
    * ```
    */
  get strategy(): Prisma.StrategyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.implementer`: Exposes CRUD operations for the **Implementer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Implementers
    * const implementers = await prisma.implementer.findMany()
    * ```
    */
  get implementer(): Prisma.ImplementerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stakeholder`: Exposes CRUD operations for the **Stakeholder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stakeholders
    * const stakeholders = await prisma.stakeholder.findMany()
    * ```
    */
  get stakeholder(): Prisma.StakeholderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.strategyImplementer`: Exposes CRUD operations for the **StrategyImplementer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StrategyImplementers
    * const strategyImplementers = await prisma.strategyImplementer.findMany()
    * ```
    */
  get strategyImplementer(): Prisma.StrategyImplementerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Role: 'Role',
    UserRole: 'UserRole',
    FocusArea: 'FocusArea',
    Policies: 'Policies',
    TimelineOptions: 'TimelineOptions',
    StatusOptions: 'StatusOptions',
    Strategy: 'Strategy',
    Implementer: 'Implementer',
    Stakeholder: 'Stakeholder',
    StrategyImplementer: 'StrategyImplementer',
    Comment: 'Comment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "role" | "userRole" | "focusArea" | "policies" | "timelineOptions" | "statusOptions" | "strategy" | "implementer" | "stakeholder" | "strategyImplementer" | "comment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      UserRole: {
        payload: Prisma.$UserRolePayload<ExtArgs>
        fields: Prisma.UserRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findFirst: {
            args: Prisma.UserRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findMany: {
            args: Prisma.UserRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          create: {
            args: Prisma.UserRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          createMany: {
            args: Prisma.UserRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          delete: {
            args: Prisma.UserRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          update: {
            args: Prisma.UserRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          deleteMany: {
            args: Prisma.UserRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserRoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          upsert: {
            args: Prisma.UserRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          aggregate: {
            args: Prisma.UserRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRole>
          }
          groupBy: {
            args: Prisma.UserRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRoleCountArgs<ExtArgs>
            result: $Utils.Optional<UserRoleCountAggregateOutputType> | number
          }
        }
      }
      FocusArea: {
        payload: Prisma.$FocusAreaPayload<ExtArgs>
        fields: Prisma.FocusAreaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FocusAreaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusAreaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FocusAreaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusAreaPayload>
          }
          findFirst: {
            args: Prisma.FocusAreaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusAreaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FocusAreaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusAreaPayload>
          }
          findMany: {
            args: Prisma.FocusAreaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusAreaPayload>[]
          }
          create: {
            args: Prisma.FocusAreaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusAreaPayload>
          }
          createMany: {
            args: Prisma.FocusAreaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FocusAreaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusAreaPayload>[]
          }
          delete: {
            args: Prisma.FocusAreaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusAreaPayload>
          }
          update: {
            args: Prisma.FocusAreaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusAreaPayload>
          }
          deleteMany: {
            args: Prisma.FocusAreaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FocusAreaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FocusAreaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusAreaPayload>[]
          }
          upsert: {
            args: Prisma.FocusAreaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusAreaPayload>
          }
          aggregate: {
            args: Prisma.FocusAreaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFocusArea>
          }
          groupBy: {
            args: Prisma.FocusAreaGroupByArgs<ExtArgs>
            result: $Utils.Optional<FocusAreaGroupByOutputType>[]
          }
          count: {
            args: Prisma.FocusAreaCountArgs<ExtArgs>
            result: $Utils.Optional<FocusAreaCountAggregateOutputType> | number
          }
        }
      }
      Policies: {
        payload: Prisma.$PoliciesPayload<ExtArgs>
        fields: Prisma.PoliciesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PoliciesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoliciesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PoliciesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoliciesPayload>
          }
          findFirst: {
            args: Prisma.PoliciesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoliciesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PoliciesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoliciesPayload>
          }
          findMany: {
            args: Prisma.PoliciesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoliciesPayload>[]
          }
          create: {
            args: Prisma.PoliciesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoliciesPayload>
          }
          createMany: {
            args: Prisma.PoliciesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PoliciesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoliciesPayload>[]
          }
          delete: {
            args: Prisma.PoliciesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoliciesPayload>
          }
          update: {
            args: Prisma.PoliciesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoliciesPayload>
          }
          deleteMany: {
            args: Prisma.PoliciesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PoliciesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PoliciesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoliciesPayload>[]
          }
          upsert: {
            args: Prisma.PoliciesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoliciesPayload>
          }
          aggregate: {
            args: Prisma.PoliciesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePolicies>
          }
          groupBy: {
            args: Prisma.PoliciesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoliciesGroupByOutputType>[]
          }
          count: {
            args: Prisma.PoliciesCountArgs<ExtArgs>
            result: $Utils.Optional<PoliciesCountAggregateOutputType> | number
          }
        }
      }
      TimelineOptions: {
        payload: Prisma.$TimelineOptionsPayload<ExtArgs>
        fields: Prisma.TimelineOptionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimelineOptionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineOptionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimelineOptionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineOptionsPayload>
          }
          findFirst: {
            args: Prisma.TimelineOptionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineOptionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimelineOptionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineOptionsPayload>
          }
          findMany: {
            args: Prisma.TimelineOptionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineOptionsPayload>[]
          }
          create: {
            args: Prisma.TimelineOptionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineOptionsPayload>
          }
          createMany: {
            args: Prisma.TimelineOptionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimelineOptionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineOptionsPayload>[]
          }
          delete: {
            args: Prisma.TimelineOptionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineOptionsPayload>
          }
          update: {
            args: Prisma.TimelineOptionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineOptionsPayload>
          }
          deleteMany: {
            args: Prisma.TimelineOptionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimelineOptionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimelineOptionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineOptionsPayload>[]
          }
          upsert: {
            args: Prisma.TimelineOptionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineOptionsPayload>
          }
          aggregate: {
            args: Prisma.TimelineOptionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimelineOptions>
          }
          groupBy: {
            args: Prisma.TimelineOptionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimelineOptionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimelineOptionsCountArgs<ExtArgs>
            result: $Utils.Optional<TimelineOptionsCountAggregateOutputType> | number
          }
        }
      }
      StatusOptions: {
        payload: Prisma.$StatusOptionsPayload<ExtArgs>
        fields: Prisma.StatusOptionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StatusOptionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusOptionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StatusOptionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusOptionsPayload>
          }
          findFirst: {
            args: Prisma.StatusOptionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusOptionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StatusOptionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusOptionsPayload>
          }
          findMany: {
            args: Prisma.StatusOptionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusOptionsPayload>[]
          }
          create: {
            args: Prisma.StatusOptionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusOptionsPayload>
          }
          createMany: {
            args: Prisma.StatusOptionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StatusOptionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusOptionsPayload>[]
          }
          delete: {
            args: Prisma.StatusOptionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusOptionsPayload>
          }
          update: {
            args: Prisma.StatusOptionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusOptionsPayload>
          }
          deleteMany: {
            args: Prisma.StatusOptionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StatusOptionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StatusOptionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusOptionsPayload>[]
          }
          upsert: {
            args: Prisma.StatusOptionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusOptionsPayload>
          }
          aggregate: {
            args: Prisma.StatusOptionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStatusOptions>
          }
          groupBy: {
            args: Prisma.StatusOptionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatusOptionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.StatusOptionsCountArgs<ExtArgs>
            result: $Utils.Optional<StatusOptionsCountAggregateOutputType> | number
          }
        }
      }
      Strategy: {
        payload: Prisma.$StrategyPayload<ExtArgs>
        fields: Prisma.StrategyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StrategyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StrategyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          findFirst: {
            args: Prisma.StrategyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StrategyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          findMany: {
            args: Prisma.StrategyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>[]
          }
          create: {
            args: Prisma.StrategyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          createMany: {
            args: Prisma.StrategyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StrategyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>[]
          }
          delete: {
            args: Prisma.StrategyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          update: {
            args: Prisma.StrategyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          deleteMany: {
            args: Prisma.StrategyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StrategyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StrategyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>[]
          }
          upsert: {
            args: Prisma.StrategyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          aggregate: {
            args: Prisma.StrategyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStrategy>
          }
          groupBy: {
            args: Prisma.StrategyGroupByArgs<ExtArgs>
            result: $Utils.Optional<StrategyGroupByOutputType>[]
          }
          count: {
            args: Prisma.StrategyCountArgs<ExtArgs>
            result: $Utils.Optional<StrategyCountAggregateOutputType> | number
          }
        }
      }
      Implementer: {
        payload: Prisma.$ImplementerPayload<ExtArgs>
        fields: Prisma.ImplementerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImplementerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImplementerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementerPayload>
          }
          findFirst: {
            args: Prisma.ImplementerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImplementerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementerPayload>
          }
          findMany: {
            args: Prisma.ImplementerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementerPayload>[]
          }
          create: {
            args: Prisma.ImplementerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementerPayload>
          }
          createMany: {
            args: Prisma.ImplementerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImplementerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementerPayload>[]
          }
          delete: {
            args: Prisma.ImplementerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementerPayload>
          }
          update: {
            args: Prisma.ImplementerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementerPayload>
          }
          deleteMany: {
            args: Prisma.ImplementerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImplementerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImplementerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementerPayload>[]
          }
          upsert: {
            args: Prisma.ImplementerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementerPayload>
          }
          aggregate: {
            args: Prisma.ImplementerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImplementer>
          }
          groupBy: {
            args: Prisma.ImplementerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImplementerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImplementerCountArgs<ExtArgs>
            result: $Utils.Optional<ImplementerCountAggregateOutputType> | number
          }
        }
      }
      Stakeholder: {
        payload: Prisma.$StakeholderPayload<ExtArgs>
        fields: Prisma.StakeholderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StakeholderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakeholderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StakeholderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakeholderPayload>
          }
          findFirst: {
            args: Prisma.StakeholderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakeholderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StakeholderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakeholderPayload>
          }
          findMany: {
            args: Prisma.StakeholderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakeholderPayload>[]
          }
          create: {
            args: Prisma.StakeholderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakeholderPayload>
          }
          createMany: {
            args: Prisma.StakeholderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StakeholderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakeholderPayload>[]
          }
          delete: {
            args: Prisma.StakeholderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakeholderPayload>
          }
          update: {
            args: Prisma.StakeholderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakeholderPayload>
          }
          deleteMany: {
            args: Prisma.StakeholderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StakeholderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StakeholderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakeholderPayload>[]
          }
          upsert: {
            args: Prisma.StakeholderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakeholderPayload>
          }
          aggregate: {
            args: Prisma.StakeholderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStakeholder>
          }
          groupBy: {
            args: Prisma.StakeholderGroupByArgs<ExtArgs>
            result: $Utils.Optional<StakeholderGroupByOutputType>[]
          }
          count: {
            args: Prisma.StakeholderCountArgs<ExtArgs>
            result: $Utils.Optional<StakeholderCountAggregateOutputType> | number
          }
        }
      }
      StrategyImplementer: {
        payload: Prisma.$StrategyImplementerPayload<ExtArgs>
        fields: Prisma.StrategyImplementerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StrategyImplementerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyImplementerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StrategyImplementerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyImplementerPayload>
          }
          findFirst: {
            args: Prisma.StrategyImplementerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyImplementerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StrategyImplementerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyImplementerPayload>
          }
          findMany: {
            args: Prisma.StrategyImplementerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyImplementerPayload>[]
          }
          create: {
            args: Prisma.StrategyImplementerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyImplementerPayload>
          }
          createMany: {
            args: Prisma.StrategyImplementerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StrategyImplementerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyImplementerPayload>[]
          }
          delete: {
            args: Prisma.StrategyImplementerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyImplementerPayload>
          }
          update: {
            args: Prisma.StrategyImplementerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyImplementerPayload>
          }
          deleteMany: {
            args: Prisma.StrategyImplementerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StrategyImplementerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StrategyImplementerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyImplementerPayload>[]
          }
          upsert: {
            args: Prisma.StrategyImplementerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyImplementerPayload>
          }
          aggregate: {
            args: Prisma.StrategyImplementerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStrategyImplementer>
          }
          groupBy: {
            args: Prisma.StrategyImplementerGroupByArgs<ExtArgs>
            result: $Utils.Optional<StrategyImplementerGroupByOutputType>[]
          }
          count: {
            args: Prisma.StrategyImplementerCountArgs<ExtArgs>
            result: $Utils.Optional<StrategyImplementerCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    role?: RoleOmit
    userRole?: UserRoleOmit
    focusArea?: FocusAreaOmit
    policies?: PoliciesOmit
    timelineOptions?: TimelineOptionsOmit
    statusOptions?: StatusOptionsOmit
    strategy?: StrategyOmit
    implementer?: ImplementerOmit
    stakeholder?: StakeholderOmit
    strategyImplementer?: StrategyImplementerOmit
    comment?: CommentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    assigned_implementers: number
    userRoles: number
    comments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assigned_implementers?: boolean | UserCountOutputTypeCountAssigned_implementersArgs
    userRoles?: boolean | UserCountOutputTypeCountUserRolesArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssigned_implementersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImplementerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    userRoles: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userRoles?: boolean | RoleCountOutputTypeCountUserRolesArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUserRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
  }


  /**
   * Count Type FocusAreaCountOutputType
   */

  export type FocusAreaCountOutputType = {
    policies: number
  }

  export type FocusAreaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policies?: boolean | FocusAreaCountOutputTypeCountPoliciesArgs
  }

  // Custom InputTypes
  /**
   * FocusAreaCountOutputType without action
   */
  export type FocusAreaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusAreaCountOutputType
     */
    select?: FocusAreaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FocusAreaCountOutputType without action
   */
  export type FocusAreaCountOutputTypeCountPoliciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoliciesWhereInput
  }


  /**
   * Count Type PoliciesCountOutputType
   */

  export type PoliciesCountOutputType = {
    strategies: number
  }

  export type PoliciesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strategies?: boolean | PoliciesCountOutputTypeCountStrategiesArgs
  }

  // Custom InputTypes
  /**
   * PoliciesCountOutputType without action
   */
  export type PoliciesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoliciesCountOutputType
     */
    select?: PoliciesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PoliciesCountOutputType without action
   */
  export type PoliciesCountOutputTypeCountStrategiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrategyWhereInput
  }


  /**
   * Count Type TimelineOptionsCountOutputType
   */

  export type TimelineOptionsCountOutputType = {
    strategies: number
  }

  export type TimelineOptionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strategies?: boolean | TimelineOptionsCountOutputTypeCountStrategiesArgs
  }

  // Custom InputTypes
  /**
   * TimelineOptionsCountOutputType without action
   */
  export type TimelineOptionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptionsCountOutputType
     */
    select?: TimelineOptionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TimelineOptionsCountOutputType without action
   */
  export type TimelineOptionsCountOutputTypeCountStrategiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrategyWhereInput
  }


  /**
   * Count Type StatusOptionsCountOutputType
   */

  export type StatusOptionsCountOutputType = {
    strategies: number
  }

  export type StatusOptionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strategies?: boolean | StatusOptionsCountOutputTypeCountStrategiesArgs
  }

  // Custom InputTypes
  /**
   * StatusOptionsCountOutputType without action
   */
  export type StatusOptionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptionsCountOutputType
     */
    select?: StatusOptionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StatusOptionsCountOutputType without action
   */
  export type StatusOptionsCountOutputTypeCountStrategiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrategyWhereInput
  }


  /**
   * Count Type StrategyCountOutputType
   */

  export type StrategyCountOutputType = {
    stakeholders: number
    comments: number
    implementers: number
  }

  export type StrategyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stakeholders?: boolean | StrategyCountOutputTypeCountStakeholdersArgs
    comments?: boolean | StrategyCountOutputTypeCountCommentsArgs
    implementers?: boolean | StrategyCountOutputTypeCountImplementersArgs
  }

  // Custom InputTypes
  /**
   * StrategyCountOutputType without action
   */
  export type StrategyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyCountOutputType
     */
    select?: StrategyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StrategyCountOutputType without action
   */
  export type StrategyCountOutputTypeCountStakeholdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StakeholderWhereInput
  }

  /**
   * StrategyCountOutputType without action
   */
  export type StrategyCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * StrategyCountOutputType without action
   */
  export type StrategyCountOutputTypeCountImplementersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrategyImplementerWhereInput
  }


  /**
   * Count Type ImplementerCountOutputType
   */

  export type ImplementerCountOutputType = {
    cpic_smes: number
    strategies: number
  }

  export type ImplementerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cpic_smes?: boolean | ImplementerCountOutputTypeCountCpic_smesArgs
    strategies?: boolean | ImplementerCountOutputTypeCountStrategiesArgs
  }

  // Custom InputTypes
  /**
   * ImplementerCountOutputType without action
   */
  export type ImplementerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementerCountOutputType
     */
    select?: ImplementerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ImplementerCountOutputType without action
   */
  export type ImplementerCountOutputTypeCountCpic_smesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * ImplementerCountOutputType without action
   */
  export type ImplementerCountOutputTypeCountStrategiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrategyImplementerWhereInput
  }


  /**
   * Count Type CommentCountOutputType
   */

  export type CommentCountOutputType = {
    children: number
  }

  export type CommentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | CommentCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCountOutputType
     */
    select?: CommentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    auth_source: string | null
    google_id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    display_name: string | null
    profile_pic: string | null
    nickname: string | null
    given_name: string | null
    family_name: string | null
    password_hash: string | null
    email: string | null
    disabled: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    auth_source: string | null
    google_id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    display_name: string | null
    profile_pic: string | null
    nickname: string | null
    given_name: string | null
    family_name: string | null
    password_hash: string | null
    email: string | null
    disabled: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    auth_source: number
    google_id: number
    createdAt: number
    updatedAt: number
    display_name: number
    profile_pic: number
    nickname: number
    given_name: number
    family_name: number
    password_hash: number
    email: number
    disabled: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    auth_source?: true
    google_id?: true
    createdAt?: true
    updatedAt?: true
    display_name?: true
    profile_pic?: true
    nickname?: true
    given_name?: true
    family_name?: true
    password_hash?: true
    email?: true
    disabled?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    auth_source?: true
    google_id?: true
    createdAt?: true
    updatedAt?: true
    display_name?: true
    profile_pic?: true
    nickname?: true
    given_name?: true
    family_name?: true
    password_hash?: true
    email?: true
    disabled?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    auth_source?: true
    google_id?: true
    createdAt?: true
    updatedAt?: true
    display_name?: true
    profile_pic?: true
    nickname?: true
    given_name?: true
    family_name?: true
    password_hash?: true
    email?: true
    disabled?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    auth_source: string
    google_id: string | null
    createdAt: Date
    updatedAt: Date
    display_name: string | null
    profile_pic: string | null
    nickname: string | null
    given_name: string | null
    family_name: string | null
    password_hash: string | null
    email: string | null
    disabled: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    auth_source?: boolean
    google_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    display_name?: boolean
    profile_pic?: boolean
    nickname?: boolean
    given_name?: boolean
    family_name?: boolean
    password_hash?: boolean
    email?: boolean
    disabled?: boolean
    assigned_implementers?: boolean | User$assigned_implementersArgs<ExtArgs>
    userRoles?: boolean | User$userRolesArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    auth_source?: boolean
    google_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    display_name?: boolean
    profile_pic?: boolean
    nickname?: boolean
    given_name?: boolean
    family_name?: boolean
    password_hash?: boolean
    email?: boolean
    disabled?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    auth_source?: boolean
    google_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    display_name?: boolean
    profile_pic?: boolean
    nickname?: boolean
    given_name?: boolean
    family_name?: boolean
    password_hash?: boolean
    email?: boolean
    disabled?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    auth_source?: boolean
    google_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    display_name?: boolean
    profile_pic?: boolean
    nickname?: boolean
    given_name?: boolean
    family_name?: boolean
    password_hash?: boolean
    email?: boolean
    disabled?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "auth_source" | "google_id" | "createdAt" | "updatedAt" | "display_name" | "profile_pic" | "nickname" | "given_name" | "family_name" | "password_hash" | "email" | "disabled", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assigned_implementers?: boolean | User$assigned_implementersArgs<ExtArgs>
    userRoles?: boolean | User$userRolesArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      assigned_implementers: Prisma.$ImplementerPayload<ExtArgs>[]
      userRoles: Prisma.$UserRolePayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      auth_source: string
      google_id: string | null
      createdAt: Date
      updatedAt: Date
      display_name: string | null
      profile_pic: string | null
      nickname: string | null
      given_name: string | null
      family_name: string | null
      password_hash: string | null
      email: string | null
      disabled: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assigned_implementers<T extends User$assigned_implementersArgs<ExtArgs> = {}>(args?: Subset<T, User$assigned_implementersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userRoles<T extends User$userRolesArgs<ExtArgs> = {}>(args?: Subset<T, User$userRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly auth_source: FieldRef<"User", 'String'>
    readonly google_id: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly display_name: FieldRef<"User", 'String'>
    readonly profile_pic: FieldRef<"User", 'String'>
    readonly nickname: FieldRef<"User", 'String'>
    readonly given_name: FieldRef<"User", 'String'>
    readonly family_name: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly disabled: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.assigned_implementers
   */
  export type User$assigned_implementersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementerInclude<ExtArgs> | null
    where?: ImplementerWhereInput
    orderBy?: ImplementerOrderByWithRelationInput | ImplementerOrderByWithRelationInput[]
    cursor?: ImplementerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImplementerScalarFieldEnum | ImplementerScalarFieldEnum[]
  }

  /**
   * User.userRoles
   */
  export type User$userRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    cursor?: UserRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
  }

  export type RoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    _all: number
  }


  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: string
    name: string
    description: string
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    userRoles?: boolean | Role$userRolesArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userRoles?: boolean | Role$userRolesArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      userRoles: Prisma.$UserRolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userRoles<T extends Role$userRolesArgs<ExtArgs> = {}>(args?: Subset<T, Role$userRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'String'>
    readonly description: FieldRef<"Role", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.userRoles
   */
  export type Role$userRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    cursor?: UserRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model UserRole
   */

  export type AggregateUserRole = {
    _count: UserRoleCountAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  export type UserRoleMinAggregateOutputType = {
    role_id: string | null
    user_id: string | null
    createdAt: Date | null
  }

  export type UserRoleMaxAggregateOutputType = {
    role_id: string | null
    user_id: string | null
    createdAt: Date | null
  }

  export type UserRoleCountAggregateOutputType = {
    role_id: number
    user_id: number
    createdAt: number
    _all: number
  }


  export type UserRoleMinAggregateInputType = {
    role_id?: true
    user_id?: true
    createdAt?: true
  }

  export type UserRoleMaxAggregateInputType = {
    role_id?: true
    user_id?: true
    createdAt?: true
  }

  export type UserRoleCountAggregateInputType = {
    role_id?: true
    user_id?: true
    createdAt?: true
    _all?: true
  }

  export type UserRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRole to aggregate.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRoles
    **/
    _count?: true | UserRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRoleMaxAggregateInputType
  }

  export type GetUserRoleAggregateType<T extends UserRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRole[P]>
      : GetScalarType<T[P], AggregateUserRole[P]>
  }




  export type UserRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithAggregationInput | UserRoleOrderByWithAggregationInput[]
    by: UserRoleScalarFieldEnum[] | UserRoleScalarFieldEnum
    having?: UserRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRoleCountAggregateInputType | true
    _min?: UserRoleMinAggregateInputType
    _max?: UserRoleMaxAggregateInputType
  }

  export type UserRoleGroupByOutputType = {
    role_id: string
    user_id: string
    createdAt: Date
    _count: UserRoleCountAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  type GetUserRoleGroupByPayload<T extends UserRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
            : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
        }
      >
    >


  export type UserRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    user_id?: boolean
    createdAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    user_id?: boolean
    createdAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    user_id?: boolean
    createdAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectScalar = {
    role_id?: boolean
    user_id?: boolean
    createdAt?: boolean
  }

  export type UserRoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"role_id" | "user_id" | "createdAt", ExtArgs["result"]["userRole"]>
  export type UserRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserRoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserRoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRole"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      role_id: string
      user_id: string
      createdAt: Date
    }, ExtArgs["result"]["userRole"]>
    composites: {}
  }

  type UserRoleGetPayload<S extends boolean | null | undefined | UserRoleDefaultArgs> = $Result.GetResult<Prisma.$UserRolePayload, S>

  type UserRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: UserRoleCountAggregateInputType | true
    }

  export interface UserRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRole'], meta: { name: 'UserRole' } }
    /**
     * Find zero or one UserRole that matches the filter.
     * @param {UserRoleFindUniqueArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRoleFindUniqueArgs>(args: SelectSubset<T, UserRoleFindUniqueArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserRole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRoleFindUniqueOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRoleFindFirstArgs>(args?: SelectSubset<T, UserRoleFindFirstArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRoles
     * const userRoles = await prisma.userRole.findMany()
     * 
     * // Get first 10 UserRoles
     * const userRoles = await prisma.userRole.findMany({ take: 10 })
     * 
     * // Only select the `role_id`
     * const userRoleWithRole_idOnly = await prisma.userRole.findMany({ select: { role_id: true } })
     * 
     */
    findMany<T extends UserRoleFindManyArgs>(args?: SelectSubset<T, UserRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserRole.
     * @param {UserRoleCreateArgs} args - Arguments to create a UserRole.
     * @example
     * // Create one UserRole
     * const UserRole = await prisma.userRole.create({
     *   data: {
     *     // ... data to create a UserRole
     *   }
     * })
     * 
     */
    create<T extends UserRoleCreateArgs>(args: SelectSubset<T, UserRoleCreateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserRoles.
     * @param {UserRoleCreateManyArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRole = await prisma.userRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRoleCreateManyArgs>(args?: SelectSubset<T, UserRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserRoles and returns the data saved in the database.
     * @param {UserRoleCreateManyAndReturnArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRole = await prisma.userRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserRoles and only return the `role_id`
     * const userRoleWithRole_idOnly = await prisma.userRole.createManyAndReturn({
     *   select: { role_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, UserRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserRole.
     * @param {UserRoleDeleteArgs} args - Arguments to delete one UserRole.
     * @example
     * // Delete one UserRole
     * const UserRole = await prisma.userRole.delete({
     *   where: {
     *     // ... filter to delete one UserRole
     *   }
     * })
     * 
     */
    delete<T extends UserRoleDeleteArgs>(args: SelectSubset<T, UserRoleDeleteArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserRole.
     * @param {UserRoleUpdateArgs} args - Arguments to update one UserRole.
     * @example
     * // Update one UserRole
     * const userRole = await prisma.userRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRoleUpdateArgs>(args: SelectSubset<T, UserRoleUpdateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserRoles.
     * @param {UserRoleDeleteManyArgs} args - Arguments to filter UserRoles to delete.
     * @example
     * // Delete a few UserRoles
     * const { count } = await prisma.userRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRoleDeleteManyArgs>(args?: SelectSubset<T, UserRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRoles
     * const userRole = await prisma.userRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRoleUpdateManyArgs>(args: SelectSubset<T, UserRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles and returns the data updated in the database.
     * @param {UserRoleUpdateManyAndReturnArgs} args - Arguments to update many UserRoles.
     * @example
     * // Update many UserRoles
     * const userRole = await prisma.userRole.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserRoles and only return the `role_id`
     * const userRoleWithRole_idOnly = await prisma.userRole.updateManyAndReturn({
     *   select: { role_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserRoleUpdateManyAndReturnArgs>(args: SelectSubset<T, UserRoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserRole.
     * @param {UserRoleUpsertArgs} args - Arguments to update or create a UserRole.
     * @example
     * // Update or create a UserRole
     * const userRole = await prisma.userRole.upsert({
     *   create: {
     *     // ... data to create a UserRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRole we want to update
     *   }
     * })
     */
    upsert<T extends UserRoleUpsertArgs>(args: SelectSubset<T, UserRoleUpsertArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleCountArgs} args - Arguments to filter UserRoles to count.
     * @example
     * // Count the number of UserRoles
     * const count = await prisma.userRole.count({
     *   where: {
     *     // ... the filter for the UserRoles we want to count
     *   }
     * })
    **/
    count<T extends UserRoleCountArgs>(
      args?: Subset<T, UserRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserRoleAggregateArgs>(args: Subset<T, UserRoleAggregateArgs>): Prisma.PrismaPromise<GetUserRoleAggregateType<T>>

    /**
     * Group by UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRoleGroupByArgs['orderBy'] }
        : { orderBy?: UserRoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRole model
   */
  readonly fields: UserRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserRole model
   */
  interface UserRoleFieldRefs {
    readonly role_id: FieldRef<"UserRole", 'String'>
    readonly user_id: FieldRef<"UserRole", 'String'>
    readonly createdAt: FieldRef<"UserRole", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserRole findUnique
   */
  export type UserRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * UserRole findUniqueOrThrow
   */
  export type UserRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * UserRole findFirst
   */
  export type UserRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * UserRole findFirstOrThrow
   */
  export type UserRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * UserRole findMany
   */
  export type UserRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * UserRole create
   */
  export type UserRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRole.
     */
    data: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * UserRole createMany
   */
  export type UserRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRoles.
     */
    data: UserRoleCreateManyInput | UserRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserRole createManyAndReturn
   */
  export type UserRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * The data used to create many UserRoles.
     */
    data: UserRoleCreateManyInput | UserRoleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRole update
   */
  export type UserRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRole.
     */
    data: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
    /**
     * Choose, which UserRole to update.
     */
    where: UserRoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * UserRole updateMany
   */
  export type UserRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRoleWhereInput
    /**
     * Limit how many UserRoles to update.
     */
    limit?: number
  }

  /**
   * UserRole updateManyAndReturn
   */
  export type UserRoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRoleWhereInput
    /**
     * Limit how many UserRoles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRole upsert
   */
  export type UserRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRole to update in case it exists.
     */
    where: UserRoleWhereUniqueInput
    /**
     * In case the UserRole found by the `where` argument doesn't exist, create a new UserRole with this data.
     */
    create: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
    /**
     * In case the UserRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * UserRole delete
   */
  export type UserRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter which UserRole to delete.
     */
    where: UserRoleWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * UserRole deleteMany
   */
  export type UserRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoles to delete
     */
    where?: UserRoleWhereInput
    /**
     * Limit how many UserRoles to delete.
     */
    limit?: number
  }

  /**
   * UserRole without action
   */
  export type UserRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
  }


  /**
   * Model FocusArea
   */

  export type AggregateFocusArea = {
    _count: FocusAreaCountAggregateOutputType | null
    _avg: FocusAreaAvgAggregateOutputType | null
    _sum: FocusAreaSumAggregateOutputType | null
    _min: FocusAreaMinAggregateOutputType | null
    _max: FocusAreaMaxAggregateOutputType | null
  }

  export type FocusAreaAvgAggregateOutputType = {
    id: number | null
  }

  export type FocusAreaSumAggregateOutputType = {
    id: number | null
  }

  export type FocusAreaMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type FocusAreaMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type FocusAreaCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type FocusAreaAvgAggregateInputType = {
    id?: true
  }

  export type FocusAreaSumAggregateInputType = {
    id?: true
  }

  export type FocusAreaMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type FocusAreaMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type FocusAreaCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type FocusAreaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FocusArea to aggregate.
     */
    where?: FocusAreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FocusAreas to fetch.
     */
    orderBy?: FocusAreaOrderByWithRelationInput | FocusAreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FocusAreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FocusAreas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FocusAreas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FocusAreas
    **/
    _count?: true | FocusAreaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FocusAreaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FocusAreaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FocusAreaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FocusAreaMaxAggregateInputType
  }

  export type GetFocusAreaAggregateType<T extends FocusAreaAggregateArgs> = {
        [P in keyof T & keyof AggregateFocusArea]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFocusArea[P]>
      : GetScalarType<T[P], AggregateFocusArea[P]>
  }




  export type FocusAreaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FocusAreaWhereInput
    orderBy?: FocusAreaOrderByWithAggregationInput | FocusAreaOrderByWithAggregationInput[]
    by: FocusAreaScalarFieldEnum[] | FocusAreaScalarFieldEnum
    having?: FocusAreaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FocusAreaCountAggregateInputType | true
    _avg?: FocusAreaAvgAggregateInputType
    _sum?: FocusAreaSumAggregateInputType
    _min?: FocusAreaMinAggregateInputType
    _max?: FocusAreaMaxAggregateInputType
  }

  export type FocusAreaGroupByOutputType = {
    id: number
    name: string
    _count: FocusAreaCountAggregateOutputType | null
    _avg: FocusAreaAvgAggregateOutputType | null
    _sum: FocusAreaSumAggregateOutputType | null
    _min: FocusAreaMinAggregateOutputType | null
    _max: FocusAreaMaxAggregateOutputType | null
  }

  type GetFocusAreaGroupByPayload<T extends FocusAreaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FocusAreaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FocusAreaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FocusAreaGroupByOutputType[P]>
            : GetScalarType<T[P], FocusAreaGroupByOutputType[P]>
        }
      >
    >


  export type FocusAreaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    policies?: boolean | FocusArea$policiesArgs<ExtArgs>
    _count?: boolean | FocusAreaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["focusArea"]>

  export type FocusAreaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["focusArea"]>

  export type FocusAreaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["focusArea"]>

  export type FocusAreaSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type FocusAreaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["focusArea"]>
  export type FocusAreaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policies?: boolean | FocusArea$policiesArgs<ExtArgs>
    _count?: boolean | FocusAreaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FocusAreaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FocusAreaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FocusAreaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FocusArea"
    objects: {
      policies: Prisma.$PoliciesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["focusArea"]>
    composites: {}
  }

  type FocusAreaGetPayload<S extends boolean | null | undefined | FocusAreaDefaultArgs> = $Result.GetResult<Prisma.$FocusAreaPayload, S>

  type FocusAreaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FocusAreaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: FocusAreaCountAggregateInputType | true
    }

  export interface FocusAreaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FocusArea'], meta: { name: 'FocusArea' } }
    /**
     * Find zero or one FocusArea that matches the filter.
     * @param {FocusAreaFindUniqueArgs} args - Arguments to find a FocusArea
     * @example
     * // Get one FocusArea
     * const focusArea = await prisma.focusArea.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FocusAreaFindUniqueArgs>(args: SelectSubset<T, FocusAreaFindUniqueArgs<ExtArgs>>): Prisma__FocusAreaClient<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FocusArea that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FocusAreaFindUniqueOrThrowArgs} args - Arguments to find a FocusArea
     * @example
     * // Get one FocusArea
     * const focusArea = await prisma.focusArea.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FocusAreaFindUniqueOrThrowArgs>(args: SelectSubset<T, FocusAreaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FocusAreaClient<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FocusArea that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusAreaFindFirstArgs} args - Arguments to find a FocusArea
     * @example
     * // Get one FocusArea
     * const focusArea = await prisma.focusArea.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FocusAreaFindFirstArgs>(args?: SelectSubset<T, FocusAreaFindFirstArgs<ExtArgs>>): Prisma__FocusAreaClient<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FocusArea that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusAreaFindFirstOrThrowArgs} args - Arguments to find a FocusArea
     * @example
     * // Get one FocusArea
     * const focusArea = await prisma.focusArea.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FocusAreaFindFirstOrThrowArgs>(args?: SelectSubset<T, FocusAreaFindFirstOrThrowArgs<ExtArgs>>): Prisma__FocusAreaClient<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FocusAreas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusAreaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FocusAreas
     * const focusAreas = await prisma.focusArea.findMany()
     * 
     * // Get first 10 FocusAreas
     * const focusAreas = await prisma.focusArea.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const focusAreaWithIdOnly = await prisma.focusArea.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FocusAreaFindManyArgs>(args?: SelectSubset<T, FocusAreaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FocusArea.
     * @param {FocusAreaCreateArgs} args - Arguments to create a FocusArea.
     * @example
     * // Create one FocusArea
     * const FocusArea = await prisma.focusArea.create({
     *   data: {
     *     // ... data to create a FocusArea
     *   }
     * })
     * 
     */
    create<T extends FocusAreaCreateArgs>(args: SelectSubset<T, FocusAreaCreateArgs<ExtArgs>>): Prisma__FocusAreaClient<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FocusAreas.
     * @param {FocusAreaCreateManyArgs} args - Arguments to create many FocusAreas.
     * @example
     * // Create many FocusAreas
     * const focusArea = await prisma.focusArea.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FocusAreaCreateManyArgs>(args?: SelectSubset<T, FocusAreaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FocusAreas and returns the data saved in the database.
     * @param {FocusAreaCreateManyAndReturnArgs} args - Arguments to create many FocusAreas.
     * @example
     * // Create many FocusAreas
     * const focusArea = await prisma.focusArea.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FocusAreas and only return the `id`
     * const focusAreaWithIdOnly = await prisma.focusArea.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FocusAreaCreateManyAndReturnArgs>(args?: SelectSubset<T, FocusAreaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FocusArea.
     * @param {FocusAreaDeleteArgs} args - Arguments to delete one FocusArea.
     * @example
     * // Delete one FocusArea
     * const FocusArea = await prisma.focusArea.delete({
     *   where: {
     *     // ... filter to delete one FocusArea
     *   }
     * })
     * 
     */
    delete<T extends FocusAreaDeleteArgs>(args: SelectSubset<T, FocusAreaDeleteArgs<ExtArgs>>): Prisma__FocusAreaClient<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FocusArea.
     * @param {FocusAreaUpdateArgs} args - Arguments to update one FocusArea.
     * @example
     * // Update one FocusArea
     * const focusArea = await prisma.focusArea.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FocusAreaUpdateArgs>(args: SelectSubset<T, FocusAreaUpdateArgs<ExtArgs>>): Prisma__FocusAreaClient<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FocusAreas.
     * @param {FocusAreaDeleteManyArgs} args - Arguments to filter FocusAreas to delete.
     * @example
     * // Delete a few FocusAreas
     * const { count } = await prisma.focusArea.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FocusAreaDeleteManyArgs>(args?: SelectSubset<T, FocusAreaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FocusAreas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusAreaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FocusAreas
     * const focusArea = await prisma.focusArea.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FocusAreaUpdateManyArgs>(args: SelectSubset<T, FocusAreaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FocusAreas and returns the data updated in the database.
     * @param {FocusAreaUpdateManyAndReturnArgs} args - Arguments to update many FocusAreas.
     * @example
     * // Update many FocusAreas
     * const focusArea = await prisma.focusArea.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FocusAreas and only return the `id`
     * const focusAreaWithIdOnly = await prisma.focusArea.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FocusAreaUpdateManyAndReturnArgs>(args: SelectSubset<T, FocusAreaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FocusArea.
     * @param {FocusAreaUpsertArgs} args - Arguments to update or create a FocusArea.
     * @example
     * // Update or create a FocusArea
     * const focusArea = await prisma.focusArea.upsert({
     *   create: {
     *     // ... data to create a FocusArea
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FocusArea we want to update
     *   }
     * })
     */
    upsert<T extends FocusAreaUpsertArgs>(args: SelectSubset<T, FocusAreaUpsertArgs<ExtArgs>>): Prisma__FocusAreaClient<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FocusAreas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusAreaCountArgs} args - Arguments to filter FocusAreas to count.
     * @example
     * // Count the number of FocusAreas
     * const count = await prisma.focusArea.count({
     *   where: {
     *     // ... the filter for the FocusAreas we want to count
     *   }
     * })
    **/
    count<T extends FocusAreaCountArgs>(
      args?: Subset<T, FocusAreaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FocusAreaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FocusArea.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusAreaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FocusAreaAggregateArgs>(args: Subset<T, FocusAreaAggregateArgs>): Prisma.PrismaPromise<GetFocusAreaAggregateType<T>>

    /**
     * Group by FocusArea.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusAreaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FocusAreaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FocusAreaGroupByArgs['orderBy'] }
        : { orderBy?: FocusAreaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FocusAreaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFocusAreaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FocusArea model
   */
  readonly fields: FocusAreaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FocusArea.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FocusAreaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    policies<T extends FocusArea$policiesArgs<ExtArgs> = {}>(args?: Subset<T, FocusArea$policiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FocusArea model
   */
  interface FocusAreaFieldRefs {
    readonly id: FieldRef<"FocusArea", 'Int'>
    readonly name: FieldRef<"FocusArea", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FocusArea findUnique
   */
  export type FocusAreaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusAreaInclude<ExtArgs> | null
    /**
     * Filter, which FocusArea to fetch.
     */
    where: FocusAreaWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * FocusArea findUniqueOrThrow
   */
  export type FocusAreaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusAreaInclude<ExtArgs> | null
    /**
     * Filter, which FocusArea to fetch.
     */
    where: FocusAreaWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * FocusArea findFirst
   */
  export type FocusAreaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusAreaInclude<ExtArgs> | null
    /**
     * Filter, which FocusArea to fetch.
     */
    where?: FocusAreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FocusAreas to fetch.
     */
    orderBy?: FocusAreaOrderByWithRelationInput | FocusAreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FocusAreas.
     */
    cursor?: FocusAreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FocusAreas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FocusAreas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FocusAreas.
     */
    distinct?: FocusAreaScalarFieldEnum | FocusAreaScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * FocusArea findFirstOrThrow
   */
  export type FocusAreaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusAreaInclude<ExtArgs> | null
    /**
     * Filter, which FocusArea to fetch.
     */
    where?: FocusAreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FocusAreas to fetch.
     */
    orderBy?: FocusAreaOrderByWithRelationInput | FocusAreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FocusAreas.
     */
    cursor?: FocusAreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FocusAreas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FocusAreas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FocusAreas.
     */
    distinct?: FocusAreaScalarFieldEnum | FocusAreaScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * FocusArea findMany
   */
  export type FocusAreaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusAreaInclude<ExtArgs> | null
    /**
     * Filter, which FocusAreas to fetch.
     */
    where?: FocusAreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FocusAreas to fetch.
     */
    orderBy?: FocusAreaOrderByWithRelationInput | FocusAreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FocusAreas.
     */
    cursor?: FocusAreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FocusAreas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FocusAreas.
     */
    skip?: number
    distinct?: FocusAreaScalarFieldEnum | FocusAreaScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * FocusArea create
   */
  export type FocusAreaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusAreaInclude<ExtArgs> | null
    /**
     * The data needed to create a FocusArea.
     */
    data: XOR<FocusAreaCreateInput, FocusAreaUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * FocusArea createMany
   */
  export type FocusAreaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FocusAreas.
     */
    data: FocusAreaCreateManyInput | FocusAreaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FocusArea createManyAndReturn
   */
  export type FocusAreaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * The data used to create many FocusAreas.
     */
    data: FocusAreaCreateManyInput | FocusAreaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FocusArea update
   */
  export type FocusAreaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusAreaInclude<ExtArgs> | null
    /**
     * The data needed to update a FocusArea.
     */
    data: XOR<FocusAreaUpdateInput, FocusAreaUncheckedUpdateInput>
    /**
     * Choose, which FocusArea to update.
     */
    where: FocusAreaWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * FocusArea updateMany
   */
  export type FocusAreaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FocusAreas.
     */
    data: XOR<FocusAreaUpdateManyMutationInput, FocusAreaUncheckedUpdateManyInput>
    /**
     * Filter which FocusAreas to update
     */
    where?: FocusAreaWhereInput
    /**
     * Limit how many FocusAreas to update.
     */
    limit?: number
  }

  /**
   * FocusArea updateManyAndReturn
   */
  export type FocusAreaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * The data used to update FocusAreas.
     */
    data: XOR<FocusAreaUpdateManyMutationInput, FocusAreaUncheckedUpdateManyInput>
    /**
     * Filter which FocusAreas to update
     */
    where?: FocusAreaWhereInput
    /**
     * Limit how many FocusAreas to update.
     */
    limit?: number
  }

  /**
   * FocusArea upsert
   */
  export type FocusAreaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusAreaInclude<ExtArgs> | null
    /**
     * The filter to search for the FocusArea to update in case it exists.
     */
    where: FocusAreaWhereUniqueInput
    /**
     * In case the FocusArea found by the `where` argument doesn't exist, create a new FocusArea with this data.
     */
    create: XOR<FocusAreaCreateInput, FocusAreaUncheckedCreateInput>
    /**
     * In case the FocusArea was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FocusAreaUpdateInput, FocusAreaUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * FocusArea delete
   */
  export type FocusAreaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusAreaInclude<ExtArgs> | null
    /**
     * Filter which FocusArea to delete.
     */
    where: FocusAreaWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * FocusArea deleteMany
   */
  export type FocusAreaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FocusAreas to delete
     */
    where?: FocusAreaWhereInput
    /**
     * Limit how many FocusAreas to delete.
     */
    limit?: number
  }

  /**
   * FocusArea.policies
   */
  export type FocusArea$policiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesInclude<ExtArgs> | null
    where?: PoliciesWhereInput
    orderBy?: PoliciesOrderByWithRelationInput | PoliciesOrderByWithRelationInput[]
    cursor?: PoliciesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PoliciesScalarFieldEnum | PoliciesScalarFieldEnum[]
  }

  /**
   * FocusArea without action
   */
  export type FocusAreaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusArea
     */
    select?: FocusAreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusArea
     */
    omit?: FocusAreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusAreaInclude<ExtArgs> | null
  }


  /**
   * Model Policies
   */

  export type AggregatePolicies = {
    _count: PoliciesCountAggregateOutputType | null
    _avg: PoliciesAvgAggregateOutputType | null
    _sum: PoliciesSumAggregateOutputType | null
    _min: PoliciesMinAggregateOutputType | null
    _max: PoliciesMaxAggregateOutputType | null
  }

  export type PoliciesAvgAggregateOutputType = {
    policy_number: number | null
    focus_area_id: number | null
  }

  export type PoliciesSumAggregateOutputType = {
    policy_number: number | null
    focus_area_id: number | null
  }

  export type PoliciesMinAggregateOutputType = {
    id: string | null
    description: string | null
    policy_number: number | null
    focus_area_id: number | null
  }

  export type PoliciesMaxAggregateOutputType = {
    id: string | null
    description: string | null
    policy_number: number | null
    focus_area_id: number | null
  }

  export type PoliciesCountAggregateOutputType = {
    id: number
    description: number
    policy_number: number
    focus_area_id: number
    _all: number
  }


  export type PoliciesAvgAggregateInputType = {
    policy_number?: true
    focus_area_id?: true
  }

  export type PoliciesSumAggregateInputType = {
    policy_number?: true
    focus_area_id?: true
  }

  export type PoliciesMinAggregateInputType = {
    id?: true
    description?: true
    policy_number?: true
    focus_area_id?: true
  }

  export type PoliciesMaxAggregateInputType = {
    id?: true
    description?: true
    policy_number?: true
    focus_area_id?: true
  }

  export type PoliciesCountAggregateInputType = {
    id?: true
    description?: true
    policy_number?: true
    focus_area_id?: true
    _all?: true
  }

  export type PoliciesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Policies to aggregate.
     */
    where?: PoliciesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PoliciesOrderByWithRelationInput | PoliciesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PoliciesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Policies
    **/
    _count?: true | PoliciesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PoliciesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PoliciesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoliciesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoliciesMaxAggregateInputType
  }

  export type GetPoliciesAggregateType<T extends PoliciesAggregateArgs> = {
        [P in keyof T & keyof AggregatePolicies]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePolicies[P]>
      : GetScalarType<T[P], AggregatePolicies[P]>
  }




  export type PoliciesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoliciesWhereInput
    orderBy?: PoliciesOrderByWithAggregationInput | PoliciesOrderByWithAggregationInput[]
    by: PoliciesScalarFieldEnum[] | PoliciesScalarFieldEnum
    having?: PoliciesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoliciesCountAggregateInputType | true
    _avg?: PoliciesAvgAggregateInputType
    _sum?: PoliciesSumAggregateInputType
    _min?: PoliciesMinAggregateInputType
    _max?: PoliciesMaxAggregateInputType
  }

  export type PoliciesGroupByOutputType = {
    id: string
    description: string
    policy_number: number
    focus_area_id: number
    _count: PoliciesCountAggregateOutputType | null
    _avg: PoliciesAvgAggregateOutputType | null
    _sum: PoliciesSumAggregateOutputType | null
    _min: PoliciesMinAggregateOutputType | null
    _max: PoliciesMaxAggregateOutputType | null
  }

  type GetPoliciesGroupByPayload<T extends PoliciesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoliciesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoliciesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoliciesGroupByOutputType[P]>
            : GetScalarType<T[P], PoliciesGroupByOutputType[P]>
        }
      >
    >


  export type PoliciesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    policy_number?: boolean
    focus_area_id?: boolean
    area?: boolean | FocusAreaDefaultArgs<ExtArgs>
    strategies?: boolean | Policies$strategiesArgs<ExtArgs>
    _count?: boolean | PoliciesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["policies"]>

  export type PoliciesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    policy_number?: boolean
    focus_area_id?: boolean
    area?: boolean | FocusAreaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["policies"]>

  export type PoliciesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    policy_number?: boolean
    focus_area_id?: boolean
    area?: boolean | FocusAreaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["policies"]>

  export type PoliciesSelectScalar = {
    id?: boolean
    description?: boolean
    policy_number?: boolean
    focus_area_id?: boolean
  }

  export type PoliciesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "description" | "policy_number" | "focus_area_id", ExtArgs["result"]["policies"]>
  export type PoliciesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    area?: boolean | FocusAreaDefaultArgs<ExtArgs>
    strategies?: boolean | Policies$strategiesArgs<ExtArgs>
    _count?: boolean | PoliciesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PoliciesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    area?: boolean | FocusAreaDefaultArgs<ExtArgs>
  }
  export type PoliciesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    area?: boolean | FocusAreaDefaultArgs<ExtArgs>
  }

  export type $PoliciesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Policies"
    objects: {
      area: Prisma.$FocusAreaPayload<ExtArgs>
      strategies: Prisma.$StrategyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      description: string
      policy_number: number
      focus_area_id: number
    }, ExtArgs["result"]["policies"]>
    composites: {}
  }

  type PoliciesGetPayload<S extends boolean | null | undefined | PoliciesDefaultArgs> = $Result.GetResult<Prisma.$PoliciesPayload, S>

  type PoliciesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PoliciesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: PoliciesCountAggregateInputType | true
    }

  export interface PoliciesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Policies'], meta: { name: 'Policies' } }
    /**
     * Find zero or one Policies that matches the filter.
     * @param {PoliciesFindUniqueArgs} args - Arguments to find a Policies
     * @example
     * // Get one Policies
     * const policies = await prisma.policies.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PoliciesFindUniqueArgs>(args: SelectSubset<T, PoliciesFindUniqueArgs<ExtArgs>>): Prisma__PoliciesClient<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Policies that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PoliciesFindUniqueOrThrowArgs} args - Arguments to find a Policies
     * @example
     * // Get one Policies
     * const policies = await prisma.policies.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PoliciesFindUniqueOrThrowArgs>(args: SelectSubset<T, PoliciesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PoliciesClient<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Policies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoliciesFindFirstArgs} args - Arguments to find a Policies
     * @example
     * // Get one Policies
     * const policies = await prisma.policies.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PoliciesFindFirstArgs>(args?: SelectSubset<T, PoliciesFindFirstArgs<ExtArgs>>): Prisma__PoliciesClient<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Policies that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoliciesFindFirstOrThrowArgs} args - Arguments to find a Policies
     * @example
     * // Get one Policies
     * const policies = await prisma.policies.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PoliciesFindFirstOrThrowArgs>(args?: SelectSubset<T, PoliciesFindFirstOrThrowArgs<ExtArgs>>): Prisma__PoliciesClient<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Policies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoliciesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Policies
     * const policies = await prisma.policies.findMany()
     * 
     * // Get first 10 Policies
     * const policies = await prisma.policies.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const policiesWithIdOnly = await prisma.policies.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PoliciesFindManyArgs>(args?: SelectSubset<T, PoliciesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Policies.
     * @param {PoliciesCreateArgs} args - Arguments to create a Policies.
     * @example
     * // Create one Policies
     * const Policies = await prisma.policies.create({
     *   data: {
     *     // ... data to create a Policies
     *   }
     * })
     * 
     */
    create<T extends PoliciesCreateArgs>(args: SelectSubset<T, PoliciesCreateArgs<ExtArgs>>): Prisma__PoliciesClient<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Policies.
     * @param {PoliciesCreateManyArgs} args - Arguments to create many Policies.
     * @example
     * // Create many Policies
     * const policies = await prisma.policies.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PoliciesCreateManyArgs>(args?: SelectSubset<T, PoliciesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Policies and returns the data saved in the database.
     * @param {PoliciesCreateManyAndReturnArgs} args - Arguments to create many Policies.
     * @example
     * // Create many Policies
     * const policies = await prisma.policies.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Policies and only return the `id`
     * const policiesWithIdOnly = await prisma.policies.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PoliciesCreateManyAndReturnArgs>(args?: SelectSubset<T, PoliciesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Policies.
     * @param {PoliciesDeleteArgs} args - Arguments to delete one Policies.
     * @example
     * // Delete one Policies
     * const Policies = await prisma.policies.delete({
     *   where: {
     *     // ... filter to delete one Policies
     *   }
     * })
     * 
     */
    delete<T extends PoliciesDeleteArgs>(args: SelectSubset<T, PoliciesDeleteArgs<ExtArgs>>): Prisma__PoliciesClient<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Policies.
     * @param {PoliciesUpdateArgs} args - Arguments to update one Policies.
     * @example
     * // Update one Policies
     * const policies = await prisma.policies.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PoliciesUpdateArgs>(args: SelectSubset<T, PoliciesUpdateArgs<ExtArgs>>): Prisma__PoliciesClient<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Policies.
     * @param {PoliciesDeleteManyArgs} args - Arguments to filter Policies to delete.
     * @example
     * // Delete a few Policies
     * const { count } = await prisma.policies.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PoliciesDeleteManyArgs>(args?: SelectSubset<T, PoliciesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoliciesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Policies
     * const policies = await prisma.policies.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PoliciesUpdateManyArgs>(args: SelectSubset<T, PoliciesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Policies and returns the data updated in the database.
     * @param {PoliciesUpdateManyAndReturnArgs} args - Arguments to update many Policies.
     * @example
     * // Update many Policies
     * const policies = await prisma.policies.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Policies and only return the `id`
     * const policiesWithIdOnly = await prisma.policies.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PoliciesUpdateManyAndReturnArgs>(args: SelectSubset<T, PoliciesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Policies.
     * @param {PoliciesUpsertArgs} args - Arguments to update or create a Policies.
     * @example
     * // Update or create a Policies
     * const policies = await prisma.policies.upsert({
     *   create: {
     *     // ... data to create a Policies
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Policies we want to update
     *   }
     * })
     */
    upsert<T extends PoliciesUpsertArgs>(args: SelectSubset<T, PoliciesUpsertArgs<ExtArgs>>): Prisma__PoliciesClient<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoliciesCountArgs} args - Arguments to filter Policies to count.
     * @example
     * // Count the number of Policies
     * const count = await prisma.policies.count({
     *   where: {
     *     // ... the filter for the Policies we want to count
     *   }
     * })
    **/
    count<T extends PoliciesCountArgs>(
      args?: Subset<T, PoliciesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoliciesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoliciesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PoliciesAggregateArgs>(args: Subset<T, PoliciesAggregateArgs>): Prisma.PrismaPromise<GetPoliciesAggregateType<T>>

    /**
     * Group by Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoliciesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PoliciesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PoliciesGroupByArgs['orderBy'] }
        : { orderBy?: PoliciesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PoliciesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoliciesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Policies model
   */
  readonly fields: PoliciesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Policies.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PoliciesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    area<T extends FocusAreaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FocusAreaDefaultArgs<ExtArgs>>): Prisma__FocusAreaClient<$Result.GetResult<Prisma.$FocusAreaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    strategies<T extends Policies$strategiesArgs<ExtArgs> = {}>(args?: Subset<T, Policies$strategiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Policies model
   */
  interface PoliciesFieldRefs {
    readonly id: FieldRef<"Policies", 'String'>
    readonly description: FieldRef<"Policies", 'String'>
    readonly policy_number: FieldRef<"Policies", 'Int'>
    readonly focus_area_id: FieldRef<"Policies", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Policies findUnique
   */
  export type PoliciesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesInclude<ExtArgs> | null
    /**
     * Filter, which Policies to fetch.
     */
    where: PoliciesWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Policies findUniqueOrThrow
   */
  export type PoliciesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesInclude<ExtArgs> | null
    /**
     * Filter, which Policies to fetch.
     */
    where: PoliciesWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Policies findFirst
   */
  export type PoliciesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesInclude<ExtArgs> | null
    /**
     * Filter, which Policies to fetch.
     */
    where?: PoliciesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PoliciesOrderByWithRelationInput | PoliciesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Policies.
     */
    cursor?: PoliciesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Policies.
     */
    distinct?: PoliciesScalarFieldEnum | PoliciesScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Policies findFirstOrThrow
   */
  export type PoliciesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesInclude<ExtArgs> | null
    /**
     * Filter, which Policies to fetch.
     */
    where?: PoliciesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PoliciesOrderByWithRelationInput | PoliciesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Policies.
     */
    cursor?: PoliciesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Policies.
     */
    distinct?: PoliciesScalarFieldEnum | PoliciesScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Policies findMany
   */
  export type PoliciesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesInclude<ExtArgs> | null
    /**
     * Filter, which Policies to fetch.
     */
    where?: PoliciesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PoliciesOrderByWithRelationInput | PoliciesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Policies.
     */
    cursor?: PoliciesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    distinct?: PoliciesScalarFieldEnum | PoliciesScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Policies create
   */
  export type PoliciesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesInclude<ExtArgs> | null
    /**
     * The data needed to create a Policies.
     */
    data: XOR<PoliciesCreateInput, PoliciesUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Policies createMany
   */
  export type PoliciesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Policies.
     */
    data: PoliciesCreateManyInput | PoliciesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Policies createManyAndReturn
   */
  export type PoliciesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * The data used to create many Policies.
     */
    data: PoliciesCreateManyInput | PoliciesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Policies update
   */
  export type PoliciesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesInclude<ExtArgs> | null
    /**
     * The data needed to update a Policies.
     */
    data: XOR<PoliciesUpdateInput, PoliciesUncheckedUpdateInput>
    /**
     * Choose, which Policies to update.
     */
    where: PoliciesWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Policies updateMany
   */
  export type PoliciesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Policies.
     */
    data: XOR<PoliciesUpdateManyMutationInput, PoliciesUncheckedUpdateManyInput>
    /**
     * Filter which Policies to update
     */
    where?: PoliciesWhereInput
    /**
     * Limit how many Policies to update.
     */
    limit?: number
  }

  /**
   * Policies updateManyAndReturn
   */
  export type PoliciesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * The data used to update Policies.
     */
    data: XOR<PoliciesUpdateManyMutationInput, PoliciesUncheckedUpdateManyInput>
    /**
     * Filter which Policies to update
     */
    where?: PoliciesWhereInput
    /**
     * Limit how many Policies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Policies upsert
   */
  export type PoliciesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesInclude<ExtArgs> | null
    /**
     * The filter to search for the Policies to update in case it exists.
     */
    where: PoliciesWhereUniqueInput
    /**
     * In case the Policies found by the `where` argument doesn't exist, create a new Policies with this data.
     */
    create: XOR<PoliciesCreateInput, PoliciesUncheckedCreateInput>
    /**
     * In case the Policies was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PoliciesUpdateInput, PoliciesUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Policies delete
   */
  export type PoliciesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesInclude<ExtArgs> | null
    /**
     * Filter which Policies to delete.
     */
    where: PoliciesWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Policies deleteMany
   */
  export type PoliciesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Policies to delete
     */
    where?: PoliciesWhereInput
    /**
     * Limit how many Policies to delete.
     */
    limit?: number
  }

  /**
   * Policies.strategies
   */
  export type Policies$strategiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    where?: StrategyWhereInput
    orderBy?: StrategyOrderByWithRelationInput | StrategyOrderByWithRelationInput[]
    cursor?: StrategyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StrategyScalarFieldEnum | StrategyScalarFieldEnum[]
  }

  /**
   * Policies without action
   */
  export type PoliciesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policies
     */
    select?: PoliciesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policies
     */
    omit?: PoliciesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoliciesInclude<ExtArgs> | null
  }


  /**
   * Model TimelineOptions
   */

  export type AggregateTimelineOptions = {
    _count: TimelineOptionsCountAggregateOutputType | null
    _avg: TimelineOptionsAvgAggregateOutputType | null
    _sum: TimelineOptionsSumAggregateOutputType | null
    _min: TimelineOptionsMinAggregateOutputType | null
    _max: TimelineOptionsMaxAggregateOutputType | null
  }

  export type TimelineOptionsAvgAggregateOutputType = {
    id: number | null
  }

  export type TimelineOptionsSumAggregateOutputType = {
    id: number | null
  }

  export type TimelineOptionsMinAggregateOutputType = {
    id: number | null
    title: string | null
  }

  export type TimelineOptionsMaxAggregateOutputType = {
    id: number | null
    title: string | null
  }

  export type TimelineOptionsCountAggregateOutputType = {
    id: number
    title: number
    _all: number
  }


  export type TimelineOptionsAvgAggregateInputType = {
    id?: true
  }

  export type TimelineOptionsSumAggregateInputType = {
    id?: true
  }

  export type TimelineOptionsMinAggregateInputType = {
    id?: true
    title?: true
  }

  export type TimelineOptionsMaxAggregateInputType = {
    id?: true
    title?: true
  }

  export type TimelineOptionsCountAggregateInputType = {
    id?: true
    title?: true
    _all?: true
  }

  export type TimelineOptionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineOptions to aggregate.
     */
    where?: TimelineOptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineOptions to fetch.
     */
    orderBy?: TimelineOptionsOrderByWithRelationInput | TimelineOptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimelineOptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimelineOptions
    **/
    _count?: true | TimelineOptionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimelineOptionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimelineOptionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimelineOptionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimelineOptionsMaxAggregateInputType
  }

  export type GetTimelineOptionsAggregateType<T extends TimelineOptionsAggregateArgs> = {
        [P in keyof T & keyof AggregateTimelineOptions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimelineOptions[P]>
      : GetScalarType<T[P], AggregateTimelineOptions[P]>
  }




  export type TimelineOptionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimelineOptionsWhereInput
    orderBy?: TimelineOptionsOrderByWithAggregationInput | TimelineOptionsOrderByWithAggregationInput[]
    by: TimelineOptionsScalarFieldEnum[] | TimelineOptionsScalarFieldEnum
    having?: TimelineOptionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimelineOptionsCountAggregateInputType | true
    _avg?: TimelineOptionsAvgAggregateInputType
    _sum?: TimelineOptionsSumAggregateInputType
    _min?: TimelineOptionsMinAggregateInputType
    _max?: TimelineOptionsMaxAggregateInputType
  }

  export type TimelineOptionsGroupByOutputType = {
    id: number
    title: string
    _count: TimelineOptionsCountAggregateOutputType | null
    _avg: TimelineOptionsAvgAggregateOutputType | null
    _sum: TimelineOptionsSumAggregateOutputType | null
    _min: TimelineOptionsMinAggregateOutputType | null
    _max: TimelineOptionsMaxAggregateOutputType | null
  }

  type GetTimelineOptionsGroupByPayload<T extends TimelineOptionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimelineOptionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimelineOptionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimelineOptionsGroupByOutputType[P]>
            : GetScalarType<T[P], TimelineOptionsGroupByOutputType[P]>
        }
      >
    >


  export type TimelineOptionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    strategies?: boolean | TimelineOptions$strategiesArgs<ExtArgs>
    _count?: boolean | TimelineOptionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timelineOptions"]>

  export type TimelineOptionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
  }, ExtArgs["result"]["timelineOptions"]>

  export type TimelineOptionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
  }, ExtArgs["result"]["timelineOptions"]>

  export type TimelineOptionsSelectScalar = {
    id?: boolean
    title?: boolean
  }

  export type TimelineOptionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title", ExtArgs["result"]["timelineOptions"]>
  export type TimelineOptionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strategies?: boolean | TimelineOptions$strategiesArgs<ExtArgs>
    _count?: boolean | TimelineOptionsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TimelineOptionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TimelineOptionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TimelineOptionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimelineOptions"
    objects: {
      strategies: Prisma.$StrategyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
    }, ExtArgs["result"]["timelineOptions"]>
    composites: {}
  }

  type TimelineOptionsGetPayload<S extends boolean | null | undefined | TimelineOptionsDefaultArgs> = $Result.GetResult<Prisma.$TimelineOptionsPayload, S>

  type TimelineOptionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimelineOptionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: TimelineOptionsCountAggregateInputType | true
    }

  export interface TimelineOptionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimelineOptions'], meta: { name: 'TimelineOptions' } }
    /**
     * Find zero or one TimelineOptions that matches the filter.
     * @param {TimelineOptionsFindUniqueArgs} args - Arguments to find a TimelineOptions
     * @example
     * // Get one TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimelineOptionsFindUniqueArgs>(args: SelectSubset<T, TimelineOptionsFindUniqueArgs<ExtArgs>>): Prisma__TimelineOptionsClient<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimelineOptions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimelineOptionsFindUniqueOrThrowArgs} args - Arguments to find a TimelineOptions
     * @example
     * // Get one TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimelineOptionsFindUniqueOrThrowArgs>(args: SelectSubset<T, TimelineOptionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimelineOptionsClient<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimelineOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineOptionsFindFirstArgs} args - Arguments to find a TimelineOptions
     * @example
     * // Get one TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimelineOptionsFindFirstArgs>(args?: SelectSubset<T, TimelineOptionsFindFirstArgs<ExtArgs>>): Prisma__TimelineOptionsClient<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimelineOptions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineOptionsFindFirstOrThrowArgs} args - Arguments to find a TimelineOptions
     * @example
     * // Get one TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimelineOptionsFindFirstOrThrowArgs>(args?: SelectSubset<T, TimelineOptionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimelineOptionsClient<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimelineOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineOptionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.findMany()
     * 
     * // Get first 10 TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timelineOptionsWithIdOnly = await prisma.timelineOptions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimelineOptionsFindManyArgs>(args?: SelectSubset<T, TimelineOptionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimelineOptions.
     * @param {TimelineOptionsCreateArgs} args - Arguments to create a TimelineOptions.
     * @example
     * // Create one TimelineOptions
     * const TimelineOptions = await prisma.timelineOptions.create({
     *   data: {
     *     // ... data to create a TimelineOptions
     *   }
     * })
     * 
     */
    create<T extends TimelineOptionsCreateArgs>(args: SelectSubset<T, TimelineOptionsCreateArgs<ExtArgs>>): Prisma__TimelineOptionsClient<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimelineOptions.
     * @param {TimelineOptionsCreateManyArgs} args - Arguments to create many TimelineOptions.
     * @example
     * // Create many TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimelineOptionsCreateManyArgs>(args?: SelectSubset<T, TimelineOptionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimelineOptions and returns the data saved in the database.
     * @param {TimelineOptionsCreateManyAndReturnArgs} args - Arguments to create many TimelineOptions.
     * @example
     * // Create many TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimelineOptions and only return the `id`
     * const timelineOptionsWithIdOnly = await prisma.timelineOptions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimelineOptionsCreateManyAndReturnArgs>(args?: SelectSubset<T, TimelineOptionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimelineOptions.
     * @param {TimelineOptionsDeleteArgs} args - Arguments to delete one TimelineOptions.
     * @example
     * // Delete one TimelineOptions
     * const TimelineOptions = await prisma.timelineOptions.delete({
     *   where: {
     *     // ... filter to delete one TimelineOptions
     *   }
     * })
     * 
     */
    delete<T extends TimelineOptionsDeleteArgs>(args: SelectSubset<T, TimelineOptionsDeleteArgs<ExtArgs>>): Prisma__TimelineOptionsClient<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimelineOptions.
     * @param {TimelineOptionsUpdateArgs} args - Arguments to update one TimelineOptions.
     * @example
     * // Update one TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimelineOptionsUpdateArgs>(args: SelectSubset<T, TimelineOptionsUpdateArgs<ExtArgs>>): Prisma__TimelineOptionsClient<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimelineOptions.
     * @param {TimelineOptionsDeleteManyArgs} args - Arguments to filter TimelineOptions to delete.
     * @example
     * // Delete a few TimelineOptions
     * const { count } = await prisma.timelineOptions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimelineOptionsDeleteManyArgs>(args?: SelectSubset<T, TimelineOptionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimelineOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineOptionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimelineOptionsUpdateManyArgs>(args: SelectSubset<T, TimelineOptionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimelineOptions and returns the data updated in the database.
     * @param {TimelineOptionsUpdateManyAndReturnArgs} args - Arguments to update many TimelineOptions.
     * @example
     * // Update many TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimelineOptions and only return the `id`
     * const timelineOptionsWithIdOnly = await prisma.timelineOptions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimelineOptionsUpdateManyAndReturnArgs>(args: SelectSubset<T, TimelineOptionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimelineOptions.
     * @param {TimelineOptionsUpsertArgs} args - Arguments to update or create a TimelineOptions.
     * @example
     * // Update or create a TimelineOptions
     * const timelineOptions = await prisma.timelineOptions.upsert({
     *   create: {
     *     // ... data to create a TimelineOptions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimelineOptions we want to update
     *   }
     * })
     */
    upsert<T extends TimelineOptionsUpsertArgs>(args: SelectSubset<T, TimelineOptionsUpsertArgs<ExtArgs>>): Prisma__TimelineOptionsClient<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimelineOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineOptionsCountArgs} args - Arguments to filter TimelineOptions to count.
     * @example
     * // Count the number of TimelineOptions
     * const count = await prisma.timelineOptions.count({
     *   where: {
     *     // ... the filter for the TimelineOptions we want to count
     *   }
     * })
    **/
    count<T extends TimelineOptionsCountArgs>(
      args?: Subset<T, TimelineOptionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimelineOptionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimelineOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineOptionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimelineOptionsAggregateArgs>(args: Subset<T, TimelineOptionsAggregateArgs>): Prisma.PrismaPromise<GetTimelineOptionsAggregateType<T>>

    /**
     * Group by TimelineOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineOptionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimelineOptionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimelineOptionsGroupByArgs['orderBy'] }
        : { orderBy?: TimelineOptionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimelineOptionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimelineOptionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimelineOptions model
   */
  readonly fields: TimelineOptionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimelineOptions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimelineOptionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    strategies<T extends TimelineOptions$strategiesArgs<ExtArgs> = {}>(args?: Subset<T, TimelineOptions$strategiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimelineOptions model
   */
  interface TimelineOptionsFieldRefs {
    readonly id: FieldRef<"TimelineOptions", 'Int'>
    readonly title: FieldRef<"TimelineOptions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TimelineOptions findUnique
   */
  export type TimelineOptionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineOptionsInclude<ExtArgs> | null
    /**
     * Filter, which TimelineOptions to fetch.
     */
    where: TimelineOptionsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * TimelineOptions findUniqueOrThrow
   */
  export type TimelineOptionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineOptionsInclude<ExtArgs> | null
    /**
     * Filter, which TimelineOptions to fetch.
     */
    where: TimelineOptionsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * TimelineOptions findFirst
   */
  export type TimelineOptionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineOptionsInclude<ExtArgs> | null
    /**
     * Filter, which TimelineOptions to fetch.
     */
    where?: TimelineOptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineOptions to fetch.
     */
    orderBy?: TimelineOptionsOrderByWithRelationInput | TimelineOptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineOptions.
     */
    cursor?: TimelineOptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineOptions.
     */
    distinct?: TimelineOptionsScalarFieldEnum | TimelineOptionsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * TimelineOptions findFirstOrThrow
   */
  export type TimelineOptionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineOptionsInclude<ExtArgs> | null
    /**
     * Filter, which TimelineOptions to fetch.
     */
    where?: TimelineOptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineOptions to fetch.
     */
    orderBy?: TimelineOptionsOrderByWithRelationInput | TimelineOptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineOptions.
     */
    cursor?: TimelineOptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineOptions.
     */
    distinct?: TimelineOptionsScalarFieldEnum | TimelineOptionsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * TimelineOptions findMany
   */
  export type TimelineOptionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineOptionsInclude<ExtArgs> | null
    /**
     * Filter, which TimelineOptions to fetch.
     */
    where?: TimelineOptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineOptions to fetch.
     */
    orderBy?: TimelineOptionsOrderByWithRelationInput | TimelineOptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimelineOptions.
     */
    cursor?: TimelineOptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineOptions.
     */
    skip?: number
    distinct?: TimelineOptionsScalarFieldEnum | TimelineOptionsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * TimelineOptions create
   */
  export type TimelineOptionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineOptionsInclude<ExtArgs> | null
    /**
     * The data needed to create a TimelineOptions.
     */
    data: XOR<TimelineOptionsCreateInput, TimelineOptionsUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * TimelineOptions createMany
   */
  export type TimelineOptionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimelineOptions.
     */
    data: TimelineOptionsCreateManyInput | TimelineOptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimelineOptions createManyAndReturn
   */
  export type TimelineOptionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * The data used to create many TimelineOptions.
     */
    data: TimelineOptionsCreateManyInput | TimelineOptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimelineOptions update
   */
  export type TimelineOptionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineOptionsInclude<ExtArgs> | null
    /**
     * The data needed to update a TimelineOptions.
     */
    data: XOR<TimelineOptionsUpdateInput, TimelineOptionsUncheckedUpdateInput>
    /**
     * Choose, which TimelineOptions to update.
     */
    where: TimelineOptionsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * TimelineOptions updateMany
   */
  export type TimelineOptionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimelineOptions.
     */
    data: XOR<TimelineOptionsUpdateManyMutationInput, TimelineOptionsUncheckedUpdateManyInput>
    /**
     * Filter which TimelineOptions to update
     */
    where?: TimelineOptionsWhereInput
    /**
     * Limit how many TimelineOptions to update.
     */
    limit?: number
  }

  /**
   * TimelineOptions updateManyAndReturn
   */
  export type TimelineOptionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * The data used to update TimelineOptions.
     */
    data: XOR<TimelineOptionsUpdateManyMutationInput, TimelineOptionsUncheckedUpdateManyInput>
    /**
     * Filter which TimelineOptions to update
     */
    where?: TimelineOptionsWhereInput
    /**
     * Limit how many TimelineOptions to update.
     */
    limit?: number
  }

  /**
   * TimelineOptions upsert
   */
  export type TimelineOptionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineOptionsInclude<ExtArgs> | null
    /**
     * The filter to search for the TimelineOptions to update in case it exists.
     */
    where: TimelineOptionsWhereUniqueInput
    /**
     * In case the TimelineOptions found by the `where` argument doesn't exist, create a new TimelineOptions with this data.
     */
    create: XOR<TimelineOptionsCreateInput, TimelineOptionsUncheckedCreateInput>
    /**
     * In case the TimelineOptions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimelineOptionsUpdateInput, TimelineOptionsUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * TimelineOptions delete
   */
  export type TimelineOptionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineOptionsInclude<ExtArgs> | null
    /**
     * Filter which TimelineOptions to delete.
     */
    where: TimelineOptionsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * TimelineOptions deleteMany
   */
  export type TimelineOptionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineOptions to delete
     */
    where?: TimelineOptionsWhereInput
    /**
     * Limit how many TimelineOptions to delete.
     */
    limit?: number
  }

  /**
   * TimelineOptions.strategies
   */
  export type TimelineOptions$strategiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    where?: StrategyWhereInput
    orderBy?: StrategyOrderByWithRelationInput | StrategyOrderByWithRelationInput[]
    cursor?: StrategyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StrategyScalarFieldEnum | StrategyScalarFieldEnum[]
  }

  /**
   * TimelineOptions without action
   */
  export type TimelineOptionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineOptions
     */
    select?: TimelineOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineOptions
     */
    omit?: TimelineOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineOptionsInclude<ExtArgs> | null
  }


  /**
   * Model StatusOptions
   */

  export type AggregateStatusOptions = {
    _count: StatusOptionsCountAggregateOutputType | null
    _avg: StatusOptionsAvgAggregateOutputType | null
    _sum: StatusOptionsSumAggregateOutputType | null
    _min: StatusOptionsMinAggregateOutputType | null
    _max: StatusOptionsMaxAggregateOutputType | null
  }

  export type StatusOptionsAvgAggregateOutputType = {
    id: number | null
  }

  export type StatusOptionsSumAggregateOutputType = {
    id: number | null
  }

  export type StatusOptionsMinAggregateOutputType = {
    id: number | null
    title: string | null
  }

  export type StatusOptionsMaxAggregateOutputType = {
    id: number | null
    title: string | null
  }

  export type StatusOptionsCountAggregateOutputType = {
    id: number
    title: number
    _all: number
  }


  export type StatusOptionsAvgAggregateInputType = {
    id?: true
  }

  export type StatusOptionsSumAggregateInputType = {
    id?: true
  }

  export type StatusOptionsMinAggregateInputType = {
    id?: true
    title?: true
  }

  export type StatusOptionsMaxAggregateInputType = {
    id?: true
    title?: true
  }

  export type StatusOptionsCountAggregateInputType = {
    id?: true
    title?: true
    _all?: true
  }

  export type StatusOptionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatusOptions to aggregate.
     */
    where?: StatusOptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusOptions to fetch.
     */
    orderBy?: StatusOptionsOrderByWithRelationInput | StatusOptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StatusOptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StatusOptions
    **/
    _count?: true | StatusOptionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StatusOptionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StatusOptionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatusOptionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatusOptionsMaxAggregateInputType
  }

  export type GetStatusOptionsAggregateType<T extends StatusOptionsAggregateArgs> = {
        [P in keyof T & keyof AggregateStatusOptions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatusOptions[P]>
      : GetScalarType<T[P], AggregateStatusOptions[P]>
  }




  export type StatusOptionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatusOptionsWhereInput
    orderBy?: StatusOptionsOrderByWithAggregationInput | StatusOptionsOrderByWithAggregationInput[]
    by: StatusOptionsScalarFieldEnum[] | StatusOptionsScalarFieldEnum
    having?: StatusOptionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatusOptionsCountAggregateInputType | true
    _avg?: StatusOptionsAvgAggregateInputType
    _sum?: StatusOptionsSumAggregateInputType
    _min?: StatusOptionsMinAggregateInputType
    _max?: StatusOptionsMaxAggregateInputType
  }

  export type StatusOptionsGroupByOutputType = {
    id: number
    title: string
    _count: StatusOptionsCountAggregateOutputType | null
    _avg: StatusOptionsAvgAggregateOutputType | null
    _sum: StatusOptionsSumAggregateOutputType | null
    _min: StatusOptionsMinAggregateOutputType | null
    _max: StatusOptionsMaxAggregateOutputType | null
  }

  type GetStatusOptionsGroupByPayload<T extends StatusOptionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatusOptionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatusOptionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatusOptionsGroupByOutputType[P]>
            : GetScalarType<T[P], StatusOptionsGroupByOutputType[P]>
        }
      >
    >


  export type StatusOptionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    strategies?: boolean | StatusOptions$strategiesArgs<ExtArgs>
    _count?: boolean | StatusOptionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statusOptions"]>

  export type StatusOptionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
  }, ExtArgs["result"]["statusOptions"]>

  export type StatusOptionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
  }, ExtArgs["result"]["statusOptions"]>

  export type StatusOptionsSelectScalar = {
    id?: boolean
    title?: boolean
  }

  export type StatusOptionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title", ExtArgs["result"]["statusOptions"]>
  export type StatusOptionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strategies?: boolean | StatusOptions$strategiesArgs<ExtArgs>
    _count?: boolean | StatusOptionsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StatusOptionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StatusOptionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StatusOptionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StatusOptions"
    objects: {
      strategies: Prisma.$StrategyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
    }, ExtArgs["result"]["statusOptions"]>
    composites: {}
  }

  type StatusOptionsGetPayload<S extends boolean | null | undefined | StatusOptionsDefaultArgs> = $Result.GetResult<Prisma.$StatusOptionsPayload, S>

  type StatusOptionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StatusOptionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: StatusOptionsCountAggregateInputType | true
    }

  export interface StatusOptionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StatusOptions'], meta: { name: 'StatusOptions' } }
    /**
     * Find zero or one StatusOptions that matches the filter.
     * @param {StatusOptionsFindUniqueArgs} args - Arguments to find a StatusOptions
     * @example
     * // Get one StatusOptions
     * const statusOptions = await prisma.statusOptions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatusOptionsFindUniqueArgs>(args: SelectSubset<T, StatusOptionsFindUniqueArgs<ExtArgs>>): Prisma__StatusOptionsClient<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StatusOptions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StatusOptionsFindUniqueOrThrowArgs} args - Arguments to find a StatusOptions
     * @example
     * // Get one StatusOptions
     * const statusOptions = await prisma.statusOptions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatusOptionsFindUniqueOrThrowArgs>(args: SelectSubset<T, StatusOptionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StatusOptionsClient<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StatusOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusOptionsFindFirstArgs} args - Arguments to find a StatusOptions
     * @example
     * // Get one StatusOptions
     * const statusOptions = await prisma.statusOptions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatusOptionsFindFirstArgs>(args?: SelectSubset<T, StatusOptionsFindFirstArgs<ExtArgs>>): Prisma__StatusOptionsClient<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StatusOptions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusOptionsFindFirstOrThrowArgs} args - Arguments to find a StatusOptions
     * @example
     * // Get one StatusOptions
     * const statusOptions = await prisma.statusOptions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatusOptionsFindFirstOrThrowArgs>(args?: SelectSubset<T, StatusOptionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__StatusOptionsClient<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StatusOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusOptionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StatusOptions
     * const statusOptions = await prisma.statusOptions.findMany()
     * 
     * // Get first 10 StatusOptions
     * const statusOptions = await prisma.statusOptions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const statusOptionsWithIdOnly = await prisma.statusOptions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StatusOptionsFindManyArgs>(args?: SelectSubset<T, StatusOptionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StatusOptions.
     * @param {StatusOptionsCreateArgs} args - Arguments to create a StatusOptions.
     * @example
     * // Create one StatusOptions
     * const StatusOptions = await prisma.statusOptions.create({
     *   data: {
     *     // ... data to create a StatusOptions
     *   }
     * })
     * 
     */
    create<T extends StatusOptionsCreateArgs>(args: SelectSubset<T, StatusOptionsCreateArgs<ExtArgs>>): Prisma__StatusOptionsClient<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StatusOptions.
     * @param {StatusOptionsCreateManyArgs} args - Arguments to create many StatusOptions.
     * @example
     * // Create many StatusOptions
     * const statusOptions = await prisma.statusOptions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StatusOptionsCreateManyArgs>(args?: SelectSubset<T, StatusOptionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StatusOptions and returns the data saved in the database.
     * @param {StatusOptionsCreateManyAndReturnArgs} args - Arguments to create many StatusOptions.
     * @example
     * // Create many StatusOptions
     * const statusOptions = await prisma.statusOptions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StatusOptions and only return the `id`
     * const statusOptionsWithIdOnly = await prisma.statusOptions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StatusOptionsCreateManyAndReturnArgs>(args?: SelectSubset<T, StatusOptionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StatusOptions.
     * @param {StatusOptionsDeleteArgs} args - Arguments to delete one StatusOptions.
     * @example
     * // Delete one StatusOptions
     * const StatusOptions = await prisma.statusOptions.delete({
     *   where: {
     *     // ... filter to delete one StatusOptions
     *   }
     * })
     * 
     */
    delete<T extends StatusOptionsDeleteArgs>(args: SelectSubset<T, StatusOptionsDeleteArgs<ExtArgs>>): Prisma__StatusOptionsClient<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StatusOptions.
     * @param {StatusOptionsUpdateArgs} args - Arguments to update one StatusOptions.
     * @example
     * // Update one StatusOptions
     * const statusOptions = await prisma.statusOptions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StatusOptionsUpdateArgs>(args: SelectSubset<T, StatusOptionsUpdateArgs<ExtArgs>>): Prisma__StatusOptionsClient<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StatusOptions.
     * @param {StatusOptionsDeleteManyArgs} args - Arguments to filter StatusOptions to delete.
     * @example
     * // Delete a few StatusOptions
     * const { count } = await prisma.statusOptions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StatusOptionsDeleteManyArgs>(args?: SelectSubset<T, StatusOptionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StatusOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusOptionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StatusOptions
     * const statusOptions = await prisma.statusOptions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StatusOptionsUpdateManyArgs>(args: SelectSubset<T, StatusOptionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StatusOptions and returns the data updated in the database.
     * @param {StatusOptionsUpdateManyAndReturnArgs} args - Arguments to update many StatusOptions.
     * @example
     * // Update many StatusOptions
     * const statusOptions = await prisma.statusOptions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StatusOptions and only return the `id`
     * const statusOptionsWithIdOnly = await prisma.statusOptions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StatusOptionsUpdateManyAndReturnArgs>(args: SelectSubset<T, StatusOptionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StatusOptions.
     * @param {StatusOptionsUpsertArgs} args - Arguments to update or create a StatusOptions.
     * @example
     * // Update or create a StatusOptions
     * const statusOptions = await prisma.statusOptions.upsert({
     *   create: {
     *     // ... data to create a StatusOptions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StatusOptions we want to update
     *   }
     * })
     */
    upsert<T extends StatusOptionsUpsertArgs>(args: SelectSubset<T, StatusOptionsUpsertArgs<ExtArgs>>): Prisma__StatusOptionsClient<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StatusOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusOptionsCountArgs} args - Arguments to filter StatusOptions to count.
     * @example
     * // Count the number of StatusOptions
     * const count = await prisma.statusOptions.count({
     *   where: {
     *     // ... the filter for the StatusOptions we want to count
     *   }
     * })
    **/
    count<T extends StatusOptionsCountArgs>(
      args?: Subset<T, StatusOptionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatusOptionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StatusOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusOptionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StatusOptionsAggregateArgs>(args: Subset<T, StatusOptionsAggregateArgs>): Prisma.PrismaPromise<GetStatusOptionsAggregateType<T>>

    /**
     * Group by StatusOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusOptionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StatusOptionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StatusOptionsGroupByArgs['orderBy'] }
        : { orderBy?: StatusOptionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StatusOptionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatusOptionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StatusOptions model
   */
  readonly fields: StatusOptionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StatusOptions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatusOptionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    strategies<T extends StatusOptions$strategiesArgs<ExtArgs> = {}>(args?: Subset<T, StatusOptions$strategiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StatusOptions model
   */
  interface StatusOptionsFieldRefs {
    readonly id: FieldRef<"StatusOptions", 'Int'>
    readonly title: FieldRef<"StatusOptions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StatusOptions findUnique
   */
  export type StatusOptionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusOptionsInclude<ExtArgs> | null
    /**
     * Filter, which StatusOptions to fetch.
     */
    where: StatusOptionsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StatusOptions findUniqueOrThrow
   */
  export type StatusOptionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusOptionsInclude<ExtArgs> | null
    /**
     * Filter, which StatusOptions to fetch.
     */
    where: StatusOptionsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StatusOptions findFirst
   */
  export type StatusOptionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusOptionsInclude<ExtArgs> | null
    /**
     * Filter, which StatusOptions to fetch.
     */
    where?: StatusOptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusOptions to fetch.
     */
    orderBy?: StatusOptionsOrderByWithRelationInput | StatusOptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatusOptions.
     */
    cursor?: StatusOptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatusOptions.
     */
    distinct?: StatusOptionsScalarFieldEnum | StatusOptionsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StatusOptions findFirstOrThrow
   */
  export type StatusOptionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusOptionsInclude<ExtArgs> | null
    /**
     * Filter, which StatusOptions to fetch.
     */
    where?: StatusOptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusOptions to fetch.
     */
    orderBy?: StatusOptionsOrderByWithRelationInput | StatusOptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatusOptions.
     */
    cursor?: StatusOptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatusOptions.
     */
    distinct?: StatusOptionsScalarFieldEnum | StatusOptionsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StatusOptions findMany
   */
  export type StatusOptionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusOptionsInclude<ExtArgs> | null
    /**
     * Filter, which StatusOptions to fetch.
     */
    where?: StatusOptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusOptions to fetch.
     */
    orderBy?: StatusOptionsOrderByWithRelationInput | StatusOptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StatusOptions.
     */
    cursor?: StatusOptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusOptions.
     */
    skip?: number
    distinct?: StatusOptionsScalarFieldEnum | StatusOptionsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StatusOptions create
   */
  export type StatusOptionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusOptionsInclude<ExtArgs> | null
    /**
     * The data needed to create a StatusOptions.
     */
    data: XOR<StatusOptionsCreateInput, StatusOptionsUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StatusOptions createMany
   */
  export type StatusOptionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StatusOptions.
     */
    data: StatusOptionsCreateManyInput | StatusOptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StatusOptions createManyAndReturn
   */
  export type StatusOptionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * The data used to create many StatusOptions.
     */
    data: StatusOptionsCreateManyInput | StatusOptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StatusOptions update
   */
  export type StatusOptionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusOptionsInclude<ExtArgs> | null
    /**
     * The data needed to update a StatusOptions.
     */
    data: XOR<StatusOptionsUpdateInput, StatusOptionsUncheckedUpdateInput>
    /**
     * Choose, which StatusOptions to update.
     */
    where: StatusOptionsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StatusOptions updateMany
   */
  export type StatusOptionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StatusOptions.
     */
    data: XOR<StatusOptionsUpdateManyMutationInput, StatusOptionsUncheckedUpdateManyInput>
    /**
     * Filter which StatusOptions to update
     */
    where?: StatusOptionsWhereInput
    /**
     * Limit how many StatusOptions to update.
     */
    limit?: number
  }

  /**
   * StatusOptions updateManyAndReturn
   */
  export type StatusOptionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * The data used to update StatusOptions.
     */
    data: XOR<StatusOptionsUpdateManyMutationInput, StatusOptionsUncheckedUpdateManyInput>
    /**
     * Filter which StatusOptions to update
     */
    where?: StatusOptionsWhereInput
    /**
     * Limit how many StatusOptions to update.
     */
    limit?: number
  }

  /**
   * StatusOptions upsert
   */
  export type StatusOptionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusOptionsInclude<ExtArgs> | null
    /**
     * The filter to search for the StatusOptions to update in case it exists.
     */
    where: StatusOptionsWhereUniqueInput
    /**
     * In case the StatusOptions found by the `where` argument doesn't exist, create a new StatusOptions with this data.
     */
    create: XOR<StatusOptionsCreateInput, StatusOptionsUncheckedCreateInput>
    /**
     * In case the StatusOptions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatusOptionsUpdateInput, StatusOptionsUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StatusOptions delete
   */
  export type StatusOptionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusOptionsInclude<ExtArgs> | null
    /**
     * Filter which StatusOptions to delete.
     */
    where: StatusOptionsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StatusOptions deleteMany
   */
  export type StatusOptionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatusOptions to delete
     */
    where?: StatusOptionsWhereInput
    /**
     * Limit how many StatusOptions to delete.
     */
    limit?: number
  }

  /**
   * StatusOptions.strategies
   */
  export type StatusOptions$strategiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    where?: StrategyWhereInput
    orderBy?: StrategyOrderByWithRelationInput | StrategyOrderByWithRelationInput[]
    cursor?: StrategyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StrategyScalarFieldEnum | StrategyScalarFieldEnum[]
  }

  /**
   * StatusOptions without action
   */
  export type StatusOptionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusOptions
     */
    select?: StatusOptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusOptions
     */
    omit?: StatusOptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusOptionsInclude<ExtArgs> | null
  }


  /**
   * Model Strategy
   */

  export type AggregateStrategy = {
    _count: StrategyCountAggregateOutputType | null
    _avg: StrategyAvgAggregateOutputType | null
    _sum: StrategySumAggregateOutputType | null
    _min: StrategyMinAggregateOutputType | null
    _max: StrategyMaxAggregateOutputType | null
  }

  export type StrategyAvgAggregateOutputType = {
    id: number | null
    strategy_number: number | null
    timeline_id: number | null
    status_id: number | null
  }

  export type StrategySumAggregateOutputType = {
    id: number | null
    strategy_number: number | null
    timeline_id: number | null
    status_id: number | null
  }

  export type StrategyMinAggregateOutputType = {
    id: number | null
    content: string | null
    last_comms_date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    policy_id: string | null
    strategy_number: number | null
    timeline_id: number | null
    status_id: number | null
  }

  export type StrategyMaxAggregateOutputType = {
    id: number | null
    content: string | null
    last_comms_date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    policy_id: string | null
    strategy_number: number | null
    timeline_id: number | null
    status_id: number | null
  }

  export type StrategyCountAggregateOutputType = {
    id: number
    content: number
    last_comms_date: number
    createdAt: number
    updatedAt: number
    policy_id: number
    strategy_number: number
    timeline_id: number
    status_id: number
    _all: number
  }


  export type StrategyAvgAggregateInputType = {
    id?: true
    strategy_number?: true
    timeline_id?: true
    status_id?: true
  }

  export type StrategySumAggregateInputType = {
    id?: true
    strategy_number?: true
    timeline_id?: true
    status_id?: true
  }

  export type StrategyMinAggregateInputType = {
    id?: true
    content?: true
    last_comms_date?: true
    createdAt?: true
    updatedAt?: true
    policy_id?: true
    strategy_number?: true
    timeline_id?: true
    status_id?: true
  }

  export type StrategyMaxAggregateInputType = {
    id?: true
    content?: true
    last_comms_date?: true
    createdAt?: true
    updatedAt?: true
    policy_id?: true
    strategy_number?: true
    timeline_id?: true
    status_id?: true
  }

  export type StrategyCountAggregateInputType = {
    id?: true
    content?: true
    last_comms_date?: true
    createdAt?: true
    updatedAt?: true
    policy_id?: true
    strategy_number?: true
    timeline_id?: true
    status_id?: true
    _all?: true
  }

  export type StrategyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Strategy to aggregate.
     */
    where?: StrategyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strategies to fetch.
     */
    orderBy?: StrategyOrderByWithRelationInput | StrategyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StrategyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strategies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strategies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Strategies
    **/
    _count?: true | StrategyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StrategyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StrategySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StrategyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StrategyMaxAggregateInputType
  }

  export type GetStrategyAggregateType<T extends StrategyAggregateArgs> = {
        [P in keyof T & keyof AggregateStrategy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStrategy[P]>
      : GetScalarType<T[P], AggregateStrategy[P]>
  }




  export type StrategyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrategyWhereInput
    orderBy?: StrategyOrderByWithAggregationInput | StrategyOrderByWithAggregationInput[]
    by: StrategyScalarFieldEnum[] | StrategyScalarFieldEnum
    having?: StrategyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StrategyCountAggregateInputType | true
    _avg?: StrategyAvgAggregateInputType
    _sum?: StrategySumAggregateInputType
    _min?: StrategyMinAggregateInputType
    _max?: StrategyMaxAggregateInputType
  }

  export type StrategyGroupByOutputType = {
    id: number
    content: string
    last_comms_date: Date | null
    createdAt: Date
    updatedAt: Date
    policy_id: string
    strategy_number: number
    timeline_id: number
    status_id: number
    _count: StrategyCountAggregateOutputType | null
    _avg: StrategyAvgAggregateOutputType | null
    _sum: StrategySumAggregateOutputType | null
    _min: StrategyMinAggregateOutputType | null
    _max: StrategyMaxAggregateOutputType | null
  }

  type GetStrategyGroupByPayload<T extends StrategyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StrategyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StrategyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StrategyGroupByOutputType[P]>
            : GetScalarType<T[P], StrategyGroupByOutputType[P]>
        }
      >
    >


  export type StrategySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    last_comms_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    policy_id?: boolean
    strategy_number?: boolean
    timeline_id?: boolean
    status_id?: boolean
    stakeholders?: boolean | Strategy$stakeholdersArgs<ExtArgs>
    comments?: boolean | Strategy$commentsArgs<ExtArgs>
    timeline?: boolean | TimelineOptionsDefaultArgs<ExtArgs>
    status?: boolean | StatusOptionsDefaultArgs<ExtArgs>
    policy?: boolean | PoliciesDefaultArgs<ExtArgs>
    implementers?: boolean | Strategy$implementersArgs<ExtArgs>
    _count?: boolean | StrategyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["strategy"]>

  export type StrategySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    last_comms_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    policy_id?: boolean
    strategy_number?: boolean
    timeline_id?: boolean
    status_id?: boolean
    timeline?: boolean | TimelineOptionsDefaultArgs<ExtArgs>
    status?: boolean | StatusOptionsDefaultArgs<ExtArgs>
    policy?: boolean | PoliciesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["strategy"]>

  export type StrategySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    last_comms_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    policy_id?: boolean
    strategy_number?: boolean
    timeline_id?: boolean
    status_id?: boolean
    timeline?: boolean | TimelineOptionsDefaultArgs<ExtArgs>
    status?: boolean | StatusOptionsDefaultArgs<ExtArgs>
    policy?: boolean | PoliciesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["strategy"]>

  export type StrategySelectScalar = {
    id?: boolean
    content?: boolean
    last_comms_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    policy_id?: boolean
    strategy_number?: boolean
    timeline_id?: boolean
    status_id?: boolean
  }

  export type StrategyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "last_comms_date" | "createdAt" | "updatedAt" | "policy_id" | "strategy_number" | "timeline_id" | "status_id", ExtArgs["result"]["strategy"]>
  export type StrategyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stakeholders?: boolean | Strategy$stakeholdersArgs<ExtArgs>
    comments?: boolean | Strategy$commentsArgs<ExtArgs>
    timeline?: boolean | TimelineOptionsDefaultArgs<ExtArgs>
    status?: boolean | StatusOptionsDefaultArgs<ExtArgs>
    policy?: boolean | PoliciesDefaultArgs<ExtArgs>
    implementers?: boolean | Strategy$implementersArgs<ExtArgs>
    _count?: boolean | StrategyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StrategyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeline?: boolean | TimelineOptionsDefaultArgs<ExtArgs>
    status?: boolean | StatusOptionsDefaultArgs<ExtArgs>
    policy?: boolean | PoliciesDefaultArgs<ExtArgs>
  }
  export type StrategyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeline?: boolean | TimelineOptionsDefaultArgs<ExtArgs>
    status?: boolean | StatusOptionsDefaultArgs<ExtArgs>
    policy?: boolean | PoliciesDefaultArgs<ExtArgs>
  }

  export type $StrategyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Strategy"
    objects: {
      stakeholders: Prisma.$StakeholderPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      timeline: Prisma.$TimelineOptionsPayload<ExtArgs>
      status: Prisma.$StatusOptionsPayload<ExtArgs>
      policy: Prisma.$PoliciesPayload<ExtArgs>
      implementers: Prisma.$StrategyImplementerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      last_comms_date: Date | null
      createdAt: Date
      updatedAt: Date
      policy_id: string
      strategy_number: number
      timeline_id: number
      status_id: number
    }, ExtArgs["result"]["strategy"]>
    composites: {}
  }

  type StrategyGetPayload<S extends boolean | null | undefined | StrategyDefaultArgs> = $Result.GetResult<Prisma.$StrategyPayload, S>

  type StrategyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StrategyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: StrategyCountAggregateInputType | true
    }

  export interface StrategyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Strategy'], meta: { name: 'Strategy' } }
    /**
     * Find zero or one Strategy that matches the filter.
     * @param {StrategyFindUniqueArgs} args - Arguments to find a Strategy
     * @example
     * // Get one Strategy
     * const strategy = await prisma.strategy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StrategyFindUniqueArgs>(args: SelectSubset<T, StrategyFindUniqueArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Strategy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StrategyFindUniqueOrThrowArgs} args - Arguments to find a Strategy
     * @example
     * // Get one Strategy
     * const strategy = await prisma.strategy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StrategyFindUniqueOrThrowArgs>(args: SelectSubset<T, StrategyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Strategy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyFindFirstArgs} args - Arguments to find a Strategy
     * @example
     * // Get one Strategy
     * const strategy = await prisma.strategy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StrategyFindFirstArgs>(args?: SelectSubset<T, StrategyFindFirstArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Strategy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyFindFirstOrThrowArgs} args - Arguments to find a Strategy
     * @example
     * // Get one Strategy
     * const strategy = await prisma.strategy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StrategyFindFirstOrThrowArgs>(args?: SelectSubset<T, StrategyFindFirstOrThrowArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Strategies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Strategies
     * const strategies = await prisma.strategy.findMany()
     * 
     * // Get first 10 Strategies
     * const strategies = await prisma.strategy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const strategyWithIdOnly = await prisma.strategy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StrategyFindManyArgs>(args?: SelectSubset<T, StrategyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Strategy.
     * @param {StrategyCreateArgs} args - Arguments to create a Strategy.
     * @example
     * // Create one Strategy
     * const Strategy = await prisma.strategy.create({
     *   data: {
     *     // ... data to create a Strategy
     *   }
     * })
     * 
     */
    create<T extends StrategyCreateArgs>(args: SelectSubset<T, StrategyCreateArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Strategies.
     * @param {StrategyCreateManyArgs} args - Arguments to create many Strategies.
     * @example
     * // Create many Strategies
     * const strategy = await prisma.strategy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StrategyCreateManyArgs>(args?: SelectSubset<T, StrategyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Strategies and returns the data saved in the database.
     * @param {StrategyCreateManyAndReturnArgs} args - Arguments to create many Strategies.
     * @example
     * // Create many Strategies
     * const strategy = await prisma.strategy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Strategies and only return the `id`
     * const strategyWithIdOnly = await prisma.strategy.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StrategyCreateManyAndReturnArgs>(args?: SelectSubset<T, StrategyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Strategy.
     * @param {StrategyDeleteArgs} args - Arguments to delete one Strategy.
     * @example
     * // Delete one Strategy
     * const Strategy = await prisma.strategy.delete({
     *   where: {
     *     // ... filter to delete one Strategy
     *   }
     * })
     * 
     */
    delete<T extends StrategyDeleteArgs>(args: SelectSubset<T, StrategyDeleteArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Strategy.
     * @param {StrategyUpdateArgs} args - Arguments to update one Strategy.
     * @example
     * // Update one Strategy
     * const strategy = await prisma.strategy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StrategyUpdateArgs>(args: SelectSubset<T, StrategyUpdateArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Strategies.
     * @param {StrategyDeleteManyArgs} args - Arguments to filter Strategies to delete.
     * @example
     * // Delete a few Strategies
     * const { count } = await prisma.strategy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StrategyDeleteManyArgs>(args?: SelectSubset<T, StrategyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Strategies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Strategies
     * const strategy = await prisma.strategy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StrategyUpdateManyArgs>(args: SelectSubset<T, StrategyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Strategies and returns the data updated in the database.
     * @param {StrategyUpdateManyAndReturnArgs} args - Arguments to update many Strategies.
     * @example
     * // Update many Strategies
     * const strategy = await prisma.strategy.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Strategies and only return the `id`
     * const strategyWithIdOnly = await prisma.strategy.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StrategyUpdateManyAndReturnArgs>(args: SelectSubset<T, StrategyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Strategy.
     * @param {StrategyUpsertArgs} args - Arguments to update or create a Strategy.
     * @example
     * // Update or create a Strategy
     * const strategy = await prisma.strategy.upsert({
     *   create: {
     *     // ... data to create a Strategy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Strategy we want to update
     *   }
     * })
     */
    upsert<T extends StrategyUpsertArgs>(args: SelectSubset<T, StrategyUpsertArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Strategies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyCountArgs} args - Arguments to filter Strategies to count.
     * @example
     * // Count the number of Strategies
     * const count = await prisma.strategy.count({
     *   where: {
     *     // ... the filter for the Strategies we want to count
     *   }
     * })
    **/
    count<T extends StrategyCountArgs>(
      args?: Subset<T, StrategyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StrategyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Strategy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StrategyAggregateArgs>(args: Subset<T, StrategyAggregateArgs>): Prisma.PrismaPromise<GetStrategyAggregateType<T>>

    /**
     * Group by Strategy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StrategyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StrategyGroupByArgs['orderBy'] }
        : { orderBy?: StrategyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StrategyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStrategyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Strategy model
   */
  readonly fields: StrategyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Strategy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StrategyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stakeholders<T extends Strategy$stakeholdersArgs<ExtArgs> = {}>(args?: Subset<T, Strategy$stakeholdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Strategy$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Strategy$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    timeline<T extends TimelineOptionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TimelineOptionsDefaultArgs<ExtArgs>>): Prisma__TimelineOptionsClient<$Result.GetResult<Prisma.$TimelineOptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    status<T extends StatusOptionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StatusOptionsDefaultArgs<ExtArgs>>): Prisma__StatusOptionsClient<$Result.GetResult<Prisma.$StatusOptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    policy<T extends PoliciesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PoliciesDefaultArgs<ExtArgs>>): Prisma__PoliciesClient<$Result.GetResult<Prisma.$PoliciesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    implementers<T extends Strategy$implementersArgs<ExtArgs> = {}>(args?: Subset<T, Strategy$implementersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Strategy model
   */
  interface StrategyFieldRefs {
    readonly id: FieldRef<"Strategy", 'Int'>
    readonly content: FieldRef<"Strategy", 'String'>
    readonly last_comms_date: FieldRef<"Strategy", 'DateTime'>
    readonly createdAt: FieldRef<"Strategy", 'DateTime'>
    readonly updatedAt: FieldRef<"Strategy", 'DateTime'>
    readonly policy_id: FieldRef<"Strategy", 'String'>
    readonly strategy_number: FieldRef<"Strategy", 'Int'>
    readonly timeline_id: FieldRef<"Strategy", 'Int'>
    readonly status_id: FieldRef<"Strategy", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Strategy findUnique
   */
  export type StrategyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter, which Strategy to fetch.
     */
    where: StrategyWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Strategy findUniqueOrThrow
   */
  export type StrategyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter, which Strategy to fetch.
     */
    where: StrategyWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Strategy findFirst
   */
  export type StrategyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter, which Strategy to fetch.
     */
    where?: StrategyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strategies to fetch.
     */
    orderBy?: StrategyOrderByWithRelationInput | StrategyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Strategies.
     */
    cursor?: StrategyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strategies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strategies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Strategies.
     */
    distinct?: StrategyScalarFieldEnum | StrategyScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Strategy findFirstOrThrow
   */
  export type StrategyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter, which Strategy to fetch.
     */
    where?: StrategyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strategies to fetch.
     */
    orderBy?: StrategyOrderByWithRelationInput | StrategyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Strategies.
     */
    cursor?: StrategyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strategies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strategies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Strategies.
     */
    distinct?: StrategyScalarFieldEnum | StrategyScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Strategy findMany
   */
  export type StrategyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter, which Strategies to fetch.
     */
    where?: StrategyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strategies to fetch.
     */
    orderBy?: StrategyOrderByWithRelationInput | StrategyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Strategies.
     */
    cursor?: StrategyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strategies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strategies.
     */
    skip?: number
    distinct?: StrategyScalarFieldEnum | StrategyScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Strategy create
   */
  export type StrategyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * The data needed to create a Strategy.
     */
    data: XOR<StrategyCreateInput, StrategyUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Strategy createMany
   */
  export type StrategyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Strategies.
     */
    data: StrategyCreateManyInput | StrategyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Strategy createManyAndReturn
   */
  export type StrategyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * The data used to create many Strategies.
     */
    data: StrategyCreateManyInput | StrategyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Strategy update
   */
  export type StrategyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * The data needed to update a Strategy.
     */
    data: XOR<StrategyUpdateInput, StrategyUncheckedUpdateInput>
    /**
     * Choose, which Strategy to update.
     */
    where: StrategyWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Strategy updateMany
   */
  export type StrategyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Strategies.
     */
    data: XOR<StrategyUpdateManyMutationInput, StrategyUncheckedUpdateManyInput>
    /**
     * Filter which Strategies to update
     */
    where?: StrategyWhereInput
    /**
     * Limit how many Strategies to update.
     */
    limit?: number
  }

  /**
   * Strategy updateManyAndReturn
   */
  export type StrategyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * The data used to update Strategies.
     */
    data: XOR<StrategyUpdateManyMutationInput, StrategyUncheckedUpdateManyInput>
    /**
     * Filter which Strategies to update
     */
    where?: StrategyWhereInput
    /**
     * Limit how many Strategies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Strategy upsert
   */
  export type StrategyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * The filter to search for the Strategy to update in case it exists.
     */
    where: StrategyWhereUniqueInput
    /**
     * In case the Strategy found by the `where` argument doesn't exist, create a new Strategy with this data.
     */
    create: XOR<StrategyCreateInput, StrategyUncheckedCreateInput>
    /**
     * In case the Strategy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StrategyUpdateInput, StrategyUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Strategy delete
   */
  export type StrategyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter which Strategy to delete.
     */
    where: StrategyWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Strategy deleteMany
   */
  export type StrategyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Strategies to delete
     */
    where?: StrategyWhereInput
    /**
     * Limit how many Strategies to delete.
     */
    limit?: number
  }

  /**
   * Strategy.stakeholders
   */
  export type Strategy$stakeholdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderInclude<ExtArgs> | null
    where?: StakeholderWhereInput
    orderBy?: StakeholderOrderByWithRelationInput | StakeholderOrderByWithRelationInput[]
    cursor?: StakeholderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StakeholderScalarFieldEnum | StakeholderScalarFieldEnum[]
  }

  /**
   * Strategy.comments
   */
  export type Strategy$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Strategy.implementers
   */
  export type Strategy$implementersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
    where?: StrategyImplementerWhereInput
    orderBy?: StrategyImplementerOrderByWithRelationInput | StrategyImplementerOrderByWithRelationInput[]
    cursor?: StrategyImplementerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StrategyImplementerScalarFieldEnum | StrategyImplementerScalarFieldEnum[]
  }

  /**
   * Strategy without action
   */
  export type StrategyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
  }


  /**
   * Model Implementer
   */

  export type AggregateImplementer = {
    _count: ImplementerCountAggregateOutputType | null
    _avg: ImplementerAvgAggregateOutputType | null
    _sum: ImplementerSumAggregateOutputType | null
    _min: ImplementerMinAggregateOutputType | null
    _max: ImplementerMaxAggregateOutputType | null
  }

  export type ImplementerAvgAggregateOutputType = {
    id: number | null
  }

  export type ImplementerSumAggregateOutputType = {
    id: number | null
  }

  export type ImplementerMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    is_board: boolean | null
    is_department: boolean | null
    is_school: boolean | null
  }

  export type ImplementerMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    is_board: boolean | null
    is_department: boolean | null
    is_school: boolean | null
  }

  export type ImplementerCountAggregateOutputType = {
    id: number
    name: number
    emails: number
    phone_numbers: number
    createdAt: number
    updatedAt: number
    is_board: number
    is_department: number
    is_school: number
    _all: number
  }


  export type ImplementerAvgAggregateInputType = {
    id?: true
  }

  export type ImplementerSumAggregateInputType = {
    id?: true
  }

  export type ImplementerMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    is_board?: true
    is_department?: true
    is_school?: true
  }

  export type ImplementerMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    is_board?: true
    is_department?: true
    is_school?: true
  }

  export type ImplementerCountAggregateInputType = {
    id?: true
    name?: true
    emails?: true
    phone_numbers?: true
    createdAt?: true
    updatedAt?: true
    is_board?: true
    is_department?: true
    is_school?: true
    _all?: true
  }

  export type ImplementerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Implementer to aggregate.
     */
    where?: ImplementerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Implementers to fetch.
     */
    orderBy?: ImplementerOrderByWithRelationInput | ImplementerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImplementerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Implementers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Implementers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Implementers
    **/
    _count?: true | ImplementerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImplementerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImplementerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImplementerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImplementerMaxAggregateInputType
  }

  export type GetImplementerAggregateType<T extends ImplementerAggregateArgs> = {
        [P in keyof T & keyof AggregateImplementer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImplementer[P]>
      : GetScalarType<T[P], AggregateImplementer[P]>
  }




  export type ImplementerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImplementerWhereInput
    orderBy?: ImplementerOrderByWithAggregationInput | ImplementerOrderByWithAggregationInput[]
    by: ImplementerScalarFieldEnum[] | ImplementerScalarFieldEnum
    having?: ImplementerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImplementerCountAggregateInputType | true
    _avg?: ImplementerAvgAggregateInputType
    _sum?: ImplementerSumAggregateInputType
    _min?: ImplementerMinAggregateInputType
    _max?: ImplementerMaxAggregateInputType
  }

  export type ImplementerGroupByOutputType = {
    id: number
    name: string
    emails: string[]
    phone_numbers: string[]
    createdAt: Date
    updatedAt: Date
    is_board: boolean
    is_department: boolean
    is_school: boolean
    _count: ImplementerCountAggregateOutputType | null
    _avg: ImplementerAvgAggregateOutputType | null
    _sum: ImplementerSumAggregateOutputType | null
    _min: ImplementerMinAggregateOutputType | null
    _max: ImplementerMaxAggregateOutputType | null
  }

  type GetImplementerGroupByPayload<T extends ImplementerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImplementerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImplementerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImplementerGroupByOutputType[P]>
            : GetScalarType<T[P], ImplementerGroupByOutputType[P]>
        }
      >
    >


  export type ImplementerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    emails?: boolean
    phone_numbers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_board?: boolean
    is_department?: boolean
    is_school?: boolean
    cpic_smes?: boolean | Implementer$cpic_smesArgs<ExtArgs>
    strategies?: boolean | Implementer$strategiesArgs<ExtArgs>
    _count?: boolean | ImplementerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["implementer"]>

  export type ImplementerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    emails?: boolean
    phone_numbers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_board?: boolean
    is_department?: boolean
    is_school?: boolean
  }, ExtArgs["result"]["implementer"]>

  export type ImplementerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    emails?: boolean
    phone_numbers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_board?: boolean
    is_department?: boolean
    is_school?: boolean
  }, ExtArgs["result"]["implementer"]>

  export type ImplementerSelectScalar = {
    id?: boolean
    name?: boolean
    emails?: boolean
    phone_numbers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_board?: boolean
    is_department?: boolean
    is_school?: boolean
  }

  export type ImplementerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "emails" | "phone_numbers" | "createdAt" | "updatedAt" | "is_board" | "is_department" | "is_school", ExtArgs["result"]["implementer"]>
  export type ImplementerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cpic_smes?: boolean | Implementer$cpic_smesArgs<ExtArgs>
    strategies?: boolean | Implementer$strategiesArgs<ExtArgs>
    _count?: boolean | ImplementerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ImplementerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ImplementerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ImplementerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Implementer"
    objects: {
      cpic_smes: Prisma.$UserPayload<ExtArgs>[]
      strategies: Prisma.$StrategyImplementerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      emails: string[]
      phone_numbers: string[]
      createdAt: Date
      updatedAt: Date
      is_board: boolean
      is_department: boolean
      is_school: boolean
    }, ExtArgs["result"]["implementer"]>
    composites: {}
  }

  type ImplementerGetPayload<S extends boolean | null | undefined | ImplementerDefaultArgs> = $Result.GetResult<Prisma.$ImplementerPayload, S>

  type ImplementerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImplementerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: ImplementerCountAggregateInputType | true
    }

  export interface ImplementerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Implementer'], meta: { name: 'Implementer' } }
    /**
     * Find zero or one Implementer that matches the filter.
     * @param {ImplementerFindUniqueArgs} args - Arguments to find a Implementer
     * @example
     * // Get one Implementer
     * const implementer = await prisma.implementer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImplementerFindUniqueArgs>(args: SelectSubset<T, ImplementerFindUniqueArgs<ExtArgs>>): Prisma__ImplementerClient<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Implementer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImplementerFindUniqueOrThrowArgs} args - Arguments to find a Implementer
     * @example
     * // Get one Implementer
     * const implementer = await prisma.implementer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImplementerFindUniqueOrThrowArgs>(args: SelectSubset<T, ImplementerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImplementerClient<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Implementer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementerFindFirstArgs} args - Arguments to find a Implementer
     * @example
     * // Get one Implementer
     * const implementer = await prisma.implementer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImplementerFindFirstArgs>(args?: SelectSubset<T, ImplementerFindFirstArgs<ExtArgs>>): Prisma__ImplementerClient<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Implementer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementerFindFirstOrThrowArgs} args - Arguments to find a Implementer
     * @example
     * // Get one Implementer
     * const implementer = await prisma.implementer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImplementerFindFirstOrThrowArgs>(args?: SelectSubset<T, ImplementerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImplementerClient<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Implementers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Implementers
     * const implementers = await prisma.implementer.findMany()
     * 
     * // Get first 10 Implementers
     * const implementers = await prisma.implementer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const implementerWithIdOnly = await prisma.implementer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImplementerFindManyArgs>(args?: SelectSubset<T, ImplementerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Implementer.
     * @param {ImplementerCreateArgs} args - Arguments to create a Implementer.
     * @example
     * // Create one Implementer
     * const Implementer = await prisma.implementer.create({
     *   data: {
     *     // ... data to create a Implementer
     *   }
     * })
     * 
     */
    create<T extends ImplementerCreateArgs>(args: SelectSubset<T, ImplementerCreateArgs<ExtArgs>>): Prisma__ImplementerClient<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Implementers.
     * @param {ImplementerCreateManyArgs} args - Arguments to create many Implementers.
     * @example
     * // Create many Implementers
     * const implementer = await prisma.implementer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImplementerCreateManyArgs>(args?: SelectSubset<T, ImplementerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Implementers and returns the data saved in the database.
     * @param {ImplementerCreateManyAndReturnArgs} args - Arguments to create many Implementers.
     * @example
     * // Create many Implementers
     * const implementer = await prisma.implementer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Implementers and only return the `id`
     * const implementerWithIdOnly = await prisma.implementer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImplementerCreateManyAndReturnArgs>(args?: SelectSubset<T, ImplementerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Implementer.
     * @param {ImplementerDeleteArgs} args - Arguments to delete one Implementer.
     * @example
     * // Delete one Implementer
     * const Implementer = await prisma.implementer.delete({
     *   where: {
     *     // ... filter to delete one Implementer
     *   }
     * })
     * 
     */
    delete<T extends ImplementerDeleteArgs>(args: SelectSubset<T, ImplementerDeleteArgs<ExtArgs>>): Prisma__ImplementerClient<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Implementer.
     * @param {ImplementerUpdateArgs} args - Arguments to update one Implementer.
     * @example
     * // Update one Implementer
     * const implementer = await prisma.implementer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImplementerUpdateArgs>(args: SelectSubset<T, ImplementerUpdateArgs<ExtArgs>>): Prisma__ImplementerClient<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Implementers.
     * @param {ImplementerDeleteManyArgs} args - Arguments to filter Implementers to delete.
     * @example
     * // Delete a few Implementers
     * const { count } = await prisma.implementer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImplementerDeleteManyArgs>(args?: SelectSubset<T, ImplementerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Implementers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Implementers
     * const implementer = await prisma.implementer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImplementerUpdateManyArgs>(args: SelectSubset<T, ImplementerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Implementers and returns the data updated in the database.
     * @param {ImplementerUpdateManyAndReturnArgs} args - Arguments to update many Implementers.
     * @example
     * // Update many Implementers
     * const implementer = await prisma.implementer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Implementers and only return the `id`
     * const implementerWithIdOnly = await prisma.implementer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImplementerUpdateManyAndReturnArgs>(args: SelectSubset<T, ImplementerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Implementer.
     * @param {ImplementerUpsertArgs} args - Arguments to update or create a Implementer.
     * @example
     * // Update or create a Implementer
     * const implementer = await prisma.implementer.upsert({
     *   create: {
     *     // ... data to create a Implementer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Implementer we want to update
     *   }
     * })
     */
    upsert<T extends ImplementerUpsertArgs>(args: SelectSubset<T, ImplementerUpsertArgs<ExtArgs>>): Prisma__ImplementerClient<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Implementers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementerCountArgs} args - Arguments to filter Implementers to count.
     * @example
     * // Count the number of Implementers
     * const count = await prisma.implementer.count({
     *   where: {
     *     // ... the filter for the Implementers we want to count
     *   }
     * })
    **/
    count<T extends ImplementerCountArgs>(
      args?: Subset<T, ImplementerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImplementerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Implementer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImplementerAggregateArgs>(args: Subset<T, ImplementerAggregateArgs>): Prisma.PrismaPromise<GetImplementerAggregateType<T>>

    /**
     * Group by Implementer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImplementerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImplementerGroupByArgs['orderBy'] }
        : { orderBy?: ImplementerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImplementerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImplementerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Implementer model
   */
  readonly fields: ImplementerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Implementer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImplementerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cpic_smes<T extends Implementer$cpic_smesArgs<ExtArgs> = {}>(args?: Subset<T, Implementer$cpic_smesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    strategies<T extends Implementer$strategiesArgs<ExtArgs> = {}>(args?: Subset<T, Implementer$strategiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Implementer model
   */
  interface ImplementerFieldRefs {
    readonly id: FieldRef<"Implementer", 'Int'>
    readonly name: FieldRef<"Implementer", 'String'>
    readonly emails: FieldRef<"Implementer", 'String[]'>
    readonly phone_numbers: FieldRef<"Implementer", 'String[]'>
    readonly createdAt: FieldRef<"Implementer", 'DateTime'>
    readonly updatedAt: FieldRef<"Implementer", 'DateTime'>
    readonly is_board: FieldRef<"Implementer", 'Boolean'>
    readonly is_department: FieldRef<"Implementer", 'Boolean'>
    readonly is_school: FieldRef<"Implementer", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Implementer findUnique
   */
  export type ImplementerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementerInclude<ExtArgs> | null
    /**
     * Filter, which Implementer to fetch.
     */
    where: ImplementerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Implementer findUniqueOrThrow
   */
  export type ImplementerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementerInclude<ExtArgs> | null
    /**
     * Filter, which Implementer to fetch.
     */
    where: ImplementerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Implementer findFirst
   */
  export type ImplementerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementerInclude<ExtArgs> | null
    /**
     * Filter, which Implementer to fetch.
     */
    where?: ImplementerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Implementers to fetch.
     */
    orderBy?: ImplementerOrderByWithRelationInput | ImplementerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Implementers.
     */
    cursor?: ImplementerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Implementers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Implementers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Implementers.
     */
    distinct?: ImplementerScalarFieldEnum | ImplementerScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Implementer findFirstOrThrow
   */
  export type ImplementerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementerInclude<ExtArgs> | null
    /**
     * Filter, which Implementer to fetch.
     */
    where?: ImplementerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Implementers to fetch.
     */
    orderBy?: ImplementerOrderByWithRelationInput | ImplementerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Implementers.
     */
    cursor?: ImplementerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Implementers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Implementers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Implementers.
     */
    distinct?: ImplementerScalarFieldEnum | ImplementerScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Implementer findMany
   */
  export type ImplementerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementerInclude<ExtArgs> | null
    /**
     * Filter, which Implementers to fetch.
     */
    where?: ImplementerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Implementers to fetch.
     */
    orderBy?: ImplementerOrderByWithRelationInput | ImplementerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Implementers.
     */
    cursor?: ImplementerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Implementers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Implementers.
     */
    skip?: number
    distinct?: ImplementerScalarFieldEnum | ImplementerScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Implementer create
   */
  export type ImplementerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementerInclude<ExtArgs> | null
    /**
     * The data needed to create a Implementer.
     */
    data: XOR<ImplementerCreateInput, ImplementerUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Implementer createMany
   */
  export type ImplementerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Implementers.
     */
    data: ImplementerCreateManyInput | ImplementerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Implementer createManyAndReturn
   */
  export type ImplementerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * The data used to create many Implementers.
     */
    data: ImplementerCreateManyInput | ImplementerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Implementer update
   */
  export type ImplementerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementerInclude<ExtArgs> | null
    /**
     * The data needed to update a Implementer.
     */
    data: XOR<ImplementerUpdateInput, ImplementerUncheckedUpdateInput>
    /**
     * Choose, which Implementer to update.
     */
    where: ImplementerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Implementer updateMany
   */
  export type ImplementerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Implementers.
     */
    data: XOR<ImplementerUpdateManyMutationInput, ImplementerUncheckedUpdateManyInput>
    /**
     * Filter which Implementers to update
     */
    where?: ImplementerWhereInput
    /**
     * Limit how many Implementers to update.
     */
    limit?: number
  }

  /**
   * Implementer updateManyAndReturn
   */
  export type ImplementerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * The data used to update Implementers.
     */
    data: XOR<ImplementerUpdateManyMutationInput, ImplementerUncheckedUpdateManyInput>
    /**
     * Filter which Implementers to update
     */
    where?: ImplementerWhereInput
    /**
     * Limit how many Implementers to update.
     */
    limit?: number
  }

  /**
   * Implementer upsert
   */
  export type ImplementerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementerInclude<ExtArgs> | null
    /**
     * The filter to search for the Implementer to update in case it exists.
     */
    where: ImplementerWhereUniqueInput
    /**
     * In case the Implementer found by the `where` argument doesn't exist, create a new Implementer with this data.
     */
    create: XOR<ImplementerCreateInput, ImplementerUncheckedCreateInput>
    /**
     * In case the Implementer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImplementerUpdateInput, ImplementerUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Implementer delete
   */
  export type ImplementerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementerInclude<ExtArgs> | null
    /**
     * Filter which Implementer to delete.
     */
    where: ImplementerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Implementer deleteMany
   */
  export type ImplementerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Implementers to delete
     */
    where?: ImplementerWhereInput
    /**
     * Limit how many Implementers to delete.
     */
    limit?: number
  }

  /**
   * Implementer.cpic_smes
   */
  export type Implementer$cpic_smesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Implementer.strategies
   */
  export type Implementer$strategiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
    where?: StrategyImplementerWhereInput
    orderBy?: StrategyImplementerOrderByWithRelationInput | StrategyImplementerOrderByWithRelationInput[]
    cursor?: StrategyImplementerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StrategyImplementerScalarFieldEnum | StrategyImplementerScalarFieldEnum[]
  }

  /**
   * Implementer without action
   */
  export type ImplementerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Implementer
     */
    select?: ImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Implementer
     */
    omit?: ImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementerInclude<ExtArgs> | null
  }


  /**
   * Model Stakeholder
   */

  export type AggregateStakeholder = {
    _count: StakeholderCountAggregateOutputType | null
    _avg: StakeholderAvgAggregateOutputType | null
    _sum: StakeholderSumAggregateOutputType | null
    _min: StakeholderMinAggregateOutputType | null
    _max: StakeholderMaxAggregateOutputType | null
  }

  export type StakeholderAvgAggregateOutputType = {
    id: number | null
    strategy_id: number | null
  }

  export type StakeholderSumAggregateOutputType = {
    id: number | null
    strategy_id: number | null
  }

  export type StakeholderMinAggregateOutputType = {
    id: number | null
    name: string | null
    organization_name: string | null
    strategy_id: number | null
  }

  export type StakeholderMaxAggregateOutputType = {
    id: number | null
    name: string | null
    organization_name: string | null
    strategy_id: number | null
  }

  export type StakeholderCountAggregateOutputType = {
    id: number
    name: number
    organization_name: number
    emails: number
    phone_numbers: number
    strategy_id: number
    _all: number
  }


  export type StakeholderAvgAggregateInputType = {
    id?: true
    strategy_id?: true
  }

  export type StakeholderSumAggregateInputType = {
    id?: true
    strategy_id?: true
  }

  export type StakeholderMinAggregateInputType = {
    id?: true
    name?: true
    organization_name?: true
    strategy_id?: true
  }

  export type StakeholderMaxAggregateInputType = {
    id?: true
    name?: true
    organization_name?: true
    strategy_id?: true
  }

  export type StakeholderCountAggregateInputType = {
    id?: true
    name?: true
    organization_name?: true
    emails?: true
    phone_numbers?: true
    strategy_id?: true
    _all?: true
  }

  export type StakeholderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stakeholder to aggregate.
     */
    where?: StakeholderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stakeholders to fetch.
     */
    orderBy?: StakeholderOrderByWithRelationInput | StakeholderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StakeholderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stakeholders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stakeholders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stakeholders
    **/
    _count?: true | StakeholderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StakeholderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StakeholderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StakeholderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StakeholderMaxAggregateInputType
  }

  export type GetStakeholderAggregateType<T extends StakeholderAggregateArgs> = {
        [P in keyof T & keyof AggregateStakeholder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStakeholder[P]>
      : GetScalarType<T[P], AggregateStakeholder[P]>
  }




  export type StakeholderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StakeholderWhereInput
    orderBy?: StakeholderOrderByWithAggregationInput | StakeholderOrderByWithAggregationInput[]
    by: StakeholderScalarFieldEnum[] | StakeholderScalarFieldEnum
    having?: StakeholderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StakeholderCountAggregateInputType | true
    _avg?: StakeholderAvgAggregateInputType
    _sum?: StakeholderSumAggregateInputType
    _min?: StakeholderMinAggregateInputType
    _max?: StakeholderMaxAggregateInputType
  }

  export type StakeholderGroupByOutputType = {
    id: number
    name: string
    organization_name: string | null
    emails: string[]
    phone_numbers: string[]
    strategy_id: number
    _count: StakeholderCountAggregateOutputType | null
    _avg: StakeholderAvgAggregateOutputType | null
    _sum: StakeholderSumAggregateOutputType | null
    _min: StakeholderMinAggregateOutputType | null
    _max: StakeholderMaxAggregateOutputType | null
  }

  type GetStakeholderGroupByPayload<T extends StakeholderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StakeholderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StakeholderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StakeholderGroupByOutputType[P]>
            : GetScalarType<T[P], StakeholderGroupByOutputType[P]>
        }
      >
    >


  export type StakeholderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    organization_name?: boolean
    emails?: boolean
    phone_numbers?: boolean
    strategy_id?: boolean
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stakeholder"]>

  export type StakeholderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    organization_name?: boolean
    emails?: boolean
    phone_numbers?: boolean
    strategy_id?: boolean
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stakeholder"]>

  export type StakeholderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    organization_name?: boolean
    emails?: boolean
    phone_numbers?: boolean
    strategy_id?: boolean
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stakeholder"]>

  export type StakeholderSelectScalar = {
    id?: boolean
    name?: boolean
    organization_name?: boolean
    emails?: boolean
    phone_numbers?: boolean
    strategy_id?: boolean
  }

  export type StakeholderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "organization_name" | "emails" | "phone_numbers" | "strategy_id", ExtArgs["result"]["stakeholder"]>
  export type StakeholderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }
  export type StakeholderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }
  export type StakeholderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }

  export type $StakeholderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stakeholder"
    objects: {
      strategy: Prisma.$StrategyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      organization_name: string | null
      emails: string[]
      phone_numbers: string[]
      strategy_id: number
    }, ExtArgs["result"]["stakeholder"]>
    composites: {}
  }

  type StakeholderGetPayload<S extends boolean | null | undefined | StakeholderDefaultArgs> = $Result.GetResult<Prisma.$StakeholderPayload, S>

  type StakeholderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StakeholderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: StakeholderCountAggregateInputType | true
    }

  export interface StakeholderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stakeholder'], meta: { name: 'Stakeholder' } }
    /**
     * Find zero or one Stakeholder that matches the filter.
     * @param {StakeholderFindUniqueArgs} args - Arguments to find a Stakeholder
     * @example
     * // Get one Stakeholder
     * const stakeholder = await prisma.stakeholder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StakeholderFindUniqueArgs>(args: SelectSubset<T, StakeholderFindUniqueArgs<ExtArgs>>): Prisma__StakeholderClient<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stakeholder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StakeholderFindUniqueOrThrowArgs} args - Arguments to find a Stakeholder
     * @example
     * // Get one Stakeholder
     * const stakeholder = await prisma.stakeholder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StakeholderFindUniqueOrThrowArgs>(args: SelectSubset<T, StakeholderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StakeholderClient<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stakeholder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakeholderFindFirstArgs} args - Arguments to find a Stakeholder
     * @example
     * // Get one Stakeholder
     * const stakeholder = await prisma.stakeholder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StakeholderFindFirstArgs>(args?: SelectSubset<T, StakeholderFindFirstArgs<ExtArgs>>): Prisma__StakeholderClient<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stakeholder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakeholderFindFirstOrThrowArgs} args - Arguments to find a Stakeholder
     * @example
     * // Get one Stakeholder
     * const stakeholder = await prisma.stakeholder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StakeholderFindFirstOrThrowArgs>(args?: SelectSubset<T, StakeholderFindFirstOrThrowArgs<ExtArgs>>): Prisma__StakeholderClient<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stakeholders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakeholderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stakeholders
     * const stakeholders = await prisma.stakeholder.findMany()
     * 
     * // Get first 10 Stakeholders
     * const stakeholders = await prisma.stakeholder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stakeholderWithIdOnly = await prisma.stakeholder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StakeholderFindManyArgs>(args?: SelectSubset<T, StakeholderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stakeholder.
     * @param {StakeholderCreateArgs} args - Arguments to create a Stakeholder.
     * @example
     * // Create one Stakeholder
     * const Stakeholder = await prisma.stakeholder.create({
     *   data: {
     *     // ... data to create a Stakeholder
     *   }
     * })
     * 
     */
    create<T extends StakeholderCreateArgs>(args: SelectSubset<T, StakeholderCreateArgs<ExtArgs>>): Prisma__StakeholderClient<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stakeholders.
     * @param {StakeholderCreateManyArgs} args - Arguments to create many Stakeholders.
     * @example
     * // Create many Stakeholders
     * const stakeholder = await prisma.stakeholder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StakeholderCreateManyArgs>(args?: SelectSubset<T, StakeholderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stakeholders and returns the data saved in the database.
     * @param {StakeholderCreateManyAndReturnArgs} args - Arguments to create many Stakeholders.
     * @example
     * // Create many Stakeholders
     * const stakeholder = await prisma.stakeholder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stakeholders and only return the `id`
     * const stakeholderWithIdOnly = await prisma.stakeholder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StakeholderCreateManyAndReturnArgs>(args?: SelectSubset<T, StakeholderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stakeholder.
     * @param {StakeholderDeleteArgs} args - Arguments to delete one Stakeholder.
     * @example
     * // Delete one Stakeholder
     * const Stakeholder = await prisma.stakeholder.delete({
     *   where: {
     *     // ... filter to delete one Stakeholder
     *   }
     * })
     * 
     */
    delete<T extends StakeholderDeleteArgs>(args: SelectSubset<T, StakeholderDeleteArgs<ExtArgs>>): Prisma__StakeholderClient<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stakeholder.
     * @param {StakeholderUpdateArgs} args - Arguments to update one Stakeholder.
     * @example
     * // Update one Stakeholder
     * const stakeholder = await prisma.stakeholder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StakeholderUpdateArgs>(args: SelectSubset<T, StakeholderUpdateArgs<ExtArgs>>): Prisma__StakeholderClient<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stakeholders.
     * @param {StakeholderDeleteManyArgs} args - Arguments to filter Stakeholders to delete.
     * @example
     * // Delete a few Stakeholders
     * const { count } = await prisma.stakeholder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StakeholderDeleteManyArgs>(args?: SelectSubset<T, StakeholderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stakeholders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakeholderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stakeholders
     * const stakeholder = await prisma.stakeholder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StakeholderUpdateManyArgs>(args: SelectSubset<T, StakeholderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stakeholders and returns the data updated in the database.
     * @param {StakeholderUpdateManyAndReturnArgs} args - Arguments to update many Stakeholders.
     * @example
     * // Update many Stakeholders
     * const stakeholder = await prisma.stakeholder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stakeholders and only return the `id`
     * const stakeholderWithIdOnly = await prisma.stakeholder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StakeholderUpdateManyAndReturnArgs>(args: SelectSubset<T, StakeholderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stakeholder.
     * @param {StakeholderUpsertArgs} args - Arguments to update or create a Stakeholder.
     * @example
     * // Update or create a Stakeholder
     * const stakeholder = await prisma.stakeholder.upsert({
     *   create: {
     *     // ... data to create a Stakeholder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stakeholder we want to update
     *   }
     * })
     */
    upsert<T extends StakeholderUpsertArgs>(args: SelectSubset<T, StakeholderUpsertArgs<ExtArgs>>): Prisma__StakeholderClient<$Result.GetResult<Prisma.$StakeholderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stakeholders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakeholderCountArgs} args - Arguments to filter Stakeholders to count.
     * @example
     * // Count the number of Stakeholders
     * const count = await prisma.stakeholder.count({
     *   where: {
     *     // ... the filter for the Stakeholders we want to count
     *   }
     * })
    **/
    count<T extends StakeholderCountArgs>(
      args?: Subset<T, StakeholderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StakeholderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stakeholder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakeholderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StakeholderAggregateArgs>(args: Subset<T, StakeholderAggregateArgs>): Prisma.PrismaPromise<GetStakeholderAggregateType<T>>

    /**
     * Group by Stakeholder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakeholderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StakeholderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StakeholderGroupByArgs['orderBy'] }
        : { orderBy?: StakeholderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StakeholderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStakeholderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stakeholder model
   */
  readonly fields: StakeholderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stakeholder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StakeholderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    strategy<T extends StrategyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StrategyDefaultArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stakeholder model
   */
  interface StakeholderFieldRefs {
    readonly id: FieldRef<"Stakeholder", 'Int'>
    readonly name: FieldRef<"Stakeholder", 'String'>
    readonly organization_name: FieldRef<"Stakeholder", 'String'>
    readonly emails: FieldRef<"Stakeholder", 'String[]'>
    readonly phone_numbers: FieldRef<"Stakeholder", 'String[]'>
    readonly strategy_id: FieldRef<"Stakeholder", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Stakeholder findUnique
   */
  export type StakeholderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderInclude<ExtArgs> | null
    /**
     * Filter, which Stakeholder to fetch.
     */
    where: StakeholderWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Stakeholder findUniqueOrThrow
   */
  export type StakeholderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderInclude<ExtArgs> | null
    /**
     * Filter, which Stakeholder to fetch.
     */
    where: StakeholderWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Stakeholder findFirst
   */
  export type StakeholderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderInclude<ExtArgs> | null
    /**
     * Filter, which Stakeholder to fetch.
     */
    where?: StakeholderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stakeholders to fetch.
     */
    orderBy?: StakeholderOrderByWithRelationInput | StakeholderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stakeholders.
     */
    cursor?: StakeholderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stakeholders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stakeholders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stakeholders.
     */
    distinct?: StakeholderScalarFieldEnum | StakeholderScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Stakeholder findFirstOrThrow
   */
  export type StakeholderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderInclude<ExtArgs> | null
    /**
     * Filter, which Stakeholder to fetch.
     */
    where?: StakeholderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stakeholders to fetch.
     */
    orderBy?: StakeholderOrderByWithRelationInput | StakeholderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stakeholders.
     */
    cursor?: StakeholderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stakeholders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stakeholders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stakeholders.
     */
    distinct?: StakeholderScalarFieldEnum | StakeholderScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Stakeholder findMany
   */
  export type StakeholderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderInclude<ExtArgs> | null
    /**
     * Filter, which Stakeholders to fetch.
     */
    where?: StakeholderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stakeholders to fetch.
     */
    orderBy?: StakeholderOrderByWithRelationInput | StakeholderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stakeholders.
     */
    cursor?: StakeholderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stakeholders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stakeholders.
     */
    skip?: number
    distinct?: StakeholderScalarFieldEnum | StakeholderScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Stakeholder create
   */
  export type StakeholderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderInclude<ExtArgs> | null
    /**
     * The data needed to create a Stakeholder.
     */
    data: XOR<StakeholderCreateInput, StakeholderUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Stakeholder createMany
   */
  export type StakeholderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stakeholders.
     */
    data: StakeholderCreateManyInput | StakeholderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stakeholder createManyAndReturn
   */
  export type StakeholderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * The data used to create many Stakeholders.
     */
    data: StakeholderCreateManyInput | StakeholderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stakeholder update
   */
  export type StakeholderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderInclude<ExtArgs> | null
    /**
     * The data needed to update a Stakeholder.
     */
    data: XOR<StakeholderUpdateInput, StakeholderUncheckedUpdateInput>
    /**
     * Choose, which Stakeholder to update.
     */
    where: StakeholderWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Stakeholder updateMany
   */
  export type StakeholderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stakeholders.
     */
    data: XOR<StakeholderUpdateManyMutationInput, StakeholderUncheckedUpdateManyInput>
    /**
     * Filter which Stakeholders to update
     */
    where?: StakeholderWhereInput
    /**
     * Limit how many Stakeholders to update.
     */
    limit?: number
  }

  /**
   * Stakeholder updateManyAndReturn
   */
  export type StakeholderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * The data used to update Stakeholders.
     */
    data: XOR<StakeholderUpdateManyMutationInput, StakeholderUncheckedUpdateManyInput>
    /**
     * Filter which Stakeholders to update
     */
    where?: StakeholderWhereInput
    /**
     * Limit how many Stakeholders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stakeholder upsert
   */
  export type StakeholderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderInclude<ExtArgs> | null
    /**
     * The filter to search for the Stakeholder to update in case it exists.
     */
    where: StakeholderWhereUniqueInput
    /**
     * In case the Stakeholder found by the `where` argument doesn't exist, create a new Stakeholder with this data.
     */
    create: XOR<StakeholderCreateInput, StakeholderUncheckedCreateInput>
    /**
     * In case the Stakeholder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StakeholderUpdateInput, StakeholderUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Stakeholder delete
   */
  export type StakeholderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderInclude<ExtArgs> | null
    /**
     * Filter which Stakeholder to delete.
     */
    where: StakeholderWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Stakeholder deleteMany
   */
  export type StakeholderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stakeholders to delete
     */
    where?: StakeholderWhereInput
    /**
     * Limit how many Stakeholders to delete.
     */
    limit?: number
  }

  /**
   * Stakeholder without action
   */
  export type StakeholderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stakeholder
     */
    select?: StakeholderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stakeholder
     */
    omit?: StakeholderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakeholderInclude<ExtArgs> | null
  }


  /**
   * Model StrategyImplementer
   */

  export type AggregateStrategyImplementer = {
    _count: StrategyImplementerCountAggregateOutputType | null
    _avg: StrategyImplementerAvgAggregateOutputType | null
    _sum: StrategyImplementerSumAggregateOutputType | null
    _min: StrategyImplementerMinAggregateOutputType | null
    _max: StrategyImplementerMaxAggregateOutputType | null
  }

  export type StrategyImplementerAvgAggregateOutputType = {
    implementer_id: number | null
    strategy_id: number | null
    order_number: number | null
  }

  export type StrategyImplementerSumAggregateOutputType = {
    implementer_id: number | null
    strategy_id: number | null
    order_number: number | null
  }

  export type StrategyImplementerMinAggregateOutputType = {
    implementer_id: number | null
    strategy_id: number | null
    order_number: number | null
    is_primary: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StrategyImplementerMaxAggregateOutputType = {
    implementer_id: number | null
    strategy_id: number | null
    order_number: number | null
    is_primary: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StrategyImplementerCountAggregateOutputType = {
    implementer_id: number
    strategy_id: number
    order_number: number
    is_primary: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StrategyImplementerAvgAggregateInputType = {
    implementer_id?: true
    strategy_id?: true
    order_number?: true
  }

  export type StrategyImplementerSumAggregateInputType = {
    implementer_id?: true
    strategy_id?: true
    order_number?: true
  }

  export type StrategyImplementerMinAggregateInputType = {
    implementer_id?: true
    strategy_id?: true
    order_number?: true
    is_primary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StrategyImplementerMaxAggregateInputType = {
    implementer_id?: true
    strategy_id?: true
    order_number?: true
    is_primary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StrategyImplementerCountAggregateInputType = {
    implementer_id?: true
    strategy_id?: true
    order_number?: true
    is_primary?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StrategyImplementerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StrategyImplementer to aggregate.
     */
    where?: StrategyImplementerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StrategyImplementers to fetch.
     */
    orderBy?: StrategyImplementerOrderByWithRelationInput | StrategyImplementerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StrategyImplementerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StrategyImplementers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StrategyImplementers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StrategyImplementers
    **/
    _count?: true | StrategyImplementerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StrategyImplementerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StrategyImplementerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StrategyImplementerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StrategyImplementerMaxAggregateInputType
  }

  export type GetStrategyImplementerAggregateType<T extends StrategyImplementerAggregateArgs> = {
        [P in keyof T & keyof AggregateStrategyImplementer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStrategyImplementer[P]>
      : GetScalarType<T[P], AggregateStrategyImplementer[P]>
  }




  export type StrategyImplementerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrategyImplementerWhereInput
    orderBy?: StrategyImplementerOrderByWithAggregationInput | StrategyImplementerOrderByWithAggregationInput[]
    by: StrategyImplementerScalarFieldEnum[] | StrategyImplementerScalarFieldEnum
    having?: StrategyImplementerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StrategyImplementerCountAggregateInputType | true
    _avg?: StrategyImplementerAvgAggregateInputType
    _sum?: StrategyImplementerSumAggregateInputType
    _min?: StrategyImplementerMinAggregateInputType
    _max?: StrategyImplementerMaxAggregateInputType
  }

  export type StrategyImplementerGroupByOutputType = {
    implementer_id: number
    strategy_id: number
    order_number: number | null
    is_primary: boolean
    createdAt: Date
    updatedAt: Date
    _count: StrategyImplementerCountAggregateOutputType | null
    _avg: StrategyImplementerAvgAggregateOutputType | null
    _sum: StrategyImplementerSumAggregateOutputType | null
    _min: StrategyImplementerMinAggregateOutputType | null
    _max: StrategyImplementerMaxAggregateOutputType | null
  }

  type GetStrategyImplementerGroupByPayload<T extends StrategyImplementerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StrategyImplementerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StrategyImplementerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StrategyImplementerGroupByOutputType[P]>
            : GetScalarType<T[P], StrategyImplementerGroupByOutputType[P]>
        }
      >
    >


  export type StrategyImplementerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    implementer_id?: boolean
    strategy_id?: boolean
    order_number?: boolean
    is_primary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    implementer?: boolean | ImplementerDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["strategyImplementer"]>

  export type StrategyImplementerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    implementer_id?: boolean
    strategy_id?: boolean
    order_number?: boolean
    is_primary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    implementer?: boolean | ImplementerDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["strategyImplementer"]>

  export type StrategyImplementerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    implementer_id?: boolean
    strategy_id?: boolean
    order_number?: boolean
    is_primary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    implementer?: boolean | ImplementerDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["strategyImplementer"]>

  export type StrategyImplementerSelectScalar = {
    implementer_id?: boolean
    strategy_id?: boolean
    order_number?: boolean
    is_primary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StrategyImplementerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"implementer_id" | "strategy_id" | "order_number" | "is_primary" | "createdAt" | "updatedAt", ExtArgs["result"]["strategyImplementer"]>
  export type StrategyImplementerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    implementer?: boolean | ImplementerDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }
  export type StrategyImplementerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    implementer?: boolean | ImplementerDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }
  export type StrategyImplementerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    implementer?: boolean | ImplementerDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }

  export type $StrategyImplementerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StrategyImplementer"
    objects: {
      implementer: Prisma.$ImplementerPayload<ExtArgs>
      strategy: Prisma.$StrategyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      implementer_id: number
      strategy_id: number
      order_number: number | null
      is_primary: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["strategyImplementer"]>
    composites: {}
  }

  type StrategyImplementerGetPayload<S extends boolean | null | undefined | StrategyImplementerDefaultArgs> = $Result.GetResult<Prisma.$StrategyImplementerPayload, S>

  type StrategyImplementerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StrategyImplementerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: StrategyImplementerCountAggregateInputType | true
    }

  export interface StrategyImplementerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StrategyImplementer'], meta: { name: 'StrategyImplementer' } }
    /**
     * Find zero or one StrategyImplementer that matches the filter.
     * @param {StrategyImplementerFindUniqueArgs} args - Arguments to find a StrategyImplementer
     * @example
     * // Get one StrategyImplementer
     * const strategyImplementer = await prisma.strategyImplementer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StrategyImplementerFindUniqueArgs>(args: SelectSubset<T, StrategyImplementerFindUniqueArgs<ExtArgs>>): Prisma__StrategyImplementerClient<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StrategyImplementer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StrategyImplementerFindUniqueOrThrowArgs} args - Arguments to find a StrategyImplementer
     * @example
     * // Get one StrategyImplementer
     * const strategyImplementer = await prisma.strategyImplementer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StrategyImplementerFindUniqueOrThrowArgs>(args: SelectSubset<T, StrategyImplementerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StrategyImplementerClient<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StrategyImplementer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyImplementerFindFirstArgs} args - Arguments to find a StrategyImplementer
     * @example
     * // Get one StrategyImplementer
     * const strategyImplementer = await prisma.strategyImplementer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StrategyImplementerFindFirstArgs>(args?: SelectSubset<T, StrategyImplementerFindFirstArgs<ExtArgs>>): Prisma__StrategyImplementerClient<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StrategyImplementer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyImplementerFindFirstOrThrowArgs} args - Arguments to find a StrategyImplementer
     * @example
     * // Get one StrategyImplementer
     * const strategyImplementer = await prisma.strategyImplementer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StrategyImplementerFindFirstOrThrowArgs>(args?: SelectSubset<T, StrategyImplementerFindFirstOrThrowArgs<ExtArgs>>): Prisma__StrategyImplementerClient<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StrategyImplementers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyImplementerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StrategyImplementers
     * const strategyImplementers = await prisma.strategyImplementer.findMany()
     * 
     * // Get first 10 StrategyImplementers
     * const strategyImplementers = await prisma.strategyImplementer.findMany({ take: 10 })
     * 
     * // Only select the `implementer_id`
     * const strategyImplementerWithImplementer_idOnly = await prisma.strategyImplementer.findMany({ select: { implementer_id: true } })
     * 
     */
    findMany<T extends StrategyImplementerFindManyArgs>(args?: SelectSubset<T, StrategyImplementerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StrategyImplementer.
     * @param {StrategyImplementerCreateArgs} args - Arguments to create a StrategyImplementer.
     * @example
     * // Create one StrategyImplementer
     * const StrategyImplementer = await prisma.strategyImplementer.create({
     *   data: {
     *     // ... data to create a StrategyImplementer
     *   }
     * })
     * 
     */
    create<T extends StrategyImplementerCreateArgs>(args: SelectSubset<T, StrategyImplementerCreateArgs<ExtArgs>>): Prisma__StrategyImplementerClient<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StrategyImplementers.
     * @param {StrategyImplementerCreateManyArgs} args - Arguments to create many StrategyImplementers.
     * @example
     * // Create many StrategyImplementers
     * const strategyImplementer = await prisma.strategyImplementer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StrategyImplementerCreateManyArgs>(args?: SelectSubset<T, StrategyImplementerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StrategyImplementers and returns the data saved in the database.
     * @param {StrategyImplementerCreateManyAndReturnArgs} args - Arguments to create many StrategyImplementers.
     * @example
     * // Create many StrategyImplementers
     * const strategyImplementer = await prisma.strategyImplementer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StrategyImplementers and only return the `implementer_id`
     * const strategyImplementerWithImplementer_idOnly = await prisma.strategyImplementer.createManyAndReturn({
     *   select: { implementer_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StrategyImplementerCreateManyAndReturnArgs>(args?: SelectSubset<T, StrategyImplementerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StrategyImplementer.
     * @param {StrategyImplementerDeleteArgs} args - Arguments to delete one StrategyImplementer.
     * @example
     * // Delete one StrategyImplementer
     * const StrategyImplementer = await prisma.strategyImplementer.delete({
     *   where: {
     *     // ... filter to delete one StrategyImplementer
     *   }
     * })
     * 
     */
    delete<T extends StrategyImplementerDeleteArgs>(args: SelectSubset<T, StrategyImplementerDeleteArgs<ExtArgs>>): Prisma__StrategyImplementerClient<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StrategyImplementer.
     * @param {StrategyImplementerUpdateArgs} args - Arguments to update one StrategyImplementer.
     * @example
     * // Update one StrategyImplementer
     * const strategyImplementer = await prisma.strategyImplementer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StrategyImplementerUpdateArgs>(args: SelectSubset<T, StrategyImplementerUpdateArgs<ExtArgs>>): Prisma__StrategyImplementerClient<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StrategyImplementers.
     * @param {StrategyImplementerDeleteManyArgs} args - Arguments to filter StrategyImplementers to delete.
     * @example
     * // Delete a few StrategyImplementers
     * const { count } = await prisma.strategyImplementer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StrategyImplementerDeleteManyArgs>(args?: SelectSubset<T, StrategyImplementerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StrategyImplementers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyImplementerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StrategyImplementers
     * const strategyImplementer = await prisma.strategyImplementer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StrategyImplementerUpdateManyArgs>(args: SelectSubset<T, StrategyImplementerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StrategyImplementers and returns the data updated in the database.
     * @param {StrategyImplementerUpdateManyAndReturnArgs} args - Arguments to update many StrategyImplementers.
     * @example
     * // Update many StrategyImplementers
     * const strategyImplementer = await prisma.strategyImplementer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StrategyImplementers and only return the `implementer_id`
     * const strategyImplementerWithImplementer_idOnly = await prisma.strategyImplementer.updateManyAndReturn({
     *   select: { implementer_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StrategyImplementerUpdateManyAndReturnArgs>(args: SelectSubset<T, StrategyImplementerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StrategyImplementer.
     * @param {StrategyImplementerUpsertArgs} args - Arguments to update or create a StrategyImplementer.
     * @example
     * // Update or create a StrategyImplementer
     * const strategyImplementer = await prisma.strategyImplementer.upsert({
     *   create: {
     *     // ... data to create a StrategyImplementer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StrategyImplementer we want to update
     *   }
     * })
     */
    upsert<T extends StrategyImplementerUpsertArgs>(args: SelectSubset<T, StrategyImplementerUpsertArgs<ExtArgs>>): Prisma__StrategyImplementerClient<$Result.GetResult<Prisma.$StrategyImplementerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StrategyImplementers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyImplementerCountArgs} args - Arguments to filter StrategyImplementers to count.
     * @example
     * // Count the number of StrategyImplementers
     * const count = await prisma.strategyImplementer.count({
     *   where: {
     *     // ... the filter for the StrategyImplementers we want to count
     *   }
     * })
    **/
    count<T extends StrategyImplementerCountArgs>(
      args?: Subset<T, StrategyImplementerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StrategyImplementerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StrategyImplementer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyImplementerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StrategyImplementerAggregateArgs>(args: Subset<T, StrategyImplementerAggregateArgs>): Prisma.PrismaPromise<GetStrategyImplementerAggregateType<T>>

    /**
     * Group by StrategyImplementer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyImplementerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StrategyImplementerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StrategyImplementerGroupByArgs['orderBy'] }
        : { orderBy?: StrategyImplementerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StrategyImplementerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStrategyImplementerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StrategyImplementer model
   */
  readonly fields: StrategyImplementerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StrategyImplementer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StrategyImplementerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    implementer<T extends ImplementerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ImplementerDefaultArgs<ExtArgs>>): Prisma__ImplementerClient<$Result.GetResult<Prisma.$ImplementerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    strategy<T extends StrategyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StrategyDefaultArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StrategyImplementer model
   */
  interface StrategyImplementerFieldRefs {
    readonly implementer_id: FieldRef<"StrategyImplementer", 'Int'>
    readonly strategy_id: FieldRef<"StrategyImplementer", 'Int'>
    readonly order_number: FieldRef<"StrategyImplementer", 'Int'>
    readonly is_primary: FieldRef<"StrategyImplementer", 'Boolean'>
    readonly createdAt: FieldRef<"StrategyImplementer", 'DateTime'>
    readonly updatedAt: FieldRef<"StrategyImplementer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StrategyImplementer findUnique
   */
  export type StrategyImplementerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
    /**
     * Filter, which StrategyImplementer to fetch.
     */
    where: StrategyImplementerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StrategyImplementer findUniqueOrThrow
   */
  export type StrategyImplementerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
    /**
     * Filter, which StrategyImplementer to fetch.
     */
    where: StrategyImplementerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StrategyImplementer findFirst
   */
  export type StrategyImplementerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
    /**
     * Filter, which StrategyImplementer to fetch.
     */
    where?: StrategyImplementerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StrategyImplementers to fetch.
     */
    orderBy?: StrategyImplementerOrderByWithRelationInput | StrategyImplementerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StrategyImplementers.
     */
    cursor?: StrategyImplementerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StrategyImplementers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StrategyImplementers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StrategyImplementers.
     */
    distinct?: StrategyImplementerScalarFieldEnum | StrategyImplementerScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StrategyImplementer findFirstOrThrow
   */
  export type StrategyImplementerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
    /**
     * Filter, which StrategyImplementer to fetch.
     */
    where?: StrategyImplementerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StrategyImplementers to fetch.
     */
    orderBy?: StrategyImplementerOrderByWithRelationInput | StrategyImplementerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StrategyImplementers.
     */
    cursor?: StrategyImplementerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StrategyImplementers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StrategyImplementers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StrategyImplementers.
     */
    distinct?: StrategyImplementerScalarFieldEnum | StrategyImplementerScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StrategyImplementer findMany
   */
  export type StrategyImplementerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
    /**
     * Filter, which StrategyImplementers to fetch.
     */
    where?: StrategyImplementerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StrategyImplementers to fetch.
     */
    orderBy?: StrategyImplementerOrderByWithRelationInput | StrategyImplementerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StrategyImplementers.
     */
    cursor?: StrategyImplementerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StrategyImplementers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StrategyImplementers.
     */
    skip?: number
    distinct?: StrategyImplementerScalarFieldEnum | StrategyImplementerScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StrategyImplementer create
   */
  export type StrategyImplementerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
    /**
     * The data needed to create a StrategyImplementer.
     */
    data: XOR<StrategyImplementerCreateInput, StrategyImplementerUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StrategyImplementer createMany
   */
  export type StrategyImplementerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StrategyImplementers.
     */
    data: StrategyImplementerCreateManyInput | StrategyImplementerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StrategyImplementer createManyAndReturn
   */
  export type StrategyImplementerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * The data used to create many StrategyImplementers.
     */
    data: StrategyImplementerCreateManyInput | StrategyImplementerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StrategyImplementer update
   */
  export type StrategyImplementerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
    /**
     * The data needed to update a StrategyImplementer.
     */
    data: XOR<StrategyImplementerUpdateInput, StrategyImplementerUncheckedUpdateInput>
    /**
     * Choose, which StrategyImplementer to update.
     */
    where: StrategyImplementerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StrategyImplementer updateMany
   */
  export type StrategyImplementerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StrategyImplementers.
     */
    data: XOR<StrategyImplementerUpdateManyMutationInput, StrategyImplementerUncheckedUpdateManyInput>
    /**
     * Filter which StrategyImplementers to update
     */
    where?: StrategyImplementerWhereInput
    /**
     * Limit how many StrategyImplementers to update.
     */
    limit?: number
  }

  /**
   * StrategyImplementer updateManyAndReturn
   */
  export type StrategyImplementerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * The data used to update StrategyImplementers.
     */
    data: XOR<StrategyImplementerUpdateManyMutationInput, StrategyImplementerUncheckedUpdateManyInput>
    /**
     * Filter which StrategyImplementers to update
     */
    where?: StrategyImplementerWhereInput
    /**
     * Limit how many StrategyImplementers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StrategyImplementer upsert
   */
  export type StrategyImplementerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
    /**
     * The filter to search for the StrategyImplementer to update in case it exists.
     */
    where: StrategyImplementerWhereUniqueInput
    /**
     * In case the StrategyImplementer found by the `where` argument doesn't exist, create a new StrategyImplementer with this data.
     */
    create: XOR<StrategyImplementerCreateInput, StrategyImplementerUncheckedCreateInput>
    /**
     * In case the StrategyImplementer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StrategyImplementerUpdateInput, StrategyImplementerUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StrategyImplementer delete
   */
  export type StrategyImplementerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
    /**
     * Filter which StrategyImplementer to delete.
     */
    where: StrategyImplementerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * StrategyImplementer deleteMany
   */
  export type StrategyImplementerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StrategyImplementers to delete
     */
    where?: StrategyImplementerWhereInput
    /**
     * Limit how many StrategyImplementers to delete.
     */
    limit?: number
  }

  /**
   * StrategyImplementer without action
   */
  export type StrategyImplementerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyImplementer
     */
    select?: StrategyImplementerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyImplementer
     */
    omit?: StrategyImplementerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyImplementerInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    id: number | null
    strategy_id: number | null
    parent_id: number | null
  }

  export type CommentSumAggregateOutputType = {
    id: number | null
    strategy_id: number | null
    parent_id: number | null
  }

  export type CommentMinAggregateOutputType = {
    id: number | null
    user_id: string | null
    strategy_id: number | null
    parent_id: number | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: number | null
    user_id: string | null
    strategy_id: number | null
    parent_id: number | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    user_id: number
    strategy_id: number
    parent_id: number
    content: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    id?: true
    strategy_id?: true
    parent_id?: true
  }

  export type CommentSumAggregateInputType = {
    id?: true
    strategy_id?: true
    parent_id?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    user_id?: true
    strategy_id?: true
    parent_id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    user_id?: true
    strategy_id?: true
    parent_id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    user_id?: true
    strategy_id?: true
    parent_id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: number
    user_id: string
    strategy_id: number
    parent_id: number | null
    content: string
    createdAt: Date
    updatedAt: Date
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    strategy_id?: boolean
    parent_id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | Comment$parentArgs<ExtArgs>
    children?: boolean | Comment$childrenArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
    _count?: boolean | CommentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    strategy_id?: boolean
    parent_id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | Comment$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    strategy_id?: boolean
    parent_id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | Comment$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    user_id?: boolean
    strategy_id?: boolean
    parent_id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "strategy_id" | "parent_id" | "content" | "createdAt" | "updatedAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Comment$parentArgs<ExtArgs>
    children?: boolean | Comment$childrenArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
    _count?: boolean | CommentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Comment$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Comment$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      parent: Prisma.$CommentPayload<ExtArgs> | null
      children: Prisma.$CommentPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
      strategy: Prisma.$StrategyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: string
      strategy_id: number
      parent_id: number | null
      content: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Comment$parentArgs<ExtArgs> = {}>(args?: Subset<T, Comment$parentArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Comment$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Comment$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    strategy<T extends StrategyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StrategyDefaultArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'Int'>
    readonly user_id: FieldRef<"Comment", 'String'>
    readonly strategy_id: FieldRef<"Comment", 'Int'>
    readonly parent_id: FieldRef<"Comment", 'Int'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
    readonly updatedAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment.parent
   */
  export type Comment$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
  }

  /**
   * Comment.children
   */
  export type Comment$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    auth_source: 'auth_source',
    google_id: 'google_id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    display_name: 'display_name',
    profile_pic: 'profile_pic',
    nickname: 'nickname',
    given_name: 'given_name',
    family_name: 'family_name',
    password_hash: 'password_hash',
    email: 'email',
    disabled: 'disabled'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RelationLoadStrategy: {
    query: 'query',
    join: 'join'
  };

  export type RelationLoadStrategy = (typeof RelationLoadStrategy)[keyof typeof RelationLoadStrategy]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const UserRoleScalarFieldEnum: {
    role_id: 'role_id',
    user_id: 'user_id',
    createdAt: 'createdAt'
  };

  export type UserRoleScalarFieldEnum = (typeof UserRoleScalarFieldEnum)[keyof typeof UserRoleScalarFieldEnum]


  export const FocusAreaScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type FocusAreaScalarFieldEnum = (typeof FocusAreaScalarFieldEnum)[keyof typeof FocusAreaScalarFieldEnum]


  export const PoliciesScalarFieldEnum: {
    id: 'id',
    description: 'description',
    policy_number: 'policy_number',
    focus_area_id: 'focus_area_id'
  };

  export type PoliciesScalarFieldEnum = (typeof PoliciesScalarFieldEnum)[keyof typeof PoliciesScalarFieldEnum]


  export const TimelineOptionsScalarFieldEnum: {
    id: 'id',
    title: 'title'
  };

  export type TimelineOptionsScalarFieldEnum = (typeof TimelineOptionsScalarFieldEnum)[keyof typeof TimelineOptionsScalarFieldEnum]


  export const StatusOptionsScalarFieldEnum: {
    id: 'id',
    title: 'title'
  };

  export type StatusOptionsScalarFieldEnum = (typeof StatusOptionsScalarFieldEnum)[keyof typeof StatusOptionsScalarFieldEnum]


  export const StrategyScalarFieldEnum: {
    id: 'id',
    content: 'content',
    last_comms_date: 'last_comms_date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    policy_id: 'policy_id',
    strategy_number: 'strategy_number',
    timeline_id: 'timeline_id',
    status_id: 'status_id'
  };

  export type StrategyScalarFieldEnum = (typeof StrategyScalarFieldEnum)[keyof typeof StrategyScalarFieldEnum]


  export const ImplementerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    emails: 'emails',
    phone_numbers: 'phone_numbers',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    is_board: 'is_board',
    is_department: 'is_department',
    is_school: 'is_school'
  };

  export type ImplementerScalarFieldEnum = (typeof ImplementerScalarFieldEnum)[keyof typeof ImplementerScalarFieldEnum]


  export const StakeholderScalarFieldEnum: {
    id: 'id',
    name: 'name',
    organization_name: 'organization_name',
    emails: 'emails',
    phone_numbers: 'phone_numbers',
    strategy_id: 'strategy_id'
  };

  export type StakeholderScalarFieldEnum = (typeof StakeholderScalarFieldEnum)[keyof typeof StakeholderScalarFieldEnum]


  export const StrategyImplementerScalarFieldEnum: {
    implementer_id: 'implementer_id',
    strategy_id: 'strategy_id',
    order_number: 'order_number',
    is_primary: 'is_primary',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StrategyImplementerScalarFieldEnum = (typeof StrategyImplementerScalarFieldEnum)[keyof typeof StrategyImplementerScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    strategy_id: 'strategy_id',
    parent_id: 'parent_id',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    auth_source?: StringFilter<"User"> | string
    google_id?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    display_name?: StringNullableFilter<"User"> | string | null
    profile_pic?: StringNullableFilter<"User"> | string | null
    nickname?: StringNullableFilter<"User"> | string | null
    given_name?: StringNullableFilter<"User"> | string | null
    family_name?: StringNullableFilter<"User"> | string | null
    password_hash?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    disabled?: BoolFilter<"User"> | boolean
    assigned_implementers?: ImplementerListRelationFilter
    userRoles?: UserRoleListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    auth_source?: SortOrder
    google_id?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    display_name?: SortOrderInput | SortOrder
    profile_pic?: SortOrderInput | SortOrder
    nickname?: SortOrderInput | SortOrder
    given_name?: SortOrderInput | SortOrder
    family_name?: SortOrderInput | SortOrder
    password_hash?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    disabled?: SortOrder
    assigned_implementers?: ImplementerOrderByRelationAggregateInput
    userRoles?: UserRoleOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    google_id?: string
    display_name?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    auth_source?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile_pic?: StringNullableFilter<"User"> | string | null
    nickname?: StringNullableFilter<"User"> | string | null
    given_name?: StringNullableFilter<"User"> | string | null
    family_name?: StringNullableFilter<"User"> | string | null
    password_hash?: StringNullableFilter<"User"> | string | null
    disabled?: BoolFilter<"User"> | boolean
    assigned_implementers?: ImplementerListRelationFilter
    userRoles?: UserRoleListRelationFilter
    comments?: CommentListRelationFilter
  }, "id" | "google_id" | "display_name" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    auth_source?: SortOrder
    google_id?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    display_name?: SortOrderInput | SortOrder
    profile_pic?: SortOrderInput | SortOrder
    nickname?: SortOrderInput | SortOrder
    given_name?: SortOrderInput | SortOrder
    family_name?: SortOrderInput | SortOrder
    password_hash?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    disabled?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    auth_source?: StringWithAggregatesFilter<"User"> | string
    google_id?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    display_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    profile_pic?: StringNullableWithAggregatesFilter<"User"> | string | null
    nickname?: StringNullableWithAggregatesFilter<"User"> | string | null
    given_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    family_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password_hash?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    disabled?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    description?: StringFilter<"Role"> | string
    userRoles?: UserRoleListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    userRoles?: UserRoleOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    description?: StringFilter<"Role"> | string
    userRoles?: UserRoleListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Role"> | string
    name?: StringWithAggregatesFilter<"Role"> | string
    description?: StringWithAggregatesFilter<"Role"> | string
  }

  export type UserRoleWhereInput = {
    AND?: UserRoleWhereInput | UserRoleWhereInput[]
    OR?: UserRoleWhereInput[]
    NOT?: UserRoleWhereInput | UserRoleWhereInput[]
    role_id?: StringFilter<"UserRole"> | string
    user_id?: StringFilter<"UserRole"> | string
    createdAt?: DateTimeFilter<"UserRole"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserRoleOrderByWithRelationInput = {
    role_id?: SortOrder
    user_id?: SortOrder
    createdAt?: SortOrder
    role?: RoleOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserRoleWhereUniqueInput = Prisma.AtLeast<{
    user_id_role_id?: UserRoleUser_idRole_idCompoundUniqueInput
    AND?: UserRoleWhereInput | UserRoleWhereInput[]
    OR?: UserRoleWhereInput[]
    NOT?: UserRoleWhereInput | UserRoleWhereInput[]
    role_id?: StringFilter<"UserRole"> | string
    user_id?: StringFilter<"UserRole"> | string
    createdAt?: DateTimeFilter<"UserRole"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "user_id_role_id">

  export type UserRoleOrderByWithAggregationInput = {
    role_id?: SortOrder
    user_id?: SortOrder
    createdAt?: SortOrder
    _count?: UserRoleCountOrderByAggregateInput
    _max?: UserRoleMaxOrderByAggregateInput
    _min?: UserRoleMinOrderByAggregateInput
  }

  export type UserRoleScalarWhereWithAggregatesInput = {
    AND?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[]
    OR?: UserRoleScalarWhereWithAggregatesInput[]
    NOT?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[]
    role_id?: StringWithAggregatesFilter<"UserRole"> | string
    user_id?: StringWithAggregatesFilter<"UserRole"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserRole"> | Date | string
  }

  export type FocusAreaWhereInput = {
    AND?: FocusAreaWhereInput | FocusAreaWhereInput[]
    OR?: FocusAreaWhereInput[]
    NOT?: FocusAreaWhereInput | FocusAreaWhereInput[]
    id?: IntFilter<"FocusArea"> | number
    name?: StringFilter<"FocusArea"> | string
    policies?: PoliciesListRelationFilter
  }

  export type FocusAreaOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    policies?: PoliciesOrderByRelationAggregateInput
  }

  export type FocusAreaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FocusAreaWhereInput | FocusAreaWhereInput[]
    OR?: FocusAreaWhereInput[]
    NOT?: FocusAreaWhereInput | FocusAreaWhereInput[]
    name?: StringFilter<"FocusArea"> | string
    policies?: PoliciesListRelationFilter
  }, "id">

  export type FocusAreaOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: FocusAreaCountOrderByAggregateInput
    _avg?: FocusAreaAvgOrderByAggregateInput
    _max?: FocusAreaMaxOrderByAggregateInput
    _min?: FocusAreaMinOrderByAggregateInput
    _sum?: FocusAreaSumOrderByAggregateInput
  }

  export type FocusAreaScalarWhereWithAggregatesInput = {
    AND?: FocusAreaScalarWhereWithAggregatesInput | FocusAreaScalarWhereWithAggregatesInput[]
    OR?: FocusAreaScalarWhereWithAggregatesInput[]
    NOT?: FocusAreaScalarWhereWithAggregatesInput | FocusAreaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FocusArea"> | number
    name?: StringWithAggregatesFilter<"FocusArea"> | string
  }

  export type PoliciesWhereInput = {
    AND?: PoliciesWhereInput | PoliciesWhereInput[]
    OR?: PoliciesWhereInput[]
    NOT?: PoliciesWhereInput | PoliciesWhereInput[]
    id?: StringFilter<"Policies"> | string
    description?: StringFilter<"Policies"> | string
    policy_number?: IntFilter<"Policies"> | number
    focus_area_id?: IntFilter<"Policies"> | number
    area?: XOR<FocusAreaScalarRelationFilter, FocusAreaWhereInput>
    strategies?: StrategyListRelationFilter
  }

  export type PoliciesOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    policy_number?: SortOrder
    focus_area_id?: SortOrder
    area?: FocusAreaOrderByWithRelationInput
    strategies?: StrategyOrderByRelationAggregateInput
  }

  export type PoliciesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PoliciesWhereInput | PoliciesWhereInput[]
    OR?: PoliciesWhereInput[]
    NOT?: PoliciesWhereInput | PoliciesWhereInput[]
    description?: StringFilter<"Policies"> | string
    policy_number?: IntFilter<"Policies"> | number
    focus_area_id?: IntFilter<"Policies"> | number
    area?: XOR<FocusAreaScalarRelationFilter, FocusAreaWhereInput>
    strategies?: StrategyListRelationFilter
  }, "id">

  export type PoliciesOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    policy_number?: SortOrder
    focus_area_id?: SortOrder
    _count?: PoliciesCountOrderByAggregateInput
    _avg?: PoliciesAvgOrderByAggregateInput
    _max?: PoliciesMaxOrderByAggregateInput
    _min?: PoliciesMinOrderByAggregateInput
    _sum?: PoliciesSumOrderByAggregateInput
  }

  export type PoliciesScalarWhereWithAggregatesInput = {
    AND?: PoliciesScalarWhereWithAggregatesInput | PoliciesScalarWhereWithAggregatesInput[]
    OR?: PoliciesScalarWhereWithAggregatesInput[]
    NOT?: PoliciesScalarWhereWithAggregatesInput | PoliciesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Policies"> | string
    description?: StringWithAggregatesFilter<"Policies"> | string
    policy_number?: IntWithAggregatesFilter<"Policies"> | number
    focus_area_id?: IntWithAggregatesFilter<"Policies"> | number
  }

  export type TimelineOptionsWhereInput = {
    AND?: TimelineOptionsWhereInput | TimelineOptionsWhereInput[]
    OR?: TimelineOptionsWhereInput[]
    NOT?: TimelineOptionsWhereInput | TimelineOptionsWhereInput[]
    id?: IntFilter<"TimelineOptions"> | number
    title?: StringFilter<"TimelineOptions"> | string
    strategies?: StrategyListRelationFilter
  }

  export type TimelineOptionsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    strategies?: StrategyOrderByRelationAggregateInput
  }

  export type TimelineOptionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    title?: string
    AND?: TimelineOptionsWhereInput | TimelineOptionsWhereInput[]
    OR?: TimelineOptionsWhereInput[]
    NOT?: TimelineOptionsWhereInput | TimelineOptionsWhereInput[]
    strategies?: StrategyListRelationFilter
  }, "id" | "title">

  export type TimelineOptionsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    _count?: TimelineOptionsCountOrderByAggregateInput
    _avg?: TimelineOptionsAvgOrderByAggregateInput
    _max?: TimelineOptionsMaxOrderByAggregateInput
    _min?: TimelineOptionsMinOrderByAggregateInput
    _sum?: TimelineOptionsSumOrderByAggregateInput
  }

  export type TimelineOptionsScalarWhereWithAggregatesInput = {
    AND?: TimelineOptionsScalarWhereWithAggregatesInput | TimelineOptionsScalarWhereWithAggregatesInput[]
    OR?: TimelineOptionsScalarWhereWithAggregatesInput[]
    NOT?: TimelineOptionsScalarWhereWithAggregatesInput | TimelineOptionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TimelineOptions"> | number
    title?: StringWithAggregatesFilter<"TimelineOptions"> | string
  }

  export type StatusOptionsWhereInput = {
    AND?: StatusOptionsWhereInput | StatusOptionsWhereInput[]
    OR?: StatusOptionsWhereInput[]
    NOT?: StatusOptionsWhereInput | StatusOptionsWhereInput[]
    id?: IntFilter<"StatusOptions"> | number
    title?: StringFilter<"StatusOptions"> | string
    strategies?: StrategyListRelationFilter
  }

  export type StatusOptionsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    strategies?: StrategyOrderByRelationAggregateInput
  }

  export type StatusOptionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    title?: string
    AND?: StatusOptionsWhereInput | StatusOptionsWhereInput[]
    OR?: StatusOptionsWhereInput[]
    NOT?: StatusOptionsWhereInput | StatusOptionsWhereInput[]
    strategies?: StrategyListRelationFilter
  }, "id" | "title">

  export type StatusOptionsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    _count?: StatusOptionsCountOrderByAggregateInput
    _avg?: StatusOptionsAvgOrderByAggregateInput
    _max?: StatusOptionsMaxOrderByAggregateInput
    _min?: StatusOptionsMinOrderByAggregateInput
    _sum?: StatusOptionsSumOrderByAggregateInput
  }

  export type StatusOptionsScalarWhereWithAggregatesInput = {
    AND?: StatusOptionsScalarWhereWithAggregatesInput | StatusOptionsScalarWhereWithAggregatesInput[]
    OR?: StatusOptionsScalarWhereWithAggregatesInput[]
    NOT?: StatusOptionsScalarWhereWithAggregatesInput | StatusOptionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StatusOptions"> | number
    title?: StringWithAggregatesFilter<"StatusOptions"> | string
  }

  export type StrategyWhereInput = {
    AND?: StrategyWhereInput | StrategyWhereInput[]
    OR?: StrategyWhereInput[]
    NOT?: StrategyWhereInput | StrategyWhereInput[]
    id?: IntFilter<"Strategy"> | number
    content?: StringFilter<"Strategy"> | string
    last_comms_date?: DateTimeNullableFilter<"Strategy"> | Date | string | null
    createdAt?: DateTimeFilter<"Strategy"> | Date | string
    updatedAt?: DateTimeFilter<"Strategy"> | Date | string
    policy_id?: StringFilter<"Strategy"> | string
    strategy_number?: IntFilter<"Strategy"> | number
    timeline_id?: IntFilter<"Strategy"> | number
    status_id?: IntFilter<"Strategy"> | number
    stakeholders?: StakeholderListRelationFilter
    comments?: CommentListRelationFilter
    timeline?: XOR<TimelineOptionsScalarRelationFilter, TimelineOptionsWhereInput>
    status?: XOR<StatusOptionsScalarRelationFilter, StatusOptionsWhereInput>
    policy?: XOR<PoliciesScalarRelationFilter, PoliciesWhereInput>
    implementers?: StrategyImplementerListRelationFilter
  }

  export type StrategyOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    last_comms_date?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    policy_id?: SortOrder
    strategy_number?: SortOrder
    timeline_id?: SortOrder
    status_id?: SortOrder
    stakeholders?: StakeholderOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    timeline?: TimelineOptionsOrderByWithRelationInput
    status?: StatusOptionsOrderByWithRelationInput
    policy?: PoliciesOrderByWithRelationInput
    implementers?: StrategyImplementerOrderByRelationAggregateInput
  }

  export type StrategyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StrategyWhereInput | StrategyWhereInput[]
    OR?: StrategyWhereInput[]
    NOT?: StrategyWhereInput | StrategyWhereInput[]
    content?: StringFilter<"Strategy"> | string
    last_comms_date?: DateTimeNullableFilter<"Strategy"> | Date | string | null
    createdAt?: DateTimeFilter<"Strategy"> | Date | string
    updatedAt?: DateTimeFilter<"Strategy"> | Date | string
    policy_id?: StringFilter<"Strategy"> | string
    strategy_number?: IntFilter<"Strategy"> | number
    timeline_id?: IntFilter<"Strategy"> | number
    status_id?: IntFilter<"Strategy"> | number
    stakeholders?: StakeholderListRelationFilter
    comments?: CommentListRelationFilter
    timeline?: XOR<TimelineOptionsScalarRelationFilter, TimelineOptionsWhereInput>
    status?: XOR<StatusOptionsScalarRelationFilter, StatusOptionsWhereInput>
    policy?: XOR<PoliciesScalarRelationFilter, PoliciesWhereInput>
    implementers?: StrategyImplementerListRelationFilter
  }, "id">

  export type StrategyOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    last_comms_date?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    policy_id?: SortOrder
    strategy_number?: SortOrder
    timeline_id?: SortOrder
    status_id?: SortOrder
    _count?: StrategyCountOrderByAggregateInput
    _avg?: StrategyAvgOrderByAggregateInput
    _max?: StrategyMaxOrderByAggregateInput
    _min?: StrategyMinOrderByAggregateInput
    _sum?: StrategySumOrderByAggregateInput
  }

  export type StrategyScalarWhereWithAggregatesInput = {
    AND?: StrategyScalarWhereWithAggregatesInput | StrategyScalarWhereWithAggregatesInput[]
    OR?: StrategyScalarWhereWithAggregatesInput[]
    NOT?: StrategyScalarWhereWithAggregatesInput | StrategyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Strategy"> | number
    content?: StringWithAggregatesFilter<"Strategy"> | string
    last_comms_date?: DateTimeNullableWithAggregatesFilter<"Strategy"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Strategy"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Strategy"> | Date | string
    policy_id?: StringWithAggregatesFilter<"Strategy"> | string
    strategy_number?: IntWithAggregatesFilter<"Strategy"> | number
    timeline_id?: IntWithAggregatesFilter<"Strategy"> | number
    status_id?: IntWithAggregatesFilter<"Strategy"> | number
  }

  export type ImplementerWhereInput = {
    AND?: ImplementerWhereInput | ImplementerWhereInput[]
    OR?: ImplementerWhereInput[]
    NOT?: ImplementerWhereInput | ImplementerWhereInput[]
    id?: IntFilter<"Implementer"> | number
    name?: StringFilter<"Implementer"> | string
    emails?: StringNullableListFilter<"Implementer">
    phone_numbers?: StringNullableListFilter<"Implementer">
    createdAt?: DateTimeFilter<"Implementer"> | Date | string
    updatedAt?: DateTimeFilter<"Implementer"> | Date | string
    is_board?: BoolFilter<"Implementer"> | boolean
    is_department?: BoolFilter<"Implementer"> | boolean
    is_school?: BoolFilter<"Implementer"> | boolean
    cpic_smes?: UserListRelationFilter
    strategies?: StrategyImplementerListRelationFilter
  }

  export type ImplementerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    emails?: SortOrder
    phone_numbers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_board?: SortOrder
    is_department?: SortOrder
    is_school?: SortOrder
    cpic_smes?: UserOrderByRelationAggregateInput
    strategies?: StrategyImplementerOrderByRelationAggregateInput
  }

  export type ImplementerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ImplementerWhereInput | ImplementerWhereInput[]
    OR?: ImplementerWhereInput[]
    NOT?: ImplementerWhereInput | ImplementerWhereInput[]
    name?: StringFilter<"Implementer"> | string
    emails?: StringNullableListFilter<"Implementer">
    phone_numbers?: StringNullableListFilter<"Implementer">
    createdAt?: DateTimeFilter<"Implementer"> | Date | string
    updatedAt?: DateTimeFilter<"Implementer"> | Date | string
    is_board?: BoolFilter<"Implementer"> | boolean
    is_department?: BoolFilter<"Implementer"> | boolean
    is_school?: BoolFilter<"Implementer"> | boolean
    cpic_smes?: UserListRelationFilter
    strategies?: StrategyImplementerListRelationFilter
  }, "id">

  export type ImplementerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    emails?: SortOrder
    phone_numbers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_board?: SortOrder
    is_department?: SortOrder
    is_school?: SortOrder
    _count?: ImplementerCountOrderByAggregateInput
    _avg?: ImplementerAvgOrderByAggregateInput
    _max?: ImplementerMaxOrderByAggregateInput
    _min?: ImplementerMinOrderByAggregateInput
    _sum?: ImplementerSumOrderByAggregateInput
  }

  export type ImplementerScalarWhereWithAggregatesInput = {
    AND?: ImplementerScalarWhereWithAggregatesInput | ImplementerScalarWhereWithAggregatesInput[]
    OR?: ImplementerScalarWhereWithAggregatesInput[]
    NOT?: ImplementerScalarWhereWithAggregatesInput | ImplementerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Implementer"> | number
    name?: StringWithAggregatesFilter<"Implementer"> | string
    emails?: StringNullableListFilter<"Implementer">
    phone_numbers?: StringNullableListFilter<"Implementer">
    createdAt?: DateTimeWithAggregatesFilter<"Implementer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Implementer"> | Date | string
    is_board?: BoolWithAggregatesFilter<"Implementer"> | boolean
    is_department?: BoolWithAggregatesFilter<"Implementer"> | boolean
    is_school?: BoolWithAggregatesFilter<"Implementer"> | boolean
  }

  export type StakeholderWhereInput = {
    AND?: StakeholderWhereInput | StakeholderWhereInput[]
    OR?: StakeholderWhereInput[]
    NOT?: StakeholderWhereInput | StakeholderWhereInput[]
    id?: IntFilter<"Stakeholder"> | number
    name?: StringFilter<"Stakeholder"> | string
    organization_name?: StringNullableFilter<"Stakeholder"> | string | null
    emails?: StringNullableListFilter<"Stakeholder">
    phone_numbers?: StringNullableListFilter<"Stakeholder">
    strategy_id?: IntFilter<"Stakeholder"> | number
    strategy?: XOR<StrategyScalarRelationFilter, StrategyWhereInput>
  }

  export type StakeholderOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    organization_name?: SortOrderInput | SortOrder
    emails?: SortOrder
    phone_numbers?: SortOrder
    strategy_id?: SortOrder
    strategy?: StrategyOrderByWithRelationInput
  }

  export type StakeholderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StakeholderWhereInput | StakeholderWhereInput[]
    OR?: StakeholderWhereInput[]
    NOT?: StakeholderWhereInput | StakeholderWhereInput[]
    name?: StringFilter<"Stakeholder"> | string
    organization_name?: StringNullableFilter<"Stakeholder"> | string | null
    emails?: StringNullableListFilter<"Stakeholder">
    phone_numbers?: StringNullableListFilter<"Stakeholder">
    strategy_id?: IntFilter<"Stakeholder"> | number
    strategy?: XOR<StrategyScalarRelationFilter, StrategyWhereInput>
  }, "id">

  export type StakeholderOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    organization_name?: SortOrderInput | SortOrder
    emails?: SortOrder
    phone_numbers?: SortOrder
    strategy_id?: SortOrder
    _count?: StakeholderCountOrderByAggregateInput
    _avg?: StakeholderAvgOrderByAggregateInput
    _max?: StakeholderMaxOrderByAggregateInput
    _min?: StakeholderMinOrderByAggregateInput
    _sum?: StakeholderSumOrderByAggregateInput
  }

  export type StakeholderScalarWhereWithAggregatesInput = {
    AND?: StakeholderScalarWhereWithAggregatesInput | StakeholderScalarWhereWithAggregatesInput[]
    OR?: StakeholderScalarWhereWithAggregatesInput[]
    NOT?: StakeholderScalarWhereWithAggregatesInput | StakeholderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Stakeholder"> | number
    name?: StringWithAggregatesFilter<"Stakeholder"> | string
    organization_name?: StringNullableWithAggregatesFilter<"Stakeholder"> | string | null
    emails?: StringNullableListFilter<"Stakeholder">
    phone_numbers?: StringNullableListFilter<"Stakeholder">
    strategy_id?: IntWithAggregatesFilter<"Stakeholder"> | number
  }

  export type StrategyImplementerWhereInput = {
    AND?: StrategyImplementerWhereInput | StrategyImplementerWhereInput[]
    OR?: StrategyImplementerWhereInput[]
    NOT?: StrategyImplementerWhereInput | StrategyImplementerWhereInput[]
    implementer_id?: IntFilter<"StrategyImplementer"> | number
    strategy_id?: IntFilter<"StrategyImplementer"> | number
    order_number?: IntNullableFilter<"StrategyImplementer"> | number | null
    is_primary?: BoolFilter<"StrategyImplementer"> | boolean
    createdAt?: DateTimeFilter<"StrategyImplementer"> | Date | string
    updatedAt?: DateTimeFilter<"StrategyImplementer"> | Date | string
    implementer?: XOR<ImplementerScalarRelationFilter, ImplementerWhereInput>
    strategy?: XOR<StrategyScalarRelationFilter, StrategyWhereInput>
  }

  export type StrategyImplementerOrderByWithRelationInput = {
    implementer_id?: SortOrder
    strategy_id?: SortOrder
    order_number?: SortOrderInput | SortOrder
    is_primary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    implementer?: ImplementerOrderByWithRelationInput
    strategy?: StrategyOrderByWithRelationInput
  }

  export type StrategyImplementerWhereUniqueInput = Prisma.AtLeast<{
    implementer_id_strategy_id?: StrategyImplementerImplementer_idStrategy_idCompoundUniqueInput
    AND?: StrategyImplementerWhereInput | StrategyImplementerWhereInput[]
    OR?: StrategyImplementerWhereInput[]
    NOT?: StrategyImplementerWhereInput | StrategyImplementerWhereInput[]
    implementer_id?: IntFilter<"StrategyImplementer"> | number
    strategy_id?: IntFilter<"StrategyImplementer"> | number
    order_number?: IntNullableFilter<"StrategyImplementer"> | number | null
    is_primary?: BoolFilter<"StrategyImplementer"> | boolean
    createdAt?: DateTimeFilter<"StrategyImplementer"> | Date | string
    updatedAt?: DateTimeFilter<"StrategyImplementer"> | Date | string
    implementer?: XOR<ImplementerScalarRelationFilter, ImplementerWhereInput>
    strategy?: XOR<StrategyScalarRelationFilter, StrategyWhereInput>
  }, "implementer_id_strategy_id">

  export type StrategyImplementerOrderByWithAggregationInput = {
    implementer_id?: SortOrder
    strategy_id?: SortOrder
    order_number?: SortOrderInput | SortOrder
    is_primary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StrategyImplementerCountOrderByAggregateInput
    _avg?: StrategyImplementerAvgOrderByAggregateInput
    _max?: StrategyImplementerMaxOrderByAggregateInput
    _min?: StrategyImplementerMinOrderByAggregateInput
    _sum?: StrategyImplementerSumOrderByAggregateInput
  }

  export type StrategyImplementerScalarWhereWithAggregatesInput = {
    AND?: StrategyImplementerScalarWhereWithAggregatesInput | StrategyImplementerScalarWhereWithAggregatesInput[]
    OR?: StrategyImplementerScalarWhereWithAggregatesInput[]
    NOT?: StrategyImplementerScalarWhereWithAggregatesInput | StrategyImplementerScalarWhereWithAggregatesInput[]
    implementer_id?: IntWithAggregatesFilter<"StrategyImplementer"> | number
    strategy_id?: IntWithAggregatesFilter<"StrategyImplementer"> | number
    order_number?: IntNullableWithAggregatesFilter<"StrategyImplementer"> | number | null
    is_primary?: BoolWithAggregatesFilter<"StrategyImplementer"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"StrategyImplementer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StrategyImplementer"> | Date | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: IntFilter<"Comment"> | number
    user_id?: StringFilter<"Comment"> | string
    strategy_id?: IntFilter<"Comment"> | number
    parent_id?: IntNullableFilter<"Comment"> | number | null
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    parent?: XOR<CommentNullableScalarRelationFilter, CommentWhereInput> | null
    children?: CommentListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    strategy?: XOR<StrategyScalarRelationFilter, StrategyWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    strategy_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parent?: CommentOrderByWithRelationInput
    children?: CommentOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
    strategy?: StrategyOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    user_id?: StringFilter<"Comment"> | string
    strategy_id?: IntFilter<"Comment"> | number
    parent_id?: IntNullableFilter<"Comment"> | number | null
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    parent?: XOR<CommentNullableScalarRelationFilter, CommentWhereInput> | null
    children?: CommentListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    strategy?: XOR<StrategyScalarRelationFilter, StrategyWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    strategy_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _avg?: CommentAvgOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
    _sum?: CommentSumOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Comment"> | number
    user_id?: StringWithAggregatesFilter<"Comment"> | string
    strategy_id?: IntWithAggregatesFilter<"Comment"> | number
    parent_id?: IntNullableWithAggregatesFilter<"Comment"> | number | null
    content?: StringWithAggregatesFilter<"Comment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    auth_source?: string
    google_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    display_name?: string | null
    profile_pic?: string | null
    nickname?: string | null
    given_name?: string | null
    family_name?: string | null
    password_hash?: string | null
    email?: string | null
    disabled?: boolean
    assigned_implementers?: ImplementerCreateNestedManyWithoutCpic_smesInput
    userRoles?: UserRoleCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    auth_source?: string
    google_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    display_name?: string | null
    profile_pic?: string | null
    nickname?: string | null
    given_name?: string | null
    family_name?: string | null
    password_hash?: string | null
    email?: string | null
    disabled?: boolean
    assigned_implementers?: ImplementerUncheckedCreateNestedManyWithoutCpic_smesInput
    userRoles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_source?: StringFieldUpdateOperationsInput | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: BoolFieldUpdateOperationsInput | boolean
    assigned_implementers?: ImplementerUpdateManyWithoutCpic_smesNestedInput
    userRoles?: UserRoleUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_source?: StringFieldUpdateOperationsInput | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: BoolFieldUpdateOperationsInput | boolean
    assigned_implementers?: ImplementerUncheckedUpdateManyWithoutCpic_smesNestedInput
    userRoles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    auth_source?: string
    google_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    display_name?: string | null
    profile_pic?: string | null
    nickname?: string | null
    given_name?: string | null
    family_name?: string | null
    password_hash?: string | null
    email?: string | null
    disabled?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_source?: StringFieldUpdateOperationsInput | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_source?: StringFieldUpdateOperationsInput | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RoleCreateInput = {
    id?: string
    name: string
    description: string
    userRoles?: UserRoleCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    userRoles?: UserRoleUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    userRoles?: UserRoleUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    userRoles?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: string
    name: string
    description: string
  }

  export type RoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type UserRoleCreateInput = {
    createdAt?: Date | string
    role: RoleCreateNestedOneWithoutUserRolesInput
    user: UserCreateNestedOneWithoutUserRolesInput
  }

  export type UserRoleUncheckedCreateInput = {
    role_id: string
    user_id: string
    createdAt?: Date | string
  }

  export type UserRoleUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUserRolesNestedInput
    user?: UserUpdateOneRequiredWithoutUserRolesNestedInput
  }

  export type UserRoleUncheckedUpdateInput = {
    role_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleCreateManyInput = {
    role_id: string
    user_id: string
    createdAt?: Date | string
  }

  export type UserRoleUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyInput = {
    role_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FocusAreaCreateInput = {
    name: string
    policies?: PoliciesCreateNestedManyWithoutAreaInput
  }

  export type FocusAreaUncheckedCreateInput = {
    id?: number
    name: string
    policies?: PoliciesUncheckedCreateNestedManyWithoutAreaInput
  }

  export type FocusAreaUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    policies?: PoliciesUpdateManyWithoutAreaNestedInput
  }

  export type FocusAreaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    policies?: PoliciesUncheckedUpdateManyWithoutAreaNestedInput
  }

  export type FocusAreaCreateManyInput = {
    id?: number
    name: string
  }

  export type FocusAreaUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type FocusAreaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PoliciesCreateInput = {
    id?: string
    description: string
    policy_number: number
    area: FocusAreaCreateNestedOneWithoutPoliciesInput
    strategies?: StrategyCreateNestedManyWithoutPolicyInput
  }

  export type PoliciesUncheckedCreateInput = {
    id?: string
    description: string
    policy_number: number
    focus_area_id: number
    strategies?: StrategyUncheckedCreateNestedManyWithoutPolicyInput
  }

  export type PoliciesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    policy_number?: IntFieldUpdateOperationsInput | number
    area?: FocusAreaUpdateOneRequiredWithoutPoliciesNestedInput
    strategies?: StrategyUpdateManyWithoutPolicyNestedInput
  }

  export type PoliciesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    policy_number?: IntFieldUpdateOperationsInput | number
    focus_area_id?: IntFieldUpdateOperationsInput | number
    strategies?: StrategyUncheckedUpdateManyWithoutPolicyNestedInput
  }

  export type PoliciesCreateManyInput = {
    id?: string
    description: string
    policy_number: number
    focus_area_id: number
  }

  export type PoliciesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    policy_number?: IntFieldUpdateOperationsInput | number
  }

  export type PoliciesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    policy_number?: IntFieldUpdateOperationsInput | number
    focus_area_id?: IntFieldUpdateOperationsInput | number
  }

  export type TimelineOptionsCreateInput = {
    title: string
    strategies?: StrategyCreateNestedManyWithoutTimelineInput
  }

  export type TimelineOptionsUncheckedCreateInput = {
    id?: number
    title: string
    strategies?: StrategyUncheckedCreateNestedManyWithoutTimelineInput
  }

  export type TimelineOptionsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    strategies?: StrategyUpdateManyWithoutTimelineNestedInput
  }

  export type TimelineOptionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    strategies?: StrategyUncheckedUpdateManyWithoutTimelineNestedInput
  }

  export type TimelineOptionsCreateManyInput = {
    id?: number
    title: string
  }

  export type TimelineOptionsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
  }

  export type TimelineOptionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
  }

  export type StatusOptionsCreateInput = {
    title: string
    strategies?: StrategyCreateNestedManyWithoutStatusInput
  }

  export type StatusOptionsUncheckedCreateInput = {
    id?: number
    title: string
    strategies?: StrategyUncheckedCreateNestedManyWithoutStatusInput
  }

  export type StatusOptionsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    strategies?: StrategyUpdateManyWithoutStatusNestedInput
  }

  export type StatusOptionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    strategies?: StrategyUncheckedUpdateManyWithoutStatusNestedInput
  }

  export type StatusOptionsCreateManyInput = {
    id?: number
    title: string
  }

  export type StatusOptionsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
  }

  export type StatusOptionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
  }

  export type StrategyCreateInput = {
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    strategy_number: number
    stakeholders?: StakeholderCreateNestedManyWithoutStrategyInput
    comments?: CommentCreateNestedManyWithoutStrategyInput
    timeline: TimelineOptionsCreateNestedOneWithoutStrategiesInput
    status: StatusOptionsCreateNestedOneWithoutStrategiesInput
    policy: PoliciesCreateNestedOneWithoutStrategiesInput
    implementers?: StrategyImplementerCreateNestedManyWithoutStrategyInput
  }

  export type StrategyUncheckedCreateInput = {
    id?: number
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    policy_id: string
    strategy_number: number
    timeline_id: number
    status_id: number
    stakeholders?: StakeholderUncheckedCreateNestedManyWithoutStrategyInput
    comments?: CommentUncheckedCreateNestedManyWithoutStrategyInput
    implementers?: StrategyImplementerUncheckedCreateNestedManyWithoutStrategyInput
  }

  export type StrategyUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUpdateManyWithoutStrategyNestedInput
    comments?: CommentUpdateManyWithoutStrategyNestedInput
    timeline?: TimelineOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    status?: StatusOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    policy?: PoliciesUpdateOneRequiredWithoutStrategiesNestedInput
    implementers?: StrategyImplementerUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_id?: StringFieldUpdateOperationsInput | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    timeline_id?: IntFieldUpdateOperationsInput | number
    status_id?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUncheckedUpdateManyWithoutStrategyNestedInput
    comments?: CommentUncheckedUpdateManyWithoutStrategyNestedInput
    implementers?: StrategyImplementerUncheckedUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyCreateManyInput = {
    id?: number
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    policy_id: string
    strategy_number: number
    timeline_id: number
    status_id: number
  }

  export type StrategyUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy_number?: IntFieldUpdateOperationsInput | number
  }

  export type StrategyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_id?: StringFieldUpdateOperationsInput | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    timeline_id?: IntFieldUpdateOperationsInput | number
    status_id?: IntFieldUpdateOperationsInput | number
  }

  export type ImplementerCreateInput = {
    name: string
    emails?: ImplementerCreateemailsInput | string[]
    phone_numbers?: ImplementerCreatephone_numbersInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    is_board?: boolean
    is_department?: boolean
    is_school?: boolean
    cpic_smes?: UserCreateNestedManyWithoutAssigned_implementersInput
    strategies?: StrategyImplementerCreateNestedManyWithoutImplementerInput
  }

  export type ImplementerUncheckedCreateInput = {
    id?: number
    name: string
    emails?: ImplementerCreateemailsInput | string[]
    phone_numbers?: ImplementerCreatephone_numbersInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    is_board?: boolean
    is_department?: boolean
    is_school?: boolean
    cpic_smes?: UserUncheckedCreateNestedManyWithoutAssigned_implementersInput
    strategies?: StrategyImplementerUncheckedCreateNestedManyWithoutImplementerInput
  }

  export type ImplementerUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    emails?: ImplementerUpdateemailsInput | string[]
    phone_numbers?: ImplementerUpdatephone_numbersInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_board?: BoolFieldUpdateOperationsInput | boolean
    is_department?: BoolFieldUpdateOperationsInput | boolean
    is_school?: BoolFieldUpdateOperationsInput | boolean
    cpic_smes?: UserUpdateManyWithoutAssigned_implementersNestedInput
    strategies?: StrategyImplementerUpdateManyWithoutImplementerNestedInput
  }

  export type ImplementerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    emails?: ImplementerUpdateemailsInput | string[]
    phone_numbers?: ImplementerUpdatephone_numbersInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_board?: BoolFieldUpdateOperationsInput | boolean
    is_department?: BoolFieldUpdateOperationsInput | boolean
    is_school?: BoolFieldUpdateOperationsInput | boolean
    cpic_smes?: UserUncheckedUpdateManyWithoutAssigned_implementersNestedInput
    strategies?: StrategyImplementerUncheckedUpdateManyWithoutImplementerNestedInput
  }

  export type ImplementerCreateManyInput = {
    id?: number
    name: string
    emails?: ImplementerCreateemailsInput | string[]
    phone_numbers?: ImplementerCreatephone_numbersInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    is_board?: boolean
    is_department?: boolean
    is_school?: boolean
  }

  export type ImplementerUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    emails?: ImplementerUpdateemailsInput | string[]
    phone_numbers?: ImplementerUpdatephone_numbersInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_board?: BoolFieldUpdateOperationsInput | boolean
    is_department?: BoolFieldUpdateOperationsInput | boolean
    is_school?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ImplementerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    emails?: ImplementerUpdateemailsInput | string[]
    phone_numbers?: ImplementerUpdatephone_numbersInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_board?: BoolFieldUpdateOperationsInput | boolean
    is_department?: BoolFieldUpdateOperationsInput | boolean
    is_school?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StakeholderCreateInput = {
    name: string
    organization_name?: string | null
    emails?: StakeholderCreateemailsInput | string[]
    phone_numbers?: StakeholderCreatephone_numbersInput | string[]
    strategy: StrategyCreateNestedOneWithoutStakeholdersInput
  }

  export type StakeholderUncheckedCreateInput = {
    id?: number
    name: string
    organization_name?: string | null
    emails?: StakeholderCreateemailsInput | string[]
    phone_numbers?: StakeholderCreatephone_numbersInput | string[]
    strategy_id: number
  }

  export type StakeholderUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    organization_name?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: StakeholderUpdateemailsInput | string[]
    phone_numbers?: StakeholderUpdatephone_numbersInput | string[]
    strategy?: StrategyUpdateOneRequiredWithoutStakeholdersNestedInput
  }

  export type StakeholderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    organization_name?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: StakeholderUpdateemailsInput | string[]
    phone_numbers?: StakeholderUpdatephone_numbersInput | string[]
    strategy_id?: IntFieldUpdateOperationsInput | number
  }

  export type StakeholderCreateManyInput = {
    id?: number
    name: string
    organization_name?: string | null
    emails?: StakeholderCreateemailsInput | string[]
    phone_numbers?: StakeholderCreatephone_numbersInput | string[]
    strategy_id: number
  }

  export type StakeholderUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    organization_name?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: StakeholderUpdateemailsInput | string[]
    phone_numbers?: StakeholderUpdatephone_numbersInput | string[]
  }

  export type StakeholderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    organization_name?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: StakeholderUpdateemailsInput | string[]
    phone_numbers?: StakeholderUpdatephone_numbersInput | string[]
    strategy_id?: IntFieldUpdateOperationsInput | number
  }

  export type StrategyImplementerCreateInput = {
    order_number?: number | null
    is_primary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    implementer: ImplementerCreateNestedOneWithoutStrategiesInput
    strategy: StrategyCreateNestedOneWithoutImplementersInput
  }

  export type StrategyImplementerUncheckedCreateInput = {
    implementer_id: number
    strategy_id: number
    order_number?: number | null
    is_primary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StrategyImplementerUpdateInput = {
    order_number?: NullableIntFieldUpdateOperationsInput | number | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    implementer?: ImplementerUpdateOneRequiredWithoutStrategiesNestedInput
    strategy?: StrategyUpdateOneRequiredWithoutImplementersNestedInput
  }

  export type StrategyImplementerUncheckedUpdateInput = {
    implementer_id?: IntFieldUpdateOperationsInput | number
    strategy_id?: IntFieldUpdateOperationsInput | number
    order_number?: NullableIntFieldUpdateOperationsInput | number | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StrategyImplementerCreateManyInput = {
    implementer_id: number
    strategy_id: number
    order_number?: number | null
    is_primary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StrategyImplementerUpdateManyMutationInput = {
    order_number?: NullableIntFieldUpdateOperationsInput | number | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StrategyImplementerUncheckedUpdateManyInput = {
    implementer_id?: IntFieldUpdateOperationsInput | number
    strategy_id?: IntFieldUpdateOperationsInput | number
    order_number?: NullableIntFieldUpdateOperationsInput | number | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CommentCreateNestedOneWithoutChildrenInput
    children?: CommentCreateNestedManyWithoutParentInput
    user: UserCreateNestedOneWithoutCommentsInput
    strategy: StrategyCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: number
    user_id: string
    strategy_id: number
    parent_id?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type CommentUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CommentUpdateOneWithoutChildrenNestedInput
    children?: CommentUpdateManyWithoutParentNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    strategy?: StrategyUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: StringFieldUpdateOperationsInput | string
    strategy_id?: IntFieldUpdateOperationsInput | number
    parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type CommentCreateManyInput = {
    id?: number
    user_id: string
    strategy_id: number
    parent_id?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: StringFieldUpdateOperationsInput | string
    strategy_id?: IntFieldUpdateOperationsInput | number
    parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ImplementerListRelationFilter = {
    every?: ImplementerWhereInput
    some?: ImplementerWhereInput
    none?: ImplementerWhereInput
  }

  export type UserRoleListRelationFilter = {
    every?: UserRoleWhereInput
    some?: UserRoleWhereInput
    none?: UserRoleWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ImplementerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserRoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    auth_source?: SortOrder
    google_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    display_name?: SortOrder
    profile_pic?: SortOrder
    nickname?: SortOrder
    given_name?: SortOrder
    family_name?: SortOrder
    password_hash?: SortOrder
    email?: SortOrder
    disabled?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    auth_source?: SortOrder
    google_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    display_name?: SortOrder
    profile_pic?: SortOrder
    nickname?: SortOrder
    given_name?: SortOrder
    family_name?: SortOrder
    password_hash?: SortOrder
    email?: SortOrder
    disabled?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    auth_source?: SortOrder
    google_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    display_name?: SortOrder
    profile_pic?: SortOrder
    nickname?: SortOrder
    given_name?: SortOrder
    family_name?: SortOrder
    password_hash?: SortOrder
    email?: SortOrder
    disabled?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserRoleUser_idRole_idCompoundUniqueInput = {
    user_id: string
    role_id: string
  }

  export type UserRoleCountOrderByAggregateInput = {
    role_id?: SortOrder
    user_id?: SortOrder
    createdAt?: SortOrder
  }

  export type UserRoleMaxOrderByAggregateInput = {
    role_id?: SortOrder
    user_id?: SortOrder
    createdAt?: SortOrder
  }

  export type UserRoleMinOrderByAggregateInput = {
    role_id?: SortOrder
    user_id?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PoliciesListRelationFilter = {
    every?: PoliciesWhereInput
    some?: PoliciesWhereInput
    none?: PoliciesWhereInput
  }

  export type PoliciesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FocusAreaCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type FocusAreaAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FocusAreaMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type FocusAreaMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type FocusAreaSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FocusAreaScalarRelationFilter = {
    is?: FocusAreaWhereInput
    isNot?: FocusAreaWhereInput
  }

  export type StrategyListRelationFilter = {
    every?: StrategyWhereInput
    some?: StrategyWhereInput
    none?: StrategyWhereInput
  }

  export type StrategyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PoliciesCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    policy_number?: SortOrder
    focus_area_id?: SortOrder
  }

  export type PoliciesAvgOrderByAggregateInput = {
    policy_number?: SortOrder
    focus_area_id?: SortOrder
  }

  export type PoliciesMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    policy_number?: SortOrder
    focus_area_id?: SortOrder
  }

  export type PoliciesMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    policy_number?: SortOrder
    focus_area_id?: SortOrder
  }

  export type PoliciesSumOrderByAggregateInput = {
    policy_number?: SortOrder
    focus_area_id?: SortOrder
  }

  export type TimelineOptionsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type TimelineOptionsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TimelineOptionsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type TimelineOptionsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type TimelineOptionsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StatusOptionsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type StatusOptionsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StatusOptionsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type StatusOptionsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type StatusOptionsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StakeholderListRelationFilter = {
    every?: StakeholderWhereInput
    some?: StakeholderWhereInput
    none?: StakeholderWhereInput
  }

  export type TimelineOptionsScalarRelationFilter = {
    is?: TimelineOptionsWhereInput
    isNot?: TimelineOptionsWhereInput
  }

  export type StatusOptionsScalarRelationFilter = {
    is?: StatusOptionsWhereInput
    isNot?: StatusOptionsWhereInput
  }

  export type PoliciesScalarRelationFilter = {
    is?: PoliciesWhereInput
    isNot?: PoliciesWhereInput
  }

  export type StrategyImplementerListRelationFilter = {
    every?: StrategyImplementerWhereInput
    some?: StrategyImplementerWhereInput
    none?: StrategyImplementerWhereInput
  }

  export type StakeholderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StrategyImplementerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StrategyCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    last_comms_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    policy_id?: SortOrder
    strategy_number?: SortOrder
    timeline_id?: SortOrder
    status_id?: SortOrder
  }

  export type StrategyAvgOrderByAggregateInput = {
    id?: SortOrder
    strategy_number?: SortOrder
    timeline_id?: SortOrder
    status_id?: SortOrder
  }

  export type StrategyMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    last_comms_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    policy_id?: SortOrder
    strategy_number?: SortOrder
    timeline_id?: SortOrder
    status_id?: SortOrder
  }

  export type StrategyMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    last_comms_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    policy_id?: SortOrder
    strategy_number?: SortOrder
    timeline_id?: SortOrder
    status_id?: SortOrder
  }

  export type StrategySumOrderByAggregateInput = {
    id?: SortOrder
    strategy_number?: SortOrder
    timeline_id?: SortOrder
    status_id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ImplementerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    emails?: SortOrder
    phone_numbers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_board?: SortOrder
    is_department?: SortOrder
    is_school?: SortOrder
  }

  export type ImplementerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ImplementerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_board?: SortOrder
    is_department?: SortOrder
    is_school?: SortOrder
  }

  export type ImplementerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_board?: SortOrder
    is_department?: SortOrder
    is_school?: SortOrder
  }

  export type ImplementerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StrategyScalarRelationFilter = {
    is?: StrategyWhereInput
    isNot?: StrategyWhereInput
  }

  export type StakeholderCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    organization_name?: SortOrder
    emails?: SortOrder
    phone_numbers?: SortOrder
    strategy_id?: SortOrder
  }

  export type StakeholderAvgOrderByAggregateInput = {
    id?: SortOrder
    strategy_id?: SortOrder
  }

  export type StakeholderMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    organization_name?: SortOrder
    strategy_id?: SortOrder
  }

  export type StakeholderMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    organization_name?: SortOrder
    strategy_id?: SortOrder
  }

  export type StakeholderSumOrderByAggregateInput = {
    id?: SortOrder
    strategy_id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ImplementerScalarRelationFilter = {
    is?: ImplementerWhereInput
    isNot?: ImplementerWhereInput
  }

  export type StrategyImplementerImplementer_idStrategy_idCompoundUniqueInput = {
    implementer_id: number
    strategy_id: number
  }

  export type StrategyImplementerCountOrderByAggregateInput = {
    implementer_id?: SortOrder
    strategy_id?: SortOrder
    order_number?: SortOrder
    is_primary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StrategyImplementerAvgOrderByAggregateInput = {
    implementer_id?: SortOrder
    strategy_id?: SortOrder
    order_number?: SortOrder
  }

  export type StrategyImplementerMaxOrderByAggregateInput = {
    implementer_id?: SortOrder
    strategy_id?: SortOrder
    order_number?: SortOrder
    is_primary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StrategyImplementerMinOrderByAggregateInput = {
    implementer_id?: SortOrder
    strategy_id?: SortOrder
    order_number?: SortOrder
    is_primary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StrategyImplementerSumOrderByAggregateInput = {
    implementer_id?: SortOrder
    strategy_id?: SortOrder
    order_number?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CommentNullableScalarRelationFilter = {
    is?: CommentWhereInput | null
    isNot?: CommentWhereInput | null
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    strategy_id?: SortOrder
    parent_id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentAvgOrderByAggregateInput = {
    id?: SortOrder
    strategy_id?: SortOrder
    parent_id?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    strategy_id?: SortOrder
    parent_id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    strategy_id?: SortOrder
    parent_id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentSumOrderByAggregateInput = {
    id?: SortOrder
    strategy_id?: SortOrder
    parent_id?: SortOrder
  }

  export type ImplementerCreateNestedManyWithoutCpic_smesInput = {
    create?: XOR<ImplementerCreateWithoutCpic_smesInput, ImplementerUncheckedCreateWithoutCpic_smesInput> | ImplementerCreateWithoutCpic_smesInput[] | ImplementerUncheckedCreateWithoutCpic_smesInput[]
    connectOrCreate?: ImplementerCreateOrConnectWithoutCpic_smesInput | ImplementerCreateOrConnectWithoutCpic_smesInput[]
    connect?: ImplementerWhereUniqueInput | ImplementerWhereUniqueInput[]
  }

  export type UserRoleCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ImplementerUncheckedCreateNestedManyWithoutCpic_smesInput = {
    create?: XOR<ImplementerCreateWithoutCpic_smesInput, ImplementerUncheckedCreateWithoutCpic_smesInput> | ImplementerCreateWithoutCpic_smesInput[] | ImplementerUncheckedCreateWithoutCpic_smesInput[]
    connectOrCreate?: ImplementerCreateOrConnectWithoutCpic_smesInput | ImplementerCreateOrConnectWithoutCpic_smesInput[]
    connect?: ImplementerWhereUniqueInput | ImplementerWhereUniqueInput[]
  }

  export type UserRoleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ImplementerUpdateManyWithoutCpic_smesNestedInput = {
    create?: XOR<ImplementerCreateWithoutCpic_smesInput, ImplementerUncheckedCreateWithoutCpic_smesInput> | ImplementerCreateWithoutCpic_smesInput[] | ImplementerUncheckedCreateWithoutCpic_smesInput[]
    connectOrCreate?: ImplementerCreateOrConnectWithoutCpic_smesInput | ImplementerCreateOrConnectWithoutCpic_smesInput[]
    upsert?: ImplementerUpsertWithWhereUniqueWithoutCpic_smesInput | ImplementerUpsertWithWhereUniqueWithoutCpic_smesInput[]
    set?: ImplementerWhereUniqueInput | ImplementerWhereUniqueInput[]
    disconnect?: ImplementerWhereUniqueInput | ImplementerWhereUniqueInput[]
    delete?: ImplementerWhereUniqueInput | ImplementerWhereUniqueInput[]
    connect?: ImplementerWhereUniqueInput | ImplementerWhereUniqueInput[]
    update?: ImplementerUpdateWithWhereUniqueWithoutCpic_smesInput | ImplementerUpdateWithWhereUniqueWithoutCpic_smesInput[]
    updateMany?: ImplementerUpdateManyWithWhereWithoutCpic_smesInput | ImplementerUpdateManyWithWhereWithoutCpic_smesInput[]
    deleteMany?: ImplementerScalarWhereInput | ImplementerScalarWhereInput[]
  }

  export type UserRoleUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ImplementerUncheckedUpdateManyWithoutCpic_smesNestedInput = {
    create?: XOR<ImplementerCreateWithoutCpic_smesInput, ImplementerUncheckedCreateWithoutCpic_smesInput> | ImplementerCreateWithoutCpic_smesInput[] | ImplementerUncheckedCreateWithoutCpic_smesInput[]
    connectOrCreate?: ImplementerCreateOrConnectWithoutCpic_smesInput | ImplementerCreateOrConnectWithoutCpic_smesInput[]
    upsert?: ImplementerUpsertWithWhereUniqueWithoutCpic_smesInput | ImplementerUpsertWithWhereUniqueWithoutCpic_smesInput[]
    set?: ImplementerWhereUniqueInput | ImplementerWhereUniqueInput[]
    disconnect?: ImplementerWhereUniqueInput | ImplementerWhereUniqueInput[]
    delete?: ImplementerWhereUniqueInput | ImplementerWhereUniqueInput[]
    connect?: ImplementerWhereUniqueInput | ImplementerWhereUniqueInput[]
    update?: ImplementerUpdateWithWhereUniqueWithoutCpic_smesInput | ImplementerUpdateWithWhereUniqueWithoutCpic_smesInput[]
    updateMany?: ImplementerUpdateManyWithWhereWithoutCpic_smesInput | ImplementerUpdateManyWithWhereWithoutCpic_smesInput[]
    deleteMany?: ImplementerScalarWhereInput | ImplementerScalarWhereInput[]
  }

  export type UserRoleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type UserRoleCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type UserRoleUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type UserRoleUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutUserRolesInput = {
    create?: XOR<RoleCreateWithoutUserRolesInput, RoleUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUserRolesInput
    connect?: RoleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUserRolesInput = {
    create?: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserRolesInput
    connect?: UserWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutUserRolesNestedInput = {
    create?: XOR<RoleCreateWithoutUserRolesInput, RoleUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUserRolesInput
    upsert?: RoleUpsertWithoutUserRolesInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUserRolesInput, RoleUpdateWithoutUserRolesInput>, RoleUncheckedUpdateWithoutUserRolesInput>
  }

  export type UserUpdateOneRequiredWithoutUserRolesNestedInput = {
    create?: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserRolesInput
    upsert?: UserUpsertWithoutUserRolesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserRolesInput, UserUpdateWithoutUserRolesInput>, UserUncheckedUpdateWithoutUserRolesInput>
  }

  export type PoliciesCreateNestedManyWithoutAreaInput = {
    create?: XOR<PoliciesCreateWithoutAreaInput, PoliciesUncheckedCreateWithoutAreaInput> | PoliciesCreateWithoutAreaInput[] | PoliciesUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: PoliciesCreateOrConnectWithoutAreaInput | PoliciesCreateOrConnectWithoutAreaInput[]
    createMany?: PoliciesCreateManyAreaInputEnvelope
    connect?: PoliciesWhereUniqueInput | PoliciesWhereUniqueInput[]
  }

  export type PoliciesUncheckedCreateNestedManyWithoutAreaInput = {
    create?: XOR<PoliciesCreateWithoutAreaInput, PoliciesUncheckedCreateWithoutAreaInput> | PoliciesCreateWithoutAreaInput[] | PoliciesUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: PoliciesCreateOrConnectWithoutAreaInput | PoliciesCreateOrConnectWithoutAreaInput[]
    createMany?: PoliciesCreateManyAreaInputEnvelope
    connect?: PoliciesWhereUniqueInput | PoliciesWhereUniqueInput[]
  }

  export type PoliciesUpdateManyWithoutAreaNestedInput = {
    create?: XOR<PoliciesCreateWithoutAreaInput, PoliciesUncheckedCreateWithoutAreaInput> | PoliciesCreateWithoutAreaInput[] | PoliciesUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: PoliciesCreateOrConnectWithoutAreaInput | PoliciesCreateOrConnectWithoutAreaInput[]
    upsert?: PoliciesUpsertWithWhereUniqueWithoutAreaInput | PoliciesUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: PoliciesCreateManyAreaInputEnvelope
    set?: PoliciesWhereUniqueInput | PoliciesWhereUniqueInput[]
    disconnect?: PoliciesWhereUniqueInput | PoliciesWhereUniqueInput[]
    delete?: PoliciesWhereUniqueInput | PoliciesWhereUniqueInput[]
    connect?: PoliciesWhereUniqueInput | PoliciesWhereUniqueInput[]
    update?: PoliciesUpdateWithWhereUniqueWithoutAreaInput | PoliciesUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: PoliciesUpdateManyWithWhereWithoutAreaInput | PoliciesUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: PoliciesScalarWhereInput | PoliciesScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PoliciesUncheckedUpdateManyWithoutAreaNestedInput = {
    create?: XOR<PoliciesCreateWithoutAreaInput, PoliciesUncheckedCreateWithoutAreaInput> | PoliciesCreateWithoutAreaInput[] | PoliciesUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: PoliciesCreateOrConnectWithoutAreaInput | PoliciesCreateOrConnectWithoutAreaInput[]
    upsert?: PoliciesUpsertWithWhereUniqueWithoutAreaInput | PoliciesUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: PoliciesCreateManyAreaInputEnvelope
    set?: PoliciesWhereUniqueInput | PoliciesWhereUniqueInput[]
    disconnect?: PoliciesWhereUniqueInput | PoliciesWhereUniqueInput[]
    delete?: PoliciesWhereUniqueInput | PoliciesWhereUniqueInput[]
    connect?: PoliciesWhereUniqueInput | PoliciesWhereUniqueInput[]
    update?: PoliciesUpdateWithWhereUniqueWithoutAreaInput | PoliciesUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: PoliciesUpdateManyWithWhereWithoutAreaInput | PoliciesUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: PoliciesScalarWhereInput | PoliciesScalarWhereInput[]
  }

  export type FocusAreaCreateNestedOneWithoutPoliciesInput = {
    create?: XOR<FocusAreaCreateWithoutPoliciesInput, FocusAreaUncheckedCreateWithoutPoliciesInput>
    connectOrCreate?: FocusAreaCreateOrConnectWithoutPoliciesInput
    connect?: FocusAreaWhereUniqueInput
  }

  export type StrategyCreateNestedManyWithoutPolicyInput = {
    create?: XOR<StrategyCreateWithoutPolicyInput, StrategyUncheckedCreateWithoutPolicyInput> | StrategyCreateWithoutPolicyInput[] | StrategyUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutPolicyInput | StrategyCreateOrConnectWithoutPolicyInput[]
    createMany?: StrategyCreateManyPolicyInputEnvelope
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
  }

  export type StrategyUncheckedCreateNestedManyWithoutPolicyInput = {
    create?: XOR<StrategyCreateWithoutPolicyInput, StrategyUncheckedCreateWithoutPolicyInput> | StrategyCreateWithoutPolicyInput[] | StrategyUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutPolicyInput | StrategyCreateOrConnectWithoutPolicyInput[]
    createMany?: StrategyCreateManyPolicyInputEnvelope
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
  }

  export type FocusAreaUpdateOneRequiredWithoutPoliciesNestedInput = {
    create?: XOR<FocusAreaCreateWithoutPoliciesInput, FocusAreaUncheckedCreateWithoutPoliciesInput>
    connectOrCreate?: FocusAreaCreateOrConnectWithoutPoliciesInput
    upsert?: FocusAreaUpsertWithoutPoliciesInput
    connect?: FocusAreaWhereUniqueInput
    update?: XOR<XOR<FocusAreaUpdateToOneWithWhereWithoutPoliciesInput, FocusAreaUpdateWithoutPoliciesInput>, FocusAreaUncheckedUpdateWithoutPoliciesInput>
  }

  export type StrategyUpdateManyWithoutPolicyNestedInput = {
    create?: XOR<StrategyCreateWithoutPolicyInput, StrategyUncheckedCreateWithoutPolicyInput> | StrategyCreateWithoutPolicyInput[] | StrategyUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutPolicyInput | StrategyCreateOrConnectWithoutPolicyInput[]
    upsert?: StrategyUpsertWithWhereUniqueWithoutPolicyInput | StrategyUpsertWithWhereUniqueWithoutPolicyInput[]
    createMany?: StrategyCreateManyPolicyInputEnvelope
    set?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    disconnect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    delete?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    update?: StrategyUpdateWithWhereUniqueWithoutPolicyInput | StrategyUpdateWithWhereUniqueWithoutPolicyInput[]
    updateMany?: StrategyUpdateManyWithWhereWithoutPolicyInput | StrategyUpdateManyWithWhereWithoutPolicyInput[]
    deleteMany?: StrategyScalarWhereInput | StrategyScalarWhereInput[]
  }

  export type StrategyUncheckedUpdateManyWithoutPolicyNestedInput = {
    create?: XOR<StrategyCreateWithoutPolicyInput, StrategyUncheckedCreateWithoutPolicyInput> | StrategyCreateWithoutPolicyInput[] | StrategyUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutPolicyInput | StrategyCreateOrConnectWithoutPolicyInput[]
    upsert?: StrategyUpsertWithWhereUniqueWithoutPolicyInput | StrategyUpsertWithWhereUniqueWithoutPolicyInput[]
    createMany?: StrategyCreateManyPolicyInputEnvelope
    set?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    disconnect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    delete?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    update?: StrategyUpdateWithWhereUniqueWithoutPolicyInput | StrategyUpdateWithWhereUniqueWithoutPolicyInput[]
    updateMany?: StrategyUpdateManyWithWhereWithoutPolicyInput | StrategyUpdateManyWithWhereWithoutPolicyInput[]
    deleteMany?: StrategyScalarWhereInput | StrategyScalarWhereInput[]
  }

  export type StrategyCreateNestedManyWithoutTimelineInput = {
    create?: XOR<StrategyCreateWithoutTimelineInput, StrategyUncheckedCreateWithoutTimelineInput> | StrategyCreateWithoutTimelineInput[] | StrategyUncheckedCreateWithoutTimelineInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutTimelineInput | StrategyCreateOrConnectWithoutTimelineInput[]
    createMany?: StrategyCreateManyTimelineInputEnvelope
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
  }

  export type StrategyUncheckedCreateNestedManyWithoutTimelineInput = {
    create?: XOR<StrategyCreateWithoutTimelineInput, StrategyUncheckedCreateWithoutTimelineInput> | StrategyCreateWithoutTimelineInput[] | StrategyUncheckedCreateWithoutTimelineInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutTimelineInput | StrategyCreateOrConnectWithoutTimelineInput[]
    createMany?: StrategyCreateManyTimelineInputEnvelope
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
  }

  export type StrategyUpdateManyWithoutTimelineNestedInput = {
    create?: XOR<StrategyCreateWithoutTimelineInput, StrategyUncheckedCreateWithoutTimelineInput> | StrategyCreateWithoutTimelineInput[] | StrategyUncheckedCreateWithoutTimelineInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutTimelineInput | StrategyCreateOrConnectWithoutTimelineInput[]
    upsert?: StrategyUpsertWithWhereUniqueWithoutTimelineInput | StrategyUpsertWithWhereUniqueWithoutTimelineInput[]
    createMany?: StrategyCreateManyTimelineInputEnvelope
    set?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    disconnect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    delete?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    update?: StrategyUpdateWithWhereUniqueWithoutTimelineInput | StrategyUpdateWithWhereUniqueWithoutTimelineInput[]
    updateMany?: StrategyUpdateManyWithWhereWithoutTimelineInput | StrategyUpdateManyWithWhereWithoutTimelineInput[]
    deleteMany?: StrategyScalarWhereInput | StrategyScalarWhereInput[]
  }

  export type StrategyUncheckedUpdateManyWithoutTimelineNestedInput = {
    create?: XOR<StrategyCreateWithoutTimelineInput, StrategyUncheckedCreateWithoutTimelineInput> | StrategyCreateWithoutTimelineInput[] | StrategyUncheckedCreateWithoutTimelineInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutTimelineInput | StrategyCreateOrConnectWithoutTimelineInput[]
    upsert?: StrategyUpsertWithWhereUniqueWithoutTimelineInput | StrategyUpsertWithWhereUniqueWithoutTimelineInput[]
    createMany?: StrategyCreateManyTimelineInputEnvelope
    set?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    disconnect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    delete?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    update?: StrategyUpdateWithWhereUniqueWithoutTimelineInput | StrategyUpdateWithWhereUniqueWithoutTimelineInput[]
    updateMany?: StrategyUpdateManyWithWhereWithoutTimelineInput | StrategyUpdateManyWithWhereWithoutTimelineInput[]
    deleteMany?: StrategyScalarWhereInput | StrategyScalarWhereInput[]
  }

  export type StrategyCreateNestedManyWithoutStatusInput = {
    create?: XOR<StrategyCreateWithoutStatusInput, StrategyUncheckedCreateWithoutStatusInput> | StrategyCreateWithoutStatusInput[] | StrategyUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutStatusInput | StrategyCreateOrConnectWithoutStatusInput[]
    createMany?: StrategyCreateManyStatusInputEnvelope
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
  }

  export type StrategyUncheckedCreateNestedManyWithoutStatusInput = {
    create?: XOR<StrategyCreateWithoutStatusInput, StrategyUncheckedCreateWithoutStatusInput> | StrategyCreateWithoutStatusInput[] | StrategyUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutStatusInput | StrategyCreateOrConnectWithoutStatusInput[]
    createMany?: StrategyCreateManyStatusInputEnvelope
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
  }

  export type StrategyUpdateManyWithoutStatusNestedInput = {
    create?: XOR<StrategyCreateWithoutStatusInput, StrategyUncheckedCreateWithoutStatusInput> | StrategyCreateWithoutStatusInput[] | StrategyUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutStatusInput | StrategyCreateOrConnectWithoutStatusInput[]
    upsert?: StrategyUpsertWithWhereUniqueWithoutStatusInput | StrategyUpsertWithWhereUniqueWithoutStatusInput[]
    createMany?: StrategyCreateManyStatusInputEnvelope
    set?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    disconnect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    delete?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    update?: StrategyUpdateWithWhereUniqueWithoutStatusInput | StrategyUpdateWithWhereUniqueWithoutStatusInput[]
    updateMany?: StrategyUpdateManyWithWhereWithoutStatusInput | StrategyUpdateManyWithWhereWithoutStatusInput[]
    deleteMany?: StrategyScalarWhereInput | StrategyScalarWhereInput[]
  }

  export type StrategyUncheckedUpdateManyWithoutStatusNestedInput = {
    create?: XOR<StrategyCreateWithoutStatusInput, StrategyUncheckedCreateWithoutStatusInput> | StrategyCreateWithoutStatusInput[] | StrategyUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: StrategyCreateOrConnectWithoutStatusInput | StrategyCreateOrConnectWithoutStatusInput[]
    upsert?: StrategyUpsertWithWhereUniqueWithoutStatusInput | StrategyUpsertWithWhereUniqueWithoutStatusInput[]
    createMany?: StrategyCreateManyStatusInputEnvelope
    set?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    disconnect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    delete?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    connect?: StrategyWhereUniqueInput | StrategyWhereUniqueInput[]
    update?: StrategyUpdateWithWhereUniqueWithoutStatusInput | StrategyUpdateWithWhereUniqueWithoutStatusInput[]
    updateMany?: StrategyUpdateManyWithWhereWithoutStatusInput | StrategyUpdateManyWithWhereWithoutStatusInput[]
    deleteMany?: StrategyScalarWhereInput | StrategyScalarWhereInput[]
  }

  export type StakeholderCreateNestedManyWithoutStrategyInput = {
    create?: XOR<StakeholderCreateWithoutStrategyInput, StakeholderUncheckedCreateWithoutStrategyInput> | StakeholderCreateWithoutStrategyInput[] | StakeholderUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: StakeholderCreateOrConnectWithoutStrategyInput | StakeholderCreateOrConnectWithoutStrategyInput[]
    createMany?: StakeholderCreateManyStrategyInputEnvelope
    connect?: StakeholderWhereUniqueInput | StakeholderWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutStrategyInput = {
    create?: XOR<CommentCreateWithoutStrategyInput, CommentUncheckedCreateWithoutStrategyInput> | CommentCreateWithoutStrategyInput[] | CommentUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutStrategyInput | CommentCreateOrConnectWithoutStrategyInput[]
    createMany?: CommentCreateManyStrategyInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type TimelineOptionsCreateNestedOneWithoutStrategiesInput = {
    create?: XOR<TimelineOptionsCreateWithoutStrategiesInput, TimelineOptionsUncheckedCreateWithoutStrategiesInput>
    connectOrCreate?: TimelineOptionsCreateOrConnectWithoutStrategiesInput
    connect?: TimelineOptionsWhereUniqueInput
  }

  export type StatusOptionsCreateNestedOneWithoutStrategiesInput = {
    create?: XOR<StatusOptionsCreateWithoutStrategiesInput, StatusOptionsUncheckedCreateWithoutStrategiesInput>
    connectOrCreate?: StatusOptionsCreateOrConnectWithoutStrategiesInput
    connect?: StatusOptionsWhereUniqueInput
  }

  export type PoliciesCreateNestedOneWithoutStrategiesInput = {
    create?: XOR<PoliciesCreateWithoutStrategiesInput, PoliciesUncheckedCreateWithoutStrategiesInput>
    connectOrCreate?: PoliciesCreateOrConnectWithoutStrategiesInput
    connect?: PoliciesWhereUniqueInput
  }

  export type StrategyImplementerCreateNestedManyWithoutStrategyInput = {
    create?: XOR<StrategyImplementerCreateWithoutStrategyInput, StrategyImplementerUncheckedCreateWithoutStrategyInput> | StrategyImplementerCreateWithoutStrategyInput[] | StrategyImplementerUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: StrategyImplementerCreateOrConnectWithoutStrategyInput | StrategyImplementerCreateOrConnectWithoutStrategyInput[]
    createMany?: StrategyImplementerCreateManyStrategyInputEnvelope
    connect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
  }

  export type StakeholderUncheckedCreateNestedManyWithoutStrategyInput = {
    create?: XOR<StakeholderCreateWithoutStrategyInput, StakeholderUncheckedCreateWithoutStrategyInput> | StakeholderCreateWithoutStrategyInput[] | StakeholderUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: StakeholderCreateOrConnectWithoutStrategyInput | StakeholderCreateOrConnectWithoutStrategyInput[]
    createMany?: StakeholderCreateManyStrategyInputEnvelope
    connect?: StakeholderWhereUniqueInput | StakeholderWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutStrategyInput = {
    create?: XOR<CommentCreateWithoutStrategyInput, CommentUncheckedCreateWithoutStrategyInput> | CommentCreateWithoutStrategyInput[] | CommentUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutStrategyInput | CommentCreateOrConnectWithoutStrategyInput[]
    createMany?: CommentCreateManyStrategyInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type StrategyImplementerUncheckedCreateNestedManyWithoutStrategyInput = {
    create?: XOR<StrategyImplementerCreateWithoutStrategyInput, StrategyImplementerUncheckedCreateWithoutStrategyInput> | StrategyImplementerCreateWithoutStrategyInput[] | StrategyImplementerUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: StrategyImplementerCreateOrConnectWithoutStrategyInput | StrategyImplementerCreateOrConnectWithoutStrategyInput[]
    createMany?: StrategyImplementerCreateManyStrategyInputEnvelope
    connect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type StakeholderUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<StakeholderCreateWithoutStrategyInput, StakeholderUncheckedCreateWithoutStrategyInput> | StakeholderCreateWithoutStrategyInput[] | StakeholderUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: StakeholderCreateOrConnectWithoutStrategyInput | StakeholderCreateOrConnectWithoutStrategyInput[]
    upsert?: StakeholderUpsertWithWhereUniqueWithoutStrategyInput | StakeholderUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: StakeholderCreateManyStrategyInputEnvelope
    set?: StakeholderWhereUniqueInput | StakeholderWhereUniqueInput[]
    disconnect?: StakeholderWhereUniqueInput | StakeholderWhereUniqueInput[]
    delete?: StakeholderWhereUniqueInput | StakeholderWhereUniqueInput[]
    connect?: StakeholderWhereUniqueInput | StakeholderWhereUniqueInput[]
    update?: StakeholderUpdateWithWhereUniqueWithoutStrategyInput | StakeholderUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: StakeholderUpdateManyWithWhereWithoutStrategyInput | StakeholderUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: StakeholderScalarWhereInput | StakeholderScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<CommentCreateWithoutStrategyInput, CommentUncheckedCreateWithoutStrategyInput> | CommentCreateWithoutStrategyInput[] | CommentUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutStrategyInput | CommentCreateOrConnectWithoutStrategyInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutStrategyInput | CommentUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: CommentCreateManyStrategyInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutStrategyInput | CommentUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutStrategyInput | CommentUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type TimelineOptionsUpdateOneRequiredWithoutStrategiesNestedInput = {
    create?: XOR<TimelineOptionsCreateWithoutStrategiesInput, TimelineOptionsUncheckedCreateWithoutStrategiesInput>
    connectOrCreate?: TimelineOptionsCreateOrConnectWithoutStrategiesInput
    upsert?: TimelineOptionsUpsertWithoutStrategiesInput
    connect?: TimelineOptionsWhereUniqueInput
    update?: XOR<XOR<TimelineOptionsUpdateToOneWithWhereWithoutStrategiesInput, TimelineOptionsUpdateWithoutStrategiesInput>, TimelineOptionsUncheckedUpdateWithoutStrategiesInput>
  }

  export type StatusOptionsUpdateOneRequiredWithoutStrategiesNestedInput = {
    create?: XOR<StatusOptionsCreateWithoutStrategiesInput, StatusOptionsUncheckedCreateWithoutStrategiesInput>
    connectOrCreate?: StatusOptionsCreateOrConnectWithoutStrategiesInput
    upsert?: StatusOptionsUpsertWithoutStrategiesInput
    connect?: StatusOptionsWhereUniqueInput
    update?: XOR<XOR<StatusOptionsUpdateToOneWithWhereWithoutStrategiesInput, StatusOptionsUpdateWithoutStrategiesInput>, StatusOptionsUncheckedUpdateWithoutStrategiesInput>
  }

  export type PoliciesUpdateOneRequiredWithoutStrategiesNestedInput = {
    create?: XOR<PoliciesCreateWithoutStrategiesInput, PoliciesUncheckedCreateWithoutStrategiesInput>
    connectOrCreate?: PoliciesCreateOrConnectWithoutStrategiesInput
    upsert?: PoliciesUpsertWithoutStrategiesInput
    connect?: PoliciesWhereUniqueInput
    update?: XOR<XOR<PoliciesUpdateToOneWithWhereWithoutStrategiesInput, PoliciesUpdateWithoutStrategiesInput>, PoliciesUncheckedUpdateWithoutStrategiesInput>
  }

  export type StrategyImplementerUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<StrategyImplementerCreateWithoutStrategyInput, StrategyImplementerUncheckedCreateWithoutStrategyInput> | StrategyImplementerCreateWithoutStrategyInput[] | StrategyImplementerUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: StrategyImplementerCreateOrConnectWithoutStrategyInput | StrategyImplementerCreateOrConnectWithoutStrategyInput[]
    upsert?: StrategyImplementerUpsertWithWhereUniqueWithoutStrategyInput | StrategyImplementerUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: StrategyImplementerCreateManyStrategyInputEnvelope
    set?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    disconnect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    delete?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    connect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    update?: StrategyImplementerUpdateWithWhereUniqueWithoutStrategyInput | StrategyImplementerUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: StrategyImplementerUpdateManyWithWhereWithoutStrategyInput | StrategyImplementerUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: StrategyImplementerScalarWhereInput | StrategyImplementerScalarWhereInput[]
  }

  export type StakeholderUncheckedUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<StakeholderCreateWithoutStrategyInput, StakeholderUncheckedCreateWithoutStrategyInput> | StakeholderCreateWithoutStrategyInput[] | StakeholderUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: StakeholderCreateOrConnectWithoutStrategyInput | StakeholderCreateOrConnectWithoutStrategyInput[]
    upsert?: StakeholderUpsertWithWhereUniqueWithoutStrategyInput | StakeholderUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: StakeholderCreateManyStrategyInputEnvelope
    set?: StakeholderWhereUniqueInput | StakeholderWhereUniqueInput[]
    disconnect?: StakeholderWhereUniqueInput | StakeholderWhereUniqueInput[]
    delete?: StakeholderWhereUniqueInput | StakeholderWhereUniqueInput[]
    connect?: StakeholderWhereUniqueInput | StakeholderWhereUniqueInput[]
    update?: StakeholderUpdateWithWhereUniqueWithoutStrategyInput | StakeholderUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: StakeholderUpdateManyWithWhereWithoutStrategyInput | StakeholderUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: StakeholderScalarWhereInput | StakeholderScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<CommentCreateWithoutStrategyInput, CommentUncheckedCreateWithoutStrategyInput> | CommentCreateWithoutStrategyInput[] | CommentUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutStrategyInput | CommentCreateOrConnectWithoutStrategyInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutStrategyInput | CommentUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: CommentCreateManyStrategyInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutStrategyInput | CommentUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutStrategyInput | CommentUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type StrategyImplementerUncheckedUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<StrategyImplementerCreateWithoutStrategyInput, StrategyImplementerUncheckedCreateWithoutStrategyInput> | StrategyImplementerCreateWithoutStrategyInput[] | StrategyImplementerUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: StrategyImplementerCreateOrConnectWithoutStrategyInput | StrategyImplementerCreateOrConnectWithoutStrategyInput[]
    upsert?: StrategyImplementerUpsertWithWhereUniqueWithoutStrategyInput | StrategyImplementerUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: StrategyImplementerCreateManyStrategyInputEnvelope
    set?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    disconnect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    delete?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    connect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    update?: StrategyImplementerUpdateWithWhereUniqueWithoutStrategyInput | StrategyImplementerUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: StrategyImplementerUpdateManyWithWhereWithoutStrategyInput | StrategyImplementerUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: StrategyImplementerScalarWhereInput | StrategyImplementerScalarWhereInput[]
  }

  export type ImplementerCreateemailsInput = {
    set: string[]
  }

  export type ImplementerCreatephone_numbersInput = {
    set: string[]
  }

  export type UserCreateNestedManyWithoutAssigned_implementersInput = {
    create?: XOR<UserCreateWithoutAssigned_implementersInput, UserUncheckedCreateWithoutAssigned_implementersInput> | UserCreateWithoutAssigned_implementersInput[] | UserUncheckedCreateWithoutAssigned_implementersInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssigned_implementersInput | UserCreateOrConnectWithoutAssigned_implementersInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StrategyImplementerCreateNestedManyWithoutImplementerInput = {
    create?: XOR<StrategyImplementerCreateWithoutImplementerInput, StrategyImplementerUncheckedCreateWithoutImplementerInput> | StrategyImplementerCreateWithoutImplementerInput[] | StrategyImplementerUncheckedCreateWithoutImplementerInput[]
    connectOrCreate?: StrategyImplementerCreateOrConnectWithoutImplementerInput | StrategyImplementerCreateOrConnectWithoutImplementerInput[]
    createMany?: StrategyImplementerCreateManyImplementerInputEnvelope
    connect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutAssigned_implementersInput = {
    create?: XOR<UserCreateWithoutAssigned_implementersInput, UserUncheckedCreateWithoutAssigned_implementersInput> | UserCreateWithoutAssigned_implementersInput[] | UserUncheckedCreateWithoutAssigned_implementersInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssigned_implementersInput | UserCreateOrConnectWithoutAssigned_implementersInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StrategyImplementerUncheckedCreateNestedManyWithoutImplementerInput = {
    create?: XOR<StrategyImplementerCreateWithoutImplementerInput, StrategyImplementerUncheckedCreateWithoutImplementerInput> | StrategyImplementerCreateWithoutImplementerInput[] | StrategyImplementerUncheckedCreateWithoutImplementerInput[]
    connectOrCreate?: StrategyImplementerCreateOrConnectWithoutImplementerInput | StrategyImplementerCreateOrConnectWithoutImplementerInput[]
    createMany?: StrategyImplementerCreateManyImplementerInputEnvelope
    connect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
  }

  export type ImplementerUpdateemailsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ImplementerUpdatephone_numbersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateManyWithoutAssigned_implementersNestedInput = {
    create?: XOR<UserCreateWithoutAssigned_implementersInput, UserUncheckedCreateWithoutAssigned_implementersInput> | UserCreateWithoutAssigned_implementersInput[] | UserUncheckedCreateWithoutAssigned_implementersInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssigned_implementersInput | UserCreateOrConnectWithoutAssigned_implementersInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAssigned_implementersInput | UserUpsertWithWhereUniqueWithoutAssigned_implementersInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAssigned_implementersInput | UserUpdateWithWhereUniqueWithoutAssigned_implementersInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAssigned_implementersInput | UserUpdateManyWithWhereWithoutAssigned_implementersInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type StrategyImplementerUpdateManyWithoutImplementerNestedInput = {
    create?: XOR<StrategyImplementerCreateWithoutImplementerInput, StrategyImplementerUncheckedCreateWithoutImplementerInput> | StrategyImplementerCreateWithoutImplementerInput[] | StrategyImplementerUncheckedCreateWithoutImplementerInput[]
    connectOrCreate?: StrategyImplementerCreateOrConnectWithoutImplementerInput | StrategyImplementerCreateOrConnectWithoutImplementerInput[]
    upsert?: StrategyImplementerUpsertWithWhereUniqueWithoutImplementerInput | StrategyImplementerUpsertWithWhereUniqueWithoutImplementerInput[]
    createMany?: StrategyImplementerCreateManyImplementerInputEnvelope
    set?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    disconnect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    delete?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    connect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    update?: StrategyImplementerUpdateWithWhereUniqueWithoutImplementerInput | StrategyImplementerUpdateWithWhereUniqueWithoutImplementerInput[]
    updateMany?: StrategyImplementerUpdateManyWithWhereWithoutImplementerInput | StrategyImplementerUpdateManyWithWhereWithoutImplementerInput[]
    deleteMany?: StrategyImplementerScalarWhereInput | StrategyImplementerScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutAssigned_implementersNestedInput = {
    create?: XOR<UserCreateWithoutAssigned_implementersInput, UserUncheckedCreateWithoutAssigned_implementersInput> | UserCreateWithoutAssigned_implementersInput[] | UserUncheckedCreateWithoutAssigned_implementersInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssigned_implementersInput | UserCreateOrConnectWithoutAssigned_implementersInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAssigned_implementersInput | UserUpsertWithWhereUniqueWithoutAssigned_implementersInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAssigned_implementersInput | UserUpdateWithWhereUniqueWithoutAssigned_implementersInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAssigned_implementersInput | UserUpdateManyWithWhereWithoutAssigned_implementersInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type StrategyImplementerUncheckedUpdateManyWithoutImplementerNestedInput = {
    create?: XOR<StrategyImplementerCreateWithoutImplementerInput, StrategyImplementerUncheckedCreateWithoutImplementerInput> | StrategyImplementerCreateWithoutImplementerInput[] | StrategyImplementerUncheckedCreateWithoutImplementerInput[]
    connectOrCreate?: StrategyImplementerCreateOrConnectWithoutImplementerInput | StrategyImplementerCreateOrConnectWithoutImplementerInput[]
    upsert?: StrategyImplementerUpsertWithWhereUniqueWithoutImplementerInput | StrategyImplementerUpsertWithWhereUniqueWithoutImplementerInput[]
    createMany?: StrategyImplementerCreateManyImplementerInputEnvelope
    set?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    disconnect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    delete?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    connect?: StrategyImplementerWhereUniqueInput | StrategyImplementerWhereUniqueInput[]
    update?: StrategyImplementerUpdateWithWhereUniqueWithoutImplementerInput | StrategyImplementerUpdateWithWhereUniqueWithoutImplementerInput[]
    updateMany?: StrategyImplementerUpdateManyWithWhereWithoutImplementerInput | StrategyImplementerUpdateManyWithWhereWithoutImplementerInput[]
    deleteMany?: StrategyImplementerScalarWhereInput | StrategyImplementerScalarWhereInput[]
  }

  export type StakeholderCreateemailsInput = {
    set: string[]
  }

  export type StakeholderCreatephone_numbersInput = {
    set: string[]
  }

  export type StrategyCreateNestedOneWithoutStakeholdersInput = {
    create?: XOR<StrategyCreateWithoutStakeholdersInput, StrategyUncheckedCreateWithoutStakeholdersInput>
    connectOrCreate?: StrategyCreateOrConnectWithoutStakeholdersInput
    connect?: StrategyWhereUniqueInput
  }

  export type StakeholderUpdateemailsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type StakeholderUpdatephone_numbersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type StrategyUpdateOneRequiredWithoutStakeholdersNestedInput = {
    create?: XOR<StrategyCreateWithoutStakeholdersInput, StrategyUncheckedCreateWithoutStakeholdersInput>
    connectOrCreate?: StrategyCreateOrConnectWithoutStakeholdersInput
    upsert?: StrategyUpsertWithoutStakeholdersInput
    connect?: StrategyWhereUniqueInput
    update?: XOR<XOR<StrategyUpdateToOneWithWhereWithoutStakeholdersInput, StrategyUpdateWithoutStakeholdersInput>, StrategyUncheckedUpdateWithoutStakeholdersInput>
  }

  export type ImplementerCreateNestedOneWithoutStrategiesInput = {
    create?: XOR<ImplementerCreateWithoutStrategiesInput, ImplementerUncheckedCreateWithoutStrategiesInput>
    connectOrCreate?: ImplementerCreateOrConnectWithoutStrategiesInput
    connect?: ImplementerWhereUniqueInput
  }

  export type StrategyCreateNestedOneWithoutImplementersInput = {
    create?: XOR<StrategyCreateWithoutImplementersInput, StrategyUncheckedCreateWithoutImplementersInput>
    connectOrCreate?: StrategyCreateOrConnectWithoutImplementersInput
    connect?: StrategyWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ImplementerUpdateOneRequiredWithoutStrategiesNestedInput = {
    create?: XOR<ImplementerCreateWithoutStrategiesInput, ImplementerUncheckedCreateWithoutStrategiesInput>
    connectOrCreate?: ImplementerCreateOrConnectWithoutStrategiesInput
    upsert?: ImplementerUpsertWithoutStrategiesInput
    connect?: ImplementerWhereUniqueInput
    update?: XOR<XOR<ImplementerUpdateToOneWithWhereWithoutStrategiesInput, ImplementerUpdateWithoutStrategiesInput>, ImplementerUncheckedUpdateWithoutStrategiesInput>
  }

  export type StrategyUpdateOneRequiredWithoutImplementersNestedInput = {
    create?: XOR<StrategyCreateWithoutImplementersInput, StrategyUncheckedCreateWithoutImplementersInput>
    connectOrCreate?: StrategyCreateOrConnectWithoutImplementersInput
    upsert?: StrategyUpsertWithoutImplementersInput
    connect?: StrategyWhereUniqueInput
    update?: XOR<XOR<StrategyUpdateToOneWithWhereWithoutImplementersInput, StrategyUpdateWithoutImplementersInput>, StrategyUncheckedUpdateWithoutImplementersInput>
  }

  export type CommentCreateNestedOneWithoutChildrenInput = {
    create?: XOR<CommentCreateWithoutChildrenInput, CommentUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CommentCreateOrConnectWithoutChildrenInput
    connect?: CommentWhereUniqueInput
  }

  export type CommentCreateNestedManyWithoutParentInput = {
    create?: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput> | CommentCreateWithoutParentInput[] | CommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentInput | CommentCreateOrConnectWithoutParentInput[]
    createMany?: CommentCreateManyParentInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type StrategyCreateNestedOneWithoutCommentsInput = {
    create?: XOR<StrategyCreateWithoutCommentsInput, StrategyUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: StrategyCreateOrConnectWithoutCommentsInput
    connect?: StrategyWhereUniqueInput
  }

  export type CommentUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput> | CommentCreateWithoutParentInput[] | CommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentInput | CommentCreateOrConnectWithoutParentInput[]
    createMany?: CommentCreateManyParentInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type CommentUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<CommentCreateWithoutChildrenInput, CommentUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CommentCreateOrConnectWithoutChildrenInput
    upsert?: CommentUpsertWithoutChildrenInput
    disconnect?: CommentWhereInput | boolean
    delete?: CommentWhereInput | boolean
    connect?: CommentWhereUniqueInput
    update?: XOR<XOR<CommentUpdateToOneWithWhereWithoutChildrenInput, CommentUpdateWithoutChildrenInput>, CommentUncheckedUpdateWithoutChildrenInput>
  }

  export type CommentUpdateManyWithoutParentNestedInput = {
    create?: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput> | CommentCreateWithoutParentInput[] | CommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentInput | CommentCreateOrConnectWithoutParentInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutParentInput | CommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CommentCreateManyParentInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutParentInput | CommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutParentInput | CommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type StrategyUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<StrategyCreateWithoutCommentsInput, StrategyUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: StrategyCreateOrConnectWithoutCommentsInput
    upsert?: StrategyUpsertWithoutCommentsInput
    connect?: StrategyWhereUniqueInput
    update?: XOR<XOR<StrategyUpdateToOneWithWhereWithoutCommentsInput, StrategyUpdateWithoutCommentsInput>, StrategyUncheckedUpdateWithoutCommentsInput>
  }

  export type CommentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput> | CommentCreateWithoutParentInput[] | CommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentInput | CommentCreateOrConnectWithoutParentInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutParentInput | CommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CommentCreateManyParentInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutParentInput | CommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutParentInput | CommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ImplementerCreateWithoutCpic_smesInput = {
    name: string
    emails?: ImplementerCreateemailsInput | string[]
    phone_numbers?: ImplementerCreatephone_numbersInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    is_board?: boolean
    is_department?: boolean
    is_school?: boolean
    strategies?: StrategyImplementerCreateNestedManyWithoutImplementerInput
  }

  export type ImplementerUncheckedCreateWithoutCpic_smesInput = {
    id?: number
    name: string
    emails?: ImplementerCreateemailsInput | string[]
    phone_numbers?: ImplementerCreatephone_numbersInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    is_board?: boolean
    is_department?: boolean
    is_school?: boolean
    strategies?: StrategyImplementerUncheckedCreateNestedManyWithoutImplementerInput
  }

  export type ImplementerCreateOrConnectWithoutCpic_smesInput = {
    where: ImplementerWhereUniqueInput
    create: XOR<ImplementerCreateWithoutCpic_smesInput, ImplementerUncheckedCreateWithoutCpic_smesInput>
  }

  export type UserRoleCreateWithoutUserInput = {
    createdAt?: Date | string
    role: RoleCreateNestedOneWithoutUserRolesInput
  }

  export type UserRoleUncheckedCreateWithoutUserInput = {
    role_id: string
    createdAt?: Date | string
  }

  export type UserRoleCreateOrConnectWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleCreateManyUserInputEnvelope = {
    data: UserRoleCreateManyUserInput | UserRoleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutUserInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CommentCreateNestedOneWithoutChildrenInput
    children?: CommentCreateNestedManyWithoutParentInput
    strategy: StrategyCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutUserInput = {
    id?: number
    strategy_id: number
    parent_id?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type CommentCreateOrConnectWithoutUserInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentCreateManyUserInputEnvelope = {
    data: CommentCreateManyUserInput | CommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ImplementerUpsertWithWhereUniqueWithoutCpic_smesInput = {
    where: ImplementerWhereUniqueInput
    update: XOR<ImplementerUpdateWithoutCpic_smesInput, ImplementerUncheckedUpdateWithoutCpic_smesInput>
    create: XOR<ImplementerCreateWithoutCpic_smesInput, ImplementerUncheckedCreateWithoutCpic_smesInput>
  }

  export type ImplementerUpdateWithWhereUniqueWithoutCpic_smesInput = {
    where: ImplementerWhereUniqueInput
    data: XOR<ImplementerUpdateWithoutCpic_smesInput, ImplementerUncheckedUpdateWithoutCpic_smesInput>
  }

  export type ImplementerUpdateManyWithWhereWithoutCpic_smesInput = {
    where: ImplementerScalarWhereInput
    data: XOR<ImplementerUpdateManyMutationInput, ImplementerUncheckedUpdateManyWithoutCpic_smesInput>
  }

  export type ImplementerScalarWhereInput = {
    AND?: ImplementerScalarWhereInput | ImplementerScalarWhereInput[]
    OR?: ImplementerScalarWhereInput[]
    NOT?: ImplementerScalarWhereInput | ImplementerScalarWhereInput[]
    id?: IntFilter<"Implementer"> | number
    name?: StringFilter<"Implementer"> | string
    emails?: StringNullableListFilter<"Implementer">
    phone_numbers?: StringNullableListFilter<"Implementer">
    createdAt?: DateTimeFilter<"Implementer"> | Date | string
    updatedAt?: DateTimeFilter<"Implementer"> | Date | string
    is_board?: BoolFilter<"Implementer"> | boolean
    is_department?: BoolFilter<"Implementer"> | boolean
    is_school?: BoolFilter<"Implementer"> | boolean
  }

  export type UserRoleUpsertWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutUserInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutUserInput>
  }

  export type UserRoleScalarWhereInput = {
    AND?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
    OR?: UserRoleScalarWhereInput[]
    NOT?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
    role_id?: StringFilter<"UserRole"> | string
    user_id?: StringFilter<"UserRole"> | string
    createdAt?: DateTimeFilter<"UserRole"> | Date | string
  }

  export type CommentUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
  }

  export type CommentUpdateManyWithWhereWithoutUserInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: IntFilter<"Comment"> | number
    user_id?: StringFilter<"Comment"> | string
    strategy_id?: IntFilter<"Comment"> | number
    parent_id?: IntNullableFilter<"Comment"> | number | null
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type UserRoleCreateWithoutRoleInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutUserRolesInput
  }

  export type UserRoleUncheckedCreateWithoutRoleInput = {
    user_id: string
    createdAt?: Date | string
  }

  export type UserRoleCreateOrConnectWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleCreateManyRoleInputEnvelope = {
    data: UserRoleCreateManyRoleInput | UserRoleCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserRoleUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutRoleInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutRoleInput>
  }

  export type RoleCreateWithoutUserRolesInput = {
    id?: string
    name: string
    description: string
  }

  export type RoleUncheckedCreateWithoutUserRolesInput = {
    id?: string
    name: string
    description: string
  }

  export type RoleCreateOrConnectWithoutUserRolesInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUserRolesInput, RoleUncheckedCreateWithoutUserRolesInput>
  }

  export type UserCreateWithoutUserRolesInput = {
    id?: string
    auth_source?: string
    google_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    display_name?: string | null
    profile_pic?: string | null
    nickname?: string | null
    given_name?: string | null
    family_name?: string | null
    password_hash?: string | null
    email?: string | null
    disabled?: boolean
    assigned_implementers?: ImplementerCreateNestedManyWithoutCpic_smesInput
    comments?: CommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserRolesInput = {
    id?: string
    auth_source?: string
    google_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    display_name?: string | null
    profile_pic?: string | null
    nickname?: string | null
    given_name?: string | null
    family_name?: string | null
    password_hash?: string | null
    email?: string | null
    disabled?: boolean
    assigned_implementers?: ImplementerUncheckedCreateNestedManyWithoutCpic_smesInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserRolesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput>
  }

  export type RoleUpsertWithoutUserRolesInput = {
    update: XOR<RoleUpdateWithoutUserRolesInput, RoleUncheckedUpdateWithoutUserRolesInput>
    create: XOR<RoleCreateWithoutUserRolesInput, RoleUncheckedCreateWithoutUserRolesInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUserRolesInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUserRolesInput, RoleUncheckedUpdateWithoutUserRolesInput>
  }

  export type RoleUpdateWithoutUserRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type RoleUncheckedUpdateWithoutUserRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutUserRolesInput = {
    update: XOR<UserUpdateWithoutUserRolesInput, UserUncheckedUpdateWithoutUserRolesInput>
    create: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserRolesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserRolesInput, UserUncheckedUpdateWithoutUserRolesInput>
  }

  export type UserUpdateWithoutUserRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_source?: StringFieldUpdateOperationsInput | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: BoolFieldUpdateOperationsInput | boolean
    assigned_implementers?: ImplementerUpdateManyWithoutCpic_smesNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_source?: StringFieldUpdateOperationsInput | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: BoolFieldUpdateOperationsInput | boolean
    assigned_implementers?: ImplementerUncheckedUpdateManyWithoutCpic_smesNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PoliciesCreateWithoutAreaInput = {
    id?: string
    description: string
    policy_number: number
    strategies?: StrategyCreateNestedManyWithoutPolicyInput
  }

  export type PoliciesUncheckedCreateWithoutAreaInput = {
    id?: string
    description: string
    policy_number: number
    strategies?: StrategyUncheckedCreateNestedManyWithoutPolicyInput
  }

  export type PoliciesCreateOrConnectWithoutAreaInput = {
    where: PoliciesWhereUniqueInput
    create: XOR<PoliciesCreateWithoutAreaInput, PoliciesUncheckedCreateWithoutAreaInput>
  }

  export type PoliciesCreateManyAreaInputEnvelope = {
    data: PoliciesCreateManyAreaInput | PoliciesCreateManyAreaInput[]
    skipDuplicates?: boolean
  }

  export type PoliciesUpsertWithWhereUniqueWithoutAreaInput = {
    where: PoliciesWhereUniqueInput
    update: XOR<PoliciesUpdateWithoutAreaInput, PoliciesUncheckedUpdateWithoutAreaInput>
    create: XOR<PoliciesCreateWithoutAreaInput, PoliciesUncheckedCreateWithoutAreaInput>
  }

  export type PoliciesUpdateWithWhereUniqueWithoutAreaInput = {
    where: PoliciesWhereUniqueInput
    data: XOR<PoliciesUpdateWithoutAreaInput, PoliciesUncheckedUpdateWithoutAreaInput>
  }

  export type PoliciesUpdateManyWithWhereWithoutAreaInput = {
    where: PoliciesScalarWhereInput
    data: XOR<PoliciesUpdateManyMutationInput, PoliciesUncheckedUpdateManyWithoutAreaInput>
  }

  export type PoliciesScalarWhereInput = {
    AND?: PoliciesScalarWhereInput | PoliciesScalarWhereInput[]
    OR?: PoliciesScalarWhereInput[]
    NOT?: PoliciesScalarWhereInput | PoliciesScalarWhereInput[]
    id?: StringFilter<"Policies"> | string
    description?: StringFilter<"Policies"> | string
    policy_number?: IntFilter<"Policies"> | number
    focus_area_id?: IntFilter<"Policies"> | number
  }

  export type FocusAreaCreateWithoutPoliciesInput = {
    name: string
  }

  export type FocusAreaUncheckedCreateWithoutPoliciesInput = {
    id?: number
    name: string
  }

  export type FocusAreaCreateOrConnectWithoutPoliciesInput = {
    where: FocusAreaWhereUniqueInput
    create: XOR<FocusAreaCreateWithoutPoliciesInput, FocusAreaUncheckedCreateWithoutPoliciesInput>
  }

  export type StrategyCreateWithoutPolicyInput = {
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    strategy_number: number
    stakeholders?: StakeholderCreateNestedManyWithoutStrategyInput
    comments?: CommentCreateNestedManyWithoutStrategyInput
    timeline: TimelineOptionsCreateNestedOneWithoutStrategiesInput
    status: StatusOptionsCreateNestedOneWithoutStrategiesInput
    implementers?: StrategyImplementerCreateNestedManyWithoutStrategyInput
  }

  export type StrategyUncheckedCreateWithoutPolicyInput = {
    id?: number
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    strategy_number: number
    timeline_id: number
    status_id: number
    stakeholders?: StakeholderUncheckedCreateNestedManyWithoutStrategyInput
    comments?: CommentUncheckedCreateNestedManyWithoutStrategyInput
    implementers?: StrategyImplementerUncheckedCreateNestedManyWithoutStrategyInput
  }

  export type StrategyCreateOrConnectWithoutPolicyInput = {
    where: StrategyWhereUniqueInput
    create: XOR<StrategyCreateWithoutPolicyInput, StrategyUncheckedCreateWithoutPolicyInput>
  }

  export type StrategyCreateManyPolicyInputEnvelope = {
    data: StrategyCreateManyPolicyInput | StrategyCreateManyPolicyInput[]
    skipDuplicates?: boolean
  }

  export type FocusAreaUpsertWithoutPoliciesInput = {
    update: XOR<FocusAreaUpdateWithoutPoliciesInput, FocusAreaUncheckedUpdateWithoutPoliciesInput>
    create: XOR<FocusAreaCreateWithoutPoliciesInput, FocusAreaUncheckedCreateWithoutPoliciesInput>
    where?: FocusAreaWhereInput
  }

  export type FocusAreaUpdateToOneWithWhereWithoutPoliciesInput = {
    where?: FocusAreaWhereInput
    data: XOR<FocusAreaUpdateWithoutPoliciesInput, FocusAreaUncheckedUpdateWithoutPoliciesInput>
  }

  export type FocusAreaUpdateWithoutPoliciesInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type FocusAreaUncheckedUpdateWithoutPoliciesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StrategyUpsertWithWhereUniqueWithoutPolicyInput = {
    where: StrategyWhereUniqueInput
    update: XOR<StrategyUpdateWithoutPolicyInput, StrategyUncheckedUpdateWithoutPolicyInput>
    create: XOR<StrategyCreateWithoutPolicyInput, StrategyUncheckedCreateWithoutPolicyInput>
  }

  export type StrategyUpdateWithWhereUniqueWithoutPolicyInput = {
    where: StrategyWhereUniqueInput
    data: XOR<StrategyUpdateWithoutPolicyInput, StrategyUncheckedUpdateWithoutPolicyInput>
  }

  export type StrategyUpdateManyWithWhereWithoutPolicyInput = {
    where: StrategyScalarWhereInput
    data: XOR<StrategyUpdateManyMutationInput, StrategyUncheckedUpdateManyWithoutPolicyInput>
  }

  export type StrategyScalarWhereInput = {
    AND?: StrategyScalarWhereInput | StrategyScalarWhereInput[]
    OR?: StrategyScalarWhereInput[]
    NOT?: StrategyScalarWhereInput | StrategyScalarWhereInput[]
    id?: IntFilter<"Strategy"> | number
    content?: StringFilter<"Strategy"> | string
    last_comms_date?: DateTimeNullableFilter<"Strategy"> | Date | string | null
    createdAt?: DateTimeFilter<"Strategy"> | Date | string
    updatedAt?: DateTimeFilter<"Strategy"> | Date | string
    policy_id?: StringFilter<"Strategy"> | string
    strategy_number?: IntFilter<"Strategy"> | number
    timeline_id?: IntFilter<"Strategy"> | number
    status_id?: IntFilter<"Strategy"> | number
  }

  export type StrategyCreateWithoutTimelineInput = {
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    strategy_number: number
    stakeholders?: StakeholderCreateNestedManyWithoutStrategyInput
    comments?: CommentCreateNestedManyWithoutStrategyInput
    status: StatusOptionsCreateNestedOneWithoutStrategiesInput
    policy: PoliciesCreateNestedOneWithoutStrategiesInput
    implementers?: StrategyImplementerCreateNestedManyWithoutStrategyInput
  }

  export type StrategyUncheckedCreateWithoutTimelineInput = {
    id?: number
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    policy_id: string
    strategy_number: number
    status_id: number
    stakeholders?: StakeholderUncheckedCreateNestedManyWithoutStrategyInput
    comments?: CommentUncheckedCreateNestedManyWithoutStrategyInput
    implementers?: StrategyImplementerUncheckedCreateNestedManyWithoutStrategyInput
  }

  export type StrategyCreateOrConnectWithoutTimelineInput = {
    where: StrategyWhereUniqueInput
    create: XOR<StrategyCreateWithoutTimelineInput, StrategyUncheckedCreateWithoutTimelineInput>
  }

  export type StrategyCreateManyTimelineInputEnvelope = {
    data: StrategyCreateManyTimelineInput | StrategyCreateManyTimelineInput[]
    skipDuplicates?: boolean
  }

  export type StrategyUpsertWithWhereUniqueWithoutTimelineInput = {
    where: StrategyWhereUniqueInput
    update: XOR<StrategyUpdateWithoutTimelineInput, StrategyUncheckedUpdateWithoutTimelineInput>
    create: XOR<StrategyCreateWithoutTimelineInput, StrategyUncheckedCreateWithoutTimelineInput>
  }

  export type StrategyUpdateWithWhereUniqueWithoutTimelineInput = {
    where: StrategyWhereUniqueInput
    data: XOR<StrategyUpdateWithoutTimelineInput, StrategyUncheckedUpdateWithoutTimelineInput>
  }

  export type StrategyUpdateManyWithWhereWithoutTimelineInput = {
    where: StrategyScalarWhereInput
    data: XOR<StrategyUpdateManyMutationInput, StrategyUncheckedUpdateManyWithoutTimelineInput>
  }

  export type StrategyCreateWithoutStatusInput = {
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    strategy_number: number
    stakeholders?: StakeholderCreateNestedManyWithoutStrategyInput
    comments?: CommentCreateNestedManyWithoutStrategyInput
    timeline: TimelineOptionsCreateNestedOneWithoutStrategiesInput
    policy: PoliciesCreateNestedOneWithoutStrategiesInput
    implementers?: StrategyImplementerCreateNestedManyWithoutStrategyInput
  }

  export type StrategyUncheckedCreateWithoutStatusInput = {
    id?: number
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    policy_id: string
    strategy_number: number
    timeline_id: number
    stakeholders?: StakeholderUncheckedCreateNestedManyWithoutStrategyInput
    comments?: CommentUncheckedCreateNestedManyWithoutStrategyInput
    implementers?: StrategyImplementerUncheckedCreateNestedManyWithoutStrategyInput
  }

  export type StrategyCreateOrConnectWithoutStatusInput = {
    where: StrategyWhereUniqueInput
    create: XOR<StrategyCreateWithoutStatusInput, StrategyUncheckedCreateWithoutStatusInput>
  }

  export type StrategyCreateManyStatusInputEnvelope = {
    data: StrategyCreateManyStatusInput | StrategyCreateManyStatusInput[]
    skipDuplicates?: boolean
  }

  export type StrategyUpsertWithWhereUniqueWithoutStatusInput = {
    where: StrategyWhereUniqueInput
    update: XOR<StrategyUpdateWithoutStatusInput, StrategyUncheckedUpdateWithoutStatusInput>
    create: XOR<StrategyCreateWithoutStatusInput, StrategyUncheckedCreateWithoutStatusInput>
  }

  export type StrategyUpdateWithWhereUniqueWithoutStatusInput = {
    where: StrategyWhereUniqueInput
    data: XOR<StrategyUpdateWithoutStatusInput, StrategyUncheckedUpdateWithoutStatusInput>
  }

  export type StrategyUpdateManyWithWhereWithoutStatusInput = {
    where: StrategyScalarWhereInput
    data: XOR<StrategyUpdateManyMutationInput, StrategyUncheckedUpdateManyWithoutStatusInput>
  }

  export type StakeholderCreateWithoutStrategyInput = {
    name: string
    organization_name?: string | null
    emails?: StakeholderCreateemailsInput | string[]
    phone_numbers?: StakeholderCreatephone_numbersInput | string[]
  }

  export type StakeholderUncheckedCreateWithoutStrategyInput = {
    id?: number
    name: string
    organization_name?: string | null
    emails?: StakeholderCreateemailsInput | string[]
    phone_numbers?: StakeholderCreatephone_numbersInput | string[]
  }

  export type StakeholderCreateOrConnectWithoutStrategyInput = {
    where: StakeholderWhereUniqueInput
    create: XOR<StakeholderCreateWithoutStrategyInput, StakeholderUncheckedCreateWithoutStrategyInput>
  }

  export type StakeholderCreateManyStrategyInputEnvelope = {
    data: StakeholderCreateManyStrategyInput | StakeholderCreateManyStrategyInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutStrategyInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CommentCreateNestedOneWithoutChildrenInput
    children?: CommentCreateNestedManyWithoutParentInput
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutStrategyInput = {
    id?: number
    user_id: string
    parent_id?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type CommentCreateOrConnectWithoutStrategyInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutStrategyInput, CommentUncheckedCreateWithoutStrategyInput>
  }

  export type CommentCreateManyStrategyInputEnvelope = {
    data: CommentCreateManyStrategyInput | CommentCreateManyStrategyInput[]
    skipDuplicates?: boolean
  }

  export type TimelineOptionsCreateWithoutStrategiesInput = {
    title: string
  }

  export type TimelineOptionsUncheckedCreateWithoutStrategiesInput = {
    id?: number
    title: string
  }

  export type TimelineOptionsCreateOrConnectWithoutStrategiesInput = {
    where: TimelineOptionsWhereUniqueInput
    create: XOR<TimelineOptionsCreateWithoutStrategiesInput, TimelineOptionsUncheckedCreateWithoutStrategiesInput>
  }

  export type StatusOptionsCreateWithoutStrategiesInput = {
    title: string
  }

  export type StatusOptionsUncheckedCreateWithoutStrategiesInput = {
    id?: number
    title: string
  }

  export type StatusOptionsCreateOrConnectWithoutStrategiesInput = {
    where: StatusOptionsWhereUniqueInput
    create: XOR<StatusOptionsCreateWithoutStrategiesInput, StatusOptionsUncheckedCreateWithoutStrategiesInput>
  }

  export type PoliciesCreateWithoutStrategiesInput = {
    id?: string
    description: string
    policy_number: number
    area: FocusAreaCreateNestedOneWithoutPoliciesInput
  }

  export type PoliciesUncheckedCreateWithoutStrategiesInput = {
    id?: string
    description: string
    policy_number: number
    focus_area_id: number
  }

  export type PoliciesCreateOrConnectWithoutStrategiesInput = {
    where: PoliciesWhereUniqueInput
    create: XOR<PoliciesCreateWithoutStrategiesInput, PoliciesUncheckedCreateWithoutStrategiesInput>
  }

  export type StrategyImplementerCreateWithoutStrategyInput = {
    order_number?: number | null
    is_primary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    implementer: ImplementerCreateNestedOneWithoutStrategiesInput
  }

  export type StrategyImplementerUncheckedCreateWithoutStrategyInput = {
    implementer_id: number
    order_number?: number | null
    is_primary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StrategyImplementerCreateOrConnectWithoutStrategyInput = {
    where: StrategyImplementerWhereUniqueInput
    create: XOR<StrategyImplementerCreateWithoutStrategyInput, StrategyImplementerUncheckedCreateWithoutStrategyInput>
  }

  export type StrategyImplementerCreateManyStrategyInputEnvelope = {
    data: StrategyImplementerCreateManyStrategyInput | StrategyImplementerCreateManyStrategyInput[]
    skipDuplicates?: boolean
  }

  export type StakeholderUpsertWithWhereUniqueWithoutStrategyInput = {
    where: StakeholderWhereUniqueInput
    update: XOR<StakeholderUpdateWithoutStrategyInput, StakeholderUncheckedUpdateWithoutStrategyInput>
    create: XOR<StakeholderCreateWithoutStrategyInput, StakeholderUncheckedCreateWithoutStrategyInput>
  }

  export type StakeholderUpdateWithWhereUniqueWithoutStrategyInput = {
    where: StakeholderWhereUniqueInput
    data: XOR<StakeholderUpdateWithoutStrategyInput, StakeholderUncheckedUpdateWithoutStrategyInput>
  }

  export type StakeholderUpdateManyWithWhereWithoutStrategyInput = {
    where: StakeholderScalarWhereInput
    data: XOR<StakeholderUpdateManyMutationInput, StakeholderUncheckedUpdateManyWithoutStrategyInput>
  }

  export type StakeholderScalarWhereInput = {
    AND?: StakeholderScalarWhereInput | StakeholderScalarWhereInput[]
    OR?: StakeholderScalarWhereInput[]
    NOT?: StakeholderScalarWhereInput | StakeholderScalarWhereInput[]
    id?: IntFilter<"Stakeholder"> | number
    name?: StringFilter<"Stakeholder"> | string
    organization_name?: StringNullableFilter<"Stakeholder"> | string | null
    emails?: StringNullableListFilter<"Stakeholder">
    phone_numbers?: StringNullableListFilter<"Stakeholder">
    strategy_id?: IntFilter<"Stakeholder"> | number
  }

  export type CommentUpsertWithWhereUniqueWithoutStrategyInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutStrategyInput, CommentUncheckedUpdateWithoutStrategyInput>
    create: XOR<CommentCreateWithoutStrategyInput, CommentUncheckedCreateWithoutStrategyInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutStrategyInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutStrategyInput, CommentUncheckedUpdateWithoutStrategyInput>
  }

  export type CommentUpdateManyWithWhereWithoutStrategyInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutStrategyInput>
  }

  export type TimelineOptionsUpsertWithoutStrategiesInput = {
    update: XOR<TimelineOptionsUpdateWithoutStrategiesInput, TimelineOptionsUncheckedUpdateWithoutStrategiesInput>
    create: XOR<TimelineOptionsCreateWithoutStrategiesInput, TimelineOptionsUncheckedCreateWithoutStrategiesInput>
    where?: TimelineOptionsWhereInput
  }

  export type TimelineOptionsUpdateToOneWithWhereWithoutStrategiesInput = {
    where?: TimelineOptionsWhereInput
    data: XOR<TimelineOptionsUpdateWithoutStrategiesInput, TimelineOptionsUncheckedUpdateWithoutStrategiesInput>
  }

  export type TimelineOptionsUpdateWithoutStrategiesInput = {
    title?: StringFieldUpdateOperationsInput | string
  }

  export type TimelineOptionsUncheckedUpdateWithoutStrategiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
  }

  export type StatusOptionsUpsertWithoutStrategiesInput = {
    update: XOR<StatusOptionsUpdateWithoutStrategiesInput, StatusOptionsUncheckedUpdateWithoutStrategiesInput>
    create: XOR<StatusOptionsCreateWithoutStrategiesInput, StatusOptionsUncheckedCreateWithoutStrategiesInput>
    where?: StatusOptionsWhereInput
  }

  export type StatusOptionsUpdateToOneWithWhereWithoutStrategiesInput = {
    where?: StatusOptionsWhereInput
    data: XOR<StatusOptionsUpdateWithoutStrategiesInput, StatusOptionsUncheckedUpdateWithoutStrategiesInput>
  }

  export type StatusOptionsUpdateWithoutStrategiesInput = {
    title?: StringFieldUpdateOperationsInput | string
  }

  export type StatusOptionsUncheckedUpdateWithoutStrategiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
  }

  export type PoliciesUpsertWithoutStrategiesInput = {
    update: XOR<PoliciesUpdateWithoutStrategiesInput, PoliciesUncheckedUpdateWithoutStrategiesInput>
    create: XOR<PoliciesCreateWithoutStrategiesInput, PoliciesUncheckedCreateWithoutStrategiesInput>
    where?: PoliciesWhereInput
  }

  export type PoliciesUpdateToOneWithWhereWithoutStrategiesInput = {
    where?: PoliciesWhereInput
    data: XOR<PoliciesUpdateWithoutStrategiesInput, PoliciesUncheckedUpdateWithoutStrategiesInput>
  }

  export type PoliciesUpdateWithoutStrategiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    policy_number?: IntFieldUpdateOperationsInput | number
    area?: FocusAreaUpdateOneRequiredWithoutPoliciesNestedInput
  }

  export type PoliciesUncheckedUpdateWithoutStrategiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    policy_number?: IntFieldUpdateOperationsInput | number
    focus_area_id?: IntFieldUpdateOperationsInput | number
  }

  export type StrategyImplementerUpsertWithWhereUniqueWithoutStrategyInput = {
    where: StrategyImplementerWhereUniqueInput
    update: XOR<StrategyImplementerUpdateWithoutStrategyInput, StrategyImplementerUncheckedUpdateWithoutStrategyInput>
    create: XOR<StrategyImplementerCreateWithoutStrategyInput, StrategyImplementerUncheckedCreateWithoutStrategyInput>
  }

  export type StrategyImplementerUpdateWithWhereUniqueWithoutStrategyInput = {
    where: StrategyImplementerWhereUniqueInput
    data: XOR<StrategyImplementerUpdateWithoutStrategyInput, StrategyImplementerUncheckedUpdateWithoutStrategyInput>
  }

  export type StrategyImplementerUpdateManyWithWhereWithoutStrategyInput = {
    where: StrategyImplementerScalarWhereInput
    data: XOR<StrategyImplementerUpdateManyMutationInput, StrategyImplementerUncheckedUpdateManyWithoutStrategyInput>
  }

  export type StrategyImplementerScalarWhereInput = {
    AND?: StrategyImplementerScalarWhereInput | StrategyImplementerScalarWhereInput[]
    OR?: StrategyImplementerScalarWhereInput[]
    NOT?: StrategyImplementerScalarWhereInput | StrategyImplementerScalarWhereInput[]
    implementer_id?: IntFilter<"StrategyImplementer"> | number
    strategy_id?: IntFilter<"StrategyImplementer"> | number
    order_number?: IntNullableFilter<"StrategyImplementer"> | number | null
    is_primary?: BoolFilter<"StrategyImplementer"> | boolean
    createdAt?: DateTimeFilter<"StrategyImplementer"> | Date | string
    updatedAt?: DateTimeFilter<"StrategyImplementer"> | Date | string
  }

  export type UserCreateWithoutAssigned_implementersInput = {
    id?: string
    auth_source?: string
    google_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    display_name?: string | null
    profile_pic?: string | null
    nickname?: string | null
    given_name?: string | null
    family_name?: string | null
    password_hash?: string | null
    email?: string | null
    disabled?: boolean
    userRoles?: UserRoleCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAssigned_implementersInput = {
    id?: string
    auth_source?: string
    google_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    display_name?: string | null
    profile_pic?: string | null
    nickname?: string | null
    given_name?: string | null
    family_name?: string | null
    password_hash?: string | null
    email?: string | null
    disabled?: boolean
    userRoles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAssigned_implementersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssigned_implementersInput, UserUncheckedCreateWithoutAssigned_implementersInput>
  }

  export type StrategyImplementerCreateWithoutImplementerInput = {
    order_number?: number | null
    is_primary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    strategy: StrategyCreateNestedOneWithoutImplementersInput
  }

  export type StrategyImplementerUncheckedCreateWithoutImplementerInput = {
    strategy_id: number
    order_number?: number | null
    is_primary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StrategyImplementerCreateOrConnectWithoutImplementerInput = {
    where: StrategyImplementerWhereUniqueInput
    create: XOR<StrategyImplementerCreateWithoutImplementerInput, StrategyImplementerUncheckedCreateWithoutImplementerInput>
  }

  export type StrategyImplementerCreateManyImplementerInputEnvelope = {
    data: StrategyImplementerCreateManyImplementerInput | StrategyImplementerCreateManyImplementerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutAssigned_implementersInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutAssigned_implementersInput, UserUncheckedUpdateWithoutAssigned_implementersInput>
    create: XOR<UserCreateWithoutAssigned_implementersInput, UserUncheckedCreateWithoutAssigned_implementersInput>
  }

  export type UserUpdateWithWhereUniqueWithoutAssigned_implementersInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutAssigned_implementersInput, UserUncheckedUpdateWithoutAssigned_implementersInput>
  }

  export type UserUpdateManyWithWhereWithoutAssigned_implementersInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutAssigned_implementersInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    auth_source?: StringFilter<"User"> | string
    google_id?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    display_name?: StringNullableFilter<"User"> | string | null
    profile_pic?: StringNullableFilter<"User"> | string | null
    nickname?: StringNullableFilter<"User"> | string | null
    given_name?: StringNullableFilter<"User"> | string | null
    family_name?: StringNullableFilter<"User"> | string | null
    password_hash?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    disabled?: BoolFilter<"User"> | boolean
  }

  export type StrategyImplementerUpsertWithWhereUniqueWithoutImplementerInput = {
    where: StrategyImplementerWhereUniqueInput
    update: XOR<StrategyImplementerUpdateWithoutImplementerInput, StrategyImplementerUncheckedUpdateWithoutImplementerInput>
    create: XOR<StrategyImplementerCreateWithoutImplementerInput, StrategyImplementerUncheckedCreateWithoutImplementerInput>
  }

  export type StrategyImplementerUpdateWithWhereUniqueWithoutImplementerInput = {
    where: StrategyImplementerWhereUniqueInput
    data: XOR<StrategyImplementerUpdateWithoutImplementerInput, StrategyImplementerUncheckedUpdateWithoutImplementerInput>
  }

  export type StrategyImplementerUpdateManyWithWhereWithoutImplementerInput = {
    where: StrategyImplementerScalarWhereInput
    data: XOR<StrategyImplementerUpdateManyMutationInput, StrategyImplementerUncheckedUpdateManyWithoutImplementerInput>
  }

  export type StrategyCreateWithoutStakeholdersInput = {
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    strategy_number: number
    comments?: CommentCreateNestedManyWithoutStrategyInput
    timeline: TimelineOptionsCreateNestedOneWithoutStrategiesInput
    status: StatusOptionsCreateNestedOneWithoutStrategiesInput
    policy: PoliciesCreateNestedOneWithoutStrategiesInput
    implementers?: StrategyImplementerCreateNestedManyWithoutStrategyInput
  }

  export type StrategyUncheckedCreateWithoutStakeholdersInput = {
    id?: number
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    policy_id: string
    strategy_number: number
    timeline_id: number
    status_id: number
    comments?: CommentUncheckedCreateNestedManyWithoutStrategyInput
    implementers?: StrategyImplementerUncheckedCreateNestedManyWithoutStrategyInput
  }

  export type StrategyCreateOrConnectWithoutStakeholdersInput = {
    where: StrategyWhereUniqueInput
    create: XOR<StrategyCreateWithoutStakeholdersInput, StrategyUncheckedCreateWithoutStakeholdersInput>
  }

  export type StrategyUpsertWithoutStakeholdersInput = {
    update: XOR<StrategyUpdateWithoutStakeholdersInput, StrategyUncheckedUpdateWithoutStakeholdersInput>
    create: XOR<StrategyCreateWithoutStakeholdersInput, StrategyUncheckedCreateWithoutStakeholdersInput>
    where?: StrategyWhereInput
  }

  export type StrategyUpdateToOneWithWhereWithoutStakeholdersInput = {
    where?: StrategyWhereInput
    data: XOR<StrategyUpdateWithoutStakeholdersInput, StrategyUncheckedUpdateWithoutStakeholdersInput>
  }

  export type StrategyUpdateWithoutStakeholdersInput = {
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    comments?: CommentUpdateManyWithoutStrategyNestedInput
    timeline?: TimelineOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    status?: StatusOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    policy?: PoliciesUpdateOneRequiredWithoutStrategiesNestedInput
    implementers?: StrategyImplementerUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateWithoutStakeholdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_id?: StringFieldUpdateOperationsInput | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    timeline_id?: IntFieldUpdateOperationsInput | number
    status_id?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutStrategyNestedInput
    implementers?: StrategyImplementerUncheckedUpdateManyWithoutStrategyNestedInput
  }

  export type ImplementerCreateWithoutStrategiesInput = {
    name: string
    emails?: ImplementerCreateemailsInput | string[]
    phone_numbers?: ImplementerCreatephone_numbersInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    is_board?: boolean
    is_department?: boolean
    is_school?: boolean
    cpic_smes?: UserCreateNestedManyWithoutAssigned_implementersInput
  }

  export type ImplementerUncheckedCreateWithoutStrategiesInput = {
    id?: number
    name: string
    emails?: ImplementerCreateemailsInput | string[]
    phone_numbers?: ImplementerCreatephone_numbersInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    is_board?: boolean
    is_department?: boolean
    is_school?: boolean
    cpic_smes?: UserUncheckedCreateNestedManyWithoutAssigned_implementersInput
  }

  export type ImplementerCreateOrConnectWithoutStrategiesInput = {
    where: ImplementerWhereUniqueInput
    create: XOR<ImplementerCreateWithoutStrategiesInput, ImplementerUncheckedCreateWithoutStrategiesInput>
  }

  export type StrategyCreateWithoutImplementersInput = {
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    strategy_number: number
    stakeholders?: StakeholderCreateNestedManyWithoutStrategyInput
    comments?: CommentCreateNestedManyWithoutStrategyInput
    timeline: TimelineOptionsCreateNestedOneWithoutStrategiesInput
    status: StatusOptionsCreateNestedOneWithoutStrategiesInput
    policy: PoliciesCreateNestedOneWithoutStrategiesInput
  }

  export type StrategyUncheckedCreateWithoutImplementersInput = {
    id?: number
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    policy_id: string
    strategy_number: number
    timeline_id: number
    status_id: number
    stakeholders?: StakeholderUncheckedCreateNestedManyWithoutStrategyInput
    comments?: CommentUncheckedCreateNestedManyWithoutStrategyInput
  }

  export type StrategyCreateOrConnectWithoutImplementersInput = {
    where: StrategyWhereUniqueInput
    create: XOR<StrategyCreateWithoutImplementersInput, StrategyUncheckedCreateWithoutImplementersInput>
  }

  export type ImplementerUpsertWithoutStrategiesInput = {
    update: XOR<ImplementerUpdateWithoutStrategiesInput, ImplementerUncheckedUpdateWithoutStrategiesInput>
    create: XOR<ImplementerCreateWithoutStrategiesInput, ImplementerUncheckedCreateWithoutStrategiesInput>
    where?: ImplementerWhereInput
  }

  export type ImplementerUpdateToOneWithWhereWithoutStrategiesInput = {
    where?: ImplementerWhereInput
    data: XOR<ImplementerUpdateWithoutStrategiesInput, ImplementerUncheckedUpdateWithoutStrategiesInput>
  }

  export type ImplementerUpdateWithoutStrategiesInput = {
    name?: StringFieldUpdateOperationsInput | string
    emails?: ImplementerUpdateemailsInput | string[]
    phone_numbers?: ImplementerUpdatephone_numbersInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_board?: BoolFieldUpdateOperationsInput | boolean
    is_department?: BoolFieldUpdateOperationsInput | boolean
    is_school?: BoolFieldUpdateOperationsInput | boolean
    cpic_smes?: UserUpdateManyWithoutAssigned_implementersNestedInput
  }

  export type ImplementerUncheckedUpdateWithoutStrategiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    emails?: ImplementerUpdateemailsInput | string[]
    phone_numbers?: ImplementerUpdatephone_numbersInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_board?: BoolFieldUpdateOperationsInput | boolean
    is_department?: BoolFieldUpdateOperationsInput | boolean
    is_school?: BoolFieldUpdateOperationsInput | boolean
    cpic_smes?: UserUncheckedUpdateManyWithoutAssigned_implementersNestedInput
  }

  export type StrategyUpsertWithoutImplementersInput = {
    update: XOR<StrategyUpdateWithoutImplementersInput, StrategyUncheckedUpdateWithoutImplementersInput>
    create: XOR<StrategyCreateWithoutImplementersInput, StrategyUncheckedCreateWithoutImplementersInput>
    where?: StrategyWhereInput
  }

  export type StrategyUpdateToOneWithWhereWithoutImplementersInput = {
    where?: StrategyWhereInput
    data: XOR<StrategyUpdateWithoutImplementersInput, StrategyUncheckedUpdateWithoutImplementersInput>
  }

  export type StrategyUpdateWithoutImplementersInput = {
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUpdateManyWithoutStrategyNestedInput
    comments?: CommentUpdateManyWithoutStrategyNestedInput
    timeline?: TimelineOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    status?: StatusOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    policy?: PoliciesUpdateOneRequiredWithoutStrategiesNestedInput
  }

  export type StrategyUncheckedUpdateWithoutImplementersInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_id?: StringFieldUpdateOperationsInput | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    timeline_id?: IntFieldUpdateOperationsInput | number
    status_id?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUncheckedUpdateManyWithoutStrategyNestedInput
    comments?: CommentUncheckedUpdateManyWithoutStrategyNestedInput
  }

  export type CommentCreateWithoutChildrenInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CommentCreateNestedOneWithoutChildrenInput
    user: UserCreateNestedOneWithoutCommentsInput
    strategy: StrategyCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutChildrenInput = {
    id?: number
    user_id: string
    strategy_id: number
    parent_id?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutChildrenInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutChildrenInput, CommentUncheckedCreateWithoutChildrenInput>
  }

  export type CommentCreateWithoutParentInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CommentCreateNestedManyWithoutParentInput
    user: UserCreateNestedOneWithoutCommentsInput
    strategy: StrategyCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutParentInput = {
    id?: number
    user_id: string
    strategy_id: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type CommentCreateOrConnectWithoutParentInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput>
  }

  export type CommentCreateManyParentInputEnvelope = {
    data: CommentCreateManyParentInput | CommentCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCommentsInput = {
    id?: string
    auth_source?: string
    google_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    display_name?: string | null
    profile_pic?: string | null
    nickname?: string | null
    given_name?: string | null
    family_name?: string | null
    password_hash?: string | null
    email?: string | null
    disabled?: boolean
    assigned_implementers?: ImplementerCreateNestedManyWithoutCpic_smesInput
    userRoles?: UserRoleCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string
    auth_source?: string
    google_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    display_name?: string | null
    profile_pic?: string | null
    nickname?: string | null
    given_name?: string | null
    family_name?: string | null
    password_hash?: string | null
    email?: string | null
    disabled?: boolean
    assigned_implementers?: ImplementerUncheckedCreateNestedManyWithoutCpic_smesInput
    userRoles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type StrategyCreateWithoutCommentsInput = {
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    strategy_number: number
    stakeholders?: StakeholderCreateNestedManyWithoutStrategyInput
    timeline: TimelineOptionsCreateNestedOneWithoutStrategiesInput
    status: StatusOptionsCreateNestedOneWithoutStrategiesInput
    policy: PoliciesCreateNestedOneWithoutStrategiesInput
    implementers?: StrategyImplementerCreateNestedManyWithoutStrategyInput
  }

  export type StrategyUncheckedCreateWithoutCommentsInput = {
    id?: number
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    policy_id: string
    strategy_number: number
    timeline_id: number
    status_id: number
    stakeholders?: StakeholderUncheckedCreateNestedManyWithoutStrategyInput
    implementers?: StrategyImplementerUncheckedCreateNestedManyWithoutStrategyInput
  }

  export type StrategyCreateOrConnectWithoutCommentsInput = {
    where: StrategyWhereUniqueInput
    create: XOR<StrategyCreateWithoutCommentsInput, StrategyUncheckedCreateWithoutCommentsInput>
  }

  export type CommentUpsertWithoutChildrenInput = {
    update: XOR<CommentUpdateWithoutChildrenInput, CommentUncheckedUpdateWithoutChildrenInput>
    create: XOR<CommentCreateWithoutChildrenInput, CommentUncheckedCreateWithoutChildrenInput>
    where?: CommentWhereInput
  }

  export type CommentUpdateToOneWithWhereWithoutChildrenInput = {
    where?: CommentWhereInput
    data: XOR<CommentUpdateWithoutChildrenInput, CommentUncheckedUpdateWithoutChildrenInput>
  }

  export type CommentUpdateWithoutChildrenInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CommentUpdateOneWithoutChildrenNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    strategy?: StrategyUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutChildrenInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: StringFieldUpdateOperationsInput | string
    strategy_id?: IntFieldUpdateOperationsInput | number
    parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpsertWithWhereUniqueWithoutParentInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutParentInput, CommentUncheckedUpdateWithoutParentInput>
    create: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutParentInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutParentInput, CommentUncheckedUpdateWithoutParentInput>
  }

  export type CommentUpdateManyWithWhereWithoutParentInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutParentInput>
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_source?: StringFieldUpdateOperationsInput | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: BoolFieldUpdateOperationsInput | boolean
    assigned_implementers?: ImplementerUpdateManyWithoutCpic_smesNestedInput
    userRoles?: UserRoleUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_source?: StringFieldUpdateOperationsInput | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: BoolFieldUpdateOperationsInput | boolean
    assigned_implementers?: ImplementerUncheckedUpdateManyWithoutCpic_smesNestedInput
    userRoles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StrategyUpsertWithoutCommentsInput = {
    update: XOR<StrategyUpdateWithoutCommentsInput, StrategyUncheckedUpdateWithoutCommentsInput>
    create: XOR<StrategyCreateWithoutCommentsInput, StrategyUncheckedCreateWithoutCommentsInput>
    where?: StrategyWhereInput
  }

  export type StrategyUpdateToOneWithWhereWithoutCommentsInput = {
    where?: StrategyWhereInput
    data: XOR<StrategyUpdateWithoutCommentsInput, StrategyUncheckedUpdateWithoutCommentsInput>
  }

  export type StrategyUpdateWithoutCommentsInput = {
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUpdateManyWithoutStrategyNestedInput
    timeline?: TimelineOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    status?: StatusOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    policy?: PoliciesUpdateOneRequiredWithoutStrategiesNestedInput
    implementers?: StrategyImplementerUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_id?: StringFieldUpdateOperationsInput | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    timeline_id?: IntFieldUpdateOperationsInput | number
    status_id?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUncheckedUpdateManyWithoutStrategyNestedInput
    implementers?: StrategyImplementerUncheckedUpdateManyWithoutStrategyNestedInput
  }

  export type UserRoleCreateManyUserInput = {
    role_id: string
    createdAt?: Date | string
  }

  export type CommentCreateManyUserInput = {
    id?: number
    strategy_id: number
    parent_id?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImplementerUpdateWithoutCpic_smesInput = {
    name?: StringFieldUpdateOperationsInput | string
    emails?: ImplementerUpdateemailsInput | string[]
    phone_numbers?: ImplementerUpdatephone_numbersInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_board?: BoolFieldUpdateOperationsInput | boolean
    is_department?: BoolFieldUpdateOperationsInput | boolean
    is_school?: BoolFieldUpdateOperationsInput | boolean
    strategies?: StrategyImplementerUpdateManyWithoutImplementerNestedInput
  }

  export type ImplementerUncheckedUpdateWithoutCpic_smesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    emails?: ImplementerUpdateemailsInput | string[]
    phone_numbers?: ImplementerUpdatephone_numbersInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_board?: BoolFieldUpdateOperationsInput | boolean
    is_department?: BoolFieldUpdateOperationsInput | boolean
    is_school?: BoolFieldUpdateOperationsInput | boolean
    strategies?: StrategyImplementerUncheckedUpdateManyWithoutImplementerNestedInput
  }

  export type ImplementerUncheckedUpdateManyWithoutCpic_smesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    emails?: ImplementerUpdateemailsInput | string[]
    phone_numbers?: ImplementerUpdatephone_numbersInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_board?: BoolFieldUpdateOperationsInput | boolean
    is_department?: BoolFieldUpdateOperationsInput | boolean
    is_school?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserRoleUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUserRolesNestedInput
  }

  export type UserRoleUncheckedUpdateWithoutUserInput = {
    role_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyWithoutUserInput = {
    role_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CommentUpdateOneWithoutChildrenNestedInput
    children?: CommentUpdateManyWithoutParentNestedInput
    strategy?: StrategyUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    strategy_id?: IntFieldUpdateOperationsInput | number
    parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type CommentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    strategy_id?: IntFieldUpdateOperationsInput | number
    parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleCreateManyRoleInput = {
    user_id: string
    createdAt?: Date | string
  }

  export type UserRoleUpdateWithoutRoleInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserRolesNestedInput
  }

  export type UserRoleUncheckedUpdateWithoutRoleInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoliciesCreateManyAreaInput = {
    id?: string
    description: string
    policy_number: number
  }

  export type PoliciesUpdateWithoutAreaInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    policy_number?: IntFieldUpdateOperationsInput | number
    strategies?: StrategyUpdateManyWithoutPolicyNestedInput
  }

  export type PoliciesUncheckedUpdateWithoutAreaInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    policy_number?: IntFieldUpdateOperationsInput | number
    strategies?: StrategyUncheckedUpdateManyWithoutPolicyNestedInput
  }

  export type PoliciesUncheckedUpdateManyWithoutAreaInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    policy_number?: IntFieldUpdateOperationsInput | number
  }

  export type StrategyCreateManyPolicyInput = {
    id?: number
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    strategy_number: number
    timeline_id: number
    status_id: number
  }

  export type StrategyUpdateWithoutPolicyInput = {
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUpdateManyWithoutStrategyNestedInput
    comments?: CommentUpdateManyWithoutStrategyNestedInput
    timeline?: TimelineOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    status?: StatusOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    implementers?: StrategyImplementerUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateWithoutPolicyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    timeline_id?: IntFieldUpdateOperationsInput | number
    status_id?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUncheckedUpdateManyWithoutStrategyNestedInput
    comments?: CommentUncheckedUpdateManyWithoutStrategyNestedInput
    implementers?: StrategyImplementerUncheckedUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateManyWithoutPolicyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    timeline_id?: IntFieldUpdateOperationsInput | number
    status_id?: IntFieldUpdateOperationsInput | number
  }

  export type StrategyCreateManyTimelineInput = {
    id?: number
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    policy_id: string
    strategy_number: number
    status_id: number
  }

  export type StrategyUpdateWithoutTimelineInput = {
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUpdateManyWithoutStrategyNestedInput
    comments?: CommentUpdateManyWithoutStrategyNestedInput
    status?: StatusOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    policy?: PoliciesUpdateOneRequiredWithoutStrategiesNestedInput
    implementers?: StrategyImplementerUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateWithoutTimelineInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_id?: StringFieldUpdateOperationsInput | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    status_id?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUncheckedUpdateManyWithoutStrategyNestedInput
    comments?: CommentUncheckedUpdateManyWithoutStrategyNestedInput
    implementers?: StrategyImplementerUncheckedUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateManyWithoutTimelineInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_id?: StringFieldUpdateOperationsInput | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    status_id?: IntFieldUpdateOperationsInput | number
  }

  export type StrategyCreateManyStatusInput = {
    id?: number
    content: string
    last_comms_date?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    policy_id: string
    strategy_number: number
    timeline_id: number
  }

  export type StrategyUpdateWithoutStatusInput = {
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUpdateManyWithoutStrategyNestedInput
    comments?: CommentUpdateManyWithoutStrategyNestedInput
    timeline?: TimelineOptionsUpdateOneRequiredWithoutStrategiesNestedInput
    policy?: PoliciesUpdateOneRequiredWithoutStrategiesNestedInput
    implementers?: StrategyImplementerUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateWithoutStatusInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_id?: StringFieldUpdateOperationsInput | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    timeline_id?: IntFieldUpdateOperationsInput | number
    stakeholders?: StakeholderUncheckedUpdateManyWithoutStrategyNestedInput
    comments?: CommentUncheckedUpdateManyWithoutStrategyNestedInput
    implementers?: StrategyImplementerUncheckedUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateManyWithoutStatusInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    last_comms_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_id?: StringFieldUpdateOperationsInput | string
    strategy_number?: IntFieldUpdateOperationsInput | number
    timeline_id?: IntFieldUpdateOperationsInput | number
  }

  export type StakeholderCreateManyStrategyInput = {
    id?: number
    name: string
    organization_name?: string | null
    emails?: StakeholderCreateemailsInput | string[]
    phone_numbers?: StakeholderCreatephone_numbersInput | string[]
  }

  export type CommentCreateManyStrategyInput = {
    id?: number
    user_id: string
    parent_id?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StrategyImplementerCreateManyStrategyInput = {
    implementer_id: number
    order_number?: number | null
    is_primary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StakeholderUpdateWithoutStrategyInput = {
    name?: StringFieldUpdateOperationsInput | string
    organization_name?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: StakeholderUpdateemailsInput | string[]
    phone_numbers?: StakeholderUpdatephone_numbersInput | string[]
  }

  export type StakeholderUncheckedUpdateWithoutStrategyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    organization_name?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: StakeholderUpdateemailsInput | string[]
    phone_numbers?: StakeholderUpdatephone_numbersInput | string[]
  }

  export type StakeholderUncheckedUpdateManyWithoutStrategyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    organization_name?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: StakeholderUpdateemailsInput | string[]
    phone_numbers?: StakeholderUpdatephone_numbersInput | string[]
  }

  export type CommentUpdateWithoutStrategyInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CommentUpdateOneWithoutChildrenNestedInput
    children?: CommentUpdateManyWithoutParentNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutStrategyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type CommentUncheckedUpdateManyWithoutStrategyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StrategyImplementerUpdateWithoutStrategyInput = {
    order_number?: NullableIntFieldUpdateOperationsInput | number | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    implementer?: ImplementerUpdateOneRequiredWithoutStrategiesNestedInput
  }

  export type StrategyImplementerUncheckedUpdateWithoutStrategyInput = {
    implementer_id?: IntFieldUpdateOperationsInput | number
    order_number?: NullableIntFieldUpdateOperationsInput | number | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StrategyImplementerUncheckedUpdateManyWithoutStrategyInput = {
    implementer_id?: IntFieldUpdateOperationsInput | number
    order_number?: NullableIntFieldUpdateOperationsInput | number | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StrategyImplementerCreateManyImplementerInput = {
    strategy_id: number
    order_number?: number | null
    is_primary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutAssigned_implementersInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_source?: StringFieldUpdateOperationsInput | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: BoolFieldUpdateOperationsInput | boolean
    userRoles?: UserRoleUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAssigned_implementersInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_source?: StringFieldUpdateOperationsInput | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: BoolFieldUpdateOperationsInput | boolean
    userRoles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutAssigned_implementersInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_source?: StringFieldUpdateOperationsInput | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StrategyImplementerUpdateWithoutImplementerInput = {
    order_number?: NullableIntFieldUpdateOperationsInput | number | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy?: StrategyUpdateOneRequiredWithoutImplementersNestedInput
  }

  export type StrategyImplementerUncheckedUpdateWithoutImplementerInput = {
    strategy_id?: IntFieldUpdateOperationsInput | number
    order_number?: NullableIntFieldUpdateOperationsInput | number | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StrategyImplementerUncheckedUpdateManyWithoutImplementerInput = {
    strategy_id?: IntFieldUpdateOperationsInput | number
    order_number?: NullableIntFieldUpdateOperationsInput | number | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyParentInput = {
    id?: number
    user_id: string
    strategy_id: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentUpdateWithoutParentInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CommentUpdateManyWithoutParentNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    strategy?: StrategyUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: StringFieldUpdateOperationsInput | string
    strategy_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type CommentUncheckedUpdateManyWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: StringFieldUpdateOperationsInput | string
    strategy_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}