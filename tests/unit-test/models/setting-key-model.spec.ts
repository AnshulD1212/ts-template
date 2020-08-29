// TODO: To update the test case based on TODO use case.

// import dotenv = require("dotenv");
// dotenv.config();
// import { globalSettings } from "../../../src/settings/globals";
// import { SettingKeyModel } from "../../../src/models/setting-key-model";

// const settingKeyModel: SettingKeyModel = new SettingKeyModel();

// beforeAll(() => {
//   globalSettings();
// });

// const nonUUIDAppId: string = "non_uuid_app_id";
// const nonExistingAppId: string = "0f4afa20-b9a9-11ea-b3de-0242ac130004";
// const validSettingKey: string = "core_org";
// const secondValidSettingKey: string = "second_core_org";
// const validUUIDAppId: string = "f6c7179d-4fbf-4047-89e3-a242fe11ae51";
// const validValidationRule: object = { type: "string" };
// const inValidValidationRule: object = { type: "invalid_type_001" };

// describe("#create()", () => {
//   describe("when non uuid app_id is provided as input", () => {
//     test("should throw error", async() => {
//       try {
//         await settingKeyModel.create({
//           app_id: nonUUIDAppId,
//           name: validSettingKey,
//           description: "test_description",
//           validation_rule: validValidationRule
//         });
//       } catch (e) {
//         expect(e.code).toBe("22P02");
//         expect(e.routine).toBe("string_to_uuid");
//       }
//     });
//   });

//   describe("when provided input is valid", () => {
//     test("should throw error", async() => {
//       await settingKeyModel.create({
//         app_id: validUUIDAppId,
//         name: validSettingKey,
//         description: "test_description",
//         validation_rule: validValidationRule
//       });
//       await settingKeyModel.create({
//         app_id: validUUIDAppId,
//         name: secondValidSettingKey,
//         description: "test_description",
//         validation_rule: validValidationRule
//       });
//     });
//   });

//   describe("when same payload is provided which already exists", () => {
//     test("should throw error", async() => {
//       try {
//         await settingKeyModel.create({
//           app_id: validUUIDAppId,
//           name: validSettingKey,
//           description: "test_description",
//           validation_rule: validValidationRule
//         });
//       } catch (e) {
//         expect(e.status).toBe(422);
//       }
//     });
//   });
// });
// describe("#getByAppId()", () => {
//   describe("when non uuid app_id is provided as input", () => {
//     test("should throw error", async() => {
//       try {
//         await settingKeyModel.fetchByAppId(nonUUIDAppId);
//       } catch (e) {
//         expect(e.code).toBe("22P02");
//         expect(e.routine).toBe("string_to_uuid");
//       }
//     });
//   });
//   describe("when non existing app_id is provided as input", () => {
//     test("should return empty array", async() => {
//       const result = await settingKeyModel.fetchByAppId(nonExistingAppId);
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBe(0);
//     });
//   });
//   describe("when existing app_id is provided as input", () => {
//     test("should return array", async() => {
//       const result = await settingKeyModel.fetchByAppId(validUUIDAppId);
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBe(2);
//     });
//   });
// });
// describe("#updateById()", () => {
//   describe("when non existing id is provided as input", () => {
//     test("should return empty array", async() => {
//       const result = await settingKeyModel.updateById(1000, {
//         name: "setting_type_01"
//       });
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBe(0);
//     });
//   });
//   describe("when name is updated to existing setting_key for the same app_id", () => {
//     test("should throw error", async() => {
//       try {
//         await settingKeyModel.updateById(1, {
//         name: secondValidSettingKey
//         });
//       } catch(e) {
//         expect(e.status).toBe(422);
//       }
//     });
//   });
//   describe("when existing id is provided as input", () => {
//     test("should return array", async() => {
//       const result = await settingKeyModel.updateById(1, {
//         name: "setting_type_01"
//       });
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBe(1);
//     });
//   });
// });
// describe("#deleteById()", () => {
//   describe("when non existing id is provided as input", () => {
//     test("should return empty array", async() => {
//       const result = await settingKeyModel.deleteById(1000);
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBe(0);
//     });
//   });
//   describe("when existing id is provided as input", () => {
//     test("should return array", async() => {
//       const result = await settingKeyModel.deleteById(1)
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBe(1);
//     });
//   });
// });
